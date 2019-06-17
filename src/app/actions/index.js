import PlayerData from '../../mock-data/players.json';
import ClubData from '../../mock-data/clubs.json';

export const FETCH_ALL_PLAYERS = 'fetch_all_players';
export const FETCH_ALL_CLUBS = 'fetch_all_clubs';

export function fetchAllPlayers() {

    return {
        type: FETCH_ALL_PLAYERS,
        payload: PlayerData
    };
}

export function fetchAllClubs() {

    return {
        type: FETCH_ALL_CLUBS,
        payload: ClubData
    };
}