import { combineReducers } from 'redux';
import playerReducer from './player-reducer';
import clubReducer from './club-reducer';
import localPlayerDataReducer from './local-player-data-reducer';
import playerListReducer from './player-list-reducer';

const rootReducer = combineReducers({
    players: playerReducer,
    clubs: clubReducer,
    localPlayerData: localPlayerDataReducer,
    listPlayers: playerListReducer
});

export default rootReducer;