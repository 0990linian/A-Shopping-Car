import React, { Component } from "react"
import {connect} from "react-redux"
import axios from "axios"
import {getRandomTextColor} from "../common/utils"
import {
    JSON_PLACEHOLDER_URL,
    POST_LIST_URL
} from "../common/Constants"
import {postSelector, recordSinglePost} from "./PostReducer"

class Post extends Component {
    componentDidMount() {
        axios.get(JSON_PLACEHOLDER_URL + POST_LIST_URL + "/" + this.props.match.params.postId)
            .then(response => this.props.recordPost(response.data))
    }

    createPost = () => {
        return this.props.post ? (
            <div className="container">
                <br/>
                <h5 className={getRandomTextColor()}>
                    {this.props.post.title}
                </h5>
                <p className={getRandomTextColor()}>
                    {this.props.post.body}
                </p>
            </div>
        ) : (
            <h2 className="container text-danger">
                <br/>
                Loading post ID: {this.props.match.params.postId}
            </h2>
        )
    }

    render() {
        return (
            this.createPost()
        )
    }

}

const mapStateToProps = state => {
    return {
        post: postSelector(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        recordPost: post => dispatch(recordSinglePost(post))
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Post)
