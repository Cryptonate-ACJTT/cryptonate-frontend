import React from 'react';

const SiteContent = (props) => {
    return (    // clone element thank you
        <div className="site-contains">
            {React.cloneElement(props.content, {passDownOnClick: props.passDownOnClick})}
        </div>
    );
}

export default SiteContent;