import React from "react"
import Counter from "./Counter"

const CounterList = (props) => {
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
                onClick={() => props.onAddItem({item: "Random", number: 0})}
            >
                Add Item
            </button>

            {props.counterList.length === 0 ?
                <h2>Really? You don't need anything?</h2> :
                props.counterList.map(
                    counter => <Counter
                        key={counter.id}
                        counter={counter}
                        onIncreaseDecrease={props.onIncreaseDecrease}
                        onDelete={props.onDelete}
                    />)
            }
        </div>
    )
}

export default CounterList
