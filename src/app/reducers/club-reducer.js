import { FETCH_ALL_CLUBS, UPDATE_CLUB_DATA, SEARCH_PLAYERS } from '../actions';

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_ALL_CLUBS:
            return action.payload;
        case UPDATE_CLUB_DATA:
            let { currentPlayer, clubData } = action.payload;

            clubData.map((club) => {
                if (club.club === currentPlayer.currentClub) {
                    club.players.push(currentPlayer);
                    club.clubBudget -= currentPlayer.soldPrice;
                }
            });

            return clubData;
        case SEARCH_PLAYERS:
            let filteredClubs = action.payload.clubs.filter((club) => { 
                return (club.club.toLowerCase()).indexOf(action.payload.term.toLowerCase()) !== -1;
            });

            return filteredClubs;
        default:
            return state;
    }
}