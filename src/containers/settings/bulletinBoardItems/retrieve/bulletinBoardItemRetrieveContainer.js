import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import BulletinBoardItemRetrieveComponent from "../../../../components/settings/bulletinBoardItems/retrieve/bulletinBoardItemRetrieveComponent";
import { setFlashMessage } from "../../../../actions/flashMessageActions";
import { pullBulletinBoardItemDetail } from "../../../../actions/bulletinBoardItemActions";


class BulletinBoardItemRetrieveContainer extends Component {
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
            createdAt: "",
            lastModifiedAt: "",
            lastModifiedBy: "",
            isLoading: false,
        }

        this.onBack = this.onBack.bind(this);
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
        this.props.setFlashMessage("success", "Office news has been successfully retrieved.");
        this.props.history.push("/settings/bulletin-board-items");
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

    onRetrieveSuccessCallback(bbi) {
        this.setState({
            text: bbi.text,
            createdAt: bbi.createdAt,
            createdBy: bbi.createdBy,
            lastModifiedAt: bbi.lastModifiedAt,
            lastModifiedBy: bbi.lastModifiedBy,
        });
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

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        return (
            <BulletinBoardItemRetrieveComponent
                text={this.state.text}
                createdAt={this.state.createdAt}
                createdBy={this.state.createdBy}
                lastModifiedAt={this.state.lastModifiedAt}
                lastModifiedBy={this.state.lastModifiedBy}
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
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BulletinBoardItemRetrieveContainer);
