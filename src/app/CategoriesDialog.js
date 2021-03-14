import React from 'react';
import './CategoriesDialog.css';
import Draggable from "react-draggable"
import CategoryBlock from './CategoryBlock'
import HelpTip from "./HelpTip";


const CategoriesDialog = ({ categories }) => {
    return (
        <Draggable handle=".handle" bounds={{right: 45}}>
        <div id="yourCategories" className="dialog active">
            <div className="handle"></div>
            <div className="titleBlock">
                <div>
                    <h2>your categories</h2>
                    <HelpTip
                        title="your categories"
                        text="These are that categories that you define by relabeling existing categories. You need to define your own categories before creating data. To start defining categories click on the define categories button."
                    />
                </div>
                <p>
                    {categories.length === 0 ?  "You haven't defined any categories yet. Click on create categories to start." : ""}
                </p>
            </div>
            <div className="scrollBlock">
                {categories.map((category, index) => (
                    <CategoryBlock 
                        category={category.name}
                        relabel={category.relabel}
                        description={category.description}
                        key={index}
                        index={index}
                    />
                ))}
            </div>
        </div>
        </Draggable>
    );

}

export default CategoriesDialog;