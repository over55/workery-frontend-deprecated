import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';
import * as moment from 'moment';

import AdminAssociateCreateStep8Component from "../../../../components/associates/admin/create/adminAssociateCreateStep8Component";
import { setFlashMessage } from "../../../../actions/flashMessageActions";
import {
    localStorageGetObjectItem, localStorageGetArrayItem, localStorageGetDateItem, localStorageGetIntegerItem, localStorageRemoveItemsContaining
} from '../../../../helpers/localStorageUtility';
import { COMMERCIAL_CUSTOMER_TYPE_OF_ID, IS_ACTIVE_TYPE, IS_INACTIVE_TYPE_OF } from '../../../../constants/api';
import { postAssociateDetail } from '../../../../actions/associateActions';
import { validateStep8CreateInput } from "../../../../validators/associateValidator";


class AdminAssociateCreateStep8Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        const rawJoinDate = localStorageGetDateItem("workery-create-associate-joinDate")
        const joinDate = (rawJoinDate !== undefined && rawJoinDate !== null) ? rawJoinDate : new Date();

        this.state = {
            // Step 3
            typeOf: localStorageGetIntegerItem("workery-create-associate-typeOf"),
            typeOfLabel: localStorage.getItem("workery-create-associate-typeOf-label"),

            // Step 4 - Residential & Business
            organizationName: localStorage.getItem("workery-create-associate-organizationName"),
            organizationTypeOf: localStorageGetIntegerItem("workery-create-associate-organizationTypeOf"),
            givenName: localStorage.getItem("workery-create-associate-givenName"),
            lastName: localStorage.getItem("workery-create-associate-lastName"),
            primaryPhone: localStorage.getItem("workery-create-associate-primaryPhone"),
            primaryPhoneTypeOf: 1,
            secondaryPhone: localStorage.getItem("workery-create-associate-secondaryPhone"),
            secondaryPhoneTypeOf: 1,
            email: localStorage.getItem("workery-create-associate-email"),
            isOkToEmail: localStorageGetIntegerItem("workery-create-associate-isOkToEmail"),
            isOkToEmailLabel: localStorage.getItem("workery-create-associate-isOkToEmail-label"),
            isOkToText: localStorageGetIntegerItem("workery-create-associate-isOkToText"),
            isOkToTextLabel: localStorage.getItem("workery-create-associate-isOkToText-label"),

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
            wsibNumber: localStorage.getItem("workery-create-associate-wsibNumber"),
            wsibInsuranceDate: localStorageGetDateItem("workery-create-associate-wsibInsuranceDate"),
            policeCheck: localStorageGetDateItem("workery-create-associate-policeCheck"),
            taxId: localStorage.getItem("workery-create-associate-taxId"),
            driversLicenseClass: localStorage.getItem("workery-create-associate-driversLicenseClass"),
            vehicleTypes: localStorageGetArrayItem("workery-create-associate-vehicleTypes"),
            serviceFee: localStorageGetIntegerItem("workery-create-associate-serviceFee"),
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
            joinDate: joinDate,
            comment: localStorage.getItem("workery-create-associate-comment"),

            // Everything else
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
        if (this.state.joinDate !== undefined && this.state.joinDate !== null && this.state.joinDate !== "") {
            const joinDateMoment = moment(this.state.joinDate);
            postData.joinDate = joinDateMoment.format("YYYY-MM-DD")
        }

        // (2) Dues date - We need to format as per required API format.
        if (this.state.duesDate !== undefined && this.state.duesDate !== null && this.state.duesDate !== "") {
            const duesDateMoment = moment(this.state.duesDate);
            postData.duesDate = duesDateMoment.format("YYYY-MM-DD")
        }

        // (2) commercialInsuranceExpiry date - We need to format as per required API format.
        if (this.state.commercialInsuranceExpiryDate !== undefined && this.state.commercialInsuranceExpiryDate !== null && this.state.commercialInsuranceExpiryDate !== "") {
            const commercialInsuranceExpiryDateMoment = moment(this.state.commercialInsuranceExpiryDate);
            postData.commercialInsuranceExpiryDate = commercialInsuranceExpiryDateMoment.format("YYYY-MM-DD")
        }

        // (2) autoInsuranceExpiryDate - We need to format as per required API format.
        if (this.state.autoInsuranceExpiryDate !== undefined && this.state.autoInsuranceExpiryDate !== null && this.state.autoInsuranceExpiryDate !== "") {
            const autoInsuranceExpiryDateMoment = moment(this.state.autoInsuranceExpiryDate);
            postData.autoInsuranceExpiryDate = autoInsuranceExpiryDateMoment.format("YYYY-MM-DD")
        }

        // (2) wsibInsuranceDate date - We need to format as per required API format.
        if (this.state.wsibInsuranceDate !== undefined && this.state.wsibInsuranceDate !== null && this.state.wsibInsuranceDate !== "") {
            const wsibInsuranceDateMoment = moment(this.state.wsibInsuranceDate);
            postData.wsibInsuranceDate = wsibInsuranceDateMoment.format("YYYY-MM-DD")
        }

        // (2) Join date - We need to format as per required API format.
        if (this.state.policeCheck !== undefined && this.state.policeCheck !== null && this.state.duesDate !== "") {
            const policeCheckMoment = moment(this.state.policeCheck);
            postData.policeCheck = policeCheckMoment.format("YYYY-MM-DD")
        }

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
            let vehicle = this.state.vehicleTypes[i];
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
        if (this.state.organizationTypeOf === undefined || this.state.organizationTypeOf === null || isNaN( this.state.organizationTypeOf) ) {
            postData.organizationTypeOf = 0;
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

        // Handle the `isActive` field.
        if (this.state.isActive === IS_INACTIVE_TYPE_OF) {
            postData.isActive = false;
        }
        if (this.state.isActive === IS_ACTIVE_TYPE) {
            postData.isActive = true;
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
        localStorageRemoveItemsContaining("workery-create-associate-");
        this.props.setFlashMessage("success", "Associate has been successfully created.");
        this.props.history.push("/associate/"+response['id']);
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
            wsibNumber,
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
            errors,
            isLoading,
        } = this.state;

        return (
            <AdminAssociateCreateStep8Component
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
                wsibNumber={wsibNumber}
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
)(AdminAssociateCreateStep8Container);
