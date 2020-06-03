import React from "react"
import {ITEM_MAX_NUMBER} from "../common/Constants"
import {connect} from "react-redux"
import {
    shoppingListDeleteItem,
    shoppingListItemDecreaseValue,
    shoppingListItemIncreaseValue,
    shoppingListItemSelector
} from "./ShoppingListReducer"

const mapStateToProps = (state, ownProps) => {
    return {
        item: shoppingListItemSelector(state, ownProps)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIncrease: id => dispatch(shoppingListItemIncreaseValue(id)),
        onDecrease: id => dispatch(shoppingListItemDecreaseValue(id)),
        onDelete: id => dispatch(shoppingListDeleteItem(id))
    }
}

const ShoppingItem = ({
                          id,
                          item,
                          onIncrease,
                          onDecrease,
                          onDelete
                      }) => {
    const decideCount = () => {
        return item.value === 0 ? "Zero" : item.value
    }

    const badgeColor = () => {
        let style = "badge m-3 ml-4 badge-"
        style += item.value === 0 ? "warning" : "primary"
        return style
    }

    const warningColor = () => {
        let style = "badge m-2 badge-"
        style += item.value > ITEM_MAX_NUMBER ? "danger" : "light"
        return style
    }

    const warningOrNot = () => {
        return item.value > ITEM_MAX_NUMBER ? "Max " + ITEM_MAX_NUMBER + "!" : ""
    }

    return (
        <div>
            <span className="badge badge-pill m-3 mr-5 badge-info">{item.item}</span>

            <button
                type="button"
                onClick={() => onIncrease(id)}
                className="btn btn-secondary btn-sm m-2"
            >
                Increase
            </button>

            <span className={badgeColor()}>{decideCount()}</span>

            <button
                type="button"
                onClick={() => onDecrease(id)}
                className="btn btn-secondary btn-sm m-2"
            >
                Decrease
            </button>

            <button
                type="button"
                onClick={() => onDelete(id)}
                className="btn btn-danger btn-sm m-2"
            >
                Delete
            </button>

            <span className={warningColor()}>{warningOrNot()}</span>
        </div>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShoppingItem)
