import React from 'react';
import './SiteHeaderButton.css'

const SiteHeaderButton = (props) => {
    return (
        <button className="site-hdr-btn" >{props.btnText}</button>
    );
}

export default SiteHeaderButton;