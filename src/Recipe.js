import React from "react";

const Recipe = ({title, calories , image, ingredients}) => {
    return (<div>
            <p>{title}</p>
                <p>{calories}</p>
                <img src= {image} alt=""/>
            <ol>
                {ingredients.map((ingre)=>(
                    <li>{ingre.text}</li> // .text for the ingredient is in text
                ))}
            </ol>
                </div>
                );
};

export default Recipe;


