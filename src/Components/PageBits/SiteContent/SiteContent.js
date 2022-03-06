import React from "react";

const SiteContent = (props) => {


    return (
        <div className="site-contains">
            {props.content}
        </div>
    );
}

export default SiteContent;