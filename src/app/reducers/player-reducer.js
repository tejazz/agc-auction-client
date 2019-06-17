import { FETCH_ALL_PLAYERS } from '../actions';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_ALL_PLAYERS:
            return action.payload;
        default:
            return state;
    }
}