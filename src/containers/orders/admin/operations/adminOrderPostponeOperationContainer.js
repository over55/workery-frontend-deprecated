import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';
import * as moment from 'moment';

import AdminOrderReopenOperationComponent from "../../../../components/orders/admin/operations/adminOrderPostponeOperationComponent";
import { setFlashMessage } from "../../../../actions/flashMessageActions";
import { validatePostponeInput } from "../../../../validators/orderValidator";
import {
    RESIDENCE_TYPE_OF, BUSINESS_TYPE_OF, COMMUNITY_CARES_TYPE_OF, BASIC_STREET_TYPE_CHOICES, STREET_DIRECTION_CHOICES
} from '../../../../constants/api';
import { postOrderPostpone } from "../../../../actions/orderActions";


class AdminOrderPostponeOperationContainer extends Component {
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
            errors: {},
            isLoading: false,
            id: parseInt(id),
            reason: "",
            reasonOther: "",
            startDate: "",
            comment: "",
        }

        this.getPostData = this.getPostData.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onStartDateTimeChange = this.onStartDateTimeChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
    }

    /**
     *  Utility function used to create the `postData` we will be submitting to
     *  the API; as a result, this function will structure some dictionary key
     *  items under different key names to support our API web-service's API.
     */
    getPostData() {
        let postData = Object.assign({}, this.state);

        postData.job = this.state.id;
        postData.additionalComment = this.state.comment;

        const startDateMoment = moment(this.state.startDate);
        postData.startDate = startDateMoment.format("YYYY-MM-DD")

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

    onSuccessfulSubmissionCallback(order) {
        this.setState({ errors: {}, isLoading: true, })
        this.props.setFlashMessage("success", "Order has been successfully postponed.");
        this.props.history.push("/order/"+this.state.id+"");
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

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onTextChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validatePostponeInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.props.postOrderPostpone(
                this.getPostData(),
                this.onSuccessfulSubmissionCallback,
                this.onFailedSubmissionCallback
            );

        // CASE 2 OF 2: Validation was a failure.
        } else {
            this.onFailedSubmissionCallback(errors);
        }
    }

    onSelectChange(option) {
        const optionKey = [option.selectName].toString()+"Option";
        this.setState({
            [option.selectName]: option.value,
            optionKey: option,
        });
        console.log([option.selectName], optionKey, "|",option); // For debugging purposes only.
    }

    onStartDateTimeChange(date) {
        this.setState({ startDate: date, });
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const {
            reason, reasonOther, startDate, comment, id, errors, isLoading,
        } = this.state;
        return (
            <AdminOrderReopenOperationComponent
                isLoading={isLoading}
                errors={errors}
                id={id}
                comment={comment}
                startDate={startDate}
                reasonOther={reasonOther}
                reason={reason}
                onTextChange={this.onTextChange}
                onSelectChange={this.onSelectChange}
                onStartDateTimeChange={this.onStartDateTimeChange}
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
        postOrderPostpone: (postData, onSuccessCallback, onFailureCallback) => {
            dispatch(postOrderPostpone(postData, onSuccessCallback, onFailureCallback))
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminOrderPostponeOperationContainer);
