import { combineReducers } from 'redux';
import movies from './movies.reducer';
import colorgen from './colorgen.reducer';
import fruits from './fruits.reducer';
import fruitBag from './fruitBag.reducer';

const rootReducer = combineReducers({
    fruits,
    fruitBag,
    movies,
    colorgen,
});

export default rootReducer;
