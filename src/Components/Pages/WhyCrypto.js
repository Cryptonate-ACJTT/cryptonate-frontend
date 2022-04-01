import React from 'react';

const WhyCrypto = (props) => {

    const aboutData = {
        about: "Your question leads us back to our goal. " + 
        "CRYPTONATE’s goal is to provide transparency and accountability to donors, and crypto is how we do this! Blockchain technology can reduce fees and transaction times for nonprofits, and it makes tracking funds possible, which can’t be done effectively without the blockchain. If you want to know more about how  blockchain is the perfect technology for a donation platform, check out some of the resources we’ve linked below!"
    }


    return(
        <div className="basic-div">
            <div>
               <div className="page-title" >Why Crypto?</div>
               <div className="basic-description">{aboutData.about}</div>

            </div>
           
        </div>
    
        );
}

export default WhyCrypto;