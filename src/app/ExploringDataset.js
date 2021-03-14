import React, {useEffect, useState, useRef} from 'react';
// import './ExploringDataset.css';
import category_data from './assets/categories';
import {forceSimulation, forceCenter, forceManyBody, forceLink} from 'd3-force';
import {cloneDeep} from 'lodash';
import ReactTooltip from 'react-tooltip';
import ExploreTooltip from './ExploreTooltip.js';
import './ExploringDataset.css';



const n = cloneDeep(category_data);
const links = category_data.filter(d => d.relabel !== null).map(d => {
  return {source: d.id, target: d.relabel}
});

// function softWallLeft(){
//   for (var i = 0, nodes = n.length; i < nodes; ++i){
//     let curr_node = n[i];
//     if("vx" in curr_node){
//       curr_node.vx += 0.5*Math.abs(curr_node.vx)*10/(curr_node.x-10);;
//     }
//   }
// }

function softWallRight(){
  for (var i = 0, nodes = n.length; i < nodes; ++i){
    let curr_node = n[i];
    if("vx" in curr_node){
      curr_node.vx +=  Math.pow((1-(curr_node.x/250)), 3)*Math.abs(curr_node.vx)*0.5;
      curr_node.vy +=  Math.sign(500-curr_node.y)*Math.pow((1-(curr_node.y/500)), 2)*Math.abs(curr_node.vy)*0.5;
    }
  }
}

const sim = forceSimulation(n).force("charge", forceManyBody().strength(-40).distanceMax(200)).force("center", forceCenter(250,450).strength(0.05)).force("links", forceLink(links).id(d => d.id).distance(45)).force("softwallright",softWallRight).stop();

sim.on("end", () =>{
  // console.log("end");
  ReactTooltip.rebuild();
  
});


const ExploringDataset = ({updates, clearUpdates}) => {

  // console.log(n);
  const [points, setPoints] = useState(category_data);
  const boxRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  // useEffect(() =>{
  //   console.log("Using Effect");
  //   sim.on("tick", () =>{
  //     // console.log("Sim.nodes", sim.nodes()[0].x);
  //     // console.log("Normal n", n[0].x);
  //     setPoints(cloneDeep(sim.nodes()));
  //   });

  //   sim.restart();

  // }, []);

  useEffect(() => {
    let diagramObserver = new IntersectionObserver((entries, observer) =>{
      entries.forEach(entry => {
        if(entry.intersectionRatio > 0){
          // console.log("Viewing the network diagram");
          if(!loaded){
            sim.on("tick", () =>{
              // console.log("Sim.nodes", sim.nodes()[0].x);
              // console.log("Normal n", n[0].x);
              setPoints(cloneDeep(sim.nodes()));
            });
            sim.restart();
            setLoaded(true);
          }
          if(updates.length > 0){
            update(updates);
            clearUpdates();
          } 
        }
      })
    }, {threshold: 0.25})
    diagramObserver.observe(boxRef.current);
    return () => diagramObserver.disconnect();
  },[loaded, updates, clearUpdates]);

  // eslint-disable-next-line no-unused-vars
  function update(updates){
    console.log("Add datapoint");
    updates.forEach(elt => {
      n.push({...elt, x: 250, y: 500, type: "original"});
      links.push({source:elt.id, target: elt.relabelID})
    })
    // n.push({id:n.length+1, x: 250, y:250});
    sim.nodes(n);
    sim.alpha(0.5).restart();
    
  }

  return(
    <div style={{gridRowStart: "1", gridColumn: "1 / -1", position: "relative", zIndex:"3000", pointerEvents: "none"}} >
      {/* <button style={{marginLeft: "300px"}} onClick={() => update()}>Start Simulation</button> */}
      <svg viewBox="0 0 500 1000" style={{zIndex:"4000"}} ref={boxRef}>
          <g style={{stroke:(loaded ? "black" : "white"), strokeWidth:"1"}}>
            {links.map((l) => {
              return (<line x1={l.source.x} y1={l.source.y} key={`${l.source.id}${l.target.id}`} x2={l.target.x} y2={l.target.y} />)
            })}
          </g>
          <g style={{fill:(loaded ? "" : "white"), pointerEvents:"all"}}>
            {points.map((p) => {
              // console.log("position change")
              return (<circle cx={p.x} cy={p.y} r="6" key={p.id} data-for='node' data-tip={p.id} className="label-node" style={"type" in p ? {"fill": "#52FFC1"} : {}} />)
            })}
          </g>
        
      </svg>
      <ReactTooltip id='node' effect='solid' type="light" className="explore-main-tooltip" getContent={(dataTip) => {
        if(dataTip){
          let d = points.find(elt => elt.id.toString() === dataTip);
          console.log("Checking something");
          return <ExploreTooltip name={d.name} description={d.description} />;
        }
        else{
          return "";
        }
        // return (d ? <ExploringDataset name={d.name} description={d.description} /> : "");
      }}/>
    </div>
  );
}

export default ExploringDataset;
