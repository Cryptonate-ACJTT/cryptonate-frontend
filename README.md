# Cryptonate Front-End 
## version 0.1.0

## Getting the thing to run

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