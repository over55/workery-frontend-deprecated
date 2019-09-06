import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import BulletinBoardItemDeleteComponent from "../../../../components/settings/bulletinBoardItems/delete/bulletinBoardItemDeleteComponent";
import { setFlashMessage } from "../../../../actions/flashMessageActions";
import { pullBulletinBoardItemDetail, deleteBulletinBoardItemDetail } from "../../../../actions/bulletinBoardItemActions";


class BulletinBoardItemDeleteContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { id } = this.props.match.params;

        // Update state.
        this.state = {
            id: id,
            isLoading: false,
        }

        this.onBack = this.onBack.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
        this.onRetrieveSuccessCallback = this.onRetrieveSuccessCallback.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

     componentDidMount() {
         window.scrollTo(0, 0);  // Start the page at the top of the page.
         this.props.pullBulletinBoardItemDetail(this.state.id, this.onRetrieveSuccessCallback);
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

    onSuccessfulSubmissionCallback(profile) {
        this.setState({ errors: {}, isLoading: true, })
        this.props.setFlashMessage("success", "Office news has been successfully deleted.");
        this.props.history.push("/settings/bulletin-board-items");
    }

    onFailedSubmissionCallback(errors) {
        this.setState({
            errors: errors
        })

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    onRetrieveSuccessCallback(bbi) {
        this.setState({ text: bbi.text });
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onBack(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();
        this.props.history.push("/settings/bulletin-board-items/");
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();
        this.setState({ errors: {}, isLoading: true, }, ()=>{
            this.props.deleteBulletinBoardItemDetail(
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
        return (
            <BulletinBoardItemDeleteComponent
                text={this.state.text}
                isLoading={this.state.isLoading}
                onBack={this.onBack}
                onClick={this.onClick}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
        pullBulletinBoardItemDetail: (bbiId, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullBulletinBoardItemDetail(bbiId, onSuccessCallback, onFailureCallback)
            )
        },
        deleteBulletinBoardItemDetail: (bbiId, onSuccessCallback, onFailureCallback) => {
            dispatch(
                deleteBulletinBoardItemDetail(bbiId, onSuccessCallback, onFailureCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BulletinBoardItemDeleteContainer);
