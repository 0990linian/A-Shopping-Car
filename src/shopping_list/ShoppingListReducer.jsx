import {
    SHOPPING_LIST_INCREASE_ACTION,
    SHOPPING_LIST_DECREASE_ACTION,
    SHOPPING_LIST_DELETE_ACTION,
    SHOPPING_LIST_RESET_ACTION,
    SHOPPING_LIST_ADD_RANDOM_ACTION, SHOPPING_LIST_ADD_ITEM_ACTION
} from "../common/Constants";

const initialState = {
    shoppingList: [
        {id: 1, item: "Apple", value: 0},
        {id: 2, item: "Banana", value: 0},
        {id: 3, item: "Orange", value: 0},
        {id: 4, item: "Grapes", value: 0}
    ],
    addItemFormFields: [
        {id: 1, shownText: "Item", stateKey: "item", textType: "text"},
        {id: 2, shownText: "Number", stateKey: "value", textType: "number"}
    ]
}

const shoppingListReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOPPING_LIST_INCREASE_ACTION: {
            let newShoppingList = [...state.shoppingList],
                itemIndex = newShoppingList.findIndex(item => item.id === action.id),
                itemToChange = {...newShoppingList[itemIndex]}
            itemToChange.value += 1
            newShoppingList.splice(itemIndex, 1, itemToChange)
            return {
                ...state,
                shoppingList: [...newShoppingList]
            }
        }
        case SHOPPING_LIST_DECREASE_ACTION: {
            let newShoppingList = [...state.shoppingList],
                itemIndex = newShoppingList.findIndex(item => item.id === action.id),
                itemToChange = {...newShoppingList[itemIndex]}
            if (itemToChange.value > 0) {
                itemToChange.value -= 1
            }
            newShoppingList.splice(itemIndex, 1, itemToChange)
            return {
                ...state,
                shoppingList: [...newShoppingList]
            }
        }
        case SHOPPING_LIST_DELETE_ACTION: {
            const shoppingListOther = state.shoppingList.filter(item => item.id !== action.id)
            return {
                ...state,
                shoppingList: shoppingListOther
            }
        }
        case SHOPPING_LIST_RESET_ACTION: {
            let oldShoppingList = [...state.shoppingList],
                newShoppingList = []
            for (let item of oldShoppingList) {
                item.value = 0
                newShoppingList.push({...item})
            }
            return {
                ...state,
                shoppingList: newShoppingList
            }
        }
        case SHOPPING_LIST_ADD_RANDOM_ACTION: {
            const length = state.shoppingList.length
            const validId = length ? state.shoppingList[length - 1].id + 1 : 0
            const newItem = {id: validId, item: "Random", value: 0}
            return {
                ...state,
                shoppingList: [...state.shoppingList, newItem]
            }
        }
        case SHOPPING_LIST_ADD_ITEM_ACTION: {
            const length = state.shoppingList.length
            const validId = length ? state.shoppingList[length - 1].id + 1 : 0
            const newItem = {id: validId, item: action.item, value: action.value}
            return {
                ...state,
                shoppingList: [...state.shoppingList, newItem]
            }
        }
        default: {
            return state
        }
    }
}

export default shoppingListReducer
