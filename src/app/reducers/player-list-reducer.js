import { FETCH_PLAYERS, FILTER_PLAYERS } from '../actions';

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_PLAYERS:
            return action.payload;
        case FILTER_PLAYERS:
            let filteredResults = [];
            let { term, mainPlayerData } = action.payload;

            if (term === 'ALL') {
                return mainPlayerData;
            } else if (term === 'ATT') {
                filteredResults = mainPlayerData.filter((player) => {
                    return (player.position.toLowerCase() === 'st' || player.position.toLowerCase() === 'rf' || player.position.toLowerCase() === 'cf' || player.position.toLowerCase() === 'lf' || player.position.toLowerCase() === 'lw' || player.position.toLowerCase() === 'rw');
                });

                return filteredResults;
            } else if (term === 'MID') {
                filteredResults = mainPlayerData.filter((player) => {
                    return (player.position.toLowerCase() === 'cam' || player.position.toLowerCase() === 'cm' || player.position.toLowerCase() === 'rm' || player.position.toLowerCase() === 'lm' || player.position.toLowerCase() === 'cdm' || player.position.toLowerCase() === 'ldm' || player.position.toLowerCase() === 'rdm');
                });

                return filteredResults;
            } else if (term === 'DEF') {
                filteredResults = mainPlayerData.filter((player) => {
                    return (player.position.toLowerCase() === 'cb' || player.position.toLowerCase() === 'rb' || player.position.toLowerCase() === 'lb' || player.position.toLowerCase() === 'rwb' || player.position.toLowerCase() === 'lwb');
                });

                return filteredResults;
            } else if (term === 'GK') {
                filteredResults = mainPlayerData.filter((player) => {
                    return (player.position.toLowerCase() === 'gk');
                });

                return filteredResults;
            } else {
                return mainPlayerData;
            }
        default:
            return state;
    }
}