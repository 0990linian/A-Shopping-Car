import React, {useEffect} from "react"
import {connect} from "react-redux"
import axios from "axios"
import {getRandomTextColor} from "../common/utils"
import {
    JSON_PLACEHOLDER_URL,
    POST_LIST_URL
} from "../common/Constants"
import {postSelector, recordSinglePost} from "./PostReducer"

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

const Post = ({
                  post,
                  recordPost,
                  match,
              }) => {
    useEffect(() => {
        axios.get(JSON_PLACEHOLDER_URL + POST_LIST_URL + "/" + match.params.postId)
            .then(response => recordPost(response.data))
        return () => {
            recordPost("")
        };
    }, [recordPost, match]);

    return post ? (
        <div className="container">
            <br/>
            <h5 className={getRandomTextColor()}>
                {post.title}
            </h5>
            <p className={getRandomTextColor()}>
                {post.body}
            </p>
        </div>
    ) : (
        <h2 className="container text-danger">
            <br/>
            Loading post ID: {match.params.postId}
        </h2>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Post)
