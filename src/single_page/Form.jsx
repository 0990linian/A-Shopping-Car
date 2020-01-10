import React, {Component} from "react"
import {withRouter} from "react-router-dom"

class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            item: "",
            number: ""
        }
        this.form = [
            {id: 1, shownText: "Fruit", stateKey: "item"},
            {id: 2, shownText: "Number", stateKey: "number"}
        ]
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.setState({
            item: "",
            number: ""
        })
        if (this.props.onAddItem(this.state)) {
            // Redirect the page to "/redirect"
            this.props.history.push("/redirect")
        }
    }

    render() {
        return (
            <div className="container">
                <br/>
                {/*onSubmit catches cases when user hits enter and click the submit button, only setting onClick event on submit button is not enough */}
                {/*By default, the page refresh when a form is submitted*/}
                <form onSubmit={this.handleSubmit}>
                    {this.form.map(({id, shownText, stateKey}) =>
                        <h4 key={id}>
                            {shownText}:
                            <input
                                type="text"
                                id={stateKey}
                                onChange={this.handleChange}
                                value={this.state[stateKey]}
                            />
                        </h4>
                    )}
                    <button className="btn btn-primary btn-lg m-3">Add Fruit</button>
                </form>
            </div>
        )
    }
}

// withRouter, the higher order component. So props contains history to allow the redirection.
export default withRouter(Form)
