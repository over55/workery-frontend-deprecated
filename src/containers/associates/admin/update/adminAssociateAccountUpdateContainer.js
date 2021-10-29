import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';
import * as moment from 'moment';
import isEmpty from 'lodash/isEmpty';
import {
    localStorageGetObjectItem, localStorageSetObjectOrArrayItem
} from '../../../../helpers/localStorageUtility';

import AdminAssociateAccountUpdateComponent from "../../../../components/associates/admin/update/adminAssociateAccountUpdateComponent";
import { setFlashMessage } from "../../../../actions/flashMessageActions";
import { validateAccountInput } from "../../../../validators/associateValidator";
import { getSkillSetReactSelectOptions, getPickedSkillSetReactSelectOptions, pullSkillSetList } from "../../../../actions/skillSetActions";
import { getInsuranceRequirementReactSelectOptions, getPickedInsuranceRequirementReactSelectOptions, pullInsuranceRequirementList } from "../../../../actions/insuranceRequirementActions";
import { getVehicleTypeReactSelectOptions, getPickedVehicleTypeReactSelectOptions, pullVehicleTypeList } from "../../../../actions/vehicleTypeActions";
import { putAssociateAccountDetail } from "../../../../actions/associateActions";
import { pullServiceFeeList, getServiceFeeReactSelectOptions } from "../../../../actions/serviceFeeActions";


class AdminAssociateAccountUpdateContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { id } = this.props.match.params;

        // The following code will extract our financial data from the local
        // storage if the financial data was previously saved.
        const associate = this.props.associateDetail;
        const isLoading = isEmpty(associate);

        // Get our dates based on our browsers timezone.
        // https://github.com/angular-ui/bootstrap/issues/2628#issuecomment-55125516
        const duesDateObj = new Date(associate.duesDate);
        duesDateObj.setMinutes( duesDateObj.getMinutes() + duesDateObj.getTimezoneOffset() );
        const commercialInsuranceExpiryDateObj = new Date(associate.commercialInsuranceExpiryDate);
        commercialInsuranceExpiryDateObj.setMinutes( commercialInsuranceExpiryDateObj.getMinutes() + commercialInsuranceExpiryDateObj.getTimezoneOffset() );
        const autoInsuranceExpiryDateObj = new Date(associate.autoInsuranceExpiryDate);
        autoInsuranceExpiryDateObj.setMinutes( autoInsuranceExpiryDateObj.getMinutes() + autoInsuranceExpiryDateObj.getTimezoneOffset() );
        const wsibInsuranceDateObj = new Date(associate.wsibInsuranceDate);
        wsibInsuranceDateObj.setMinutes( wsibInsuranceDateObj.getMinutes() + wsibInsuranceDateObj.getTimezoneOffset() );
        const policeCheckObj = new Date(associate.policeCheck);
        policeCheckObj.setMinutes( policeCheckObj.getMinutes() + policeCheckObj.getTimezoneOffset() );

        this.state = {
            // STEP 3
            // typeOf: typeOf,

            name: associate.name,
            isSkillSetsLoading: true,
            skillSets: associate.skillSets,
            insuranceRequirements: associate.insuranceRequirements,
            isInsuranceRequirementsLoading: true,
            description: associate.description,
            hourlySalaryDesired: associate.hourlySalaryDesired,
            limitSpecial: associate.limitSpecial,
            duesDate: duesDateObj,
            commercialInsuranceExpiryDate: commercialInsuranceExpiryDateObj,
            autoInsuranceExpiryDate: autoInsuranceExpiryDateObj,
            wsibNumber: associate.wsibNumber,
            wsibInsuranceDate: wsibInsuranceDateObj,
            policeCheck: policeCheckObj,
            taxId: associate.taxId,
            driversLicenseClass: associate.driversLicenseClass,
            isVehicleTypesLoading: true,
            isServiceFeeLoading: true,
            serviceFeeId: associate.serviceFeeId,
            vehicleTypes: associate.vehicleTypes,
            emergencyContactName: associate.emergencyContactName,
            emergencyContactRelationship: associate.emergencyContactRelationship,
            emergencyContactTelephone: associate.emergencyContactTelephone,
            emergencyContactAlternativeTelephone: associate.emergencyContactAlternativeTelephone,

            // Everything else...
            errors: {},
            isLoading: false,
            id: id,
            fullName: associate.fullName,
        }

        this.getPostData = this.getPostData.bind(this);
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
        this.onClick = this.onClick.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
        this.onFetchedSkillSetsCallback = this.onFetchedSkillSetsCallback.bind(this);
        this.onFetchedInsuranceRequirementsCallback = this.onFetchedInsuranceRequirementsCallback.bind(this);
        this.onFetchedVehicleTypesCallback = this.onFetchedVehicleTypesCallback.bind(this);
        this.onFetchedServiceFeeCallback = this.onFetchedServiceFeeCallback.bind(this);
    }

    /**
     *  Utility function used to create the `postData` we will be submitting to
     *  the API; as a result, this function will structure some dictionary key
     *  items under different key names to support our API web-service's API.
     */
    getPostData() {
        let postData = Object.assign({}, this.state);

        // (2) Middle name (API ISSUE)
        postData.middleName = this.state.middleName;

        // (2) Join date - We need to format as per required API format.
        const joinDateMoment = moment(this.state.joinDate);
        postData.joinDate = joinDateMoment.format("YYYY-MM-DD");

        const duesDateMoment = moment(this.state.duesDate);
        postData.duesDate = duesDateMoment.format("YYYY-MM-DD");

        const commercialInsuranceExpiryDateMoment = moment(this.state.commercialInsuranceExpiryDate);
        postData.commercialInsuranceExpiryDate = commercialInsuranceExpiryDateMoment.format("YYYY-MM-DD");

        const autoInsuranceExpiryDateMoment = moment(this.state.autoInsuranceExpiryDate);
        postData.autoInsuranceExpiryDate = autoInsuranceExpiryDateMoment.format("YYYY-MM-DD");

        const wsibInsuranceDateMoment = moment(this.state.wsibInsuranceDatej);
        postData.wsibInsuranceDate = wsibInsuranceDateMoment.format("YYYY-MM-DD");

        const policeCheckMoment = moment(this.state.policeCheck);
        postData.policeCheck = policeCheckMoment.format("YYYY-MM-DD");

        // (4) How Hear Other - This field may not be null, therefore make blank.
        if (this.state.howHearOther === undefined || this.state.howHearOther === null) {
            postData.howHearOther = "";
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

        // (8) Telephone type: This field is required.;
        postData.telephone = this.state.primaryPhone;
        if (this.state.telephoneTypeOf === undefined || this.state.telephoneTypeOf === null || this.state.telephoneTypeOf === "") {
            postData.telephoneTypeOf = 1;
        }
        postData.otherTelephone = this.state.secondaryPhone;
        if (this.state.otherTelephoneTypeOf === undefined || this.state.otherTelephoneTypeOf === null || this.state.otherTelephoneTypeOf === "") {
            postData.otherTelephoneTypeOf = 1;
        }

        // (9) Address Country: This field is required.
        postData.addressCountry = this.state.country;

        // (10) Address Locality: This field is required.
        postData.addressLocality = this.state.locality;

        // (11) Address Region: This field is required.
        postData.addressRegion = this.state.region

        postData.isActive = true;

        postData.hourlySalaryDesired = parseInt(this.state.hourlySalaryDesired);

        //
        // Generate our PKs.
        //

        let ssPKs = [];
        for (let ss of this.state.skillSets) {
            ssPKs.push(ss.skillSetId);
        }
        postData.skillSets = ssPKs;

        let iiPKs = [];
        for (let ii of this.state.insuranceRequirements) {
            iiPKs.push(ii.insuranceRequirementId);
        }
        postData.insuranceRequirements = iiPKs;

        let vtPKs = [];
        for (let vt of this.state.vehicleTypes) {
            vtPKs.push(vt.vehicleTypeId);
        }
        postData.vehicleTypes = vtPKs;

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

        // DEVELOPERS NOTE: Fetch our skillset list.
        const parametersMap = new Map()
        parametersMap.set("isArchived", 3)
        this.props.pullSkillSetList(1, 1000, parametersMap, this.onFetchedSkillSetsCallback);
        this.props.pullInsuranceRequirementList(1, 1000, parametersMap, this.onFetchedInsuranceRequirementsCallback);
        this.props.pullVehicleTypeList(1, 1000, parametersMap, this.onFetchedVehicleTypesCallback);
        this.props.pullServiceFeeList(1, 1000, parametersMap, this.onFetchedServiceFeeCallback);

        console.log("LOG|associateId", this.state.id);
        console.log("LOG|skillSets", this.state.skillSets);
        console.log("LOG|insuranceRequirements", this.state.insuranceRequirements);
        console.log("LOG|vehicleTypes", this.state.vehicleTypes);
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
        console.log("onSuccessfulSubmissionCallback | associate:", associate);

        // The following code will save the object to the browser's local
        // storage to be retrieved later more quickly.
        localStorageSetObjectOrArrayItem("workery-admin-retrieve-associate-"+this.state.id.toString(), associate);

        this.setState({ isLoading: false, associate: associate, errors:{} });
        this.props.setFlashMessage("success", "Associate has been successfully updated.");
        this.props.history.push("/associate/"+this.state.id+"/full");
    }

    onFailedSubmissionCallback(errors) {
        this.setState({ errors: errors, isLoading: false, });

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    onFetchedSkillSetsCallback(response) {
        this.setState({ isSkillSetsLoading: false, });
    }

    onFetchedInsuranceRequirementsCallback(response) {
        this.setState({ isInsuranceRequirementsLoading: false, });
    }

    onFetchedVehicleTypesCallback(response) {
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
        // AccountUpdate our state.
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
    }

    onTagMultiChange(...args) {
        // Extract the select options from the parameter.
        const selectedOptions = args[0];

        // We need to only return our `id` values, therefore strip out the
        // `react-select` options format of the data and convert it into an
        // array of integers to hold the primary keys of the `Tag` items selected.
        let pickedTags = [];
        if (selectedOptions !== null && selectedOptions !== undefined) {
            for (let i = 0; i < selectedOptions.length; i++) {
                let pickedOption = selectedOptions[i];
                pickedOption.tagId = pickedOption.value;
                pickedTags.push(pickedOption);
            }
        }
        this.setState({ tags: pickedTags, });
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
        const { errors, isValid } = validateAccountInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.setState({ errors: {}, isLoading: true}, ()=>{
                this.props.putAssociateAccountDetail(
                    this.getPostData(),
                    this.onSuccessfulSubmissionCallback,
                    this.onFailedSubmissionCallback
                );
            });

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
            <AdminAssociateAccountUpdateComponent
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
        associateDetail: store.associateDetailState,
        skillSetList: store.skillSetListState,
        insuranceRequirementList: store.insuranceRequirementListState,
        vehicleTypeList: store.vehicleTypeListState,
        serviceFeeList: store.serviceFeeListState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
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
        putAssociateAccountDetail: (data, onSuccessCallback, onFailureCallback) => {
            dispatch(
                putAssociateAccountDetail(data, onSuccessCallback, onFailureCallback)
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
)(AdminAssociateAccountUpdateContainer);
