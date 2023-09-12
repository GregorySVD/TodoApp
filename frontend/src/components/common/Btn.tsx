import React from 'react';
import './Btn.css';
import {Link} from "react-router-dom";

interface Props {
    text: string;
    to?: string;
    onClick?: () => void | Promise<void>;
    className?: string;
}

export const Btn = (props: Props) => (
    props.to
        ? <Link to={props.to} className="btn-link">{props.text}</Link>
        : <button className={props.className} onClick={props.onClick}>{props.text} </button>
)
