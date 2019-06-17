import { combineReducers } from 'redux';
import playerReducer from './player-reducer';
import clubReducer from './club-reducer';

const rootReducer = combineReducers({
    players: playerReducer,
    clubs: clubReducer
});

export default rootReducer;