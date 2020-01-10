import React, {Component} from "react"
import axios from "axios"
import {Link} from "react-router-dom"
import { JSON_PLACEHOLDER_URL } from "../common/Constants";

class PostList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            postList: []
        }
    }

    componentDidMount() {
        console.log(this.props)
        axios.get(JSON_PLACEHOLDER_URL + "/posts")
            .then(response => {
                this.setState({
                    postList: response.data
                })
            })
    }

    createPosts = (num) => {
        const postList = this.state.postList
        return postList.length ? (
            this.selectRandomPosts(num).map(post => {
                return (
                    <div key={post.id}>
                        <br/>
                        <Link to={"/" + post.id}>
                            <h5>
                                {post.title}
                            </h5>
                        </Link>
                        <p className={this.getRandomTextColor()}>
                            {post.body}
                        </p>
                    </div>
                )
            })
        ) : (
            <h2 className="container text-danger">
                <br/>
                No posts yet
            </h2>
        )
    }

    selectRandomPosts = (num) => {
        // TODO: Some posts may have the same id, take care of that. It also prevents another shuffle when press Posts when error occurs, don't know why
        let i = 0,
            postList = []
        while (i < num) {
            const randomNumber = Math.floor(Math.random() * this.state.postList.length)
            postList.push(this.state.postList[randomNumber])
            i++
        }
        return postList
    }

    getRandomTextColor = () => {
        const colors = ["warning", "primary", "secondary", "success", "danger", "info", "dark", "muted"]
        return "text-" + colors[Math.floor(Math.random() * colors.length)]
    }

    render() {
        return (
            <div className="container">
                {this.createPosts(10)}
            </div>
        )
    }
}

export default PostList
