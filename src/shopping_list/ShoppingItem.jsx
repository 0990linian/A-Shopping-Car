import React, {Component} from "react"
import {
    SHOPPING_LIST_DECREASE_ACTION,
    SHOPPING_LIST_DELETE_ACTION,
    SHOPPING_LIST_INCREASE_ACTION,
    ITEM_MAX_NUMBER
} from "../common/Constants"
import {connect} from "react-redux"

class ShoppingItem extends Component {
    decideCount = () => {
        return this.props.item.value === 0 ? "Zero" : this.props.item.value
    }

    badgeColor = () => {
        let style = "badge m-3 ml-4 badge-"
        style += this.props.item.value === 0 ? "warning" : "primary"
        return style
    }

    warningColor = () => {
        let style = "badge m-2 badge-"
        style += this.props.item.value > ITEM_MAX_NUMBER ? "danger" : "light"
        return style
    }

    warningOrNot = () => {
        return this.props.item.value > ITEM_MAX_NUMBER ? "Max " + ITEM_MAX_NUMBER + "!" : ""
    }

    render() {
        return (
            <div>
                <span className="badge badge-pill m-3 mr-5 badge-info">{this.props.item.item}</span>

                <button
                    type="button"
                    onClick={() => this.props.onIncrease(this.props.id)}
                    className="btn btn-secondary btn-sm m-2"
                >
                    Increase
                </button>

                <span className={this.badgeColor()}>{this.decideCount()}</span>

                <button
                    type="button"
                    onClick={() => this.props.onDecrease(this.props.id)}
                    className="btn btn-secondary btn-sm m-2"
                >
                    Decrease
                </button>

                <button
                    type="button"
                    onClick={() => this.props.onDelete(this.props.id)}
                    className="btn btn-danger btn-sm m-2"
                >
                    Delete
                </button>

                <span className={this.warningColor()}>{this.warningOrNot()}</span>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        item: state.shoppingListState.shoppingList.find(item => item.id === ownProps.id)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIncrease: id => dispatch({type: SHOPPING_LIST_INCREASE_ACTION, id}),
        onDecrease: id => dispatch({type: SHOPPING_LIST_DECREASE_ACTION, id}),
        onDelete: id => dispatch({type: SHOPPING_LIST_DELETE_ACTION, id})
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShoppingItem)
