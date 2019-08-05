import React, { Component } from 'react';
import { connect } from 'react-redux';

import ClientCreateStep7Component from "../../../components/clients/create/clientCreateStep7Component";
import { setFlashMessage } from "../../../actions/flashMessageActions";
import {
    localStorageGetObjectItem, localStorageGetArrayItem, localStorageGetDateItem, localStorageGetIntegerItem
} from '../../../helpers/localStorageUtility';
import {
    RESIDENCE_TYPE_OF,
    BUSINESS_TYPE_OF,
    COMMUNITY_CARES_TYPE_OF
} from '../../../constants/api';


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
        let secondaryPhone;
        let email;
        let isOkToEmail;
        let isOkToText;
        if (typeOf === RESIDENCE_TYPE_OF || typeOf === COMMUNITY_CARES_TYPE_OF) {
            returnURL = "/clients/add/step-4-rez-or-cc";
            primaryPhone = localStorage.getItem("workery-create-client-rez-primaryPhone");
            secondaryPhone = localStorage.getItem("workery-create-client-rez-secondaryPhone");
            email = localStorage.getItem("workery-create-client-rez-email");
            isOkToEmail = parseInt(localStorage.getItem("workery-create-client-rez-isOkToEmail"));
            isOkToText = parseInt(localStorage.getItem("workery-create-client-rez-isOkToText"));
        }
        else if (typeOf === BUSINESS_TYPE_OF) {
            returnURL = "/clients/add/step-4-biz";
            primaryPhone = localStorage.getItem("workery-create-client-biz-primaryPhone");
            secondaryPhone =  localStorage.getItem("workery-create-client-biz-secondaryPhone");
            email = localStorage.getItem("workery-create-client-biz-email");
        }

        this.state = {
            // Step 3
            typeOf: typeOf,
            typeOfLabel: localStorage.getItem("workery-create-client-typeOf-label"),

            // Step 4 - Residential & Business
            firstName: localStorage.getItem("workery-create-client-rez-firstName"),
            lastName: localStorage.getItem("workery-create-client-rez-lastName"),
            primaryPhone: primaryPhone,
            secondaryPhone: secondaryPhone,
            email: email,
            isOkToEmail: isOkToEmail,
            isOkToText: isOkToText,
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
            gender: localStorageGetIntegerItem("workery-create-client-gender"),
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
            isLoading: false
        }

        this.onClick = this.onClick.bind(this);
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

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        this.setState({ errors: {}, isLoading: true, })
        this.props.setFlashMessage("success", "Client has been successfully created.");
        this.props.history.push("/clients");
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
            isOkToText,
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
                isOkToText={isOkToText}
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
    return {
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ClientCreateStep7Container);
