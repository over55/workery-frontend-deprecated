import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import AssociateUpdateComponent from "../../../components/associates/update/associateUpdateComponent";
import { setFlashMessage } from "../../../actions/flashMessageActions";
import { validateInput } from "../../../validators/associateValidator";
import { getHowHearReactSelectOptions, pullHowHearList } from "../../../actions/howHearActions";
import { getSkillSetReactSelectOptions, getPickedSkillSetReactSelectOptions, pullSkillSetList } from "../../../actions/skillSetActions";
import { getInsuranceRequirementReactSelectOptions, getPickedInsuranceRequirementReactSelectOptions, pullInsuranceRequirementList } from "../../../actions/insuranceRequirementActions";
import { getVehicleTypeReactSelectOptions, getPickedVehicleTypeReactSelectOptions, pullVehicleTypeList } from "../../../actions/vehicleTypeActions";
import { getTagReactSelectOptions, getPickedTagReactSelectOptions, pullTagList } from "../../../actions/tagActions";


class AssociateUpdateContainer extends Component {
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
        const country = this.props.associateDetail.addressCountry === "CA" ? "Canada" : this.props.associateDetail.addressCountry;
        const region = this.props.associateDetail.addressRegion === "ON" ? "Ontario" : this.props.associateDetail.addressRegion;
        const isOkToEmail = this.props.associateDetail.isOkToEmail === true ? 1 : 0;
        const isOkToText = this.props.associateDetail.isOkToText === true ? 1 : 0;
        const birthdateObj = new Date(this.props.associateDetail.birthdate);
        const joinDateObj = new Date(this.props.associateDetail.joinDate);

        this.state = {
            // STEP 3
            // typeOf: typeOf,

            // STEP 4
            givenName: this.props.associateDetail.givenName,
            lastName: this.props.associateDetail.lastName,
            primaryPhone: this.props.associateDetail.primaryPhone,
            secondaryPhone: this.props.associateDetail.secondaryPhone,
            email: this.props.associateDetail.email,
            isOkToEmail: isOkToEmail,
            isOkToText: isOkToText,

            // STEP 5
            country: country,
            region: region,
            locality: this.props.associateDetail.locality,
            postalCode: this.props.associateDetail.postalCode,
            streetAddress: this.props.associateDetail.streetAddress,

            // STEP 6
            skillSets: this.props.associateDetail.skillSets,
            insuranceRequirements: this.props.associateDetail.insuranceRequirements,
            description: this.props.associateDetail.description,
            hourlySalaryDesired: this.props.associateDetail.hourlySalaryDesired,
            limitSpecial: this.props.associateDetail.limitSpecial,
            duesDate: this.props.associateDetail.duesDate,
            commercialInsuranceExpiryDate: this.props.associateDetail.commercialInsuranceExpiryDate,
            autoInsuranceExpiryDate: this.props.associateDetail.autoInsuranceExpiryDate,
            wsibInsuranceDate: this.props.associateDetail.wsibInsuranceDate,
            policeCheck: this.props.associateDetail.policeCheck,
            taxId: this.props.associateDetail.taxId,
            driversLicenseClass: this.props.associateDetail.driversLicenseClass,
            vehicleTypes: this.props.associateDetail.vehicleTypes,
            emergencyContactName: this.props.associateDetail.emergencyContactName,
            emergencyContactRelationship: this.props.associateDetail.emergencyContactRelationship,
            emergencyContactTelephone: this.props.associateDetail.emergencyContactTelephone,
            emergencyContactAlternativeTelephone: this.props.associateDetail.emergencyContactAlternativeTelephone,

            // STEP 7
            tags: this.props.associateDetail.tags,
            gender: this.props.associateDetail.gender,
            howHear: this.props.associateDetail.howHear,
            howHearOption: this.props.associateDetail.howHearOption,
            howHearOther: this.props.associateDetail.howHearOther,
            dateOfBirth: birthdateObj,
            joinDate: joinDateObj,
            comment: this.props.associateDetail.comment,

            // Everything else...
            errors: {},
            isLoading: false,
            id: id,
            fullName: this.props.associateDetail.fullName,
        }

        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onSkillSetMultiChange = this.onSkillSetMultiChange.bind(this);
        this.onInsuranceRequirementMultiChange = this.onInsuranceRequirementMultiChange.bind(this);
        this.onVehicleTypeMultiChange = this.onVehicleTypeMultiChange.bind(this);
        this.onTagMultiChange = this.onTagMultiChange.bind(this);
        this.onDuesDateChange = this.onDuesDateChange.bind(this);
        this.onCommercialInsuranceExpiryDate = this.onCommercialInsuranceExpiryDate.bind(this);
        this.onAutoInsuranceExpiryDateChange = this.onAutoInsuranceExpiryDateChange.bind(this);
        this.onWsibInsuranceDateChange = this.onWsibInsuranceDateChange.bind(this);
        this.onPoliceCheckDateChange = this.onPoliceCheckDateChange.bind(this);
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

        // DEVELOPERS NOTE: Fetch our skillset list.
        this.props.pullHowHearList(1,1000);
        this.props.pullTagList(1,1000);
        this.props.pullSkillSetList(1, 1000);
        this.props.pullInsuranceRequirementList(1, 1000);
        this.props.pullVehicleTypeList(1, 1000);
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

    onSuccessfulSubmissionCallback(associate) {
        this.setState({ errors: {}, isLoading: true, })
        this.props.setFlashMessage("success", "Associate has been successfully updated.");
        this.props.history.push("/associates/"+this.state.slug+"/full");
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
    }

    onSelectChange(option) {
        const optionKey = [option.selectName]+"Option";
        this.setState({
            [option.selectName]: option.value,
            [optionKey]: option,
        });
    }

    onRadioChange(e) {
        // Get the values.
        const storageValueKey = "workery-create-associate-"+[e.target.name];
        const storageLabelKey =  "workery-create-associate-"+[e.target.name].toString()+"-label";
        const value = e.target.value;
        const label = e.target.dataset.label; // Note: 'dataset' is a react data via https://stackoverflow.com/a/20383295
        const storeValueKey = [e.target.name].toString();
        const storeLabelKey = [e.target.name].toString()+"Label";

        // Save the data.
        this.setState({ [e.target.name]: value, }); // Save to store.
        this.setState({ [storeLabelKey]: label, }); // Save to store.
    }

    onSkillSetMultiChange(...args) {
        // Extract the select options from the parameter.
        const selectedOptions = args[0];

        // Set all the skill sets we have selected to the STORE.
        this.setState({
            skillSets: selectedOptions,
        });
    }

    onInsuranceRequirementMultiChange(...args) {
        // Extract the select options from the parameter.
        const selectedOptions = args[0];

        // Set all the skill sets we have selected to the STORE.
        this.setState({
            insuranceRequirements: selectedOptions,
        });
    }

    onVehicleTypeMultiChange(...args) {
        // Extract the select options from the parameter.
        const selectedOptions = args[0];

        // Set all the skill sets we have selected to the STORE.
        this.setState({
            vehicleTypes: selectedOptions,
        });
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

    onDuesDateChange(dateObj) {
        this.setState(
            { duesDate: dateObj }
        );
    }

    onCommercialInsuranceExpiryDate(dateObj) {
        this.setState(
            { commercialInsuranceExpiryDate: dateObj }
        );
    }

    onAutoInsuranceExpiryDateChange(dateObj) {
        this.setState(
            { autoInsuranceExpiryDate: dateObj }
        );
    }

    onWsibInsuranceDateChange(dateObj) {
        this.setState(
            { wsibInsuranceDate: dateObj }
        );
    }

    onPoliceCheckDateChange(dateObj) {
        this.setState(
            { policeCheck: dateObj }
        );
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


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const {
            // Step 4
            givenName, lastName, primaryPhone, secondaryPhone, email, isOkToEmail, isOkToText,

            // Step 5
            country, region, locality, postalCode, streetAddress,

            // Step 6
            description, hourlySalaryDesired, limitSpecial, taxId, driversLicenseClass, skillSets, insuranceRequirements, vehicleTypes, duesDate, commercialInsuranceExpiryDate, autoInsuranceExpiryDate, wsibInsuranceDate, policeCheck, emergencyContactName, emergencyContactRelationship, emergencyContactTelephone, emergencyContactAlternativeTelephone,

            // Step 7
            tags,

            // Everything else...
            errors, id, fullName,
        } = this.state;

        const howHearOptions = getHowHearReactSelectOptions(this.props.howHearList);
        const tagOptions = getTagReactSelectOptions(this.props.tagList);
        const transcodedTags = getPickedTagReactSelectOptions(tags, this.props.tagList)

        const skillSetOptions = getSkillSetReactSelectOptions(this.props.skillSetList);
        const transcodedSkillSets = getPickedSkillSetReactSelectOptions(skillSets, this.props.skillSetList)

        const insuranceRequirementOptions = getInsuranceRequirementReactSelectOptions(this.props.insuranceRequirementList);
        const transcodedInsuranceRequirements = getPickedInsuranceRequirementReactSelectOptions(insuranceRequirements, this.props.insuranceRequirementList)

        const vehicleTypeOptions = getVehicleTypeReactSelectOptions(this.props.vehicleTypeList);
        const transcodedVehicleTypes = getPickedVehicleTypeReactSelectOptions(vehicleTypes, this.props.vehicleTypeList)

        return (
            <AssociateUpdateComponent
                // Step 4
                givenName={givenName}
                lastName={lastName}
                primaryPhone={primaryPhone}
                secondaryPhone={secondaryPhone}
                email={email}
                isOkToEmail={isOkToEmail}
                isOkToText={isOkToText}

                // Step 5
                country={country}
                region={region}
                locality={locality}
                postalCode={postalCode}
                streetAddress={streetAddress}

                // Step 6
                description={description}
                hourlySalaryDesired={hourlySalaryDesired}
                limitSpecial={limitSpecial}
                taxId={taxId}
                driversLicenseClass={driversLicenseClass}
                emergencyContactName={emergencyContactName}
                emergencyContactRelationship={emergencyContactRelationship}
                emergencyContactTelephone={emergencyContactTelephone}
                emergencyContactAlternativeTelephone={emergencyContactAlternativeTelephone}
                skillSets={transcodedSkillSets}
                skillSetOptions={getSkillSetReactSelectOptions(this.props.skillSetList)}
                insuranceRequirements={transcodedInsuranceRequirements}
                insuranceRequirementOptions={getInsuranceRequirementReactSelectOptions(this.props.insuranceRequirementList)}
                vehicleTypes={transcodedVehicleTypes}
                vehicleTypeOptions={getVehicleTypeReactSelectOptions(this.props.vehicleTypeList)}
                duesDate={duesDate}
                onDuesDateChange={this.onDuesDateChange}
                commercialInsuranceExpiryDate={commercialInsuranceExpiryDate}
                onCommercialInsuranceExpiryDate={this.onCommercialInsuranceExpiryDate}
                autoInsuranceExpiryDate={autoInsuranceExpiryDate}
                onAutoInsuranceExpiryDateChange={this.onAutoInsuranceExpiryDateChange}
                wsibInsuranceDate={wsibInsuranceDate}
                onWsibInsuranceDateChange={this.onWsibInsuranceDateChange}
                policeCheck={policeCheck}
                onPoliceCheckDateChange={this.onPoliceCheckDateChange}

                // Everything else...
                id={id}
                errors={errors}
                onTextChange={this.onTextChange}
                onRadioChange={this.onRadioChange}
                onSelectChange={this.onSelectChange}
                onVehicleTypeMultiChange={this.onVehicleTypeMultiChange}
                onInsuranceRequirementMultiChange={this.onInsuranceRequirementMultiChange}
                onSkillSetMultiChange={this.onSkillSetMultiChange}
                onTagMultiChange={this.onTagMultiChange}
                onClick={this.onClick}
                fullName={fullName}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        associateDetail: store.associateDetailState,
        skillSetList: store.skillSetListState,
        insuranceRequirementList: store.insuranceRequirementListState,
        vehicleTypeList: store.vehicleTypeListState,
        howHearList: store.howHearListState,
        tagList: store.tagListState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
        pullHowHearList: (page, sizePerPage, map, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullHowHearList(page, sizePerPage, map, onSuccessCallback, onFailureCallback)
            )
        },
        pullTagList: (page, sizePerPage, map, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullTagList(page, sizePerPage, map, onSuccessCallback, onFailureCallback)
            )
        },
        pullSkillSetList: (page, sizePerPage, map, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullSkillSetList(page, sizePerPage, map, onSuccessCallback, onFailureCallback)
            )
        },
        pullInsuranceRequirementList: (page, sizePerPage, map, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullInsuranceRequirementList(page, sizePerPage, map, onSuccessCallback, onFailureCallback)
            )
        },
        pullVehicleTypeList: (page, sizePerPage, map, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullVehicleTypeList(page, sizePerPage, map, onSuccessCallback, onFailureCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AssociateUpdateContainer);
