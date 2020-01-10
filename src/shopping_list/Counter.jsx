import React, { Component } from "react"
import {ITEM_MAX_NUMBER} from "../common/Constants";

class Counter extends Component {
    decideCount = () => {
        return this.props.counter.value === 0 ? "Zero": this.props.counter.value
    }

    badgeColor = () => {
        let style = "badge m-3 ml-4 badge-"
        style += this.props.counter.value === 0 ? "warning": "primary"
        return style
    }

    warningColor = () => {
        let style = "badge m-2 badge-"
        style += this.props.counter.value > ITEM_MAX_NUMBER ? "danger": "light"
        return style
    }

    warningOrNot = () => {
        return this.props.counter.value > ITEM_MAX_NUMBER ? "Max " + ITEM_MAX_NUMBER + "!": ""
    }

    render() {
        return (
            <div>
                <span className="badge badge-pill m-3 mr-5 badge-info">{this.props.counter.item}</span>

                <button
                    type="button"
                    onClick={ () => this.props.onIncreaseDecrease(this.props.counter, true)}
                    className="btn btn-secondary btn-sm m-2"
                >
                    Increase
                </button>

                <span className={this.badgeColor()}>{this.decideCount()}</span>

                <button
                    type="button"
                    onClick={ () => this.props.onIncreaseDecrease(this.props.counter, false)}
                    className="btn btn-secondary btn-sm m-2"
                >
                    Decrease
                </button>

                <button
                    type="button"
                    onClick={ () => this.props.onDelete(this.props.counter.id) }
                    className="btn btn-danger btn-sm m-2"
                >
                    Delete
                </button>

                <span className={this.warningColor()}>{this.warningOrNot()}</span>
            </div>
        )
    }
}

export default Counter
