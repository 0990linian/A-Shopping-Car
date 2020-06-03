import { useState } from "react"

export const getRandomTextColor = () => {
    const colors = ["warning", "primary", "secondary", "success", "danger", "info", "dark", "muted"]
    return "text-" + colors[Math.floor(Math.random() * colors.length)]
}

export const useFormInput = (initialValue) => {
    // setFunctions could also take function as argument, eg, setInput(prevState => prevState + 1), then input will be set to 1.
    const [input, setInput] = useState(initialValue);
    const handleChange = e => {
        setInput(e.target.value)
    }
    return {
        input,
        setInput,
        handleChange
    }
}

export const checkInputIsPositiveNumber = (input) => {
    // +var tests whether var only contains number, otherwise returns null. Eg, +"64yt" = null
    // using isNaN() here is because if(0) returns false
    // parseInt(var) extracts leading numbers, otherwise returns null. Eg, parseInt("64yt") = 64
    if (input && input >= 0) {
        return true
    } else {
        alert("The input is not valid!")
        return false
    }
}

export const checkInputIsString = (input) => {
    if (input && input.length !== 0) {
        return true
    } else {
        alert("The input is not valid!")
        return false
    }
}
