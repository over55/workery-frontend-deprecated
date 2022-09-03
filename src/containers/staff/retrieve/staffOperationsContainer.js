import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import StaffOperationsComponent from "../../../components/staff/retrieve/staffOperationsComponent";
import { clearFlashMessage } from "../../../actions/flashMessageActions";
import {
    localStorageGetObjectItem, localStorageSetObjectOrArrayItem
} from '../../../helpers/localStorageUtility';
import { pullStaffDetail } from "../../../actions/staffActions";


class StaffOperationsContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        const { id } = this.props.match.params;

        // The following code will extract our financial data from the local
        // storage if the financial data was previously saved.
        const staff = localStorageGetObjectItem("workery-admin-retrieve-staff-"+id.toString() );
        const isLoading = isEmpty(staff);

        // Update state.
        this.state = {
            id: parseInt(id),
            staff: staff,
            isLoading: isLoading,
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
        console.log(response);
        this.setState({ isLoading: false, staff: response, });

        // The following code will save the object to the browser's local
        // storage to be retrieved later more quickly.
        localStorageSetObjectOrArrayItem("workery-admin-retrieve-staff-"+this.state.id.toString(), response);
    }

    onFailureCallback(errors) {
        console.log(errors);
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
        const staff = isEmpty(this.state.staff) ? {} : this.state.staff;
        return (
            <StaffOperationsComponent
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
)(StaffOperationsContainer);
