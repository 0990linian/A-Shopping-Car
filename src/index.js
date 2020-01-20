import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'
// Use Bootstrap as CSS style
import "bootstrap/dist/css/bootstrap.css"
import ShoppingCar from "./ShoppingCar"
import {createStore} from "redux"
import {Provider} from "react-redux"
import rootReducer from "./rootReducer"

const store = createStore(rootReducer)

ReactDOM.render(
    <Provider store={store}>
        <ShoppingCar/>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
