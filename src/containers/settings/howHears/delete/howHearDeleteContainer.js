import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import HowHearDeleteComponent from "../../../../components/settings/howHears/delete/howHearDeleteComponent";
import { setFlashMessage } from "../../../../actions/flashMessageActions";
import validateInput from "../../../../validators/howHearValidator";
import { pullHowHearDetail, deleteHowHearDetail } from "../../../../actions/howHearActions";


class HowHearDeleteContainer extends Component {
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
            sortNumber: "",
            isForAssociate: "",
            isForCustomer: "",
            isForPartner: "",
            isForStaff: "",
            errors: {},
            isLoading: false,
            id: parseInt(id),
        }

        this.onClick = this.onClick.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
        this.onHowHearFetchedCallback = this.onHowHearFetchedCallback.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
        this.props.pullHowHearDetail(this.state.id, this.onHowHearFetchedCallback)
    }

    componentWillUnmount() {
        // This code will fix the "ReactJS & Redux: Can't perform a React state
        // delete on an unmounted component" issue as explained in:
        // https://stackoverflow.com/a/53829700
        this.setState = (state,callback)=>{
            return;
        };
    }

    /**
     *  API callback functions
     *------------------------------------------------------------
     */

    onSuccessfulSubmissionCallback(howHear) {
        this.setState({ errors: {}, isLoading: true, })
        this.props.setFlashMessage("success", "How hear item has been successfully deleted.");
        this.props.history.push("/settings/how-hears");
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

    onHowHearFetchedCallback(howHearDetail) {
        console.log(howHearDetail);
        this.setState({
            text: howHearDetail.text,
            sortNumber: howHearDetail.sortNumber,
            isForAssociate: (howHearDetail.isForAssociate === true || howHearDetail.isForAssociate === "true") ? true : false,
            isForCustomer: (howHearDetail.isForCustomer === true || howHearDetail.isForCustomer === "true") ? true : false,
            isForPartner: (howHearDetail.isForPartner === true || howHearDetail.isForPartner === "true") ? true : false,
            isForStaff: (howHearDetail.isForStaff === true || howHearDetail.isForStaff === "true") ? true : false,
            isLoading: false,
            errors: {},
        });
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        this.setState({
            errors: [], isLoading: true,
        }, ()=>{
            this.props.deleteHowHearDetail(
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
        const { text, sortNumber, isForAssociate, isForCustomer, isForPartner, isForStaff, errors, isLoading } = this.state;
        return (
            <HowHearDeleteComponent
                text={text}
                sortNumber={sortNumber}
                isForAssociate={isForAssociate}
                isForCustomer={isForCustomer}
                isForPartner={isForPartner}
                isForStaff={isForStaff}
                errors={errors}
                onClick={this.onClick}
                isLoading={isLoading}
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
        pullHowHearDetail: (id, onSuccessCallback, onFailureCallback) => {
            dispatch(pullHowHearDetail(id, onSuccessCallback, onFailureCallback))
        },
        deleteHowHearDetail: (postData, successCallback, failedCallback) => {
            dispatch(deleteHowHearDetail(postData, successCallback, failedCallback))
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HowHearDeleteContainer);
