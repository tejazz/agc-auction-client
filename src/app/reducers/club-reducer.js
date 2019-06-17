import { FETCH_ALL_CLUBS } from '../actions';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_ALL_CLUBS:
            return action.payload;
        default:
            return state;
    }
}