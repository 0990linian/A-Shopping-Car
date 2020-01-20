import React from "react"
import {HOME_URL} from "./Constants";

const Redirect = (props) => {
    setTimeout(
        () => {
            props.history.push(HOME_URL)
        }, 2000)
    return (
        <h3 className="container text-primary">
            <br/>
            Please wait, you will be redirected to the home page in 2 seconds.
        </h3>
    )
}

export default Redirect
