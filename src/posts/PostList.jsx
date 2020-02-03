import React, {Component} from "react"
import {connect} from "react-redux"
import axios from "axios"
import {Link} from "react-router-dom"
import {getRandomTextColor} from "../common/utils"
import {
    JSON_PLACEHOLDER_URL,
    POST_LIST_URL,
    RECORD_FULL_POST_LIST,
    RECORD_POST_NUMBER_SHOWN
} from "../common/Constants"
import {postListSelector, postNumShownSelector} from "./PostReducer"

class PostList extends Component {
    constructor(props) {
        super(props)
        this.postNumShown = this.props.postNumShown
    }

    componentDidMount() {
        axios.get(JSON_PLACEHOLDER_URL + "/posts")
            .then(response => {
                this.props.recordFullPostList(response.data)
            })
    }

    createPosts = num => {
        return this.props.postList ? (
                parseInt(num) > 0 ? (
                    this.selectRandomPosts(num).map(post => {
                        return (
                            <div key={post.id}>
                                <br/>
                                <Link to={POST_LIST_URL + "/" + post.id}>
                                    <h5>
                                        {post.title}
                                    </h5>
                                </Link>
                                <p className={getRandomTextColor()}>
                                    {post.body}
                                </p>
                            </div>
                        )
                    })
                ) : (
                    <h2 className="container text-danger">
                        <br/>
                        Come on, you got to see some posts!
                    </h2>
                )
            ) :
            (
                <h2 className="container text-danger">
                    <br/>
                    Loading Posts
                </h2>
            )
    }

    selectRandomPosts = num => {
        const postListLength = this.props.postList.length
        num = Math.min(num, postListLength)
        let i = 0,
            randomNumList = [],
            fullNumList = [],
            randomPostList = []
        while (i < postListLength) {
            fullNumList.push(i)
            i++
        }
        i = 0
        while (i < num) {
            const randomIndex = Math.floor(Math.random() * fullNumList.length)
            const randomNum = fullNumList.splice(randomIndex, 1)
            randomNumList.push(randomNum[0])
            i++
        }
        for (const randomNum of randomNumList) {
            randomPostList.push(this.props.postList[randomNum])
        }
        return randomPostList
    }

    handleSubmitPostNumInput = e => {
        e.preventDefault()
        this.props.recordPostNumShown(this.postNumShown)
    }

    handleChangePostNumInput = e => {
        this.postNumShown = e.target.value
    }

    createPostNumberInputField = () => {
        return (
            <form onSubmit={this.handleSubmitPostNumInput}>
                <h3>
                    <br/>
                    Number of posts shown:
                    <input
                        type="number"
                        onChange={this.handleChangePostNumInput}
                    />
                </h3>
            </form>
        )

    }

    render() {
        return (
            <div className="container">
                {this.createPostNumberInputField()}
                {this.createPosts(this.props.postNumShown)}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        postList: postListSelector(state),
        postNumShown: postNumShownSelector(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        recordFullPostList: postList => dispatch({
            type: RECORD_FULL_POST_LIST,
            postList
        }),
        recordPostNumShown: num => dispatch({
            type: RECORD_POST_NUMBER_SHOWN,
            num
        })
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostList)
