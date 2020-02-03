import {FORM_URL, POST_LIST_URL} from "../common/Constants"
import {createSelector} from "reselect"

const initialState = {
    buttonProps: [
        {id: 1, linkName: "Form", linkUrl: FORM_URL},
        {id: 2, linkName: "Posts", linkUrl: POST_LIST_URL}
    ]
}

export const navBarStateSelector = state => state.navBarState

export const buttonPropsSelector = createSelector(
    navBarStateSelector,
    navBarState => navBarState.buttonProps
)

const navBarReducer = (state = initialState) => {
    return state
}

export default navBarReducer
