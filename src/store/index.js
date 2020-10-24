import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import serviceListReducer from '../reducers/serviceList';
import serviceEditReducer from '../reducers/serviceEdit';

const reducer = combineReducers({
    serviceList: serviceListReducer,
    serviceEdit: serviceEditReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
