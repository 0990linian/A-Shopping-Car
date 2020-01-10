import React, {Component} from "react"
import NavBar from "./common/NavBar"
import CounterList from "./shopping_list/CounterList"
import Form from "./single_page/Form"
import Redirect from "./single_page/Redirect"
import PostList from "./single_page/PostList"
import Post from "./single_page/Post"
import {BrowserRouter, Route, Switch} from "react-router-dom"
import {FORM_URL, HOME_URL, POST_LIST_URL, REDIRECT_URL} from "./common/Constants"

class ShoppingCar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            counterList: [
                {id: 1, item: "Apple", value: 0},
                {id: 2, item: "Banana", value: 0},
                {id: 3, item: "Orange", value: 0},
                {id: 4, item: "Grapes", value: 0}
            ]
        }
    }

    // This function is called after a component is mounted.
    componentDidMount = () => {
        console.log("Shopping car mounted!")
    }

    // This function is called when a component has been updated, used to compare previous props/state with the current ones.
    componentDidUpdate(prevProps, prevState) {
        console.log({
            thisState: this.state.counterList,
            prevState: prevState.counterList
        })
    }

    onReset = () => {
        const counterList = this.state.counterList.map(counter => {
            counter.value = 0
            return counter
        })
        this.setState({counterList})
    }

    onAddItem = (itemProps) => {
        // +var tests whether var only contains number, otherwise returns null. Eg, +"64yt" = null
        // parseInt(var) extracts leading numbers, otherwise returns null. Eg, parseInt("64yt") = 64
        if (!this.checkAddItemInputIsValid(itemProps)) {
            return false
        }
        let counterList = this.state.counterList
        const maxId = counterList.length === 0 ? 0 : counterList[counterList.length - 1].id
        const newCounter = {id: maxId + 1, item: itemProps.item, value: parseInt(itemProps.number)}
        this.setState({
            counterList: [...counterList, newCounter]
        })
        return true
    }

    checkAddItemInputIsValid = ({item, number}) => {
        // +var tests whether var only contains number, otherwise returns null. Eg, +"64yt" = null
        // using isNaN() here is because if(0) returns false
        // parseInt(var) extracts leading numbers, otherwise returns null. Eg, parseInt("64yt") = 64
        if (!isNaN(+number) && item && item.length !== 0 && parseInt(number) >= 0) {
            return true
        } else {
            alert("The input is not valid!")
            return false
        }
    }

    onIncreaseDecrease = (counter, increase) => {
        const counterList = [...this.state.counterList]
        const index = this.state.counterList.indexOf(counter)
        counterList[index] = {...counter}
        if (increase) {
            counterList[index].value += 1
        } else if (counterList[index].value > 0) {
            counterList[index].value -= 1
        }
        this.setState({counterList})
    }

    onDelete = (id) => {
        const counterList = this.state.counterList.filter(counter => counter.id !== id)
        this.setState({counterList})
    }

    activeNumbers = () => {
        return this.state.counterList.filter(counter => counter.value !== 0).length
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    {/*Keep the navigation bar, but change content below when we navigate to another path*/}
                    <NavBar
                        activeNumbers={this.activeNumbers}
                    />
                    {/*Switch, for all Routed components included, match the current URL with them until finds one */}
                    {/*matched, then stop the match.  This is to make sure only one Route component is shown.*/}
                    <Switch>
                        <Route
                            // exact path, means the website only display CounterList at path "/", otherwise CounterList
                            // will display on all "/*" paths, since react thinks they are the subset of path "/"
                            exact path={HOME_URL}
                            // use render instead of component when you want to pass in props for the component
                            render={() => <CounterList
                                onReset={this.onReset}
                                onAddItem={this.onAddItem}
                                onIncreaseDecrease={this.onIncreaseDecrease}
                                onDelete={this.onDelete}
                                counterList={this.state.counterList}
                            />}
                        />
                        <Route
                            path={FORM_URL}
                            render={() => <Form
                                onAddItem={this.onAddItem}
                            />}
                        />
                        <Route
                            path={REDIRECT_URL}
                            component={Redirect}
                        />
                        <Route
                            exact path={POST_LIST_URL}
                            component={PostList}
                        />
                        <Route
                            path={POST_LIST_URL + "/:postId"}
                            component={Post}
                        />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default ShoppingCar
