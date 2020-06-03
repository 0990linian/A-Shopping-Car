import React, {useEffect, useRef} from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {checkInputIsPositiveNumber, checkInputIsString} from "../common/utils"
import {shoppingListAddItem} from "./ShoppingListReducer"
import {useFormInput} from "../common/utils"

const mapDispatchToProps = dispatch => {
    return {
        addItem: (item, value) => dispatch(shoppingListAddItem(item, value))
    }
}

const AddItemForm = ({
                         addItem,
                         history
                     }) => {
    const {input: item, setInput: setItem, handleChange: handleItemChange} = useFormInput("")
    const {input: value, setInput: setValue, handleChange: handleValueChange} = useFormInput("")
    const formFields = [
        {id: 1, label: "Item", textType: "text", value: item.value, onChange: handleItemChange},
        {id: 2, label: "Number", textType: "number", value: value.value, onChange: handleValueChange}
    ]

    // useRef returns a mutable ref object whose .current property is initialized to the initialValue argument.
    // useRef gives us the same ref object on every render, it exists for the full lifetime of the component.
    // If you pass a ref object to React with <div ref={myRef} />, React will set its .current property to the corresponding DOM node.
    const ref = useRef(null)
    // set focus need to be put into useEffect, because ref.current will not be assigned before the component renders.
    useEffect(() => {
        ref.current.focus()
    }, [ref])

    const handleSubmit = e => {
        /*By default, the page refresh when a form is submitted, we prevent it by setting e.preventDefault().*/
        e.preventDefault()
        if (checkInputIsPositiveNumber(value) && checkInputIsString(item)) {
            addItem(item, parseInt(value))
            history.push("/redirect")
            setItem("")
            setValue("")
        }
    }

    return (
        <div className="container">
            <br/>
            {/* onSubmit catches cases when user hits enter and click the submit button, only setting onClick event on submit button is not enough */}
            <form onSubmit={handleSubmit}>
                {formFields.map(({id, label, textType, value, onChange}) => {
                    let firstRef = id === 1 ? ref : null
                    return (
                        <h4 key={id}>
                            {label}:
                            <input
                                type={textType}
                                ref={firstRef}
                                onChange={onChange}
                                value={value}
                            />
                        </h4>
                    )}
                )}
                <button className="btn btn-primary btn-lg m-3">Add Fruit</button>
            </form>
        </div>
    )

}

// withRouter, the higher order component. So props contains history to allow the redirection.
export default connect(
    null,
    mapDispatchToProps
)(withRouter(AddItemForm))
