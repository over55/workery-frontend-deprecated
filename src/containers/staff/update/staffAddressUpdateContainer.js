import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import StaffAddressUpdateComponent from "../../../components/staff/update/staffAddressUpdateComponent";
import { validateStep5CreateInput } from "../../../validators/staffValidator";
import {
    RESIDENTIAL_CUSTOMER_TYPE_OF_ID,
    COMMERCIAL_CUSTOMER_TYPE_OF_ID
} from '../../../constants/api';
import { BASIC_STREET_TYPE_CHOICES, STREET_DIRECTION_CHOICES } from "../../../constants/api";
import { setFlashMessage } from "../../../actions/flashMessageActions";
import { putStaffAddressDetail } from '../../../actions/staffActions';


class StaffAddressUpdateContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { id } = this.props.match.params;

        // Map the API fields to our fields.
        const country = this.props.staffDetail.addressCountry === "CA" ? "Canada" : this.props.staffDetail.addressCountry;
        const region = this.props.staffDetail.addressRegion === "ON" ? "Ontario" : this.props.staffDetail.addressRegion;

        this.state = {
            id: id,
            givenName: this.props.staffDetail.givenName,
            lastName: this.props.staffDetail.lastName,
            country: country,
            region: region,
            locality: this.props.staffDetail.addressLocality,
            postalCode: this.props.staffDetail.postalCode,
            streetAddress: this.props.staffDetail.streetAddress,
            errors: {},
            isLoading: false
        }

        this.getPostData = this.getPostData.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onNextClick = this.onNextClick.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
        this.onBillingCountryChange = this.onBillingCountryChange.bind(this);
        this.onBillingRegionChange = this.onBillingRegionChange.bind(this);
    }

    /**
     *  Utility function used to create the `postData` we will be submitting to
     *  the API; as a result, this function will structure some dictionary key
     *  items under different key names to support our API web-service's API.
     */
    getPostData() {
        let postData = Object.assign({}, this.state);

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

    onSuccessfulSubmissionCallback(staff) {
        this.props.setFlashMessage("success", "Staff has been successfully updated.");
        this.props.history.push("/staff/"+this.state.id+"/full");
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
         // Update our state.
         this.setState({
             [e.target.name]: e.target.value,
         });

         // Update our persistent storage.
         const key = "workery-create-staff-"+[e.target.name];
         localStorage.setItem(key, e.target.value)
     }

     onSelectChange(option) {
         const optionKey = [option.selectName]+"Option";
         this.setState({
             [option.selectName]: option.value,
             [optionKey]: option,
         });
     }

    onBillingCountryChange(value) {
        // Update state.
        if (value === null || value === undefined || value === '') {
            this.setState({ country: null, region: null })
        } else {
            this.setState({ country: value, region: null })
        }

        // Update persistent storage.
        localStorage.setItem('workery-create-staff-country', value);
        localStorage.setItem('workery-create-staff-region', null);
    }

    onBillingRegionChange(value) {
        this.setState({ region: value }); // Update state.
        localStorage.setItem('workery-create-staff-region', value); // Update persistent storage.
    }

    onNextClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform staff-side validation.
        const { errors, isValid } = validateStep5CreateInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.props.putStaffAddressDetail(
                this.getPostData(),
                this.onSuccessfulSubmissionCallback,
                this.onFailedSubmissionCallback
            );

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
        const { id, givenName, lastName, errors, isLoading, returnURL } = this.state;
        const {
            country, region, locality,
            postalCode, streetAddress,
        } = this.state;
        const { user } = this.props;
        return (
            <StaffAddressUpdateComponent
                id={id}
                givenName={givenName}
                lastName={lastName}
                country={country}
                region={region}
                locality={locality}
                streetAddress={streetAddress}
                postalCode={postalCode}
                onTextChange={this.onTextChange}
                onSelectChange={this.onSelectChange}
                onBillingCountryChange={this.onBillingCountryChange}
                onBillingRegionChange={this.onBillingRegionChange}
                onNextClick={this.onNextClick}
                errors={errors}
                returnURL={returnURL}
                isLoading={isLoading}
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
    return {
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
        putStaffAddressDetail: (data, onSuccessfulSubmissionCallback, onFailedSubmissionCallback) => {
            dispatch(putStaffAddressDetail(data, onSuccessfulSubmissionCallback, onFailedSubmissionCallback))
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StaffAddressUpdateContainer);
