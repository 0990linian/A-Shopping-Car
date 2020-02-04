import {
    SHOPPING_LIST_ADD_ITEM_ACTION,
    SHOPPING_LIST_DECREASE_ACTION,
    SHOPPING_LIST_DELETE_ACTION,
    SHOPPING_LIST_INCREASE_ACTION,
    SHOPPING_LIST_RESET_ACTION
} from "../common/Constants"
import {createSelector} from "reselect"
import {createAction, handleActions} from "redux-actions";

const initialState = {
    shoppingList: [
        {id: 1, item: "Apple", value: 0},
        {id: 2, item: "Banana", value: 0},
        {id: 3, item: "Orange", value: 0},
        {id: 4, item: "Grapes", value: 0}
    ]
}

export const shoppingListStateSelector = state => state.shoppingListState

export const shoppingListSelector = createSelector(
    shoppingListStateSelector,
    shoppingListState => shoppingListState.shoppingList
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

const shoppingListItemValueIncreaseDecrease = (shoppingList, itemId, increase) => {
    let itemIndex = shoppingList.findIndex(item => item.id === itemId),
        itemToChange = {...shoppingList[itemIndex]}
    if (increase) {
        itemToChange.value += 1
    } else if (itemToChange.value > 0) {
        itemToChange.value -= 1
    }
    shoppingList.splice(itemIndex, 1, itemToChange)
    return shoppingList
}

const findShoppingListValidId = (state) => {
    const length = state.shoppingList.length
    return length ? state.shoppingList[length - 1].id + 1 : 0
}

export const shoppingListItemIncreaseValue = createAction(
    SHOPPING_LIST_INCREASE_ACTION,
    () => {
    },
    itemId => ({itemId})
)

export const shoppingListItemDecreaseValue = createAction(
    SHOPPING_LIST_DECREASE_ACTION,
    () => {
    },
    itemId => ({itemId})
)

export const shoppingListDeleteItem = createAction(
    SHOPPING_LIST_DELETE_ACTION,
    () => {
    },
    itemId => ({itemId})
)

export const shoppingListReset = createAction(SHOPPING_LIST_RESET_ACTION)

export const shoppingListAddRandomItem = createAction(
    SHOPPING_LIST_ADD_ITEM_ACTION,
    () => {
    },
    () => ({item: "Random", value: 0})
)

export const shoppingListAddItem = createAction(
    SHOPPING_LIST_ADD_ITEM_ACTION,
    () => {
    },
    (item, value) => ({item, value})
)

const shoppingListReducer = handleActions(
    {
        [SHOPPING_LIST_INCREASE_ACTION]: (state, action) => ({
            ...state,
            shoppingList: shoppingListItemValueIncreaseDecrease([...state.shoppingList], action.meta.itemId, true)
        }),
        [SHOPPING_LIST_DECREASE_ACTION]: (state, action) => ({
            ...state,
            shoppingList: shoppingListItemValueIncreaseDecrease([...state.shoppingList], action.meta.itemId, false)
        }),
        [SHOPPING_LIST_DELETE_ACTION]: (state, action) => ({
            ...state,
            shoppingList: state.shoppingList.filter(item => item.id !== action.meta.itemId)
        }),
        [SHOPPING_LIST_RESET_ACTION]: state => {
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
        },
        [SHOPPING_LIST_ADD_ITEM_ACTION]: (state, action) => {
            const validId = findShoppingListValidId(state)
            const newItem = {id: validId, item: action.meta.item, value: action.meta.value}
            return {
                ...state,
                shoppingList: [...state.shoppingList, newItem]
            }
        }
    },
    initialState
)

export default shoppingListReducer
