import {combineReducers} from "redux"
import navBarReducer from "./navBar/NavBarReducer"
import shoppingListReducer from "./shopping_list/ShoppingListReducer"
import postReducer from "./posts/PostReducer"

const rootReducer = combineReducers({
    navBarState: navBarReducer,
    shoppingListState: shoppingListReducer,
    postState: postReducer
})

export default rootReducer
