import {combineReducers} from "redux"
import navBarReducer from "./common/NavBarReducer"
import shoppingListReducer from "./shopping_list/ShoppingListReducer"
import postReducer from "./posts/postReducer"

const rootReducer = combineReducers({
    navBarState: navBarReducer,
    shoppingListState: shoppingListReducer,
    postState: postReducer
})

export default rootReducer
