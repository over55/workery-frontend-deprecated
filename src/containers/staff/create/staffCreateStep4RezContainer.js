import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import StaffCreateStep4RezComponent from "../../../components/staff/create/staffCreateStep4RezComponent";
import { validateStep4RezCreateInput } from "../../../validators/staffValidator";
import {
    RESIDENTIAL_CUSTOMER_TYPE_OF_ID,
    TELEPHONE_CONTACT_POINT_TYPE_OF_ID
} from '../../../constants/api';
import { localStorageGetIntegerItem } from '../../../helpers/localStorageUtility';

class StaffCreateStep4RezContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            firstName: localStorage.getItem("workery-create-staff-rez-firstName"),
            lastName: localStorage.getItem("workery-create-staff-rez-lastName"),
            primaryPhone: localStorage.getItem("workery-create-staff-rez-primaryPhone"),
            secondaryPhone: localStorage.getItem("workery-create-staff-rez-secondaryPhone"),
            email: localStorage.getItem("workery-create-staff-rez-email"),
            isOkToEmail: localStorageGetIntegerItem("workery-create-staff-rez-isOkToEmail"),
            isOkToText: localStorageGetIntegerItem("workery-create-staff-rez-isOkToText"),
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

        // DEVELOPERS NOTE:
        // Since we are in this page, we need to assign the user to be
        // a residential type user. If the user is community cares type
        // then this variable will be set then in page 4.
        localStorage.setItem("workery-create-staff-typeOf", RESIDENTIAL_CUSTOMER_TYPE_OF_ID);
        localStorage.setItem("workery-create-staff-typeOf-label", "Residential");
        localStorage.setItem("workery-create-staff-rez-primaryPhoneTypeOf", TELEPHONE_CONTACT_POINT_TYPE_OF_ID);
        localStorage.setItem("workery-create-staff-rez-secondaryPhoneTypeOf", TELEPHONE_CONTACT_POINT_TYPE_OF_ID);
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
        const key = "workery-create-staff-rez-"+[e.target.name];
        localStorage.setItem(key, e.target.value);
    }

    onRadioChange(e) {
        // Get the values.
        const storageValueKey = "workery-create-staff-rez-"+[e.target.name];
        const storageLabelKey =  "workery-create-staff-rez-"+[e.target.name].toString()+"-label";
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
        const { errors, isValid } = validateStep4RezCreateInput(this.state);

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
            firstName, lastName, primaryPhone, secondaryPhone, email, isOkToEmail, isOkToText, errors
        } = this.state;
        return (
            <StaffCreateStep4RezComponent
                firstName={firstName}
                lastName={lastName}
                primaryPhone={primaryPhone}
                secondaryPhone={secondaryPhone}
                email={email}
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
    };
}

const mapDispatchToProps = dispatch => {
    return {}
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StaffCreateStep4RezContainer);
