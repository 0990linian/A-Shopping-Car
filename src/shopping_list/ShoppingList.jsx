import React from "react"
import ShoppingItem from "./ShoppingItem"
import {connect} from "react-redux"
import {
    SHOPPING_LIST_ADD_RANDOM_ACTION,
    SHOPPING_LIST_RESET_ACTION
} from "../common/Constants"

const ShoppingList = props => {
    return (
        <div className="container">
            <button
                type="button"
                className="btn btn-success btn-lg m-3 ml-5 mt-4 mb-4"
                onClick={props.onReset}
            >
                Reset
            </button>

            <button
                type="button"
                className="btn btn-success btn-lg m-3 mt-4 mb-4"
                onClick={props.onAddRandom}
            >
                Add Item
            </button>

            {props.shoppingList.length === 0 ?
                <h2>Really? You don't need anything?</h2> :
                props.shoppingList.map(
                    item => <ShoppingItem
                        key={item.id}
                        id={item.id}
                    />)
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        shoppingList: state.shoppingListState.shoppingList
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onReset: () => dispatch({type: SHOPPING_LIST_RESET_ACTION}),
        onAddRandom: () => dispatch({type: SHOPPING_LIST_ADD_RANDOM_ACTION})
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShoppingList)
