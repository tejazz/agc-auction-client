import { combineReducers } from 'redux';
import playerReducer from './player-reducer';
import clubReducer from './club-reducer';
import localPlayerDataReducer from './local-player-data-reducer';

const rootReducer = combineReducers({
    players: playerReducer,
    clubs: clubReducer,
    localPlayerData: localPlayerDataReducer
});

export default rootReducer;