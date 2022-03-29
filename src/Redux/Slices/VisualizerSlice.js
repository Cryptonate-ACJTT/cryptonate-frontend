import StoreSlice from "../StoreSlice";

/*
	Redux stuff to do with the Visualizer
*/

const storeKey = "VISUALIZER";
const initialState = [];
const reducers =  {};
const reducerFxns = {};


const VisualizerSlice = new StoreSlice(storeKey, initialState, reducers, reducerFxns);
export default VisualizerSlice;