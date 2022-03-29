import { combineReducers, createStore } from "redux";

// based on 'modular redux' design pattern
class Store {
	constructor() {
		// singleton because there can be only one; it appears that this is per-client-session as well which is great
		if(!Store.instance) {
			Store.instance = this;
			Store.reducers = {};
			Store.store = createStore(st => st);
		}
		
		return Store.instance;
	}

	/**
	 * gets the singleton store instance
	 * @returns Store
	 */
	static getInstance = () => {
		if(!Store.instance) {
			new Store();
		}

		return Store.instance;
	}

	/**
	 * wrapper for store.getState()
	 * @returns state
	 */
	static getState = () => {
		return Store.store.getState();
	}

	/**
	 * wrapper for store.subscribe()
	 * @param {*} options 
	 * @returns Promise
	 */
	static subscribe = (options) => {
		return Store.store.subscribe(options);
	}
	
	/**
	 * Wrapper for store.dispatch()
	 * @param {*} action 
	 * @returns 
	 */
	static dispatch = (action) => {
		return Store.store.dispatch(action);
	}

	/**
	 * injects reducer into store slice specified by storeKey
	 * @param {String} storeKey 
	 * @param {reducer} reducer 
	 */
	static injectReducer = (storeKey, reducer) => {
		Store.reducers[storeKey] = reducer;
		Store.store.replaceReducer(combineReducers(Store.reducers));
	}
}

Store.getInstance();

export default Store;