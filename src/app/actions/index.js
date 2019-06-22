import PlayerData from '../../mock-data/players.json';
import ClubData from '../../mock-data/clubs.json';

export const FETCH_ALL_PLAYERS = 'fetch_all_players';
export const FETCH_ALL_CLUBS = 'fetch_all_clubs';
export const UPDATE_PLAYERS = 'update_players';
export const UPDATE_CLUB_DATA = 'update_club_data';
export const FETCH_LOCAL_DATA = 'fetch_local_data';
export const UPDATE_LOCAL_DATA = 'update_local_data';
export const SEARCH_PLAYERS = 'search_players';

var mainPlayerData = PlayerData;

export function fetchAllPlayers() {
    let currentPlayerIndex = 0;

    for (let index = 0; index < mainPlayerData.length; index++) {
        if (mainPlayerData[index].active) {
            currentPlayerIndex = index;
            break;
        }
    }

    return {
        type: FETCH_ALL_PLAYERS,
        payload: {
            currentPlayer: mainPlayerData[currentPlayerIndex],
            currentPlayerIndex: currentPlayerIndex,
            nextPlayers: mainPlayerData.slice(currentPlayerIndex + 1, currentPlayerIndex + 6)
        }
    };
}

export function fetchAllClubs(value, clubs) {
    let mainClubData = ClubData;

    // mock data included (needs refactoring)
    if (value == "some") {
        mainClubData = ClubData.slice(0, 20);
    } else if (value === "all") {
        mainClubData = ClubData;
    } else {
        mainClubData = clubs;
    }  

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

export function updateCurrentPlayer(currentPlayerIndex, startNextIndex) {

    return {
        type: UPDATE_PLAYERS,
        payload: {
            currentPlayer: mainPlayerData[currentPlayerIndex + 1],
            currentPlayerIndex: currentPlayerIndex + 1,
            nextPlayers: mainPlayerData.slice(startNextIndex + 1, startNextIndex + 6)
        }
    };
}

export function fetchLocalPlayerData(currentPlayerIndex, currentBidClub) {

    let clubAdded = (currentBidClub === "") ? "FC Barcelona" : currentBidClub;

    return {
        type: FETCH_LOCAL_DATA,
        payload: {
            currentPlayerValue: mainPlayerData[currentPlayerIndex].basePrice,
            currentBidClub: clubAdded
        }
    };
}

export function updateLocalPlayerData(currentPlayerValue, currentBidClub, startNextIndex) {

    return {
        type: UPDATE_LOCAL_DATA,
        payload: {
            currentPlayerValue,
            currentBidClub
        }
    };
}

export function searchClubs(term) {

    return {
        type: SEARCH_PLAYERS,
        payload: {
            term,
            clubs: ClubData
        }
    };
}