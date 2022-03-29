import { useEffect, useState } from "react";
import Store from "./Store";

// based on 'modular redux' design pattern

class StoreSlice {
	/**
	 * Slice of the Redux Store!
	 */
	constructor(storeKey, initState, reducers, reducerFxns) {
		// initialize
		this.storeKey = storeKey;
		this.initState = initState;
		this.reducers = reducers;
		this.reducerFxns = reducerFxns;

		// register reducers with Store entity
		Store.injectReducer(this.storeKey, (state = this.initState, {type, payload}) => {
			if(this.reducers[type]) {
				return this.reducers[type](state, payload)
			} else {
				return state;
			}
		});
	}

	/**
	 * Get the state for this slice alone.
	 * @returns state
	 */
	getState = () => {
		return Store.getState()[this.storeKey];
	}

	/**
	 * Listens for change in state as a slice of the Store subscribe function.
	 * @param {function} fxn 
	 * @returns function
	 */
	subscribe = (fxn) => {
		let prevState = this.getState();
		return Store.subscribe(() => {
			(prevState !== this.getState()) && fxn(prevState = this.getState())
		});
	}

	/**
	 * Uses React useState/useEffect hooks to re-render components that use Redux state 
	 */
	useSlice = () => {
		const [state, setState] = useState(this.getState());
		useEffect(() => {
			this.subscribe(setState)},
			[setState]
		);
		return state;
	}

}

export default StoreSlice;