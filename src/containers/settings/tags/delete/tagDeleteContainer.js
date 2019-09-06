import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import TagDeleteComponent from "../../../../components/settings/tags/delete/tagDeleteComponent";
import { setFlashMessage } from "../../../../actions/flashMessageActions";
import { pullTagDetail, deleteTagDetail } from "../../../../actions/tagActions";


class TagDeleteContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { id } = this.props.match.params;

        this.state = {
            text: "",
            description: "",
            errors: {},
            isLoading: false,
            id: parseInt(id),
        }

        this.onBack = this.onBack.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
        this.onTagFetchedCallback = this.onTagFetchedCallback.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
        this.props.pullTagDetail(this.state.id, this.onTagFetchedCallback)
    }

    componentWillUnmount() {
        // This code will fix the "ReactJS & Redux: Can't perform a React state
        // update on an unmounted component" issue as explained in:
        // https://stackoverflow.com/a/53829700
        this.setState = (state,callback)=>{
            return;
        };
    }

    /**
     *  API callback functions
     *------------------------------------------------------------
     */

    onSuccessfulSubmissionCallback(tag) {
        this.setState({ errors: {}, isLoading: true, })
        this.props.setFlashMessage("success", "Tag has been successfully deleted.");
        this.props.history.push("/settings/tags");
    }

    onFailedSubmissionCallback(errors) {
        this.setState({
            errors: errors, isLoading: false,
        })

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    onTagFetchedCallback(tagDetail) {
        this.setState({
            text: tagDetail.text,
            description: tagDetail.description,
            isLoading: false,
        });
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onBack(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();
        this.props.history.push("/settings/tags/");
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();
        this.setState({
            errors: [], isLoading: true,
        }, ()=>{
            this.props.deleteTagDetail(
                this.state.id,
                this.onSuccessfulSubmissionCallback,
                this.onFailedSubmissionCallback
            );
        });
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { text, description, errors, isLoading } = this.state;
        return (
            <TagDeleteComponent
                text={text}
                description={description}
                errors={errors}
                onBack={this.onBack}
                onClick={this.onClick}
                isLoading={isLoading}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        flashMessage: store.flashMessageState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
        pullTagDetail: (id, onSuccessCallback, onFailureCallback) => {
            dispatch(pullTagDetail(id, onSuccessCallback, onFailureCallback))
        },
        deleteTagDetail: (id, successCallback, failedCallback) => {
            dispatch(deleteTagDetail(id, successCallback, failedCallback))
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TagDeleteContainer);
