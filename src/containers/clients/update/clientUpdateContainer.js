import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import ClientBizUpdateComponent from "../../../components/clients/update/clientBizUpdateComponent";
import ClientRezUpdateComponent from "../../../components/clients/update/clientRezUpdateComponent";
import { setFlashMessage } from "../../../actions/flashMessageActions";
import { validateInput } from "../../../validators/clientValidator";
import {
    RESIDENTIAL_CUSTOMER_TYPE_OF_ID, COMMERCIAL_CUSTOMER_TYPE_OF_ID
} from '../../../constants/api';
import { getHowHearReactSelectOptions } from "../../../actions/howHearActions";
import { getTagReactSelectOptions } from "../../../actions/tagActions";


class ClientUpdateContainer extends Component {
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
        const country = this.props.clientDetail.addressCountry === "CA" ? "Canada" : this.props.clientDetail.addressCountry;
        const region = this.props.clientDetail.addressRegion === "ON" ? "Ontario" : this.props.clientDetail.addressRegion;
        const isOkToEmail = this.props.clientDetail.isOkToEmail === true ? 1 : 0;
        const isOkToText = this.props.clientDetail.isOkToText === true ? 1 : 0;

        this.state = {
            errors: {},
            isLoading: false,
            id: id,

            // STEP 3
            typeOf: this.props.clientDetail.typeOf,

            // STEP 4 - REZ
            givenName: this.props.clientDetail.givenName,
            lastName: this.props.clientDetail.lastName,
            telephone: this.props.clientDetail.telephone,
            otherTelephone: this.props.clientDetail.otherTelephone,
            email: this.props.clientDetail.email,
            isOkToEmail: isOkToEmail,
            isOkToText: isOkToText,

            // STEP 4 - BIZ
            companyName: this.props.clientDetail.companyName,
            contactFirstName: this.props.clientDetail.contactFirstName,
            contactLastName: this.props.clientDetail.contactLastName,
            telephone: this.props.clientDetail.telephone,
            telephoneTypeOf: this.props.clientDetail.telephoneTypeOf,
            otherTelephone: this.props.clientDetail.otherTelephone,
            otherTelephoneTypeOf: this.props.clientDetail.otherTelephoneTypeOf,

            // STEP 5
            country: country,
            region: region,
            locality: this.props.clientDetail.addressLocality,
            postalCode: this.props.clientDetail.postalCode,
            streetAddress: this.props.clientDetail.streetAddress,

            // STEP 6
            tags: this.props.clientDetail.tags,
            dateOfBirth: this.props.clientDetail.dateOfBirth,
            gender: this.props.clientDetail.gender,
            howHear: this.props.clientDetail.howHear,
            howHearOption: this.props.clientDetail.howHearOption,
            howHearOther: this.props.clientDetail.howHearOther,
            joinDate: this.props.clientDetail.joinDate,
            comment: this.props.clientDetail.comment,
        }

        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
        this.onMultiChange = this.onMultiChange.bind(this);
        this.onDOBDateTimeChange = this.onDOBDateTimeChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
        this.onFailedCallback = this.onFailedCallback.bind(this);
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

    onSuccessCallback(client) {
        this.setState({ errors: {}, isLoading: true, })
        this.props.setFlashMessage("success", "Client has been successfully updated.");
        this.props.history.push("/client/"+this.state.slug+"/full");
    }

    onFailedCallback(errors) {
        this.setState({ errors: errors, });

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
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.onSuccessCallback();

        // CASE 2 OF 2: Validation was a failure.
        } else {
            this.onFailedCallback(errors);
        }
    }

    onSelectChange(option) {
        const optionKey = [option.selectName].toString()+"Option";
        this.setState({
            [option.selectName]: option.value,
            optionKey: option,
        });
        console.log([option.selectName], optionKey, "|",option); // For debugging purposes only.
    }

    onRadioChange(e) {
        // Get the values.
        const storageValueKey = "nwapp-create-client-"+[e.target.name];
        const value = e.target.value;
        const label = e.target.dataset.label; // Note: 'dataset' is a react data via https://stackoverflow.com/a/20383295
        const storeValueKey = [e.target.name].toString();
        const storeLabelKey = [e.target.name].toString()+"-label";

        // Save the data.
        this.setState({ [e.target.name]: value, }); // Save to store.
        localStorage.setItem(storageValueKey, value) // Save to storage.

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

    onMultiChange(...args) {
        // Extract the select options from the parameter.
        const selectedOptions = args[0];

        // Set all the tags we have selected to the STORE.
        this.setState({
            tags: selectedOptions,
        });
    }

    onDOBDateTimeChange(dateOfBirth) {
        this.setState({
            dateOfBirth: dateOfBirth,
        });
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const {
            errors, id,

            // STEP 3
            typeOf,

            // STEP 4 - REZ
            givenName, lastName, telephone, otherTelephone, email, isOkToText, isOkToEmail,

            // STEP 4 - BIZ
            companyName, contactFirstName, contactLastName, primaryPhone, primaryPhoneTypeOf,
            secondaryPhone, secondaryPhoneTypeOf,

            // STEP 5
            country, region, locality, postalCode, streetAddress,

            // STEP 6
            tags, birthdate, gender, howHear, howHearOption, howHearOther, joinDate, comment,
        } = this.state;

        const joinDateObj = new Date(joinDate);
        const dateOfBirth = birthdate

        if (typeOf === RESIDENTIAL_CUSTOMER_TYPE_OF_ID) {
            return (
                <ClientRezUpdateComponent
                    // STEP 3
                    typeOf={typeOf}

                    // STEP 4 - REZ
                    givenName={givenName}
                    lastName={lastName}
                    telephone={telephone}
                    otherTelephone={otherTelephone}
                    email={email}
                    isOkToText={isOkToText}
                    isOkToEmail={isOkToEmail}

                    // STEP 5
                    country={country}
                    region={region}
                    locality={locality}
                    postalCode={postalCode}
                    streetAddress={streetAddress}

                    // STEP 6
                    tags={tags}
                    dateOfBirth={dateOfBirth}
                    gender={gender}
                    howHear={howHear}
                    howHearOption={howHearOption}
                    howHearOther={howHearOther}
                    joinDate={joinDateObj}
                    comment={comment}

                    // EVERYTHING ELSE
                    id={id}
                    errors={errors}
                    onTextChange={this.onTextChange}
                    onSelectChange={this.onSelectChange}
                    onRadioChange={this.onRadioChange}
                    onClick={this.onClick}
                />
            );
        }
        if (typeOf === COMMERCIAL_CUSTOMER_TYPE_OF_ID) {
            return (
                <ClientBizUpdateComponent
                    // STEP 3
                    typeOf={typeOf}

                    // STEP 4
                    companyName={companyName}
                    contactFirstName={contactFirstName}
                    contactLastName={contactLastName}
                    primaryPhone={primaryPhone}
                    primaryPhoneTypeOf={primaryPhoneTypeOf}
                    secondaryPhone={secondaryPhone}
                    secondaryPhoneTypeOf={secondaryPhoneTypeOf}
                    email={email}
                    isOkToEmail={isOkToEmail}
                    isOkToText={isOkToText}

                    // STEP 5
                    country={country}
                    region={region}
                    locality={locality}
                    postalCode={postalCode}
                    streetAddress={streetAddress}

                    // STEP 6
                    tags={tags}
                    dateOfBirth={dateOfBirth}
                    gender={gender}
                    howHear={howHear}
                    howHearOption={howHearOption}
                    howHearOther={howHearOther}
                    joinDate={joinDate}
                    comment={comment}

                    // EVERYTHING ELSE
                    id={id}
                    errors={errors}
                    onTextChange={this.onTextChange}
                    onSelectChange={this.onSelectChange}
                    onRadioChange={this.onRadioChange}
                    onClick={this.onClick}
                />
            );
        }

        return (null);


    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        clientDetail: store.clientDetailState,
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
)(ClientUpdateContainer);
