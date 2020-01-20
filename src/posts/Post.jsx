import React, { Component } from "react"
import {connect} from "react-redux"
import axios from "axios"
import {getRandomTextColor} from "../common/utils"
import {
    JSON_PLACEHOLDER_URL,
    POST_LIST_URL,
    RECORD_POST
} from "../common/Constants"

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
        post: state.postState.post
    }
}

const mapDispatchToProps = dispatch => {
    return {
        recordPost: post => dispatch({type: RECORD_POST, post})
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Post)
