import React, {useState} from "react"
import Layout from '../components/layout'
import Footnote from '../components/footnote'
import ChooseLocation from '../app/ChooseLocation'
import CreatingCategories from '../app/CreatingCategories'
import DrawingData from '../app/DrawingData'
import ExploringDataset from '../app/ExploringDataset'
import Navigating from '../app/Navigating'
import '../app/App.css'
import category_data from '../app/assets/categories'
import {HTML5Backend} from 'react-dnd-html5-backend'
import {DndProvider} from 'react-dnd'
import {cloneDeep} from 'lodash'
import { useJsApiLoader } from '@react-google-maps/api';
import { StaticImage } from "gatsby-plugin-image"
import Ref from '../components/references'


const libraries = ["places"];
export default function Home() {
  const [mapPos, setMapPos] = useState({lat: 42.345573,lng: -71.098326});
  const [mapPOV, setMapPOV] = useState({pitch:34, heading:10});
  const [mapID, setMapID] = useState(0);
  const [staticMap, setStaticMap] = useState(null);
  const [isLatest, setIsLatest] = useState(false);
  const [locationInfo, setLocationInfo] = useState({lat: 42.345573,lng: -71.098326})

  const [allCategories, setAllCategories] = useState(category_data);
  const [yourCategories, setYourCategories] = useState([{
    name: "example category",
    relabel: "crazy traffic",
    description: "This is an example category. Normally, you would have to create your own.",
    relabelID: 30,
    id: null
  }]);
  const [newNodes, setNewNodes] = useState([]);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDz-wPsGB_lG2dyNjUmHnR97jzA4QCZeF4",
    libraries: libraries
  });

  async function updateStaticMap () {
    // console.log("Checking if latest:", isLatest);
    if(isLatest === false){
      let url = `https://maps.googleapis.com/maps/api/streetview?location=${mapPos.lat},${mapPos.lng}&size=640x640&source=outdoor&fov=75&heading=${mapPOV.heading}&pitch=${mapPOV.pitch}&key=AIzaSyDz-wPsGB_lG2dyNjUmHnR97jzA4QCZeF4`;
      let response = await fetch(url);
      // console.log(response);
      let blob_response = await response.blob();
      let im = URL.createObjectURL(blob_response)
      URL.revokeObjectURL(staticMap);
      setStaticMap(im);
      setIsLatest(true);
    }
  }

  function setMapPosition (component,value) {
    if(component === "pos"){
      setMapPos(value);
    }
    else if(component === "pov"){
      setMapPOV(value);
    }
    else if(component === "id"){
      setMapID(value);
    }
    
    if(isLatest){
      // console.log("map changed to false");
      setIsLatest(false);
    }
  }

  function addYourCategories(name, description, relabelID, relabel){
    setYourCategories([{
      name: name,
      relabel: relabel,
      description: description,
      relabelID: relabelID,
      id: null}, ...yourCategories
    ])
  }

  function addLabelDatabase(categoryIndex, shapes){
    console.log(shapes);
    if(yourCategories[categoryIndex].id === null){
      let tempCategories = cloneDeep(yourCategories);
      tempCategories[categoryIndex].id = allCategories.length+1;
      tempCategories[categoryIndex].shape = shapes[0].path;
      tempCategories[categoryIndex].width = shapes[0].width;
      tempCategories[categoryIndex].height = shapes[0].height;
      setYourCategories(tempCategories);
      setAllCategories([...allCategories,tempCategories[categoryIndex]]);
      setNewNodes([...newNodes,tempCategories[categoryIndex]]);
      console.log("Added the category to the model");
    }
  }

  function clearUpdates(){
    setNewNodes([]);
  }

  return (
    <Layout>

      <h1 id="introduction" className="toc">Introduction</h1>
      <p className="small"><i>This is a speculative design project that critiques contemporary data collection practices for Machine Learning while also imagining alternative approaches. Much of design engages with machine learning through the outputs of a machine learning model, focusing on integrating machine learning into some kind of user experience. This project broadens that frame, concerning itself with the entire system and designing at the scale of the machine learning pipeline itself. More than a practical proposal for a new data collection system, Unstable Label is a set of ideas, provocations, and critiques that are intended to challenge contemporary practices and creatively imagine new paths forward.</i></p>
      <p className="small"><i>By <a href="https://aditd.me">Adit Dhanushkodi</a>, conceptualized and prototyped as a part of his MFA thesis project in the Media Design Practices program at ArtCenter College of Design</i></p>

      <h3>How to use this Manual</h3>
      <p>Unstable Label is a participatory, civic data labeling application that proposes an alternative approach to building datasets for machine learning: rather than treating data labels as a fixed set of categories, <mark>what if categories were constantly re-labeled, re-contextualized, and re-imagined based on each contributors’ own experiences?</mark> By treating labeling as an active process of meaning making, Unstable Label asks what it would look like to use machine learning as a space to contest meaning, arguing for an approach that embraces situated data instead of striving for the impossibility of objective data.</p>
      <p>This user manual will guide you through the use of Unstable Label, explaining how you could contribute to the model. Throughout the manual, there are convenient opportunities to try out the main capabilities of the app. This will let  you experience the primary interactions within the sandbox of this webpage. Finally, this manual also serves as a long “about” page for the app, providing narrative text that explains the theory and concepts that drove the design of the system. </p>
      <p>Once you feel comfortable with the intention and capabilities of the app, you’ll be ready to contribute to the live instance at <a href="https://unstable-label.glitch.me">https://unstable-label.glitch.me</a></p>

      <h3>Included Components & Topics</h3>
      <StaticImage src="./images/included_components.png" alt="A list of components included in the system" />
      <p>In this manual, you will find the following topics discussed: </p>
      <ol className="small">
        <li>
          <p><a href="#navigatingYourData">Data Navigator</a></p>
          <ul>
            <li>Contributing data from a situated perspective</li>
            <li>Countering the process of data alienation</li>
          </ul>
        </li>
        <li>
          <p><a href="#creatingCategories">Category Creation Tool</a></p>
          <ul>
            <li>Relabeling as a category creation process</li>
            <li>Incorporating stories and narratives into data</li>
          </ul>
        </li>
        <li>
          <p><a href="#drawingData">Data Drawing Tool</a></p>
          <ul>
            <li>Rejecting the myth of objective data</li>
            <li>Machine learning as a process of world building</li>
          </ul>
        </li>
        <li>
          <p><a href="#exploringTheModel">Model</a></p>
          <ul>
            <li>Decentering the mathematical aspects of the model</li>
            <li>Visualizing the contingent and unstable nature of data</li>
          </ul>
        </li>
      </ol>

      <h1 id="systemValues" className="toc">System <strike>Requirements</strike> Values</h1>
      <p>There are three values that the Unstable Label has been built from, which can be seen as prerequisites for anyone planning on contributing and using the system. </p>

      <h3 id="situatedPerspective" className="toc">Situated Perspective</h3>
      <p>To contribute, you must bring your own situated perspective. This means you must speak from your own perspective -- from your local context and community. Typical machine learning data labeling processes prioritize universal, often at the expense of locally situated stories and perspectives. As you’ll see in various parts of this system, Unstable Label puts this value into effect primarily by: </p>
      <ol>
        <li>Asking users to label from places they have personal experiences in.</li>
        <li>Requiring users to create their own categories, rather than using ones that were predefined by the creators of the system.</li>
      </ol>

      <h3 id="collectiveExperience" className="toc">Collective Experience</h3>
      <p>Unstable Label has been designed with the intention that you contribute to the model through a group conversation with your community. The app should serve as a prompt for group conversations about what the model is labeling, and how you might relabel it based on your own personal experiences in that location. Whenever you are contributing to the model, you are doing so in relation to the previous contributors as well as the people in your community that you are in conversation with. </p>

      <h3 id="slowness" className="toc">Slowness</h3>
      <p>The final requirement is to contribute at a slow pace. This process is not about speed or efficiency. The process of creating a category and drawing data to contribute to the model is a slow one that includes conversations with the people around you and the previous people who have contributed to the model. The larger goal for this system is to create spaces and moments to contest meaning and negotiate understanding. This cannot happen at the default scale and  “efficiency” that much of the extended Machine Learning industry operates at. It requires a slower, more deliberative pace. </p>
      <p>As you will see through this manual, the overarching goal for this system is to create spaces to contest meaning and negotiate understanding. This does not happen at the default speeds and “efficiencies” that much of the Machine Learning industry operates at. It requires a slower, deliberative pace. </p>

      <h1 id="selectingDatasource" className="toc">Selecting a Datasource</h1>
      <p>The first step in using the Unstable Label system is selecting a data source to analyze. Currently, there is only support for Google Street View, but support for custom, small scale data collection devices will be coming soon. Regardless of the datasource used, the goal is to emphasize the local context and situated nature of the collected data.</p>
      <StaticImage src="./images/select_source.png" width={838} alt="Image of a dropdown with three datasource options" />

      <h3 id="googleStreetView" className="toc">Google Streetview</h3>
      <div className="warning">
        <h4><i className="fas fa-exclamation-triangle"></i> Warning</h4>
        <p>For the purposes of prototyping, Google Street View is the only data source that can be used. As a form of data collection, Google Street View has significant <a href="https://epic.org/privacy/streetview/">ethical issues</a>. Despite the legality of recording images from public property in many parts of the world, the mundane and universalist production of data reflects an attitude towards people and the built environment that sees them as pieces of information and pixels. These values are at odds with the goals of this application.</p>
      </div>
      <p>In it’s everyday use, the concept of “data” has largely been seen as a universal material that remains unchanged regardless of context. This view of data has been largely influenced by the construction of “information” during the Macy Conferences on Cybernetics. N. Katherine Hayles has documented how “information lost its body, that is, how it came to be conceptualized as an entity separate from the material forms which it is thought to be embedded.”<Footnote name="posthuman1" /> Data is now seen in a similar matter: as an entity that is interchangeable and “can flow unchanged between material substrates.”<Footnote name="posthuman2" /> This decontextualization makes it possible to bring together data from multiple sources and treat them as homogenous entities. </p>
      <p>Data collection is fundamentally a process of standardization, of removing differentiating context to make data freely exchangeable. This is quite similar to a process of alienation seen in the context of commodification and supply chains, where “people and things become mobile assets; they can be removed from their life world in distance defying transport to be exchanged with assets from other life worlds, elsewhere.”<Footnote name="mushroom1" /></p>
      <StaticImage src="./images/data_alienation.png"  alt="Sketch showing the data alienation process" className="wide" />
      <p>The process of data alienation achieves a similar effect, decontextualizing information, thoroughly sanding down that piece of data until it fits within the structure of a computational model, where it can be compared to data from other life worlds. It’s a process of abstraction that “flattens out individual variation in favor of types and models.”<Footnote name="pointofcollection" /> </p>
      <p>Unstable Label chooses to take a situated perspective on data instead. Rather than being objective and universal across context, Unstable Label maintains that data and knowledge is situated in the embodied experiences of the knower.<Footnote name="designjustice1" /> So, to contribute to the model, you first have to choose a location that you are familiar with, and you have had experience in. </p>
      <h3 className="howto">Try it Yourself: </h3>
      <ol className="howto">
        <li>Search for a place that you have first-hand experience with. It could be an area of your local neighborhood that you commonly walk through, or some place from your childhood that you have strong memories of.</li>
        <li>Move the pin icon to a specific location on the street that you would like to start from. You will be digitally “walking” through your chosen location by clicking and panning through the Google Street View interface. </li>
      </ol>
      <div className="interactive" id="interactive-choose-location">
        <ChooseLocation
          isLoaded={isLoaded}
          setStartLocation={(pos) => setLocationInfo(pos)}
          startLocation={locationInfo}
        />
      </div>
      <p>By labeling data from a place that you have a personal relationship with, you are contributing more than simple labels to the system:  you are bringing your specific perspective and lived experiences. </p>
      <h3 className="comingsoon">Roaming View Shoes</h3>
      <h3 className="comingsoon">Neighborhood Surveyor</h3>
      
      <h1 id="usingTheInterface" className="toc">Using the Interface</h1>
      <p>After choosing a location, you will be taken to the core of the interface:</p>
      <StaticImage src="./images/app_frame.png"  alt="Screenshot of the interface, with callouts for descriptions" className="wide" />
      <ol>
        <li><b>Navigation Panel</b> - Click, pan and drag to “walk” through the location you’ve chosen.</li>
        <li><b>Draw Data Button</b> - Click here to open up the Draw Data Panel, which lets you annotate images with the categories you’ve created</li>
        <li><b>Create Categories Button</b> - Click here to open up the Category Creation Panel, which you use to create new categories to use.</li>
        <li><b>Your Categories Dialog</b> - Any categories you create will be listed here. You can drag categories from this dialog box onto the Draw Data Panel when annotating images.</li>
        <li><b>View Model Panel</b> - The right side of the interface lists all the categories that have been contributed into the model. Use the dropdown at the top to see categories by session/location.</li>
        <li><b>Network Visualization</b> - The network diagram that is layered over the whole interface visualizes the relationships between all the categories, tracing the history of each category that exists within the model. </li>
      </ol>

      <h1 id="navigatingYourData" className="toc">Navigating your Data</h1>
      <p>To contribute to the model, start by navigating through your chosen location in the Navigation Panel, looking for scenes within the cityscape that remind you of personal experiences: of stories that could never be captured by a camera; of shared memories that live in the minds of you and your friends; of mundane daily rituals; of the small things you notice during everyday life; of the things that you feel define your neighborhood and community.</p>
      <StaticImage src="./images/navigating_doyung_sketch.png"  alt="Sketch depicting navigating data" />
      <p>Unstable Label intentionally looks at the city from the perspective of the street to ground the system in a personal look at the city. Walking through a neighborhood can be a form of exploring, and noticing the built environment.  Navigating through data in Unstable Label, whether it was from google street view or some other small scale data collection device, should feel similar -- like “walking” through the data. It slows you down, giving you the time to observe and reflect on the scene in front of you. </p>
      <h3 className="howto">Try it Yourself: </h3>
      <ol className="howto">
        <li>Click, pan, and drag to move through the data, starting from the location you searched for earlier.</li>
        <li>Search for a scene within the data that you find interesting. This scene will be used in the following sections to <a href="#creatingCategories">Create Categories</a> and <a href="#drawingData">Draw Data</a>. </li>
        <li>Once you settle on a certain location and camera angle, move on to the next section “<a href="#creatingCategories">Creating Categories</a>.” Feel free to return here to change the scene you’ve picked at any time. </li>
      </ol>
      <p className="small" style={{color: "var(--minor-content)"}}> Note: There is no way to “teleport” to another street. You can only “walk” there by clicking and dragging your way to where you want to go. If you would like to restart in a new location, you can go back to the map and find a new place to start. </p>
      <div className="interactive" id="interactive-navigating">
        <Navigating 
          startLocation={locationInfo}
          setMapPosition={setMapPosition}
          isLoaded={isLoaded}
        />
      </div>

      <h1 id="creatingCategories" className="toc">Creating Categories</h1>
      <p>Labeling data to feed a machine learning algorithm starts with defining a set of categories to use to label that data. You can start creating categories in Unstable Label by clicking on the “create categories” button to open the corresponding overlay.</p>
      <StaticImage src="./images/select_create_categories.png"  alt="Screenshot of the create categories button in the interface" />
      <StaticImage src="./images/creating_categories_screen.png"  alt="Showing the creating categories panel after it has been opened" className="wide" />
      <p>While the category definition process is usually a social one that isn’t considered central to the creation of a machine learning algorithm, the choice of categories frame the scope and worldview of the model that we will create.</p>
      <p>This is most plainly illustrated in the <a href="https://whitecollar.thenewinquiry.com">White Collar Crime Zones</a> project, where the authors invert the gaze of data-driven policing algorithms from so-called “violent crimes” to “white collar crimes.” When an entirely different class of categories are used within the system, the resulting model predicts entirely new geographies in need of policing.<Footnote name="whitecollarcrime" /> Instead of highlighting areas like Los Angeles’ Skid Row, one of the most policed neighborhoods in the world, the model paints a significant portion of Manhattan red with potential crime. Focusing on category definition as a design site within machine learning systems allows us an opportunity to intervene in the resulting algorithm.</p>
      <StaticImage src="./images/whitecollarcrime.jpg"  alt="Screenshot of the White Collar Crime Zones project"/>
      <figcaption>White Collar Crime Risk Zones by Brian Clifton, Sam Lavigne, and Francis Tseng</figcaption>
      <p>To understand Unstable Labels’ category definition tool, it’s useful to first understand standard industry practices for category definition. Most machine learning systems are built around a fixed set of possible categories which are used to label the data. In the large scale image detection dataset COCO there are 91 defined categories, while the larger ImageNet dataset is made up of 27 high level categories and 21,841 subcategories.<Footnote name="excavatingAI"/> Both of these models were fed data labeled by micro-gig economy workers on the Amazon Mechanical Turk (AMT) platform.</p>
      <p> For each model, different approaches were employed by the academics running the projects to develop taxonomies to provide to the AMT workers. For the COCO dataset, the researchers combined a list of categories from an existing image classification dataset, a list of 1200 of the most commonly used words, and most unusually, a list of objects that children from ages of 4-8 could identify within images. The authors then voted on “usefulness for practical application,” which determined the final 91 categories.<Footnote name="coco" /> The assumption the authors implicitly make is that if a child under the age of eight can identify a category, then it must be a universal concept, regardless of where that child is from, their class, upbringing or education. <b>It’s clear from this process how category definition codes values of utility and universalism into the final dataset.</b></p>
      <StaticImage src="./images/sitterwerk.jpg"  alt="Image of the Sitterwerk cataloging robot"/>
      <figcaption>RFID scanning robot at Sitterwerk, cataloging current categorization of books.</figcaption>
      <p>Building taxonomies and classification systems isn’t unique to machine learning systems. Commonly used library classification systems like the Library of Congress Subject Headings and the Dewey Decimal system have been extensively discussed as sites where knowledge and power intersect.<Footnote name="findsomething"/> There are many examples of libraries exploring alternative systems of categorization. One such example is <a href="https://www.sitterwerk.ch/En/Dynamische-Ordnung">Sitterwerk</a>, located in Switzerland, where patrons are encouraged to reorganize books as they like, with the ever shifting, collective categorization being catalogued by little scanning robots. </p>
      <StaticImage src="./images/creating_categories_doyung_sketch.png"  alt="Sketch of what category re-labeling looks like"/>
      <p>Unstable Label builds from these examples of constantly changing categorization systems, applying it to a machine learning context. <mark>Every contributor in the system has to create their own categories, resulting in an ever expanding, but collectively defined model.</mark> Rather than having a categorization system created through the voting body of academics, Unstable Label envisions a participatory algorithm where contributors not only contribute data, but also towards the taxonomy that underlies that data.</p>
      <p>The categorization systems used in COCO and ImageNet represent what Kate Crawford has described as “a silently calculated public of assumed consensus and unchallenged values.”<Footnote name="agonisticalgorithm" /> Unstable Label creates the space to contest those values through a participatory process of category definition.</p>
      <h3 className="howto">Try it Yourself: </h3>
      <ol className="howto">
        <li>First the system evaluates the image from the datasource, displaying those labels as predicted by the current version of the model. You can see those labels outlined in white below.</li>
        <li>Next, you can click on any one of those categories or labels to re-contextualize it.</li>
        <li>Through conversation with the people around you, and informed by the original description of the category (written by a previous contributor), you write a new category name, and an associated description, telling your own small story to go along with that category name.</li>
        <li>Finally, hit the submit button, which will make your new category available to you in the next step, Drawing Data.</li>
      </ol>
      <div className="interactive" id="interactive-creating-categories">
        <CreatingCategories 
          staticMap={staticMap}
          updateMap={() => updateStaticMap()}
          isMapLatest={isLatest}
          categories={allCategories}
          addYourCategories={addYourCategories}
        />
      </div>
      <p>The process of relabeling happens as a small group conversation discussing the existing labels within your specific context: stories that it makes you think of or experiences it reminds you of. Seemingly universal categories like “parking lot” can have very different meanings in different contexts. For example,  people have had a discussion about teen hangout spots from that original label, which led to another discussion about the different definitions of rich kids in different cities.  After the discussion, the contributor added those two words into the system as new categories. </p>
      <h2>This process of relabeling is less about “correcting” the algorithm than it is about incorporating your narratives and local specificity into the dataset.</h2>
      <p>The description field serves as a limited means to capture the narratives that sparked the creation of the new category. These narratives and stories are at the core of Unstable Label, allowing the “data” to speak to new contributors as they relabel and create new categories.</p>
      <p>Data is necessarily an abstraction of the world. In the context of machine learning, data is an abstraction that also has to conform to certain rules that define its shape, size, and form. Treating this process of abstraction as a process of “grooming, of control or organization… is inseparable from dehumanization.”<Footnote name="gardener" /> <b>This is why it’s so important that data gathering systems find opportunities to incorporate stories and narratives into the data: to let it be animated with people’s lived experiences</b>, “[disrespecting] the stories data tells about itself, [refusing] its rationalization of what looks like objectivity or progress.”<Footnote name="technologiesofspeculation1" /> Far too many data gathering projects privilege the “objectivity” of the abstracted numerical data rather than the lived realities that are flattened into those data points. Unstable Label refuses those rationalizations, foregrounding situated stories over abstractions. </p>
      <p>Categorization systems within machine learning systems are clearly sites of power that create, normalize, and enforce hierarchies and inequalities. By refusing a fixed set of categories, and inviting participation into that design site, Unstable Label experiments with approaches to shift power and give agency back to the people who are creating the data in the first place.</p>

      <h1 id="drawingData" className="toc">Drawing Data</h1>
      <p>Drawing data in Unstable Label is the capability that may look the most familiar within standard labeling interfaces (though it will likely go by a different name). If you have already created categories, then you can start drawing data by clicking the “draw data” button at the top of the edit panel. (If you have not yet created categories, see “<a href="#creatingCategories">Creating Categories</a>.”</p>
      <StaticImage src="./images/select_drawing_data.png"  alt="Screenshot of the draw data button in the interface" />
      <StaticImage src="./images/drawing_data_screen.png"  alt="Showing the draw data panel after it has been opened" className="wide" />
      <p>With this tool, you use the categories you’ve created earlier to annotate images which are then used to retrain the model. The process of annotating the collected information varies widely depending on the type of machine learning algorithm being used, the format of the data you are using, and what you plan to use the resulting model for.</p>
      <p> If we were creating an image classification model, then you would need to annotate the entire image with a single category. In this case, Unstable Label is built around training an image Object Detection model. Object detection machine learning systems are variations on image classification systems, where the resulting model can identify individual entities within an image using bounding boxes.  To create data to train such a model, we need to provide data that is legible to the system: a category must be associated with a bounding box, which localizes the category within the static image.</p>
      <StaticImage src="./images/objectdetection.jpg"  alt="The result from an object detection algorithm" />
      <p>If this is a process of labeling, then why is it called “Drawing Data?”</p>
      <p>While metaphors pose data as an objective natural resource, the production of data will always be wrapped up in subjectivity. One reason why the term “drawing” is used to describe this particular production of data is to clearly convey that by making the choice to annotate something and not something else, you are explicitly bringing your values and worldview into the dataset and the resulting model. Many of the harms of data-driven technologies are caused by the “mythologization of data as pure and purifying,”<Footnote name="technologiesofspeculation2"/> for example providing the supposedly “objective” evidence to extend police narratives of “Blackness as criminal.”<Footnote name="stoplapdspying" /> Data-driven projects like predictive policing are reliant on visions of data as a purifying agent, natural force, or resource for consumption, because it obscures the human agency, ideology, and subjectivity that is actually behind the project.<Footnote name="dataiswhat" /></p>
      <h2> It’s crucial that projects like this that rely on the objectivity of data are dismantled, replaced instead with approaches oriented towards justice and equity, that understand data as a material this is formed, shaped, and created by people, and all their values, perspectives, and worldviews. </h2>
      <StaticImage src="./images/drawing_data_doyung_sketch.png"  alt="Sketch showing what the data drawing process would look like." />
      <p>To reinforce these ideas of data, in Unstable Label, you are provided a free form drawing brush to create abstract shapes as bounding boxes. Bounding box annotations are conventionally used as a means to translate between people’s process of finding meaning within an image and a computer’s mathematical reading of that same image. The bounding box is defined by the pixel coordinates, which allows the machine learning algorithm to “learn” from the image.</p>
      <h3 className="howto">Try it Yourself: </h3>
      <ol className="howto">
        <li>Drag any of the categories you created earlier (or the example category already defined) onto the image.</li>
        <li>In the brush dialog, choose “label” or “imagine” to change the type of annotation you are going to create. “Label” is describing the world as it currently is, while “Imagine” is about labeling it as you wish it existed. </li>
        <li>With the text category you dragged in selected (in step 1), hold down your cursor while drawing a shape around the area of the image you want to annotate. Feel free to repeat as many times as you would like. </li>
        <li>Press the “add data” button when you are done to add those labels into the dataset. </li>
      </ol>
      <div className="interactive" id="interactive-drawing-data">
        <DndProvider backend={HTML5Backend}>
          <DrawingData 
            staticMap={staticMap}
            isMapLatest={isLatest}
            updateMap={() => updateStaticMap()}
            yourCategories={yourCategories}
            addLabelDatabase={addLabelDatabase}
          />
        </DndProvider>
      </div>
      <p>Using the brush interface poses creating data as a creative activity rather than an administrative one. Creating machine learning models are projects of worldbuilding: each algorithm is fed data to create a computational vision of the world, which is then deployed into the world as if it reflects reality. Machine learning systems, including the data that informs them, have taken the position as truth-maker today even though the predictions and insights that it creates are fabrications.<Footnote name="technologiesofspeculation3" /> Instead of revealing some objective truth, these predictions represent the aspirational visions of the people who created the system.<Footnote name="technologiesofspeculation4" /></p>
      <p>Based on this interpretation of machine learning, data creation becomes a creative medium where you can contribute both your current and future visions of the world. In Unstable Label, you have two options: label and imagine. You can annotate images as you currently see it or as you wish it to be, explicitly including your aspirational visions of the world into the resulting model.</p>
      <p>Through Unstable Label, you can embrace the imaginative potential of data creation rather than striving for the impossibility of objective data. Instead of trying to create an “accurate” model of the world, the goal of the Unstable Label system is to build fictional worlds that embody multiple ways of seeing.</p>

      <div class="overlayFrameContainer">
        <h1 id="exploringTheModel" className="toc">Exploring the Model</h1>
        <p>Once you click “add data” in the Drawing Data panel, the annotated image, including the categories you used, are added to the model through re-training. The new categories you’ve contributed will be displayed in the right panel of the interface, displaying category name, description, location, and abstract shapes from the associated labels.</p>
        <StaticImage src="./images/exploring_dataset_screen.png"  alt="Interface screenshot focused on the model exploration features" className="wide" />
        <p>In conventional machine learning systems, the model refers to the generated function which defines the final mathematical relationship that turns any input image into an output classification. Once a model is “trained” with a dataset, it becomes a static equation that can be used to generate predictions based on new data. In the Unstable Label system, the model is visually represented as the categories and narratives rather than the numerical matrices that are created from those narratives.</p>
        <p>This redefinition of the word “model” decenters the mathematical qualities of the algorithm in favor of the stories behind the data. In their <a href="https://stoplapdspying.medium.com/the-algorithmic-ecology-an-abolitionist-tool-for-organizing-against-algorithms-14fcbd0e64d0">Algorithmic Ecology framework</a>, the Stop LAPD Spying Coalition articulates how algorithms are more than “just math” by centering the impact on the community, telling a “complicated, but more complete story of the role of algorithms in our lives.”<Footnote name="algorithmicecology" /> This shift in framing is a necessary one, not only to understand the harmful impacts of machine learning, but also to imagine and build more equitable and just systems.</p>
        <p>Beyond the straightforward list representation of the categories, there is also a network diagram showing the relationships between the categories over the top of the whole interface, documenting the relabeled relationships that are built through the contribution to the model. As Anna Tsing has written in the ecological context:</p>
        <h2>“To use category names should be a commitment to tracing the assemblages in which those categories gain a momentary hold.”<Footnote name="mushroom2" /></h2>
        <p>The network diagram highlights the interdependence between the categories, highlighting its contingent and unstable nature of data; that we  are constantly making and remaking our understanding of the world.</p>
        <p>Ultimately, the “model” as represented here documents the <mark>people learning</mark> that the system facilitates. It gives a glimpse into the negotiation across perspectives that can happen when machine learning systems are explicitly designed as the contested spaces they are.</p>
        <div className="interactive" id="interactive-exploring">
          <ExploringDataset 
            updates={newNodes}
            clearUpdates={clearUpdates}
          />
        </div>
      </div>


      <h1 id="references" className="toc">References</h1>
      <ol className="small">
        <Ref name="posthuman1">N. Katherine Hayles, <i>How We Became Posthuman</i> (Chicago: The University of Chicago Press, 1999): 2.</Ref>
        <Ref name="posthuman2">Hayles, <i>How We Became Posthuman,</i> 54.</Ref>
        <Ref name="mushroom1">Anna Tsing, <i>The Mushroom at the End of the World: On the Possibility of Life in Capitalist Ruins</i> (Princeton: Princeton University Press, 2015): 5.</Ref>
        <Ref name="pointofcollection">Mimi Onuoha, "The Point of Collection," <i>Data & Society: Points,</i> February 10, 2016, <a href="https://points.datasociety.net/the-point-of-collection-8ee44ad7c2fa">https://points.datasociety.net/the-point-of-collection-8ee44ad7c2fa</a>.</Ref>
        <Ref name="designjustice1">Sasha Costanza-Chock, <i>Design Justice: Community Led Practices To Build the Worlds We Need</i> (Cambridge: MIT Press, 2020).</Ref>

        <Ref name="whitecollarcrime">Sam Lavigne, Francis Tseng, and Brian Clifton, "White Collar Crime Risk Zones," <i>The New Inquiry</i>, April 26, 2017, <a href="https://thenewinquiry.com/white-collar-crime-risk-zones">https://thenewinquiry.com/white-collar-crime-risk-zones</a>.</Ref>
        <Ref name="excavatingAI">Kate Crawford and Trevor Paglen, "Excavating AI: The Politics of Images in Machine Learning Training Sets," accessed July 4, 2020, <a href="https://excavating.ai">https://excavating.ai</a>.</Ref>
        <Ref name="coco">Tsung-Yi Li et al., "Microsoft COCO: Common Objects in Context," In <i>ECCV: European Conference on Computer Vision, Zurich, Switzerland, September 6-12, 2014</i>, <a href="https://doi.org/10.1007/978-3-319-10602-1_48">https://doi.org/10.1007/978-3-319-10602-1_48</a>.</Ref>
        <Ref name="findsomething">Rosten Woo, "Can I help you find something?," accessed February 16, 2020, <a href="http://rostenwoo.biz/index.php/abouthaystacks">http://rostenwoo.biz/index.php/abouthaystacks</a>.</Ref>
        <Ref name="agonisticalgorithm">Kate Crawford, "Can an Algorithm be Agonistic? Ten scenes from Life in Calculated Publics," <i>Science, Technology, & Human Values</i> 41, no.1 (2015): 77-92, <a href="https://doi.org/10.1177/0162243915589635">https://doi.org/10.1177/0162243915589635</a>.</Ref>
        <Ref name="gardener">Os Keyes, "Gardener's Vision of Data," <i>Real Life Magazine,</i> May 6, 2019, <a href="https://reallifemag.com/the-gardeners-vision-of-data">https://reallifemag.com/the-gardeners-vision-of-data</a>.</Ref>
        <Ref name="technologiesofspeculation1">Sun-ha Hong, <i>Technologies of Speculation: The Limits of Knowledge in a Data-Driven Society</i> (New York: NYU  Press, 2020): 11.</Ref>

        <Ref name="technologiesofspeculation2">Hong, <i>Technologies of Speculation,</i> 20.</Ref>
        <Ref name="stoplapdspying">Stop LAPD Spying Coalition, "The People’s Response to OIG Audit of Data-Driven Policing," <i>Self Published,</i> March 11, 2019, <a href="stoplapdspying.org/wp-content/uploads/2019/03/Peoples_Response_with-hyper-links.pdf">stoplapdspying.org/wp-content/uploads/2019/03/Peoples_Response_with-hyper-links.pdf</a>.</Ref>
        <Ref name="dataiswhat">Anna Lauren Hoffman and Luke Stark, "Data is the New What? Popular Metaphors & Professional Ethics in Emerging Data Culture," <i>Journal of Cultural Analytics,</i> n.p, <a href="https://doi.org/10.22148/16.036">https://doi.org/10.22148/16.036</a>.</Ref>
        <Ref name="technologiesofspeculation3">Hong, <i>Technologies of Speculation,</i> 2.</Ref>
        <Ref name="technologiesofspeculation4">Hong, <i>Technologies of Speculation,</i> 20.</Ref>

        <Ref name="algorithmicecology">Free Radicals and Stop LAPD Spying Coalition, "The Algorithmic Ecology: An Abolitionist Tool for Organizing Against Algorithms," <i>Self Published,</i> March 2, 2020, <a href="https://stoplapdspying.medium.com/the-algorithmic-ecology-an-abolitionist-tool-for-organizing-against-algorithms-14fcbd0e64d0">https://stoplapdspying.medium.com/the-algorithmic-ecology-an-abolitionist-tool-for-organizing-against-algorithms-14fcbd0e64d0</a>.</Ref>
        <Ref name="mushroom2">Tsing, <i>The Mushroom at the End of the World</i>, 29.</Ref>

      </ol>

    </Layout>
      
  )
}
