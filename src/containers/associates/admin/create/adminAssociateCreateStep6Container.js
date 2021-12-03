import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import AdminAssociateCreateStep6Component from "../../../../components/associates/admin/create/adminAssociateCreateStep6Component";
import {
    localStorageGetObjectItem,
    localStorageSetObjectOrArrayItem,
    localStorageGetArrayItem,
    localStorageGetIntegerItem,
    localStorageGetDateItem
} from '../../../../helpers/localStorageUtility';
import { validateStep6CreateInput } from "../../../../validators/associateValidator";
import {
    RESIDENTIAL_CUSTOMER_TYPE_OF_ID,
    COMMERCIAL_CUSTOMER_TYPE_OF_ID
} from '../../../../constants/api';
import { getSkillSetReactSelectOptions, getPickedSkillSetReactSelectOptions, pullSkillSetList } from "../../../../actions/skillSetActions";
import { getInsuranceRequirementReactSelectOptions, getPickedInsuranceRequirementReactSelectOptions, pullInsuranceRequirementList } from "../../../../actions/insuranceRequirementActions";
import { getVehicleTypeReactSelectOptions, getPickedVehicleTypeReactSelectOptions, pullVehicleTypeList } from "../../../../actions/vehicleTypeActions";
import { pullServiceFeeList, getServiceFeeReactSelectOptions } from "../../../../actions/serviceFeeActions";


class AdminAssociateCreateStep6Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        this.state = {
            isSkillsetLoading: true,
            skillSets: localStorageGetArrayItem("workery-create-associate-skillSets"),
            isInsuranceRequirementsLoading: true,
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
            isVehicleTypesLoading: true,
            vehicleTypes: localStorageGetArrayItem("workery-create-associate-vehicleTypes"),
            isServiceFeeLoading: true,
            serviceFeeId: localStorageGetIntegerItem("workery-create-associate-serviceFeeId"),
            emergencyContactName: localStorage.getItem("workery-create-associate-emergencyContactName"),
            emergencyContactRelationship: localStorage.getItem("workery-create-associate-emergencyContactRelationship"),
            emergencyContactTelephone: localStorage.getItem("workery-create-associate-emergencyContactTelephone"),
            emergencyContactAlternativeTelephone: localStorage.getItem("workery-create-associate-emergencyContactAlternativeTelephone"),
            isActive: localStorageGetIntegerItem("workery-create-associate-isActive"),
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
        this.onSkillSetSuccessFetch = this.onSkillSetSuccessFetch.bind(this);
        this.onInsuranceRequirementsSuccessFetch = this.onInsuranceRequirementsSuccessFetch.bind(this);
        this.onVehicleTypesSuccessFetch = this.onVehicleTypesSuccessFetch.bind(this);
        this.onFetchedServiceFeeCallback = this.onFetchedServiceFeeCallback.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.

        // DEVELOPERS NOTE: Fetch our skillset list.
        const parametersMap = new Map()
        parametersMap.set("isArchived", 3)
        this.props.pullSkillSetList(0, 1000, parametersMap, this.onSkillSetSuccessFetch);
        this.props.pullInsuranceRequirementList(0, 1000, parametersMap, this.onInsuranceRequirementsSuccessFetch);
        this.props.pullVehicleTypeList(0, 1000, parametersMap, this.onVehicleTypesSuccessFetch);
        this.props.pullServiceFeeList(0, 1000, parametersMap, this.onFetchedServiceFeeCallback);
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
        this.props.history.push("/associates/add/step-7");
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

    onSkillSetSuccessFetch(howHearList) {
        this.setState({ isSkillsetLoading: false, });
    }

    onInsuranceRequirementsSuccessFetch(response) {
        this.setState({ isInsuranceRequirementsLoading: false, });
    }

    onVehicleTypesSuccessFetch(response) {
        this.setState({ isVehicleTypesLoading: false, });
    }

    onFetchedServiceFeeCallback(response) {
        this.setState({ isServiceFeeLoading: false, });
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
        const key = "workery-create-associate-"+[e.target.name];
        localStorage.setItem(key, e.target.value)
    }

    onSelectChange(option) {
        console.log(option);
        const optionKey = [option.selectName].toString()+"Option";
        const optionLabel = [option.selectName].toString()+"Label";
        this.setState({
            [option.selectName]: option.value,
            [optionLabel]: option.label,
            optionKey: option,
        });
        localStorage.setItem('workery-create-associate-'+[option.selectName].toString(), option.value);
        localStorage.setItem('workery-create-associate-'+[option.selectName].toString()+"Label", option.label);
        localStorageSetObjectOrArrayItem('workery-create-associate-'+optionKey, option);
        // console.log([option.selectName], optionKey, "|", this.state); // For debugging purposes only.
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

        // We need to only return our `id` values, therefore strip out the
        // `react-select` options format of the data and convert it into an
        // array of integers to hold the primary keys of the `Tag` items selected.
        let pickedSkillSets = [];
        if (selectedOptions !== null && selectedOptions !== undefined) {
            for (let i = 0; i < selectedOptions.length; i++) {
                let pickedOption = selectedOptions[i];
                pickedOption.skillSetId = pickedOption.value;
                pickedSkillSets.push(pickedOption);
            }
        }
        this.setState({ skillSets: pickedSkillSets, });

        // // Set all the tags we have selected to the STORAGE.
        const key = 'workery-create-associate-' + args[1].name;
        localStorageSetObjectOrArrayItem(key, pickedSkillSets);
    }

    onInsuranceRequirementMultiChange(...args) {
        // Extract the select options from the parameter.
        const selectedOptions = args[0];

        // We need to only return our `id` values, therefore strip out the
        // `react-select` options format of the data and convert it into an
        // array of integers to hold the primary keys of the `Tag` items selected.
        let pickedInsuranceRequirements = [];
        if (selectedOptions !== null && selectedOptions !== undefined) {
            for (let i = 0; i < selectedOptions.length; i++) {
                let pickedOption = selectedOptions[i];
                pickedOption.insuranceRequirementId = pickedOption.value;
                pickedInsuranceRequirements.push(pickedOption);
            }
        }
        this.setState({ insuranceRequirements: pickedInsuranceRequirements, });

        // // Set all the tags we have selected to the STORAGE.
        const key = 'workery-create-associate-' + args[1].name;
        localStorageSetObjectOrArrayItem(key, pickedInsuranceRequirements);
    }

    onVehicleTypeMultiChange(...args) {
        // Extract the select options from the parameter.
        const selectedOptions = args[0];

        // We need to only return our `id` values, therefore strip out the
        // `react-select` options format of the data and convert it into an
        // array of integers to hold the primary keys of the `Tag` items selected.
        let pickedVehicleTypes = [];
        if (selectedOptions !== null && selectedOptions !== undefined) {
            for (let i = 0; i < selectedOptions.length; i++) {
                let pickedOption = selectedOptions[i];
                pickedOption.vehicleTypeId = pickedOption.value;
                pickedVehicleTypes.push(pickedOption);
            }
        }
        this.setState({ vehicleTypes: pickedVehicleTypes, });

        // // Set all the tags we have selected to the STORAGE.
        const key = 'workery-create-associate-' + args[1].name;
        localStorageSetObjectOrArrayItem(key, pickedVehicleTypes);
    }

    onDuesDateChange(dateObj) {
        this.setState(
            { duesDate: dateObj },
            ()=>{ localStorageSetObjectOrArrayItem('workery-create-associate-duesDate', dateObj); }
        );
    }

    onCommercialInsuranceExpiryDate(dateObj) {
        this.setState(
            { commercialInsuranceExpiryDate: dateObj },
            ()=>{ localStorageSetObjectOrArrayItem('workery-create-associate-commercialInsuranceExpiryDate', dateObj); }
        );
    }

    onAutoInsuranceExpiryDateChange(dateObj) {
        this.setState(
            { autoInsuranceExpiryDate: dateObj },
            ()=>{ localStorageSetObjectOrArrayItem('workery-create-associate-autoInsuranceExpiryDate', dateObj); }
        );
    }

    onWsibInsuranceDateChange(dateObj) {
        this.setState(
            { wsibInsuranceDate: dateObj },
            ()=>{ localStorageSetObjectOrArrayItem('workery-create-associate-wsibInsuranceDate', dateObj); }
        );
    }

    onPoliceCheckDateChange(dateObj) {
        this.setState(
            { policeCheck: dateObj },
            ()=>{ localStorageSetObjectOrArrayItem('workery-create-associate-policeCheck', dateObj); }
        );
    }

    onNextClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform associate-side validation.
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
            skillSets, insuranceRequirements, vehicleTypes,
        } = this.state;

        const skillSetOptions = getSkillSetReactSelectOptions(this.props.skillSetList);
        const transcodedSkillSets = getPickedSkillSetReactSelectOptions(skillSets, this.props.skillSetList)

        const insuranceRequirementOptions = getInsuranceRequirementReactSelectOptions(this.props.insuranceRequirementList);
        const transcodedInsuranceRequirements = getPickedInsuranceRequirementReactSelectOptions(insuranceRequirements, this.props.insuranceRequirementList)

        const vehicleTypeOptions = getVehicleTypeReactSelectOptions(this.props.vehicleTypeList);
        const transcodedVehicleTypes = getPickedVehicleTypeReactSelectOptions(vehicleTypes, this.props.vehicleTypeList)

        return (
            <AdminAssociateCreateStep6Component
                {...this}
                {...this.state}
                {...this.props}
                skillSets={transcodedSkillSets}
                skillSetOptions={getSkillSetReactSelectOptions(this.props.skillSetList)}
                insuranceRequirements={transcodedInsuranceRequirements}
                insuranceRequirementOptions={getInsuranceRequirementReactSelectOptions(this.props.insuranceRequirementList)}
                vehicleTypes={transcodedVehicleTypes}
                vehicleTypeOptions={getVehicleTypeReactSelectOptions(this.props.vehicleTypeList)}
                serviceFeeOptions={getServiceFeeReactSelectOptions(this.props.serviceFeeList)}
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
        serviceFeeList: store.serviceFeeListState,
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
        pullServiceFeeList: (page, sizePerPage, map, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullServiceFeeList(page, sizePerPage, map, onSuccessCallback, onFailureCallback)
            )
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminAssociateCreateStep6Container);
