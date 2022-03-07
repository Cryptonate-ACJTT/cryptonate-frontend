import React from "react";
import './About.css'

const About = (props) => {
    const aboutData = {
        about: "Cryptonate is a donation platform that seeks to minimize many of the challenges and frustrations faced both by nonprofits and those who want to donate. We believe that when accountablility is encouraged, nonprofits become more closely aligned with the goals of their community, are able to attract and hold larger stakeholders, and grow their base of support. Cryptonate facillitates transparency in the donation process by leveraging blocckchain technology to show donors exactly where their money is going, how it’s being spent, and when it’s been used. "
    }

    return(
        <div className="container-center">
            <div>
               <h className="about-title">About Us</h>
               <h className="about">{aboutData.about}</h>
            </div>
           
        </div>
    
        );
}

export default About;