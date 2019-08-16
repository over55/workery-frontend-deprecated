import React, { Component } from 'react';
import { connect } from 'react-redux';

import StaffLiteRetrieveComponent from "../../../components/staff/retrieve/staffLiteRetrieveComponent";
import { clearFlashMessage } from "../../../actions/flashMessageActions";
import { pullStaffDetail } from "../../../actions/staffActions";


class StaffLiteRetrieveContainer extends Component {
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


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { id } = this.state;
        const staff = this.props.staffDetail ? this.props.staffDetail : [];
        return (
            <StaffLiteRetrieveComponent
                id={id}
                staff={staff}
                flashMessage={this.props.flashMessage}
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
)(StaffLiteRetrieveContainer);
