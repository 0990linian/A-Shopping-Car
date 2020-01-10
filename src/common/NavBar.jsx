import React, {Component} from "react"
import {POST_LIST_URL, FORM_URL, HOME_URL} from "./Constants";
import {Link} from "react-router-dom";

class NavBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            linkProps: [
                {id: 1, linkName: "Form", linkUrl: FORM_URL},
                {id: 2, linkName: "Posts", linkUrl: POST_LIST_URL}
            ]
        }
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <Link className="navbar-brand ml-lg-4" to={HOME_URL}>
                        Shopping Car
                        <span className="badge m-2 badge-light badge-pill">{this.props.activeNumbers()}</span>
                    </Link>
                    <ul className="navbar-nav ml-lg-5">
                        {this.state.linkProps.map(({id, linkName, linkUrl}) =>
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
}

export default NavBar
