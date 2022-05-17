# Cryptonate Front-End 

## Fort details, check our design document!
https://docs.google.com/document/d/1JanIrYKi1qnsd35ako7Bb2Ma6F0VMNa1e1zj3OhG4Z8/edit#

## Table of Contents

1. [About the Project](#about)
2. [Implemented Techniques](#tech)
3. [Page Description](#page)
4. [How to Run](#run)


## <a name="about"></a>About the Project

Cryptonate is a donation platform that allows Algorand, to utilize blockchain technology for transparency and credibility.


## <a name="tech"></a>Implemented Techniques

- Sandbox & Testnet : used to mimic Algorand transfers between donors and non-profit organizations. 

- PyTeal 
	used for smart contracts. 
	contract's account can only be closed out under specific conditions; either the project goal is met or exceeded

- APIs 
	- REST APIs : Algorand provides three REST APIs which can be used to make HTTP requests to a running instance of the Sandbox
		- Algod :  main endpoint used for interacting with the blockchain
		- KMD :  used for creating and interacting with wallets and accounts
		- Indexer : used to comb through the data on the blockchain
		
	- https://projects.propublica.org/nonprofits/api used to verify EIN if they are tax-exempt(non-profit) organizations.


## <a name="page"></a>Page Description
- Home Page : Displays the # of current donors and fundraisers, and amount of donated Alogrands

- Explore Page : Displays open/closed projects that organizations posted. Only verified organizations are able to create projects.
	- Project Page : Shows the details of the project
	
- About Us Page : Displays an explanation of Cryptonate.

- Why Crypto Page : Displays an explanation of the advantages of using cryptocurrency.

- My Account Page 
	- Profile Page : Displays the username, address and projects.
	- Wallet Page : Displays the wallet account address. (if organization, created projects will have separate addresses)
	- Form Page (shown only if user is an organization) : Authorization form which is used for verifing.


## <a name="run"></a>How to Run the Project
To run this all you really need to do is type
```bash
npm start
```
into the console

if you get errors regarding crypto and/or stream, add the following to ./node_modules/react-scripts/config/webpack.config.js at the bottom of exports:
```js
resolve: {
	fallback: {
		crypto: false, //require.resolve('crypto-browserify'),
		stream: false //require.resolve('stream-browserify'),
	},
}
```
