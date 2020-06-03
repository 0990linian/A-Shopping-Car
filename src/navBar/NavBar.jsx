import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {HOME_URL} from "../common/Constants"
import {shoppingListActiveNumberSelector} from "../shopping_list/ShoppingListReducer"
import {buttonPropsSelector} from "./NavBarReducer"

const mapStateToProps = state => {
    return {
        activeNumbers: shoppingListActiveNumberSelector(state),
        buttonProps: buttonPropsSelector(state)
    }
}

const NavBar = props => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand ml-lg-4" to={HOME_URL}>
                    Shopping Car
                    <span className="badge m-2 badge-light badge-pill">{props.activeNumbers}</span>
                </Link>
                <ul className="navbar-nav ml-lg-5">
                    {props.buttonProps.map(({id, linkName, linkUrl}) =>
                        <li key={id} className="nav-item active">
                            <Link className="nav-link" to={linkUrl}>
                                {linkName}
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
        </div>
    )
}

export default connect(
    mapStateToProps,
    null
)(NavBar)
