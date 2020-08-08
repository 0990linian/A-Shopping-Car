import React, {useEffect, useState} from "react"
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
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios.get(JSON_PLACEHOLDER_URL + POST_LIST_URL + "/" + match.params.postId)
            .then(response => {
                console.log(response)
                recordPost(response.data)
                setIsLoading(false)
            })
            .catch(() => setIsError(true))
        return () => {
            recordPost("")
        };
    }, [recordPost, match]);

    if (isError) {
        return (
            <h2 className="container text-danger">
                <br/>
                Error occurred, please check
            </h2>
        )
    } else if (isLoading) {
        return (
            <h2 className="container text-info">
                <br/>
                Loading post ID: {match.params.postId}
            </h2>
        )
    } else {
        return (
            <div className="container">
                <br/>
                <h5 className={getRandomTextColor()}>
                    {post.title}
                </h5>
                <p className={getRandomTextColor()}>
                    {post.body}
                </p>
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Post)
