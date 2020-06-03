import {
    RECORD_FULL_POST_LIST,
    RECORD_POST,
    RECORD_POST_NUMBER_SHOWN
} from "../common/Constants"
import {createSelector} from "reselect"
import {createAction, handleActions} from "redux-actions";

const initialState = {
    postNum: 10
}

export const postStateSelector = state => state.postState

export const postListSelector = createSelector(
    postStateSelector,
    postState => postState.postList
)

export const postNumSelector = createSelector(
    postStateSelector,
    postState => postState.postNum
)

export const postSelector = createSelector(
    postStateSelector,
    postState => postState.post
)

export const recordFullPostList = createAction(
    RECORD_FULL_POST_LIST,
    () => {},
    postList => ({postList})
)

export const recordSinglePost = createAction(
    RECORD_POST,
    () => {},
    post => ({post})
)

export const recordNumberOfPostsShown = createAction(
    RECORD_POST_NUMBER_SHOWN,
    () => {},
    numOfPostsShown => ({numOfPostsShown})
)

const postReducer = handleActions(
    {
        [RECORD_FULL_POST_LIST]: (state, action) => ({
            ...state,
            postList: action.meta.postList
        }),
        [RECORD_POST]: (state, action) => ({
            ...state,
            post: action.meta.post
        }),
        [RECORD_POST_NUMBER_SHOWN]: (state, action) => ({
            ...state,
            postNum: action.meta.numOfPostsShown
        })
    },
    initialState
)

export default postReducer
