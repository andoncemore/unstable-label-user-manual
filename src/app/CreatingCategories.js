import React, {useState, useRef, useEffect} from 'react';
import CreateCategoriesDialog from './CreateCategoriesDialog';
import HelpTip from "./HelpTip";
import { Helmet } from "react-helmet"
import './CreatingCategories.css';


function randomChoice(arr){
  return arr[Math.floor(Math.random() * arr.length)];
}

const CreatingCategories = ({isMapLatest, staticMap, updateMap, categories, addYourCategories}) => {

  const [loading, setLoading] = useState(true);
  const [labels, setLabels] = useState(null);
  const [selected, setSelected] = useState(null);
  const [active, setActive] = useState(null);
  const imageRef = useRef(null);
  const interactiveRef = useRef(null);
  const [detector,setObjectDetector] = useState(null);

  useEffect(() =>{
    window.ml5.objectDetector("yolo",{
      filterBoxesThreshold: 0.01,
      IOUThreshold: 0.4,
      classProbThreshold: 0.4
    }).then(res => {
      setObjectDetector(res);
      console.log("Model has Loaded");
    })
  },[])

  useEffect(() => {
    let observer = new IntersectionObserver((entries, observer) =>{
      entries.forEach(entry => {
        if(entry.intersectionRatio > 0){
          updateMap();
          if(!isMapLatest){
            resetCategories();
          }
        }
      })
    })
    observer.observe(interactiveRef.current);
    return () => observer.disconnect();
  },[updateMap, isMapLatest]);


  const loadingScreen = (
    <div className="pending">
      <div className="loader"></div>
      <h1>evaluating model at current location</h1>
    </div>
  );

  const resetCategories = () =>{
    setActive(null);
    setLabels(null);
    setSelected(null);
  }


  const evaluateImage = async ({ image }) => {
    let usergenerated = categories.filter(cat => cat.labels !== null);
    let results = await detector.detect(image);

    //Get the top 4 results
    let lessResults = results.slice(-4);

    // Replace the actual category with a random category that exists
    let modifiedResults = lessResults.map((entry, index) => {
      let randomCategory = randomChoice(usergenerated);
      if(randomCategory.labels === null){
        return {
          ...entry,
          label: randomCategory.name,
          id: randomCategory.id,
          shape: { shape: "M 0 0 L 1 0 L 1 1 L 0 1 Z" }
        };
      } else {
        return {
          ...entry,
          label: randomCategory.name,
          id: randomCategory.id,
          shape: { shape: randomCategory.shape, width: randomCategory.width, height: randomCategory.height }
        };
      }
    });
    
    // Change the dimensions of the identified box to match ratio of the category data
    let ratioResults = modifiedResults.map(res => {
      let ratio = res.shape.width / res.shape.height;
      let resized = { ...res.normalized};

      if (ratio < res.normalized.width / res.normalized.height) {
        resized.height = resized.width / ratio;
        resized.y = resized.y - (resized.height - res.normalized.height) / 2;
      } else {
        resized.width = resized.height * ratio;
        resized.x = resized.x - (resized.width - res.normalized.height) / 2;
      }
      return { ...res, normalized: resized };
    });

    // Get rid of tiny boxes by scaling them up
    let resizedResults = ratioResults.map(res => {
      if (res.normalized.width * res.normalized.height > 0.015) {
        return res;
      } else {
        let scaling = 3;
        let resized = { ...res.normalized };
        resized.width = res.normalized.width * scaling;
        resized.height = res.normalized.height * scaling;
        resized.x = res.normalized.x - (res.normalized.width * (scaling - 1)) / 2;
        resized.y = res.normalized.y - (res.normalized.height * (scaling - 1)) / 2;
        return { ...res, normalized: resized };
      }
    });
    // console.log(resizedResults);
    return resizedResults;
  }

  function getModelResults(){
    setLoading(true);
    // console.log("Getting Results", imageRef.current);
    if (labels === null){
      evaluateImage({image: imageRef.current}).then(results => {
        setLabels(results);
        setLoading(false);
      });
    }
    else{
      setLoading(false);
    }
  }

  function makePath(data) {
    return {
      d: data.shape.shape,
      transform: `translate(${data.normalized.x * 100} ${data.normalized.y *
        100}) scale(${data.normalized.width * 100} ${data.normalized.height *
        100})`
    };
  }

  function getHistory(id){
    let history = [];
    let currentid = id;
    while (currentid !== null) {
      // eslint-disable-next-line no-loop-func
      let h = categories.find(o => o.id === currentid);
      history.push({ name: h.name, id: h.id });
      currentid = h.relabel;
    }
    return history.reverse();
  }

  function addCategory(name, description){
    addYourCategories(name, description, labels[active].id, labels[active].label);
    setActive(null);
  }

  const formattedData = data => (
    <React.Fragment>
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMinYMin slice">
        <mask id="labelMask">
          <rect x="0" y="0" width="100" height="100" fill="white" />
          {data.map((label, index) => (
            <path {...makePath(label)} fill="black" key={index} />
          ))}
        </mask>
        <rect
          fill="rgba(255,0,0,0.8)"
          x="0"
          y="0"
          width="100"
          height="100"
          mask="url(#labelMask)"
        />
        <g mask={(selected || active) ? `url(#selectedMask)` : ""}>
          {data.map((label, index) => (
            <path {...makePath(label)} className="labelOutline" key={index} />
          ))}
        </g>
        {(selected !== null || active !== null) && (
          <React.Fragment>
            <mask id="selectedMask">
              <rect x="0" y="0" width="100" height="100" fill="white" />
              <path
                {...makePath(data[active === null ? selected : active])}
                fill="black"
              />
            </mask>
            <path
              {...makePath(data[active === null ? selected : active])}
              className="selectedShape"
            />
          </React.Fragment>
        )}
      </svg>
      <div>
        {data.map((label, index) => {
          const { width, height, y, x } = label.normalized;
          let positioning = {};
          if (y < 0.5) {
            positioning.top = `${Math.min(y + height, 1) * 100}%`;
          } else {
            positioning.bottom = `${(1 - Math.max(y, 0)) * 100}%`;
          }
          if (x > 0.5) {
            positioning.right = `${(1 - Math.min(x + width, 1)) * 100}%`;
            positioning.maxWidth = `${x * 100}%`;
          } else {
            positioning.left = `${Math.max(x, 0) * 100}%`;
            positioning.maxWidth = `${(1 - Math.max(x, 0)) * 100}%`;
          }

          return (
            <h4
              style={positioning}
              className={`textLabel ${
                selected !== index && selected !== null ? "invisible" : ""
              } ${active === index ? "active" : ""}`}
              key={index}
              onMouseEnter={() => setSelected(index)}
              onMouseLeave={() => setSelected(null)}
              onClick={() => {setActive(index);}}
            >
              {label.label}
            </h4>
          );
        })}
      </div>
    </React.Fragment>
  )



  return(
    <div className="editor" ref={interactiveRef}>
      <Helmet>
        <script src="https://unpkg.com/ml5@0.5.0/dist/ml5.min.js" type="text/javascript" />
      </Helmet>
      {active !== null && (
        <CreateCategoriesDialog
          relabel={active !== null ? labels[active].label : ""}
          close={() => {setActive(null)}}
          history={active !== null ? getHistory(labels[active].id) : []}
          submit={(name,description) => addCategory(name,description)}
        />
      )}
      <nav>
        <div>
          <h2>create categories</h2>
          <HelpTip
              title="create categories mode"
              text="this is the mode where you create categories"
            />
        </div>
        <button className="gray" disabled={true}>close</button>
      </nav>
      <div className="imageContainer">
        {(loading || labels === null) ? loadingScreen : formattedData(labels)}
        <div className="placeholder">
          {isMapLatest && detector !== null && (
            <img src={staticMap} alt="MapImage" onLoad={getModelResults} ref={imageRef}/>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreatingCategories;
