import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import StaffUpdateComponent from "../../../components/staff/update/staffUpdateComponent";
import { setFlashMessage } from "../../../actions/flashMessageActions";
import { validateInput } from "../../../validators/staffValidator";
import {
    // localStorageGetObjectItem,
    localStorageSetObjectOrArrayItem, localStorageGetDateItem, localStorageGetArrayItem
} from '../../../helpers/localStorageUtility';
import { getHowHearReactSelectOptions } from "../../../actions/howHearActions";
import { getTagReactSelectOptions } from "../../../actions/tagActions";
import { BASIC_STREET_TYPE_CHOICES, STREET_DIRECTION_CHOICES } from "../../../constants/api";


class StaffUpdateContainer extends Component {
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
        const isOkToEmail = this.props.staffDetail.isOkToEmail === true ? 1 : 0;
        const isOkToText = this.props.staffDetail.isOkToText === true ? 1 : 0;
        const policeCheckObj = new Date(this.props.staffDetail.policeCheck);
        const isActive = this.props.staffDetail.isActive === true ? 1 : 0;
        const birthdateObj = new Date(this.props.staffDetail.birthdate);
        const joinDateObj = new Date(this.props.staffDetail.joinDate);

        console.log(isActive, this.props.staffDetail);

        this.state = {
            // Step 4
            givenName: this.props.staffDetail.givenName,
            lastName: this.props.staffDetail.lastName,
            primaryPhone: this.props.staffDetail.telephone,
            secondaryPhone: this.props.staffDetail.otherTelephone,
            email: this.props.staffDetail.email,
            personalEmail: this.props.staffDetail.personalEmail,
            isOkToEmail: isOkToEmail,
            isOkToText: isOkToText,

            // Step 5
            country: this.props.staffDetail.addressCountry,
            region: this.props.staffDetail.addressRegion,
            locality: this.props.staffDetail.addressLocality,
            postalCode: this.props.staffDetail.postalCode,
            streetAddress: this.props.staffDetail.streetAddress,

            // Step 6
            description: this.props.staffDetail.description,
            policeCheck: policeCheckObj,
            emergencyContactName: this.props.staffDetail.emergencyContactRelationship,
            emergencyContactRelationship: this.props.staffDetail.emergencyContactRelationship,
            emergencyContactTelephone: this.props.staffDetail.emergencyContactTelephone,
            emergencyContactAlternativeTelephone: this.props.staffDetail.emergencyContactAlternativeTelephone,
            password: this.props.staffDetail.password,
            passwordRepeat: this.props.staffDetail.passwordRepeat,
            isActive: isActive,

            // Step 7
            tags: this.props.staffDetail.tags,
            dateOfBirth: birthdateObj,
            gender: this.props.staffDetail.gender,
            howHear: this.props.staffDetail.howHear,
            howHearOther: this.props.staffDetail.howHearOther,
            joinDate: this.props.staffDetail.joinDate,
            comment: this.props.staffDetail.comment,

            // Everything else...
            id: id,
            errors: {},
            isLoading: false
        }

        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onMultiChange = this.onMultiChange.bind(this);
        this.onDateOfBirthChange = this.onDateOfBirthChange.bind(this);
        this.onPoliceCheckDateChange = this.onPoliceCheckDateChange.bind(this);
        this.onTagMultiChange = this.onTagMultiChange.bind(this);
        this.onJoinDateChange = this.onJoinDateChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
        this.onCountryChange = this.onCountryChange.bind(this);
        this.onRegionChange = this.onRegionChange.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
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
        // --- Update the GUI ---
        this.setState({ errors: {}, isLoading: true, })

        // --- Make flash message ---
        this.props.setFlashMessage("success", "Staff has been successfully updated.");

        // --- Move to our next page ---
        this.props.history.push("/staff/"+this.state.slug+"/full");
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
        this.setState({ [e.target.name]: e.target.value, });
    }

    onSelectChange(option) {
        const optionKey = [option.selectName]+"Option";
        this.setState({
            [option.selectName]: option.value,
            [optionKey]: option,
        });
    }

    onMultiChange(...args) {
        // Extract the select options from the parameter.
        const selectedOptions = args[0];

        // Set all the tags we have selected to the STORE.
        this.setState({ tags: selectedOptions, });

        // // Set all the tags we have selected to the STORAGE.
        const key = 'nwapp-staff-create-' + args[1].name;
        localStorageSetObjectOrArrayItem(key, selectedOptions);
    }

    onDateOfBirthChange(dateObj) {
        this.setState({
            dateOfBirth: dateObj,
        })
    }

    onPoliceCheckDateChange(dateObj) {
        this.setState({
            policeCheckDate: dateObj,
        })
    }

    onCountryChange(value) {
        if (value === null || value === undefined || value === '') {
            this.setState({ country: null, region: null })
        } else {
            this.setState({ country: value, region: null })
        }
    }

    onRegionChange(value) {
        this.setState({ region: value })
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.onSuccessfulSubmissionCallback();

        // CASE 2 OF 2: Validation was a failure.
        } else {
            this.onFailedSubmissionCallback(errors);
        }
    }

    onRadioChange(e) {
        // Get the values.
        const storageValueKey = "nwapp-staff-create-"+[e.target.name];
        const value = e.target.value;
        const label = e.target.dataset.label; // Note: 'dataset' is a react data via https://stackoverflow.com/a/20383295
        const storeValueKey = [e.target.name].toString();
        const storeLabelKey = [e.target.name].toString()+"-label";

        // Save the data.
        this.setState({ [e.target.name]: value, }); // Save to store.
    }

    onTagMultiChange(...args) {
        // Extract the select options from the parameter.
        const selectedOptions = args[0];

        // We need to only return our `id` values, therefore strip out the
        // `react-select` options format of the data and convert it into an
        // array of integers to hold the primary keys of the `Tag` items selected.
        let idTags = [];
        if (selectedOptions !== null && selectedOptions !== undefined) {
            for (let i = 0; i < selectedOptions.length; i++) {
                let tag = selectedOptions[i];
                idTags.push(tag.value);
            }
        }
        this.setState({ tags: idTags, });
    }

    onJoinDateChange(dateObj) {
        this.setState({ joinDate: dateObj, });
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const {
            // Step 4
            givenName, lastName, primaryPhone, secondaryPhone, email, personalEmail, isOkToEmail, isOkToText,

            // Step 5
            country, region, locality, postalCode, streetAddress,

            // Step 6
            description, policeCheck, emergencyContactName, emergencyContactRelationship, emergencyContactTelephone, emergencyContactAlternativeTelephone, isActive, password, passwordRepeat,

            // Step 7
            tags, dateOfBirth, gender, howHear, howHearOther, joinDate, comment,

            // Everything else...
            id, errors, isLoading
        } = this.state;

        const howHearOptions = getHowHearReactSelectOptions(this.state.howHearData, "howHear");
        const tagOptions = getTagReactSelectOptions(this.state.tagsData, "tags");

        return (
            <StaffUpdateComponent
                // Step 4
                givenName={givenName}
                lastName={lastName}
                primaryPhone={primaryPhone}
                secondaryPhone={secondaryPhone}
                email={email}
                personalEmail={personalEmail}
                isOkToEmail={isOkToEmail}
                isOkToText={isOkToText}

                // Step 5
                country={country}
                region={region}
                locality={locality}
                streetAddress={streetAddress}
                postalCode={postalCode}

                // Step 6
                description={description}
                emergencyContactName={emergencyContactName}
                emergencyContactRelationship={emergencyContactRelationship}
                emergencyContactTelephone={emergencyContactTelephone}
                emergencyContactAlternativeTelephone={emergencyContactAlternativeTelephone}
                isActive={isActive}
                password={password}
                passwordRepeat={passwordRepeat}

                // Step 7
                tags={tags}
                tagOptions={tagOptions}
                dateOfBirth={dateOfBirth}
                gender={gender}
                howHear={howHear}
                howHearOptions={howHearOptions}
                howHearOther={howHearOther}
                joinDate={joinDate}
                comment={comment}

                // Everything else
                id={id}
                errors={errors}
                isLoading={isLoading}

                // Functions
                onTextChange={this.onTextChange}
                onRadioChange={this.onRadioChange}
                onSelectChange={this.onSelectChange}
                onBillingCountryChange={this.onBillingCountryChange}
                onBillingRegionChange={this.onBillingRegionChange}
                onPoliceCheckDateChange={this.onPoliceCheckDateChange}
                onClick={this.onClick}
                onTagMultiChange={this.onTagMultiChange}
                onDateOfBirthChange={this.onDateOfBirthChange}
                onJoinDateChange={this.onJoinDateChange}
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
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StaffUpdateContainer);
