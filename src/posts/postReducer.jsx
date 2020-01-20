import {
    RECORD_FULL_POST_LIST,
    RECORD_POST,
    RECORD_POST_NUMBER_SHOWN
} from "../common/Constants"

const initialState = {
    postNumShown: 10
}

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECORD_FULL_POST_LIST: {
            return {
                ...state,
                postList: action.postList
            }
        }
        case RECORD_POST: {
            return {
                ...state,
                post: action.post
            }
        }
        case RECORD_POST_NUMBER_SHOWN: {
            return {
                ...state,
                postNumShown: action.num
            }
        }
        default: {
            return state
        }
    }
}

export default postReducer
