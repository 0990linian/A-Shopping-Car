import React from "react"
import {connect} from "react-redux"
import {postNumSelector, recordNumberOfPostsShown} from "./PostReducer"
import {useFormInput} from "../common/utils"

const mapStateToProps = state => {
    return {
        postNumDefault: postNumSelector(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        recordPostNum: num => dispatch(recordNumberOfPostsShown(num))
    }
}

const PostNumInput = ({
                          postNumDefault,
                          recordPostNum
                      }) => {
    const {input: postNum, setInput: setPostNum, handleChange: handlePostNumChange} = useFormInput(postNumDefault)

    const handleSubmitPostNumInput = e => {
        e.preventDefault()
        recordPostNum(postNum)
        setPostNum("")
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmitPostNumInput}>
                <h3>
                    <br/>
                    Number of posts shown:
                    <input
                        type="number"
                        value={postNum}
                        onChange={handlePostNumChange}
                    />
                </h3>
            </form>
        </div>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostNumInput)
