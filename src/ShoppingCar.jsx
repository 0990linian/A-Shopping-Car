import React from "react"
import NavBar from "./navBar/NavBar"
import ShoppingList from "./shopping_list/ShoppingList"
import AddItemForm from "./shopping_list/AddItemForm"
import Redirect from "./common/Redirect"
import PostList from "./posts/PostList"
import Post from "./posts/Post"
import {BrowserRouter, Route, Switch} from "react-router-dom"
import {FORM_URL, HOME_URL, POST_LIST_URL, REDIRECT_URL} from "./common/Constants"

const ShoppingCar = () => {
    return (
        <BrowserRouter>
            <div>
                {/*Keep the navigation bar, but change content below when we navigate to another path*/}
                <NavBar/>
                {/*Switch, for all Routed components included, match the current URL with them until finds one */}
                {/*matched, then stop the match.  This is to make sure only one Route component is shown.*/}
                <Switch>
                    <Route
                        // exact path, means the website only display CounterList at path "/", otherwise CounterList
                        // will display on all "/*" paths, since react thinks they are the subset of path "/"
                        exact path={HOME_URL}
                        component={ShoppingList}
                    />
                    <Route
                        path={FORM_URL}
                        component={AddItemForm}
                    />
                    <Route
                        path={REDIRECT_URL}
                        component={Redirect}
                    />
                    <Route
                        exact path={POST_LIST_URL}
                        component={PostList}
                    />
                    <Route
                        path={POST_LIST_URL + "/:postId"}
                        component={Post}
                    />
                </Switch>
            </div>
        </BrowserRouter>
    )

}

export default ShoppingCar
