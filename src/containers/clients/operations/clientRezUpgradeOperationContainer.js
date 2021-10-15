import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import ClientRezUpgradeOperationComponent from "../../../components/clients/operations/clientRezUpgradeOperationComponent";
import { validateResidentialUpgradeInput } from "../../../validators/clientValidator";
import {
    COMMERCIAL_CUSTOMER_TYPE_OF_ID
} from '../../../constants/api';
import { localStorageSetObjectOrArrayItem, localStorageGetIntegerItem } from '../../../helpers/localStorageUtility';
import { postClientResidentialUpgradeDetail } from "../../../actions/clientActions";
import { setFlashMessage } from "../../../actions/flashMessageActions";


class ClientRezUpgradeOperationContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            organizationName: "",
            organizationTypeOf: "",
            country: "",
            region: "",
            locality: "",
            postalCode: "",
            streetAddress: "",
            errors: {},
            isLoading: false,
            client: {},
        }

        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
        this.onBillingRegionChange = this.onBillingRegionChange.bind(this);
        this.onBillingCountryChange = this.onBillingCountryChange.bind(this);
        this.onClick = this.onClick.bind(this);
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

        postData.customerId = this.props.clientDetail.id;
        postData.organizationName = this.state.organizationName;
        // 'organization_type_of',
        postData.organizationAddressCountry = this.state.country;
        postData.organizationAddressLocality = this.state.locality;
        postData.organizationAddressRegion = this.state.region;
        postData.organizationPostOfficeBoxNumber = "";
        postData.organizationPostalCode = this.state.postalCode;
        postData.organizationStreetAddress = this.state.streetAddress;
        postData.organizationStreetAddressExtra = "";

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

        // DEVELOPERS NOTE:
        // Since we are in this page, we need to assign the user to be
        // a business type user.
        localStorage.setItem("workery-create-client-typeOf", COMMERCIAL_CUSTOMER_TYPE_OF_ID);
        localStorage.setItem("workery-create-client-typeOf-label", "Business");
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

    onSuccessCallback(response) {
        console.log("onSuccessCallback | Fetched:", response);
        this.props.setFlashMessage("success", "Residential client has been successfully upgraded to business client.");
        this.props.history.push("/client/"+this.props.clientDetail.id+"/operations");
    }

    onFailureCallback(errors) {
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
        this.setState({
            [e.target.name]: e.target.value,
        })
        const key = "workery-create-client-biz-"+[e.target.name];
        localStorage.setItem(key, e.target.value);
    }

    onSelectChange(option) {
        console.log(option);
        const optionKey = [option.selectName]+"Option";
        this.setState(
            { [option.selectName]: option.value, [optionKey]: option, },
            ()=>{
                console.log([option.selectName], optionKey, "|", this.state); // For debugging purposes only.
            }
        );
    }

    onRadioChange(e) {
        // Get the values.
        const storageValueKey = "workery-create-client-biz-"+[e.target.name];
        const storageLabelKey =  "workery-create-client-biz-"+[e.target.name].toString()+"-label";
        const value = e.target.value;
        const label = e.target.dataset.label; // Note: 'dataset' is a react data via https://stackoverflow.com/a/20383295
        const storeValueKey = [e.target.name].toString();
        const storeLabelKey = [e.target.name].toString()+"Label";

        // Save the data.
        this.setState({ [e.target.name]: value, }); // Save to store.
        this.setState({ storeLabelKey: label, }); // Save to store.
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

    onBillingCountryChange(value) {
        // Update state.
        if (value === null || value === undefined || value === '') {
            this.setState({ country: null, region: null })
        } else {
            this.setState({ country: value, region: null })
        }

        // Update persistent storage.
        localStorage.setItem('workery-create-client-country', value);
        localStorage.setItem('workery-create-client-region', null);
    }

    onBillingRegionChange(value) {
        this.setState({ region: value }); // Update state.
        localStorage.setItem('workery-create-client-region', value); // Update persistent storage.
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateResidentialUpgradeInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {

            this.setState({ isLoading: true, errors: [] }, ()=>{
                this.props.postClientResidentialUpgradeDetail(
                    this.getPostData(),
                    this.onSuccessCallback,
                    this.onFailureCallback
                );
            })

        // CASE 2 OF 2: Validation was a failure.
        } else {
            this.onFailureCallback(errors);
        }
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const {
            organizationName, organizationTypeOf, country, region, locality, postalCode, streetAddress,
            errors
        } = this.state;
        return (
            <ClientRezUpgradeOperationComponent
                organizationName={organizationName}
                organizationTypeOf={organizationTypeOf}
                country={country}
                region={region}
                locality={locality}
                postalCode={postalCode}
                streetAddress={streetAddress}
                errors={errors}
                onTextChange={this.onTextChange}
                onSelectChange={this.onSelectChange}
                onRadioChange={this.onRadioChange}
                onClick={this.onClick}
                client={this.props.clientDetail}
                onBillingCountryChange={this.onBillingCountryChange}
                onBillingRegionChange={this.onBillingRegionChange}
            />
        );
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
        },
        postClientResidentialUpgradeDetail: (postData, onSuccessCallback, onFailureCallback) => {
            dispatch(
                postClientResidentialUpgradeDetail(postData, onSuccessCallback, onFailureCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ClientRezUpgradeOperationContainer);
