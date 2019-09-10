import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';
import * as moment from 'moment';

import ClientCreateStep7Component from "../../../components/clients/create/clientCreateStep7Component";
import { setFlashMessage } from "../../../actions/flashMessageActions";
import {
    localStorageGetObjectItem, localStorageGetArrayItem, localStorageGetDateItem, localStorageGetIntegerItem, localStorageRemoveItemsContaining
} from '../../../helpers/localStorageUtility';
import { RESIDENTIAL_CUSTOMER_TYPE_OF_ID, COMMERCIAL_CUSTOMER_TYPE_OF_ID, TELEPHONE_CONTACT_POINT_TYPE_OF_ID } from '../../../constants/api';
import { postClientDetail } from '../../../actions/clientActions';
import { validateStep7CreateInput } from "../../../validators/clientValidator";


class ClientCreateStep7Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            // Step 3
            typeOf: localStorageGetIntegerItem("workery-create-client-typeOf"),
            typeOfLabel: localStorage.getItem("workery-create-client-typeOf-label"),

            // Step 4 - Residential & Business
            organizationName: localStorage.getItem("workery-create-client-organizationName"),
            organizationTypeOf: localStorageGetIntegerItem("workery-create-client-organizationTypeOf"),
            givenName: localStorage.getItem("workery-create-client-givenName"),
            lastName: localStorage.getItem("workery-create-client-lastName"),
            primaryPhone: localStorage.getItem("workery-create-client-primaryPhone"),
            telephone: localStorage.getItem("workery-create-client-primaryPhone"),
            primaryPhoneTypeOf: localStorageGetIntegerItem("workery-create-client-primaryPhoneTypeOf"),
            telephoneTypeOf:localStorageGetIntegerItem("workery-create-client-primaryPhoneTypeOf"),
            secondaryPhone: localStorage.getItem("workery-create-client-secondaryPhone"),
            secondaryPhoneTypeOf: localStorageGetIntegerItem("workery-create-client-secondaryPhoneTypeOf"),
            otherTelephone: localStorage.getItem("workery-create-client-secondaryPhone"),
            otherTelephoneTypeOf: localStorageGetIntegerItem("workery-create-client-secondaryPhoneTypeOf"),
            email: localStorage.getItem("workery-create-client-email"),
            isOkToEmail: localStorageGetIntegerItem("workery-create-client-isOkToEmail"),
            isOkToEmailLabel: localStorage.getItem("workery-create-client-isOkToEmail-label"),
            isOkToText: localStorageGetIntegerItem("workery-create-client-isOkToText"),
            isOkToTextLabel: localStorage.getItem("workery-create-client-isOkToText-label"),

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
        postData.givenName = this.state.givenName;

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
        if (this.state.givenName === undefined || this.state.givenName === null) {
            postData.givenName = "";
        }

        // (7) Extra Comment: This field is required.
        if (this.state.comment === undefined || this.state.comment === null) {
            postData.extraComment = "";
        } else {
            postData.extraComment = this.state.comment;
        }

        // (9) Address Country: This field is required.
        postData.addressCountry = this.state.country;

        // (10) Address Locality: This field is required.
        postData.addressLocality = this.state.locality;

        // (11) Address Region: This field is required.
        postData.addressRegion = this.state.region

        // (12) organizationTypeOf
        if (this.state.organizationTypeOf === null || this.state.organizationTypeOf === undefined || this.state.organizationTypeOf === "" || isNaN(this.state.organizationTypeOf)) {
            postData.organizationTypeOf = 0;
        }

        // (13) otherTelephoneTypeOf
        if (this.state.otherTelephoneTypeOf === null || this.state.otherTelephoneTypeOf === undefined || this.state.otherTelephoneTypeOf === "" || isNaN(this.state.otherTelephoneTypeOf)) {
            postData.otherTelephoneTypeOf = TELEPHONE_CONTACT_POINT_TYPE_OF_ID;
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
                localStorageRemoveItemsContaining("workery-create-client-");
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
            givenName,
            lastName,
            primaryPhone,
            secondaryPhone,
            email,
            isOkToEmail,
            isOkToEmailLabel,
            isOkToText,
            isOkToTextLabel,
            organizationName,
            organizationTypeOf,

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
            errors,
            isLoading,
        } = this.state;

        return (
            <ClientCreateStep7Component
                // Step 3
                typeOf={typeOf}
                typeOfLabel={typeOfLabel}

                // Step 4 - Residential & Business
                givenName={givenName}
                lastName={lastName}
                primaryPhone={primaryPhone}
                secondaryPhone={secondaryPhone}
                email={email}
                isOkToEmail={isOkToEmail}
                isOkToEmailLabel={isOkToEmailLabel}
                isOkToText={isOkToText}
                isOkToTextLabel={isOkToTextLabel}
                organizationName={organizationName}
                organizationTypeOf={organizationTypeOf}
                givenName={givenName}
                lastName={lastName}

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
