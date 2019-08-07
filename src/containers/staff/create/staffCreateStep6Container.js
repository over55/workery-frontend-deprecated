import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import StaffCreateStep6Component from "../../../components/staff/create/staffCreateStep6Component";
import {
    localStorageGetObjectItem,
    localStorageSetObjectOrArrayItem,
    localStorageGetArrayItem,
    localStorageGetIntegerItem,
    localStorageGetDateItem
} from '../../../helpers/localStorageUtility';
import { validateStep6CreateInput } from "../../../validators/staffValidator";
import {
    RESIDENTIAL_CUSTOMER_TYPE_OF_ID,
    COMMERCIAL_CUSTOMER_TYPE_OF_ID
} from '../../../constants/api';
import { getSkillSetReactSelectOptions, pullSkillSetList } from "../../../actions/skillSetActions";
import { getInsuranceRequirementReactSelectOptions, pullInsuranceRequirementList } from "../../../actions/insuranceRequirementActions";
import { getVehicleTypeReactSelectOptions, pullVehicleTypeList } from "../../../actions/vehicleTypeActions";


class StaffCreateStep6Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Get the type of.
        const typeOf = localStorageGetIntegerItem("workery-create-staff-typeOf");
        let returnURL;
        if (typeOf === RESIDENTIAL_CUSTOMER_TYPE_OF_ID) {
            returnURL = "/staff/add/step-4-rez-or-cc";
        }
        else if (typeOf === COMMERCIAL_CUSTOMER_TYPE_OF_ID) {
            returnURL = "/staff/add/step-4-biz";
        }

        this.state = {
            skillSets: localStorageGetArrayItem("workery-create-staff-skillSets"),
            insuranceRequirements: localStorageGetArrayItem("workery-create-staff-insuranceRequirements"),
            description: localStorage.getItem("workery-create-staff-description"),
            hourlySalaryDesired: localStorageGetIntegerItem("workery-create-staff-hourlySalaryDesired"),
            limitSpecial: localStorage.getItem("workery-create-staff-limitSpecial"),
            duesDate: localStorageGetDateItem("workery-create-staff-duesDate"),
            commercialInsuranceExpiryDate: localStorageGetDateItem("workery-create-staff-commercialInsuranceExpiryDate"),
            autoInsuranceExpiryDate: localStorageGetDateItem("workery-create-staff-autoInsuranceExpiryDate"),
            wsibInsuranceDate: localStorageGetDateItem("workery-create-staff-wsibInsuranceDate"),
            policeCheck: localStorageGetDateItem("workery-create-staff-policeCheck"),
            taxId: localStorage.getItem("workery-create-staff-taxId"),
            driversLicenseClass: localStorage.getItem("workery-create-staff-driversLicenseClass"),
            vehicleTypes: localStorageGetArrayItem("workery-create-staff-vehicleTypes"),
            emergencyContactName: localStorage.getItem("workery-create-staff-emergencyContactName"),
            emergencyContactRelationship: localStorage.getItem("workery-create-staff-emergencyContactRelationship"),
            emergencyContactTelephone: localStorage.getItem("workery-create-staff-emergencyContactTelephone"),
            emergencyContactAlternativeTelephone: localStorage.getItem("workery-create-staff-emergencyContactAlternativeTelephone"),
            isActive: localStorageGetIntegerItem("workery-create-staff-isActive"),
            returnURL: returnURL,
            typeOf: typeOf,
            errors: {},
            isLoading: false
        }

        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onSkillSetMultiChange = this.onSkillSetMultiChange.bind(this);
        this.onInsuranceRequirementMultiChange = this.onInsuranceRequirementMultiChange.bind(this);
        this.onVehicleTypeMultiChange = this.onVehicleTypeMultiChange.bind(this);
        this.onDuesDateChange = this.onDuesDateChange.bind(this);
        this.onCommercialInsuranceExpiryDate = this.onCommercialInsuranceExpiryDate.bind(this);
        this.onAutoInsuranceExpiryDateChange = this.onAutoInsuranceExpiryDateChange.bind(this);
        this.onWsibInsuranceDateChange = this.onWsibInsuranceDateChange.bind(this);
        this.onPoliceCheckDateChange = this.onPoliceCheckDateChange.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
        this.onNextClick = this.onNextClick.bind(this);
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

    onSuccessfulSubmissionCallback(staff) {
        this.setState({ errors: {}, isLoading: true, })
        this.props.history.push("/staff/add/step-7");
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
        localStorage.setItem('workery-create-staff-'+[option.selectName], option.value);
        localStorageSetObjectOrArrayItem('workery-create-staff-'+optionKey, option);
        // console.log([option.selectName], optionKey, "|", this.state); // For debugging purposes only.
        // console.log(this.state);
    }

    onRadioChange(e) {
        // Get the values.
        const storageValueKey = "workery-create-staff-"+[e.target.name];
        const storageLabelKey =  "workery-create-staff-"+[e.target.name].toString()+"-label";
        const value = e.target.value;
        const label = e.target.dataset.label; // Note: 'dataset' is a react data via https://stackoverflow.com/a/20383295
        const storeValueKey = [e.target.name].toString();
        const storeLabelKey = [e.target.name].toString()+"Label";

        // Save the data.
        this.setState({ [e.target.name]: value, }); // Save to store.
        this.setState({ [storeLabelKey]: label, }); // Save to store.
        localStorage.setItem(storageValueKey, value) // Save to storage.
        localStorage.setItem(storageLabelKey, label) // Save to storage.

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

    onSkillSetMultiChange(...args) {
        // Extract the select options from the parameter.
        const selectedOptions = args[0];

        // Set all the skill sets we have selected to the STORE.
        this.setState({
            skillSets: selectedOptions,
        });

        // // Set all the tags we have selected to the STORAGE.
        const key = 'workery-create-staff-' + args[1].name;
        localStorageSetObjectOrArrayItem(key, selectedOptions);
    }

    onInsuranceRequirementMultiChange(...args) {
        // Extract the select options from the parameter.
        const selectedOptions = args[0];

        // Set all the skill sets we have selected to the STORE.
        this.setState({
            insuranceRequirements: selectedOptions,
        });

        // // Set all the tags we have selected to the STORAGE.
        const key = 'workery-create-staff-' + args[1].name;
        localStorageSetObjectOrArrayItem(key, selectedOptions);
    }

    onVehicleTypeMultiChange(...args) {
        // Extract the select options from the parameter.
        const selectedOptions = args[0];

        // Set all the skill sets we have selected to the STORE.
        this.setState({
            vehicleTypes: selectedOptions,
        });

        // // Set all the tags we have selected to the STORAGE.
        const key = 'workery-create-staff-' + args[1].name;
        localStorageSetObjectOrArrayItem(key, selectedOptions);
    }

    onDuesDateChange(dateObj) {
        this.setState(
            { duesDate: dateObj },
            ()=>{ localStorageSetObjectOrArrayItem('workery-create-staff-duesDate', dateObj); }
        );
    }

    onCommercialInsuranceExpiryDate(dateObj) {
        this.setState(
            { commercialInsuranceExpiryDate: dateObj },
            ()=>{ localStorageSetObjectOrArrayItem('workery-create-staff-commercialInsuranceExpiryDate', dateObj); }
        );
    }

    onAutoInsuranceExpiryDateChange(dateObj) {
        this.setState(
            { autoInsuranceExpiryDate: dateObj },
            ()=>{ localStorageSetObjectOrArrayItem('workery-create-staff-autoInsuranceExpiryDate', dateObj); }
        );
    }

    onWsibInsuranceDateChange(dateObj) {
        this.setState(
            { wsibInsuranceDate: dateObj },
            ()=>{ localStorageSetObjectOrArrayItem('workery-create-staff-wsibInsuranceDate', dateObj); }
        );
    }

    onPoliceCheckDateChange(dateObj) {
        this.setState(
            { policeCheck: dateObj },
            ()=>{ localStorageSetObjectOrArrayItem('workery-create-staff-policeCheck', dateObj); }
        );
    }

    onNextClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform staff-side validation.
        const { errors, isValid } = validateStep6CreateInput(this.state);

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
            description, hourlySalaryDesired, limitSpecial, taxId, driversLicenseClass,
            skillSets,
            insuranceRequirements,
            vehicleTypes,
            duesDate, commercialInsuranceExpiryDate, autoInsuranceExpiryDate, wsibInsuranceDate, policeCheck,
            emergencyContactName, emergencyContactRelationship, emergencyContactTelephone, emergencyContactAlternativeTelephone,
            isActive,
            errors, isLoading, returnURL
        } = this.state;

        const { user } = this.props;
        return (
            <StaffCreateStep6Component
                description={description}
                hourlySalaryDesired={hourlySalaryDesired}
                limitSpecial={limitSpecial}
                taxId={taxId}
                driversLicenseClass={driversLicenseClass}
                emergencyContactName={emergencyContactName}
                emergencyContactRelationship={emergencyContactRelationship}
                emergencyContactTelephone={emergencyContactTelephone}
                emergencyContactAlternativeTelephone={emergencyContactAlternativeTelephone}
                onTextChange={this.onTextChange}

                skillSets={skillSets}
                skillSetOptions={getSkillSetReactSelectOptions(this.props.skillSetList)}
                onSkillSetMultiChange={this.onSkillSetMultiChange}

                insuranceRequirements={insuranceRequirements}
                insuranceRequirementOptions={getInsuranceRequirementReactSelectOptions(this.props.insuranceRequirementList)}
                onInsuranceRequirementMultiChange={this.onInsuranceRequirementMultiChange}

                vehicleTypes={vehicleTypes}
                vehicleTypeOptions={getVehicleTypeReactSelectOptions(this.props.vehicleTypeList)}
                onVehicleTypeMultiChange={this.onVehicleTypeMultiChange}

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

                onSelectChange={this.onSelectChange}

                isActive={isActive}
                onRadioChange={this.onRadioChange}

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
        skillSetList: store.skillSetListState,
        insuranceRequirementList: store.insuranceRequirementListState,
        vehicleTypeList: store.vehicleTypeListState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
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
)(StaffCreateStep6Container);
