import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import StaffContactUpdateComponent from "../../../components/staff/update/staffContactUpdateComponent";
import { validateStep4CreateInput } from "../../../validators/staffValidator";
import {
    RESIDENTIAL_CUSTOMER_TYPE_OF_ID,
    TELEPHONE_CONTACT_POINT_TYPE_OF_ID
} from '../../../constants/api';
import { localStorageGetIntegerItem } from '../../../helpers/localStorageUtility';

class StaffContactUpdateContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        const isOkToEmail = this.props.staffDetail.isOkToEmail === true ? 1 : 0;
        const isOkToText = this.props.staffDetail.isOkToText === true ? 1 : 0;
        this.state = {
            givenName: this.props.staffDetail.givenName,
            lastName: this.props.staffDetail.lastName,
            primaryPhone: this.props.staffDetail.telephone,
            secondaryPhone: this.props.staffDetail.otherTelephone,
            email: this.props.staffDetail.email,
            personalEmail: this.props.staffDetail.personalEmail,
            isOkToEmail: isOkToEmail,
            isOkToText: isOkToText,
            errors: {},
            isLoading: false
        }

        this.onTextChange = this.onTextChange.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
        localStorage.setItem("workery-create-staff-typeOf", RESIDENTIAL_CUSTOMER_TYPE_OF_ID);
        localStorage.setItem("workery-create-staff-typeOf-label", "Residential");
        localStorage.setItem("workery-create-staff-primaryPhoneTypeOf", TELEPHONE_CONTACT_POINT_TYPE_OF_ID);
        localStorage.setItem("workery-create-staff-secondaryPhoneTypeOf", TELEPHONE_CONTACT_POINT_TYPE_OF_ID);
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

    onSuccessfulSubmissionCallback(staff) {
        this.props.history.push("/staff/add/step-5");
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
        const key = "workery-create-staff-"+[e.target.name];
        localStorage.setItem(key, e.target.value);
    }

    onRadioChange(e) {
        // Get the values.
        const storageValueKey = "workery-create-staff-"+[e.target.name];
        const storageLabelKey =  "workery-create-staff-"+[e.target.name].toString()+"-label";
        const value = e.target.value;
        const label = e.target.dataset.label; // Note: 'dataset' is a react data via https://stackoverflow.com/a/20383295
        const storeValueKey = [e.target.name].toString();
        const storeLabelKey = [e.target.name].toString()+"Label";

        // Save the data.
        this.setState({ [e.target.name]: value, }); // Save to store.
        this.setState({ storeLabelKey: label, }); // Save to store.
        localStorage.setItem(storageValueKey, value) // Save to storage.
        localStorage.setItem(storageLabelKey, label) // Save to storage.

        // For the debugging purposes only.
        console.log({
            "STORE-VALUE-KEY": storageValueKey,
            "STORE-VALUE": value,
            "STORAGE-VALUE-KEY": storeValueKey,
            "STORAGE-VALUE": value,
            "STORAGE-LABEL-KEY": storeLabelKey,
            "STORAGE-LABEL": label,
        });
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform staff-side validation.
        const { errors, isValid } = validateStep4CreateInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.onSuccessfulSubmissionCallback();

        // CASE 2 OF 2: Validation was a failure.
        } else {
            this.onFailedSubmissionCallback(errors);
        }
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const {
            givenName, lastName, primaryPhone, secondaryPhone, email, personalEmail, isOkToEmail, isOkToText, errors
        } = this.state;
        return (
            <StaffContactUpdateComponent
                givenName={givenName}
                lastName={lastName}
                primaryPhone={primaryPhone}
                secondaryPhone={secondaryPhone}
                email={email}
                personalEmail={personalEmail}
                isOkToEmail={isOkToEmail}
                isOkToText={isOkToText}
                errors={errors}
                onTextChange={this.onTextChange}
                onRadioChange={this.onRadioChange}
                onClick={this.onClick}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        staffDetail: store.staffDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {}
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StaffContactUpdateContainer);
