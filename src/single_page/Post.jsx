import React, { Component } from "react"
import axios from "axios"
import {JSON_PLACEHOLDER_URL} from "../common/Constants";

class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            postId: null,
            post: null
        }
    }

    componentDidMount() {
        this.setState({
            postId: this.props.match.params.postId
        })
        axios.get(JSON_PLACEHOLDER_URL + "/posts/" + this.state.postId)
            .then(response => {
                this.setState({
                    post: response.data,
                })
            })
    }

    createPost = () => {
        return this.state.post ? (
            <div className="container">
                <h5>
                    {this.state.post.title}
                </h5>
                <p>
                    {this.state.post.body}
                </p>
            </div>
        ) : (
            <h2 className="container text-danger">
                <br/>
                No post for this post ID: {this.state.postId}
            </h2>
        )
    }

    render() {
        return (
            this.createPost()
        )
    }

}

export default Post
