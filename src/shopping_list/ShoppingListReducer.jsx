import {
    SHOPPING_LIST_ADD_ITEM_ACTION,
    SHOPPING_LIST_ADD_RANDOM_ACTION,
    SHOPPING_LIST_DECREASE_ACTION,
    SHOPPING_LIST_DELETE_ACTION,
    SHOPPING_LIST_INCREASE_ACTION,
    SHOPPING_LIST_RESET_ACTION
} from "../common/Constants"
import {createSelector} from "reselect"

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

export const shoppingListStateSelector = state => state.shoppingListState

export const shoppingListSelector = createSelector(
    shoppingListStateSelector,
    shoppingListState => shoppingListState.shoppingList
)

export const addItemFormFieldsSelector = createSelector(
    shoppingListStateSelector,
    shoppingListState => shoppingListState.addItemFormFields
)

export const getShoppingItemId = (state, ownProps) => ownProps.id

export const shoppingListItemSelector = createSelector(
    shoppingListSelector,
    getShoppingItemId,
    (shoppingList, id) => shoppingList.find(item => item.id === id)
)

export const shoppingListActiveNumberSelector = createSelector(
    shoppingListSelector,
    shoppingList => shoppingList.filter(counter => counter.value !== 0).length
)

const shoppingListItemValueIncreaseDecrease = (state, action, increase) => {
    let newShoppingList = [...state.shoppingList],
        itemIndex = newShoppingList.findIndex(item => item.id === action.id),
        itemToChange = {...newShoppingList[itemIndex]}
    if (increase) {
        itemToChange.value += 1
    } else if (itemToChange.value > 0) {
        itemToChange.value -= 1
    }
    newShoppingList.splice(itemIndex, 1, itemToChange)
    return newShoppingList
}

const findShoppingListValidId = (state) => {
    const length = state.shoppingList.length
    return length ? state.shoppingList[length - 1].id + 1 : 0
}

const shoppingListReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOPPING_LIST_INCREASE_ACTION: {
            return {
                ...state,
                shoppingList: shoppingListItemValueIncreaseDecrease(state, action, true)
            }
        }
        case SHOPPING_LIST_DECREASE_ACTION: {
            return {
                ...state,
                shoppingList: shoppingListItemValueIncreaseDecrease(state, action, false)
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
            const validId = findShoppingListValidId(state)
            const newItem = {id: validId, item: "Random", value: 0}
            return {
                ...state,
                shoppingList: [...state.shoppingList, newItem]
            }
        }
        case SHOPPING_LIST_ADD_ITEM_ACTION: {
            const validId = findShoppingListValidId(state)
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
