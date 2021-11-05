import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';
import * as moment from 'moment';

import PartnerCreateStep6Component from "../../../components/partners/create/partnerCreateStep6Component";
import { setFlashMessage } from "../../../actions/flashMessageActions";
import {
    localStorageGetObjectItem, localStorageGetArrayItem, localStorageGetDateItem, localStorageGetIntegerItem, localStorageRemoveItemsContaining
} from '../../../helpers/localStorageUtility';
import { RESIDENTIAL_CUSTOMER_TYPE_OF_ID, COMMERCIAL_CUSTOMER_TYPE_OF_ID } from '../../../constants/api';
import { postPartnerDetail } from '../../../actions/partnerActions';
import { validateStep6CreateInput } from "../../../validators/partnerValidator";


class PartnerCreateStep6Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        const rawJoinDate = localStorageGetDateItem("workery-create-partner-joinDate")
        const joinDate = (rawJoinDate !== undefined && rawJoinDate !== null) ? rawJoinDate : new Date();

        // Get the type of.
        const typeOf = localStorageGetIntegerItem("workery-create-partner-typeOf");
        let returnURL;
        let telephone;
        let telephoneTypeOf;
        let otherTelephone;
        let otherTelephoneTypeOf;
        let email;
        let isOkToEmail;
        let isOkToText;
        let isOkToEmailLabel;
        let isOkToTextLabel;
        if (typeOf === RESIDENTIAL_CUSTOMER_TYPE_OF_ID) {
            returnURL = "/partners/add/step-4-rez-or-cc";
            telephone = localStorage.getItem("workery-create-partner-rez-telephone");
            telephoneTypeOf = localStorageGetIntegerItem("workery-create-partner-rez-telephoneTypeOf");
            otherTelephone = localStorage.getItem("workery-create-partner-rez-otherTelephone");
            otherTelephoneTypeOf = localStorageGetIntegerItem("workery-create-partner-rez-otherTelephoneTypeOf");
            email = localStorage.getItem("workery-create-partner-rez-email");
            isOkToEmail = localStorageGetIntegerItem("workery-create-partner-rez-isOkToEmail");
            isOkToText = localStorageGetIntegerItem("workery-create-partner-rez-isOkToText");
            isOkToEmailLabel = localStorage.getItem("workery-create-partner-rez-isOkToEmail-label");
            isOkToTextLabel = localStorage.getItem("workery-create-partner-rez-isOkToText-label");
        }
        else if (typeOf === COMMERCIAL_CUSTOMER_TYPE_OF_ID) {
            returnURL = "/partners/add/step-4-biz";
            telephone = localStorage.getItem("workery-create-partner-telephone");
            telephoneTypeOf = localStorageGetIntegerItem("workery-create-partner-telephoneTypeOf");
            otherTelephone =  localStorage.getItem("workery-create-partner-otherTelephone");
            otherTelephoneTypeOf = localStorageGetIntegerItem("workery-create-partner-otherTelephoneTypeOf");
            email = localStorage.getItem("workery-create-partner-email");
            isOkToEmail = localStorageGetIntegerItem("workery-create-partner-isOkToEmail");
            isOkToText = localStorageGetIntegerItem("workery-create-partner-isOkToText");
            isOkToEmailLabel = localStorage.getItem("workery-create-partner-isOkToEmail-label");
            isOkToTextLabel = localStorage.getItem("workery-create-partner-isOkToText-label");
        }

        this.state = {
            // Step 3
            typeOf: typeOf,
            typeOfLabel: localStorage.getItem("workery-create-partner-typeOf-label"),

            // Step 4 - Residential & Business
            givenName: localStorage.getItem("workery-create-partner-rez-givenName"),
            lastName: localStorage.getItem("workery-create-partner-rez-lastName"),
            telephone: telephone,
            telephoneTypeOf: telephoneTypeOf,
            otherTelephone: otherTelephone,
            otherTelephoneTypeOf: otherTelephoneTypeOf,
            email: email,
            isOkToEmail: isOkToEmail,
            isOkToEmailLabel: isOkToEmailLabel,
            isOkToText: isOkToText,
            isOkToTextLabel: isOkToTextLabel,
            organizationName: localStorage.getItem("workery-create-partner-organizationName"),
            organizationTypeOf: localStorageGetIntegerItem("workery-create-partner-organizationTypeOf"),
            givenName: localStorage.getItem("workery-create-partner-givenName"),
            lastName: localStorage.getItem("workery-create-partner-lastName"),
            isActive: localStorageGetIntegerItem("workery-create-partner-isActive"),

            // Step 5 - Address
            country: localStorage.getItem("workery-create-partner-country"),
            region: localStorage.getItem("workery-create-partner-region"),
            locality: localStorage.getItem("workery-create-partner-locality"),
            postalCode: localStorage.getItem("workery-create-partner-postalCode"),
            streetAddress: localStorage.getItem("workery-create-partner-streetAddress"),

            // Step 6 - Metrics
            tags: localStorageGetArrayItem("workery-create-partner-tags"),
            dateOfBirth: localStorageGetDateItem("workery-create-partner-dateOfBirth"),
            gender: localStorage.getItem("workery-create-partner-gender"),
            genderLabel: localStorage.getItem("workery-create-partner-gender-label"),
            howHearId: localStorageGetIntegerItem("workery-create-partner-howHearId"),
            howHearIdLabel: localStorage.getItem("workery-create-partner-howHearIdLabel"),
            howHearOption: localStorageGetObjectItem('workery-create-partner-howHearOption'),
            howHearOther: localStorage.getItem("workery-create-partner-howHearOther"),
            joinDate: joinDate,
            comment: localStorage.getItem("workery-create-partner-comment"),

            // Everything else
            returnURL: returnURL,
            errors: {},
            isLoading: false,
            password: localStorage.getItem("workery-create-partner-password"),
            passwordRepeat: localStorage.getItem("workery-create-partner-password-repeat"),
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
        if (this.state.organizationTypeOf === undefined || this.state.organizationTypeOf === null) {
            postData.organizationTypeOf = "";
        }

        // (7) Extra Comment: This field is required.
        if (this.state.comment === undefined || this.state.comment === null) {
            postData.extraComment = "";
        } else {
            postData.extraComment = this.state.comment;
        }

        // () Other telephone type of
        let otherTelephoneTypeOf = this.state.otherTelephoneTypeOf;
        if (otherTelephoneTypeOf === undefined || otherTelephoneTypeOf === null || isNaN(otherTelephoneTypeOf) ) {
            otherTelephoneTypeOf = 1; // Choose default.
        }
        postData.otherTelephoneTypeOf = otherTelephoneTypeOf;

        // (8) Telephone: This field is required.
        postData.telephone = this.state.telephone;
        postData.telephoneTypeOf = this.state.telephoneTypeOf;

        // (9) Address Country: This field is required.
        postData.addressCountry = this.state.country;

        // (10) Address Locality: This field is required.
        postData.addressLocality = this.state.locality;

        // (11) Address Region: This field is required.
        postData.addressRegion = this.state.region

        // () First Name and Last Name if biz
        if (this.state.typeOf === COMMERCIAL_CUSTOMER_TYPE_OF_ID) {
            postData.givenName = this.state.givenName;
            postData.givenName = this.state.givenName;
            postData.lastName = this.state.lastName;
        }

        // (14) Boolean handler.
        postData.isOkToEmail = parseInt(this.state.isOkToEmail) === 1 ? true : false;
        postData.isOkToText = parseInt(this.state.isOkToText) === 1 ? true : false;
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

        const { errors, isValid } = validateStep6CreateInput(this.state);
        // console.log(errors, isValid); // For debugging purposes only.

        if (isValid) {
            this.setState({
                errors: {},
                isLoading: true,
            }, ()=>{
                // Once our state has been validated `partner-side` then we will
                // make an API request with the server to create our new production.
                this.props.postPartnerDetail(
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
                isLoading: false, errors: {},
            },
            ()=>{
                console.log("onSuccessCallback | Response:",response); // For debugging purposes only.
                console.log("onSuccessCallback | State (Post-Fetch):", this.state);
                localStorageRemoveItemsContaining("workery-create-partner-");
                this.props.setFlashMessage("success", "Partner has been successfully created.");
                this.props.history.push("/partner/"+response['id']);
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
        return (
            <PartnerCreateStep6Component
                {...this}
                {...this.state}
                {...this.props}
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
        postPartnerDetail: (postData, successCallback, failedCallback) => {
            dispatch(postPartnerDetail(postData, successCallback, failedCallback))
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PartnerCreateStep6Container);
