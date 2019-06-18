import PlayerData from '../../mock-data/players.json';
import ClubData from '../../mock-data/clubs.json';

export const FETCH_ALL_PLAYERS = 'fetch_all_players';
export const FETCH_ALL_CLUBS = 'fetch_all_clubs';
export const UPDATE_PLAYERS = 'update_players';
export const UPDATE_CLUB_DATA = 'update_club_data';
export const FETCH_LOCAL_DATA = 'fetch_local_data';
export const UPDATE_LOCAL_DATA = 'update_local_data';

var mainPlayerData = PlayerData;
var mainClubData = ClubData.slice(0, 20);

export function fetchAllPlayers() {

    return {
        type: FETCH_ALL_PLAYERS,
        payload: {
            currentPlayer: mainPlayerData[0],
            currentPlayerIndex: 0,
            nextPlayers: mainPlayerData.slice(1, 6)
        }
    };
}

export function fetchAllClubs() {

    return {
        type: FETCH_ALL_CLUBS,
        payload: mainClubData
    };
}

export function updateClubData(currentPlayer, clubData) {

    return {
        type: UPDATE_CLUB_DATA,
        payload: {
            currentPlayer,
            clubData
        }
    };
}

export function updateCurrentPlayer(currentPlayerIndex) {

    return {
        type: UPDATE_PLAYERS,
        payload: {
            currentPlayer: mainPlayerData[currentPlayerIndex + 1],
            currentPlayerIndex: currentPlayerIndex + 1,
            nextPlayers: mainPlayerData.slice(currentPlayerIndex + 1, currentPlayerIndex + 6)
        }
    };
}

export function fetchLocalPlayerData(currentPlayerIndex) {

    return {
        type: FETCH_LOCAL_DATA,
        payload: {
            currentPlayerValue: mainPlayerData[currentPlayerIndex].basePrice,
            currentBidClub: mainClubData[0].club
        }
    };
}

export function updateLocalPlayerData(currentPlayerValue, currentBidClub) {

    return {
        type: UPDATE_LOCAL_DATA,
        payload: {
            currentPlayerValue,
            currentBidClub
        }
    };
}