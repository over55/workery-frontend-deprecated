import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import ClientCreateStep5Component from "../../../components/clients/create/clientCreateStep5Component";
import {
    localStorageGetObjectItem, localStorageSetObjectOrArrayItem
} from '../../../helpers/localStorageUtility';
import { validateStep5CreateInput } from "../../../validators/clientValidator";
import {
    RESIDENCE_TYPE_OF,
    BUSINESS_TYPE_OF,
    COMMUNITY_CARES_TYPE_OF
} from '../../../constants/api';
import { BASIC_STREET_TYPE_CHOICES, STREET_DIRECTION_CHOICES } from "../../../constants/api";



class ClientCreateStep5Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Get the type of.
        const typeOf = parseInt(localStorage.getItem("nwapp-create-client-typeOf"));
        let returnURL;
        if (typeOf === RESIDENCE_TYPE_OF || typeOf === COMMUNITY_CARES_TYPE_OF) {
            returnURL = "/clients/add/step-4-rez-or-cc";
        }
        else if (typeOf === BUSINESS_TYPE_OF) {
            returnURL = "/clients/add/step-4-biz";
        }

        this.state = {
            returnURL: returnURL,
            typeOf: typeOf,
            billingCountry: localStorage.getItem("add-device-billingCountry"),
            billingRegion: localStorage.getItem("add-device-billingRegion"),
            billingLocality: localStorage.getItem("add-device-billingLocality"),
            billingPostalCode: localStorage.getItem("add-device-billingPostalCode"),
            billingTelephone: localStorage.getItem("add-device-billingTelephone"),
            billingEmail: localStorage.getItem("add-device-billingEmail"),
            billingStreetAddress: localStorage.getItem("add-device-billingStreetAddress"),
            errors: {},
            isLoading: false
        }

        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
        this.onBillingCountryChange = this.onBillingCountryChange.bind(this);
        this.onBillingRegionChange = this.onBillingRegionChange.bind(this);
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

    onSuccessfulSubmissionCallback(client) {
        this.setState({ errors: {}, isLoading: true, })
        this.props.history.push("/clients/add/step-6");
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
         const key = "add-device-"+[e.target.name];
         localStorage.setItem(key, e.target.value)
     }

     onSelectChange(option) {
         const optionKey = [option.selectName]+"Option";
         this.setState({
             [option.selectName]: option.value,
             optionKey: option,
         });
         localStorage.setItem('add-device-'+[option.selectName], option.value);
         localStorageSetObjectOrArrayItem('add-device-'+optionKey, option);
         // console.log([option.selectName], optionKey, "|", this.state); // For debugging purposes only.
         // console.log(this.state);
     }

    onBillingCountryChange(value) {
        // Update state.
        if (value === null || value === undefined || value === '') {
            this.setState({ billingCountry: null, billingRegion: null })
        } else {
            this.setState({ billingCountry: value, billingRegion: null })
        }

        // Update persistent storage.
        localStorage.setItem('add-device-billingCountry', value);
        localStorage.setItem('add-device-billingRegion', null);
    }

    onBillingRegionChange(value) {
        this.setState({ billingRegion: value }); // Update state.
        localStorage.setItem('add-device-billingRegion', value); // Update persistent storage.
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateStep5CreateInput(this.state);

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
        const { referrer, errors, isLoading } = this.state;
        const {
            billingGivenName, billingLastName,
            billingCountry, billingRegion, billingLocality,
            billingPostalCode, billingStreetAddress,
            billingEmail, billingTelephone,
        } = this.state;
        const { user } = this.props;
        return (
            <ClientCreateStep5Component
                billingGivenName={billingGivenName}
                billingLastName={billingLastName}
                billingCountry={billingCountry}
                billingRegion={billingRegion}
                billingLocality={billingLocality}
                billingStreetAddress={billingStreetAddress}
                billingPostalCode={billingPostalCode}
                billingEmail={billingEmail}
                billingTelephone={billingTelephone}
                onTextChange={this.onTextChange}
                onSelectChange={this.onSelectChange}
                onBillingCountryChange={this.onBillingCountryChange}
                onBillingRegionChange={this.onBillingRegionChange}
                onNextClick={this.onNextClick}
                errors={errors}
                isLoading={isLoading}
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
    return {}
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ClientCreateStep5Container);
