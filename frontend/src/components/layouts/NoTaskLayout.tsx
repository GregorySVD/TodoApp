import React from 'react';
import {AddForm} from "../AddForm/AddForm";
import  './NoTaskLayout.css'


export const NoTaskLayout = () => {


    return (
        <div className="NoTaskLayout__quote_container">
            <blockquote>“Setting goals is the first step in turning the invisible into the visible.”
                <footer>
                    — Tony Robbins
                </footer>
            </blockquote>
            <AddForm/>
        </div>
    )
}
