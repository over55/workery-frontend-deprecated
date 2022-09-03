import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';
import * as moment from 'moment';

import  AdminOrderCreateStep6Component from "../../../../components/orders/admin/create/adminOrderCreateStep6Component";
import { setFlashMessage } from "../../../../actions/flashMessageActions";
import {
    localStorageGetArrayItem, localStorageGetDateItem, localStorageGetIntegerItem, localStorageRemoveItemsContaining, localStorageGetBooleanOrNullItem
} from '../../../../helpers/localStorageUtility';
import { validateStep6CreateInput } from "../../../../validators/orderValidator";
import { postOrderDetail } from '../../../../actions/orderActions';


class  AdminOrderCreateStep6Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        this.state = {
            clientGivenId: localStorageGetIntegerItem("workery-create-order-clientId"),
            clientGivenName: localStorage.getItem("workery-create-order-clientGivenName"),
            clientLastName: localStorage.getItem("workery-create-order-clientLastName", ),
            startDate: localStorageGetDateItem("workery-create-order-startDate"),
            jobType: localStorageGetBooleanOrNullItem("workery-create-order-jobType"),
            jobTypeLabel: localStorage.getItem("workery-create-order-jobType-label"),
            homeSupport: localStorageGetIntegerItem("workery-create-order-homeSupport"),
            homeSupportLabel: localStorage.getItem("workery-create-order-homeSupport-label"),
            skillSets: localStorageGetArrayItem("workery-create-order-skillSets"),
            description: localStorage.getItem("workery-create-order-description"),
            tags: localStorageGetArrayItem("workery-create-order-tags"),
            comment: localStorage.getItem("workery-create-order-comment"),
            showModal: false,
        }

        this.getPostData = this.getPostData.bind(this);
        this.onSubmitClick = this.onSubmitClick.bind(this);
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
        this.onFailureCallback = this.onFailureCallback.bind(this);
        this.onShowModalClick = this.onShowModalClick.bind(this);
        this.onCloseModalClick = this.onCloseModalClick.bind(this);
        this.onAgreeModalClick = this.onAgreeModalClick.bind(this);
    }

    /**
     *  Utility function used to create the `postData` we will be submitting to
     *  the API; as a result, this function will structure some dictionary key
     *  items under different key names to support our API web-service's API.
     */
    getPostData() {
        let postData = Object.assign({}, this.state);

        // Refactored
        postData.IsHomeSupportService =  parseInt(this.state.homeSupport) === 1 ? true : false;
        postData.IsOngoing = this.state.jobType;

        // (1) Extra Comment: This field is required.
        if (this.state.comment === undefined || this.state.comment === null) {
            postData.extraComment = "";
        } else {
            postData.extraComment = this.state.comment;
        }

        // (2) Skill sets - We need to only return our `id` values.
        let ssPKs = [];
        for (let ss of this.state.skillSets) {
            ssPKs.push(ss.skillSetId);
        }
        postData.skillSets = ssPKs;

        // (3) Tag - We need to only return our `id` values.
        let tagPKs = [];
        for (let t of this.state.tags) {
            tagPKs.push(t.tagId);
        }
        postData.tags = tagPKs;

        // (4) Customer
        postData.customerId = this.state.clientGivenId

        // (5) Start date - We need to format as per required API format.
        if (this.state.startDate instanceof Date) {
            const startDateMoment = moment(this.state.startDate);
            postData.startDate = startDateMoment.format("YYYY-MM-DD")

        }

        // Finally: Return our new modified data.
        console.log("getPostData |", postData);
        return postData;
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
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

    onSuccessCallback(response) {
        console.log("onSuccessCallback | State (Pre-Fetch):", this.state);
        this.setState(
            {
                isLoading: false,
            },
            ()=>{
                console.log("onSuccessCallback | Fetched:",response); // For debugging purposes only.
                console.log("onSuccessCallback | State (Post-Fetch):", this.state);
                localStorageRemoveItemsContaining("workery-create-order-");
                this.props.history.push("/task/1/" + response.latestPendingTaskId + "/step-1");
            }
        )
    }

    onFailureCallback(errors) {
        this.setState({
            errors: errors,
            isLoading: false
        })

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onShowModalClick(e) {
        e.preventDefault();
        this.setState({
            showModal: true,
        })
    }

    onCloseModalClick(e) {
        e.preventDefault();
        this.setState({
            showModal: false
        })
    }

    onAgreeModalClick(e) {
        e.preventDefault();
        this.onSubmitClick(e);
    }

    onSubmitClick(e) {
        e.preventDefault();

        const { errors, isValid } = validateStep6CreateInput(this.state);
        // console.log(errors, isValid); // For debugging purposes only.

        if (isValid) {
            this.setState(
                { errors: errors, isLoading: true, },
                ()=>{
                    // Once our state has been validated `associate-side` then we will
                    // make an API request with the server to create our new production.
                    this.props.postOrderDetail(
                        this.getPostData(),
                        this.onSuccessCallback,
                        this.onFailureCallback
                    );
                }
            );
        } else {
            this.setState({
                errors: errors,
                isLoading: false,
            })

            // The following code will cause the screen to scroll to the top of
            // the page. Please see ``react-scroll`` for more information:
            // https://github.com/fisshy/react-scroll
            var scroll = Scroll.animateScroll;
            scroll.scrollToTop();
        }
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const {
            clientGivenName, clientLastName, startDate, jobTypeLabel, homeSupportLabel, skillSets, description, tags, comment, isLoading, errors, showModal,
        } = this.state;
        return (
            < AdminOrderCreateStep6Component
                clientGivenName={clientGivenName}
                clientLastName={clientLastName}
                startDate={startDate}
                skillSets={skillSets}
                jobTypeLabel={jobTypeLabel}
                homeSupportLabel={homeSupportLabel}
                description={description}
                tags={tags}
                comment={comment}
                isLoading={isLoading}
                errors={errors}
                onSubmitClick={this.onSubmitClick}
                showModal={showModal}
                onShowModalClick={this.onShowModalClick}
                onCloseModalClick={this.onCloseModalClick}
                onAgreeModalClick={this.onAgreeModalClick}
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
        postOrderDetail: (postData, successCallback, failedCallback) => {
            dispatch(postOrderDetail(postData, successCallback, failedCallback))
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)( AdminOrderCreateStep6Container);
