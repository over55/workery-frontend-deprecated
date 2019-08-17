import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';
import * as moment from 'moment';

import ClientCreateStep7Component from "../../../components/clients/create/clientCreateStep7Component";
import { setFlashMessage } from "../../../actions/flashMessageActions";
import {
    localStorageGetObjectItem, localStorageGetArrayItem, localStorageGetDateItem, localStorageGetIntegerItem
} from '../../../helpers/localStorageUtility';
import { RESIDENTIAL_CUSTOMER_TYPE_OF_ID, COMMERCIAL_CUSTOMER_TYPE_OF_ID } from '../../../constants/api';
import { postClientDetail } from '../../../actions/clientActions';
import { validateStep7CreateInput } from "../../../validators/clientValidator";


class ClientCreateStep7Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Get the type of.
        const typeOf = localStorageGetIntegerItem("workery-create-client-typeOf");
        let returnURL;
        let primaryPhone;
        let primaryPhoneTypeOf;
        let secondaryPhone;
        let secondaryPhoneTypeOf;
        let email;
        let isOkToEmail;
        let isOkToText;
        let isOkToEmailLabel;
        let isOkToTextLabel;
        if (typeOf === RESIDENTIAL_CUSTOMER_TYPE_OF_ID) {
            returnURL = "/clients/add/step-4-rez-or-cc";
            primaryPhone = localStorage.getItem("workery-create-client-rez-primaryPhone");
            primaryPhoneTypeOf = localStorageGetIntegerItem("workery-create-client-rez-primaryPhoneTypeOf");
            secondaryPhone = localStorage.getItem("workery-create-client-rez-secondaryPhone");
            secondaryPhoneTypeOf = localStorageGetIntegerItem("workery-create-client-rez-secondaryPhoneTypeOf");
            email = localStorage.getItem("workery-create-client-rez-email");
            isOkToEmail = localStorageGetIntegerItem("workery-create-client-rez-isOkToEmail");
            isOkToText = localStorageGetIntegerItem("workery-create-client-rez-isOkToText");
            isOkToEmailLabel = localStorage.getItem("workery-create-client-rez-isOkToEmail-label");
            isOkToTextLabel = localStorage.getItem("workery-create-client-rez-isOkToText-label");
        }
        else if (typeOf === COMMERCIAL_CUSTOMER_TYPE_OF_ID) {
            returnURL = "/clients/add/step-4-biz";
            primaryPhone = localStorage.getItem("workery-create-client-biz-primaryPhone");
            primaryPhoneTypeOf = localStorageGetIntegerItem("workery-create-client-biz-primaryPhoneTypeOf");
            secondaryPhone =  localStorage.getItem("workery-create-client-biz-secondaryPhone");
            secondaryPhoneTypeOf = localStorageGetIntegerItem("workery-create-client-biz-secondaryPhoneTypeOf");
            email = localStorage.getItem("workery-create-client-biz-email");
            isOkToEmail = localStorageGetIntegerItem("workery-create-client-biz-isOkToEmail");
            isOkToText = localStorageGetIntegerItem("workery-create-client-biz-isOkToText");
            isOkToEmailLabel = localStorage.getItem("workery-create-client-biz-isOkToEmail-label");
            isOkToTextLabel = localStorage.getItem("workery-create-client-biz-isOkToText-label");
        }

        this.state = {
            // Step 3
            typeOf: typeOf,
            typeOfLabel: localStorage.getItem("workery-create-client-typeOf-label"),

            // Step 4 - Residential & Business
            firstName: localStorage.getItem("workery-create-client-rez-firstName"),
            givenName: localStorage.getItem("workery-create-client-rez-firstName"),
            lastName: localStorage.getItem("workery-create-client-rez-lastName"),
            primaryPhone: primaryPhone,
            telephone: primaryPhone,
            primaryPhoneTypeOf: primaryPhoneTypeOf,
            telephoneTypeOf: primaryPhoneTypeOf,
            secondaryPhone: secondaryPhone,
            secondaryPhoneTypeOf: secondaryPhoneTypeOf,
            otherTelephone: secondaryPhone,
            otherTelephoneTypeOf: secondaryPhoneTypeOf,
            email: email,
            isOkToEmail: isOkToEmail,
            isOkToEmailLabel: isOkToEmailLabel,
            isOkToText: isOkToText,
            isOkToTextLabel: isOkToTextLabel,
            companyName: localStorage.getItem("workery-create-client-biz-companyName"),
            contactFirstName: localStorage.getItem("workery-create-client-biz-contactFirstName"),
            contactLastName: localStorage.getItem("workery-create-client-biz-contactLastName"),

            // Step 5 - Address
            country: localStorage.getItem("workery-create-client-country"),
            region: localStorage.getItem("workery-create-client-region"),
            locality: localStorage.getItem("workery-create-client-locality"),
            postalCode: localStorage.getItem("workery-create-client-postalCode"),
            streetAddress: localStorage.getItem("workery-create-client-streetAddress"),

            // Step 6 - Metrics
            tags: localStorageGetArrayItem("workery-create-client-tags"),
            dateOfBirth: localStorageGetDateItem("workery-create-client-dateOfBirth"),
            gender: localStorage.getItem("workery-create-client-gender"),
            genderLabel: localStorage.getItem("workery-create-client-gender-label"),
            howHear: localStorageGetIntegerItem("workery-create-client-howHear"),
            howHearLabel: localStorage.getItem("workery-create-client-howHearLabel"),
            howHearOption: localStorageGetObjectItem('workery-create-client-howHearOption'),
            howHearOther: localStorage.getItem("workery-create-client-howHearOther"),
            joinDate: localStorageGetDateItem("workery-create-client-joinDate"),
            comment: localStorage.getItem("workery-create-client-comment"),

            // Everything else
            returnURL: returnURL,
            errors: {},
            isLoading: false,
            password: localStorage.getItem("workery-create-client-password"),
            passwordRepeat: localStorage.getItem("workery-create-client-password-repeat"),
        }

        this.onSubmitClick = this.onSubmitClick.bind(this);
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
        this.onFailureCallback = this.onFailureCallback.bind(this);
        this.getPostData = this.getPostData.bind(this);
    }

    /**
     *  Utility function used to create the `postData` we will be submitting to
     *  the API; as a result, this function will structure some dictionary key
     *  items under different key names to support our API web-service's API.
     */
    getPostData() {
        let postData = Object.assign({}, this.state);

        // (1) Given name - We need t refactor name for API field match.
        postData.givenName = this.state.firstName;

        // (2) Middle name (API ISSUE)
        postData.middleName = this.state.middleName;

        // (2) Join date - We need to format as per required API format.
        const joinDateMoment = moment(this.state.joinDate);
        postData.joinDate = joinDateMoment.format("YYYY-MM-DD")

        // (3) Tags - We need to only return our `id` values.
        let idTags = [];
        for (let i = 0; i < this.state.tags.length; i++) {
            let tag = this.state.tags[i];
            idTags.push(tag.value);
        }
        postData.tags = idTags;

        // (4) How Hear Other - This field may not be null, therefore make blank.
        if (this.state.howHearOther === undefined || this.state.howHearOther === null) {
            postData.howHearOther = "";
        }

        // (5) Password & Password Repeat
        if (this.state.password === undefined || this.state.password === null || this.state.password === '' || this.state.password.length == 0) {
            var randomString = Math.random().toString(34).slice(-10);
            randomString += "A";
            randomString += "!";
            postData.password = randomString;
            postData.passwordRepeat = randomString;
        }

        // (6) Organization Type Of - This field may not be null, therefore make blank.
        if (this.state.organizationTypeOf === undefined || this.state.organizationTypeOf === null) {
            postData.organizationTypeOf = "";
        }

        // (7) Extra Comment: This field is required.
        if (this.state.comment === undefined || this.state.comment === null) {
            postData.extraComment = "";
        } else {
            postData.extraComment = this.state.comment;
        }

        // (8) Telephone: This field is required.
        postData.telephone = this.state.primaryPhone;
        postData.telephoneTypeOf = this.state.primaryPhoneTypeOf;
        postData.otherTelephoneTypeOf = this.state.secondaryPhoneTypeOf;

        // (9) Address Country: This field is required.
        postData.addressCountry = this.state.country;

        // (10) Address Locality: This field is required.
        postData.addressLocality = this.state.locality;

        // (11) Address Region: This field is required.
        postData.addressRegion = this.state.region

        // () First Name and Last Name if biz
        if (this.state.typeOf === COMMERCIAL_CUSTOMER_TYPE_OF_ID) {
            postData.firstName = this.state.contactFirstName;
            postData.givenName = this.state.contactFirstName;
            postData.lastName = this.state.contactLastName;
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

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onSubmitClick(e) {
        e.preventDefault();

        const { errors, isValid } = validateStep7CreateInput(this.state);
        // console.log(errors, isValid); // For debugging purposes only.

        if (isValid) {
            this.setState({
                errors: {},
                isLoading: true,
            }, ()=>{
                // Once our state has been validated `client-side` then we will
                // make an API request with the server to create our new production.
                this.props.postClientDetail(
                    this.getPostData(),
                    this.onSuccessCallback,
                    this.onFailureCallback
                );
            });
        } else {
            this.setState({
                errors: errors,
                isLoading: false,
            });

            // The following code will cause the screen to scroll to the top of
            // the page. Please see ``react-scroll`` for more information:
            // https://github.com/fisshy/react-scroll
            var scroll = Scroll.animateScroll;
            scroll.scrollToTop();
        }
    }

    onSuccessCallback(response) {
        console.log("onSuccessCallback | State (Pre-Fetch):", this.state);
        this.setState(
            {
                isLoading: false,
            },
            ()=>{
                console.log("onSuccessCallback | Response:",response); // For debugging purposes only.
                console.log("onSuccessCallback | State (Post-Fetch):", this.state);
                this.props.setFlashMessage("success", "Client has been successfully created.");
                this.props.history.push("/clients");
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
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const {
            // Step 3
            typeOf,
            typeOfLabel,

            // Step 4 - Residential & Business
            firstName,
            lastName,
            primaryPhone,
            secondaryPhone,
            email,
            isOkToEmail,
            isOkToEmailLabel,
            isOkToText,
            isOkToTextLabel,
            companyName,
            contactFirstName,
            contactLastName,

            // Step 5 - Address
            country,
            region,
            locality,
            postalCode,
            streetAddress,

            // Step 6 - Metrics
            tags,
            dateOfBirth,
            gender,
            genderLabel,
            howHear,
            howHearLabel,
            howHearOption,
            howHearOther,
            joinDate,
            comment,

            // Everything else
            returnURL,
            errors,
            isLoading,
        } = this.state;

        return (
            <ClientCreateStep7Component
                // Step 3
                typeOf={typeOf}
                typeOfLabel={typeOfLabel}

                // Step 4 - Residential & Business
                firstName={firstName}
                lastName={lastName}
                primaryPhone={primaryPhone}
                secondaryPhone={secondaryPhone}
                email={email}
                isOkToEmail={isOkToEmail}
                isOkToEmailLabel={isOkToEmailLabel}
                isOkToText={isOkToText}
                isOkToTextLabel={isOkToTextLabel}
                companyName={companyName}
                contactFirstName={contactFirstName}
                contactLastName={contactLastName}

                // Step 5 - Address
                country={country}
                region={region}
                locality={locality}
                postalCode={postalCode}
                streetAddress={streetAddress}

                // Step 6 - Metrics
                tags={tags}
                dateOfBirth={dateOfBirth}
                gender={gender}
                genderLabel={genderLabel}
                howHear={howHear}
                howHearLabel={howHearLabel}
                howHearOption={howHearOption}
                howHearOther={howHearOther}
                joinDate={joinDate}
                comment={comment}

                // Everything else
                returnURL={returnURL}
                errors={errors}
                isLoading={isLoading}
                onSubmitClick={this.onSubmitClick}
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
        postClientDetail: (postData, successCallback, failedCallback) => {
            dispatch(postClientDetail(postData, successCallback, failedCallback))
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ClientCreateStep7Container);
