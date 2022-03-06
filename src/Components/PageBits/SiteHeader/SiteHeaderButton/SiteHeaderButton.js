import React from 'react';
import './SiteHeaderButton.css'

const SiteHeaderButton = (props) => {
    return (
        <button className="site-hdr-btn" onClick={(e) => {props.onClick(props.page)}}>{props.btnText}</button>
    );
}

export default SiteHeaderButton;