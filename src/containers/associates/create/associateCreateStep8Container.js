import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';
import * as moment from 'moment';

import AssociateCreateStep8Component from "../../../components/associates/create/associateCreateStep8Component";
import { setFlashMessage } from "../../../actions/flashMessageActions";
import {
    localStorageGetObjectItem, localStorageGetArrayItem, localStorageGetDateItem, localStorageGetIntegerItem
} from '../../../helpers/localStorageUtility';
import { RESIDENTIAL_CUSTOMER_TYPE_OF_ID, COMMERCIAL_CUSTOMER_TYPE_OF_ID } from '../../../constants/api';
import { postAssociateDetail } from '../../../actions/associateActions';
import { validateStep8CreateInput } from "../../../validators/associateValidator";


class AssociateCreateStep8Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Get the type of.
        const typeOf = localStorageGetIntegerItem("workery-create-associate-typeOf");
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
            returnURL = "/associates/add/step-4-rez-or-cc";
            primaryPhone = localStorage.getItem("workery-create-associate-rez-primaryPhone");
            primaryPhoneTypeOf = localStorageGetIntegerItem("workery-create-associate-rez-primaryPhoneTypeOf");
            secondaryPhone = localStorage.getItem("workery-create-associate-rez-secondaryPhone");
            secondaryPhoneTypeOf = localStorageGetIntegerItem("workery-create-associate-rez-secondaryPhoneTypeOf");
            email = localStorage.getItem("workery-create-associate-rez-email");
            isOkToEmail = localStorageGetIntegerItem("workery-create-associate-rez-isOkToEmail");
            isOkToText = localStorageGetIntegerItem("workery-create-associate-rez-isOkToText");
            isOkToEmailLabel = localStorage.getItem("workery-create-associate-rez-isOkToEmail-label");
            isOkToTextLabel = localStorage.getItem("workery-create-associate-rez-isOkToText-label");
        }
        else if (typeOf === COMMERCIAL_CUSTOMER_TYPE_OF_ID) {
            returnURL = "/associates/add/step-4-biz";
            primaryPhone = localStorage.getItem("workery-create-associate-biz-primaryPhone");
            primaryPhoneTypeOf = localStorageGetIntegerItem("workery-create-associate-biz-primaryPhoneTypeOf");
            secondaryPhone =  localStorage.getItem("workery-create-associate-biz-secondaryPhone");
            secondaryPhoneTypeOf = localStorageGetIntegerItem("workery-create-associate-biz-secondaryPhoneTypeOf");
            email = localStorage.getItem("workery-create-associate-biz-email");
            isOkToEmail = localStorageGetIntegerItem("workery-create-associate-biz-isOkToEmail");
            isOkToText = localStorageGetIntegerItem("workery-create-associate-biz-isOkToText");
            isOkToEmailLabel = localStorage.getItem("workery-create-associate-biz-isOkToEmail-label");
            isOkToTextLabel = localStorage.getItem("workery-create-associate-biz-isOkToText-label");
        }

        this.state = {
            // Step 3
            typeOf: typeOf,
            typeOfLabel: localStorage.getItem("workery-create-associate-typeOf-label"),

            // Step 4 - Residential & Business
            givenName: localStorage.getItem("workery-create-associate-rez-givenName"),
            lastName: localStorage.getItem("workery-create-associate-rez-lastName"),
            primaryPhone: primaryPhone,
            primaryPhoneTypeOf: primaryPhoneTypeOf,
            secondaryPhone: secondaryPhone,
            secondaryPhoneTypeOf: secondaryPhoneTypeOf,
            email: email,
            isOkToEmail: isOkToEmail,
            isOkToEmailLabel: isOkToEmailLabel,
            isOkToText: isOkToText,
            isOkToTextLabel: isOkToTextLabel,
            organizationName: localStorage.getItem("workery-create-associate-biz-organizationName"),
            givenName: localStorage.getItem("workery-create-associate-biz-givenName"),
            lastName: localStorage.getItem("workery-create-associate-biz-lastName"),

            // Step 5 - Address
            country: localStorage.getItem("workery-create-associate-country"),
            region: localStorage.getItem("workery-create-associate-region"),
            locality: localStorage.getItem("workery-create-associate-locality"),
            postalCode: localStorage.getItem("workery-create-associate-postalCode"),
            streetAddress: localStorage.getItem("workery-create-associate-streetAddress"),

            // Step 6 - Account
            skillSets: localStorageGetArrayItem("workery-create-associate-skillSets"),
            insuranceRequirements: localStorageGetArrayItem("workery-create-associate-insuranceRequirements"),
            description: localStorage.getItem("workery-create-associate-description"),
            hourlySalaryDesired: localStorageGetIntegerItem("workery-create-associate-hourlySalaryDesired"),
            limitSpecial: localStorage.getItem("workery-create-associate-limitSpecial"),
            duesDate: localStorageGetDateItem("workery-create-associate-duesDate"),
            commercialInsuranceExpiryDate: localStorageGetDateItem("workery-create-associate-commercialInsuranceExpiryDate"),
            autoInsuranceExpiryDate: localStorageGetDateItem("workery-create-associate-autoInsuranceExpiryDate"),
            wsibInsuranceDate: localStorageGetDateItem("workery-create-associate-wsibInsuranceDate"),
            policeCheck: localStorageGetDateItem("workery-create-associate-policeCheck"),
            taxId: localStorage.getItem("workery-create-associate-taxId"),
            driversLicenseClass: localStorage.getItem("workery-create-associate-driversLicenseClass"),
            vehicleTypes: localStorageGetArrayItem("workery-create-associate-vehicleTypes"),
            emergencyContactName: localStorage.getItem("workery-create-associate-emergencyContactName"),
            emergencyContactRelationship: localStorage.getItem("workery-create-associate-emergencyContactRelationship"),
            emergencyContactTelephone: localStorage.getItem("workery-create-associate-emergencyContactTelephone"),
            emergencyContactAlternativeTelephone: localStorage.getItem("workery-create-associate-emergencyContactAlternativeTelephone"),
            isActive: localStorageGetIntegerItem("workery-create-associate-isActive"),

            // Step 7 - Metrics
            tags: localStorageGetArrayItem("workery-create-associate-tags"),
            dateOfBirth: localStorageGetDateItem("workery-create-associate-dateOfBirth"),
            gender: localStorage.getItem("workery-create-associate-gender"),
            genderLabel: localStorage.getItem("workery-create-associate-gender-label"),
            howHear: localStorageGetIntegerItem("workery-create-associate-howHear"),
            howHearLabel: localStorage.getItem("workery-create-associate-howHearLabel"),
            howHearOption: localStorageGetObjectItem('workery-create-associate-howHearOption'),
            howHearOther: localStorage.getItem("workery-create-associate-howHearOther"),
            joinDate: localStorageGetDateItem("workery-create-associate-joinDate"),
            comment: localStorage.getItem("workery-create-associate-comment"),

            // Everything else
            returnURL: returnURL,
            errors: {},
            isLoading: false,
            password: localStorage.getItem("workery-create-associate-password"),
            passwordRepeat: localStorage.getItem("workery-create-associate-password-repeat"),
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

        // (3) Join date - We need to format as per required API format.
        const joinDateMoment = moment(this.state.joinDate);
        postData.joinDate = joinDateMoment.format("YYYY-MM-DD")

        // (2) Dues date - We need to format as per required API format.
        const duesDateMoment = moment(this.state.duesDate);
        postData.duesDate = duesDateMoment.format("YYYY-MM-DD")

        // (2) commercialInsuranceExpiry date - We need to format as per required API format.
        const commercialInsuranceExpiryDateMoment = moment(this.state.commercialInsuranceExpiryDate);
        postData.commercialInsuranceExpiryDate = commercialInsuranceExpiryDateMoment.format("YYYY-MM-DD")

        // (2) autoInsuranceExpiryDate - We need to format as per required API format.
        const autoInsuranceExpiryDateMoment = moment(this.state.autoInsuranceExpiryDate);
        postData.autoInsuranceExpiryDate = autoInsuranceExpiryDateMoment.format("YYYY-MM-DD")

        // (2) wsibInsuranceDate date - We need to format as per required API format.
        const wsibInsuranceDateMoment = moment(this.state.wsibInsuranceDate);
        postData.wsibInsuranceDate = wsibInsuranceDateMoment.format("YYYY-MM-DD")

        // (2) Join date - We need to format as per required API format.
        const policeCheckMoment = moment(this.state.policeCheck);
        postData.policeCheck = policeCheckMoment.format("YYYY-MM-DD")

        // (3) skillSets - We need to only return our `id` values.
        let idSkillSets = [];
        for (let i = 0; i < this.state.skillSets.length; i++) {
            let skill = this.state.skillSets[i];
            idSkillSets.push(skill.value);
        }
        postData.skillSets = idSkillSets;

        // (3) Tags - We need to only return our `id` values.
        let idVehicleTypes = [];
        for (let i = 0; i < this.state.vehicleTypes.length; i++) {
            let vehicle = this.state.tags[i];
            idVehicleTypes.push(vehicle.value);
        }
        postData.vehicleTypes = idVehicleTypes;

        // (3) Tags - We need to only return our `id` values.
        let idTags = [];
        for (let i = 0; i < this.state.tags.length; i++) {
            let tag = this.state.tags[i];
            idTags.push(tag.value);
        }
        postData.tags = idTags;

        // (3) insuranceRequirements - We need to only return our `id` values.
        let idInsuranceRequirements = [];
        for (let i = 0; i < this.state.insuranceRequirements.length; i++) {
            let insurance = this.state.insuranceRequirements[i];
            idInsuranceRequirements.push(insurance.value);
        }
        postData.insuranceRequirements = idInsuranceRequirements;

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
        let secondaryPhoneTypeOf = this.state.secondaryPhoneTypeOf;
        if (secondaryPhoneTypeOf === undefined || secondaryPhoneTypeOf === null || isNaN(secondaryPhoneTypeOf) ) {
            secondaryPhoneTypeOf = 1; // Choose default.
        }
        postData.otherTelephoneTypeOf = secondaryPhoneTypeOf;

        // (8) Telephone: This field is required.
        postData.telephone = this.state.primaryPhone;
        postData.telephoneTypeOf = this.state.primaryPhoneTypeOf;

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

        const { errors, isValid } = validateStep8CreateInput(this.state);
        // console.log(errors, isValid); // For debugging purposes only.

        if (isValid) {
            this.setState(
                { errors: {}, isLoading: true,},
                ()=>{
                    // Once our state has been validated `associate-side` then we will
                    // make an API request with the server to create our new production.
                    this.props.postAssociateDetail(
                        this.getPostData(),
                        this.onSuccessCallback,
                        this.onFailureCallback
                    );
                }
            );
        } else {
            this.setState({
                errors: errors,
                isLoading: false,
            })

            // The following code will cause the screen to scroll to the top of
            // the page. Please see ``react-scroll`` for more information:
            // https://github.com/fisshy/react-scroll
            var scroll = Scroll.animateScroll;
            scroll.scrollToTop();
        }
    }

    onSuccessCallback(response) {
        console.log("onSuccessCallback | State (Post-Fetch):", this.state);
        console.log("onSuccessCallback | Response:",response); // For debugging purposes only.
        this.props.setFlashMessage("success", "Associate has been successfully created.");
        this.props.history.push("/associates");
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

            // Step 5 - Address
            country,
            region,
            locality,
            postalCode,
            streetAddress,

            // Step 6 - Account
            skillSets,
            insuranceRequirements,
            description,
            hourlySalaryDesired,
            limitSpecial,
            duesDate,
            commercialInsuranceExpiryDate,
            autoInsuranceExpiryDate,
            wsibInsuranceDate,
            policeCheck,
            taxId,
            driversLicenseClass,
            vehicleTypes,
            emergencyContactName,
            emergencyContactRelationship,
            emergencyContactTelephone,
            emergencyContactAlternativeTelephone,
            isActive,

            // Step 7 - Metrics
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
            <AssociateCreateStep8Component
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
                givenName={givenName}
                lastName={lastName}

                // Step 5 - Address
                country={country}
                region={region}
                locality={locality}
                postalCode={postalCode}
                streetAddress={streetAddress}

                // Step 6 - Account
                skillSets={skillSets}
                insuranceRequirements={insuranceRequirements}
                description={description}
                hourlySalaryDesired={hourlySalaryDesired}
                limitSpecial={limitSpecial}
                duesDate={duesDate}
                commercialInsuranceExpiryDate={commercialInsuranceExpiryDate}
                autoInsuranceExpiryDate={autoInsuranceExpiryDate}
                wsibInsuranceDate={wsibInsuranceDate}
                policeCheck={policeCheck}
                taxId={taxId}
                driversLicenseClass={driversLicenseClass}
                vehicleTypes={vehicleTypes}
                emergencyContactName={emergencyContactName}
                emergencyContactRelationship={emergencyContactRelationship}
                emergencyContactTelephone={emergencyContactTelephone}
                emergencyContactAlternativeTelephone={emergencyContactAlternativeTelephone}
                isActive={isActive}

                // Step 7 - Metrics
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
        postAssociateDetail: (postData, successCallback, failedCallback) => {
            dispatch(postAssociateDetail(postData, successCallback, failedCallback))
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AssociateCreateStep8Container);
