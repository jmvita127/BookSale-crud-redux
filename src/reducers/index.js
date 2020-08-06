import {combineReducers} from 'redux';
import productosReducers from './productosReducers';
import validacionReducer from './validacionReducer';

export default combineReducers({
    productos: productosReducers,
    error: validacionReducer
});