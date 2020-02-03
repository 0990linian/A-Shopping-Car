import React, {Component} from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {SHOPPING_LIST_ADD_ITEM_ACTION} from "../common/Constants"
import {checkInputIsPositiveNumber, checkInputIsString} from "../common/utils"
import {addItemFormFieldsSelector} from "./ShoppingListReducer"

class AddItemForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            item: "",
            value: ""
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        if (checkInputIsPositiveNumber(this.state.value) && checkInputIsString(this.state.item)) {
            this.props.addItem(this.state.item, parseInt(this.state.value))
            this.props.history.push("/redirect")
        }
        this.setState({
            item: "",
            number: ""
        })
    }

    render() {
        return (
            <div className="container">
                <br/>
                {/*onSubmit catches cases when user hits enter and click the submit button, only setting onClick event on submit button is not enough */}
                {/*By default, the page refresh when a form is submitted*/}
                <form onSubmit={this.handleSubmit}>
                    {this.props.formFields.map(({id, shownText, stateKey, textType}) =>
                        <h4 key={id}>
                            {shownText}:
                            <input
                                type={textType}
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

const mapStateToProps = state => {
    return {
        formFields: addItemFormFieldsSelector(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addItem: (item, value) => dispatch({
            type: SHOPPING_LIST_ADD_ITEM_ACTION,
            item,
            value
        })
    }
}

// withRouter, the higher order component. So props contains history to allow the redirection.
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(AddItemForm))
