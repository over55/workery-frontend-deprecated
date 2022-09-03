import React, { Component } from 'react';
import { connect } from 'react-redux';

import StaffFullRetrieveComponent from "../../../components/staff/retrieve/staffFullRetrieveComponent";
import { clearFlashMessage } from "../../../actions/flashMessageActions";
import { pullStaffDetail } from "../../../actions/staffActions";


class StaffFullRetrieveContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        const { id } = this.props.match.params;

        // Update state.
        this.state = {
            id: id,
            staff: {}
        }

        // Update functions.
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
        this.onFailureCallback = this.onFailureCallback.bind(this);
        this.onStaffClick = this.onStaffClick.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
        this.props.pullStaffDetail(this.state.id, this.onSuccessCallback, this.onFailureCallback);
    }

    componentWillUnmount() {
        // This code will fix the "ReactJS & Redux: Can't perform a React state
        // update on an unmounted component" issue as explained in:
        // https://stackoverflow.com/a/53829700
        this.setState = (state,callback)=>{
            return;
        };

        // Clear any and all flash messages in our queue to be rendered.
        this.props.clearFlashMessage();
    }

    /**
     *  API callback functions
     *------------------------------------------------------------
     */

    onSuccessCallback(response) {
        console.log("onSuccessCallback | Fetched:", response);
    }

    onFailureCallback(errors) {
        console.log("onFailureCallback | errors:", errors);
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onStaffClick(e) {
        e.preventDefault();
        localStorage.setItem("workery-create-order-staffId", this.props.staffDetail.id);
        localStorage.setItem("workery-create-order-staffGivenName", this.props.staffDetail.givenName);
        localStorage.setItem("workery-create-order-staffLastName", this.props.staffDetail.lastName);
        this.props.history.push("/orders/add/step-3");
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const staff = this.props.staffDetail ? this.props.staffDetail : [];
        return (
            <StaffFullRetrieveComponent
                {...this}
                {...this.state}
                {...this.props}
                staff={staff}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        flashMessage: store.flashMessageState,
        staffDetail: store.staffDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        },
        pullStaffDetail: (id, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullStaffDetail(id, onSuccessCallback, onFailureCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StaffFullRetrieveContainer);
