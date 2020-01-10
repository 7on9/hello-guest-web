//reducer guest
import * as types from "../constvalues/ActionTypes";

let initialState = {
    mainTitle: "",
    liveViewTitle: "Chào mừng đại biểu!"
};

let titleReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.TITLE.LIVEVIEW:
            state = {
                ...state,
                liveViewTitle: action.payload.liveViewTitle
            }; 
            break;
        default:
            break;
    }
    return state
}
export default titleReducer;