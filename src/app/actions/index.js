import PlayerData from '../../mock-data/players.json';
import ClubData from '../../mock-data/clubs.json';

export const FETCH_ALL_PLAYERS = 'fetch_all_players';
export const FETCH_ALL_CLUBS = 'fetch_all_clubs';
export const UPDATE_PLAYERS = 'update_players';
export const UPDATE_CLUB_DATA = 'update_club_data';
export const FETCH_LOCAL_DATA = 'fetch_local_data';
export const UPDATE_LOCAL_DATA = 'update_local_data';
export const SEARCH_PLAYERS = 'search_players';
export const FETCH_PLAYERS = 'fetch_players';
export const FILTER_PLAYERS = 'filter_players';

var mainPlayerData = PlayerData;

export function fetchAllPlayers(currIndex = 0) {
    let currentPlayerIndex;

    if (currIndex > 0) {
        currentPlayerIndex = currIndex;
    } 
    else if (!currIndex || currentPlayerIndex === 0) {
        currentPlayerIndex = 0;

        for(var i = 0; i < mainPlayerData.length; i++) {
           if (mainPlayerData[i].active === false) {
            mainPlayerData[i].active = true;
            mainPlayerData[i].soldPrice = 0;
            mainPlayerData[i].currentClub = "";
           }
        }
    } 
    else {
        for (let index = 0; index < mainPlayerData.length; index++) {
            if (mainPlayerData[index].active) {
                currentPlayerIndex = index;
                break;
            }
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
    let mainClubData = [];

    if (value === "all") {
        mainClubData = ClubData.map((club) => {
            club.selected = false;
            club.clubBudget = 400;
            club.players = [];
    
            return club;
        });
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

    localStorage.setItem("players", JSON.stringify(mainPlayerData));

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

    let clubAdded = currentBidClub;

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

export function fetchPlayers(playerData = []) {
    mainPlayerData = playerData;

    if (playerData.length === 0) {
        mainPlayerData = PlayerData;
    }

    return {
        type: FETCH_PLAYERS,
        payload: mainPlayerData
    };
}

export function filterPlayers(term) {

    return {
        type: FILTER_PLAYERS,
        payload: {
            term,
            mainPlayerData
        }
    };
}