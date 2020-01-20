import {FORM_URL, POST_LIST_URL} from "./Constants"

const initialState = {
    buttonProps: [
        {id: 1, linkName: "Form", linkUrl: FORM_URL},
        {id: 2, linkName: "Posts", linkUrl: POST_LIST_URL}
    ]
}

const navBarReducer = (state = initialState) => {
    return state
}

export default navBarReducer
