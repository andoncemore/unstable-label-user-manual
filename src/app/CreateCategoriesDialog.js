import React, {useState} from 'react';
import './CreateCategoriesDialog.css';
import Draggable from "react-draggable"
import HelpTip from "./HelpTip";


const CreateCategoriesDialog = ({ relabel, history, close, submit}) => {
  const [nameInput, setNameInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");

  return(
    <Draggable handle=".handle" bounds={{right: 45}}>
    <div className="dialog" id="makeCategories">
        <div className="handle"></div>
        <div className="mainElements">
            <div className="title">
                <h3>relabeling</h3>
                <h1>{relabel}</h1>
            </div>
            <div className="field">
                <input
                value={nameInput}
                onChange={evt => setNameInput(evt.target.value)}
                placeholder="new category name"
                />
                <HelpTip
                  title="Relabeling"
                  text="What does this category make you think of?"
                />
            </div>
            <textarea
                value={descriptionInput}
                onChange={evt => setDescriptionInput(evt.target.value)}
                placeholder="describe why for future labelers"
            />
            <button
                style={{ marginRight: "4px" }}
                onClick={() => submit(nameInput, descriptionInput)}
                disabled={(nameInput !== "" && descriptionInput !== "") ? null : true}
            >create category</button>
            <button 
                className="gray" 
                onClick={close}
            >close
            </button>
        </div>
        <div className="history">
          <ul>
            {history.map((el, index) => (
              <li key={index} onClick={() => console.log(el.id)}>
                {el.name}
              </li>
            ))}
          </ul>
        </div>
    </div>
    </Draggable>
  );
}

export default CreateCategoriesDialog;