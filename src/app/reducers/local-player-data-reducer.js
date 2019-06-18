import { FETCH_LOCAL_DATA, UPDATE_LOCAL_DATA } from '../actions';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_LOCAL_DATA:
            return action.payload;
        case UPDATE_LOCAL_DATA:
            return action.payload;
        default:
            return state;
    }
}