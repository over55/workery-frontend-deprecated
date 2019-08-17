import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import ClientCreateStep5Component from "../../../components/clients/create/clientCreateStep5Component";
import {
    localStorageGetObjectItem, localStorageSetObjectOrArrayItem
} from '../../../helpers/localStorageUtility';
import { validateStep5CreateInput } from "../../../validators/clientValidator";
import {
    RESIDENTIAL_CUSTOMER_TYPE_OF_ID,
    COMMERCIAL_CUSTOMER_TYPE_OF_ID
} from '../../../constants/api';
import { BASIC_STREET_TYPE_CHOICES, STREET_DIRECTION_CHOICES } from "../../../constants/api";



class ClientCreateStep5Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        this.state = {
            country: localStorage.getItem("workery-create-client-country"),
            region: localStorage.getItem("workery-create-client-region"),
            locality: localStorage.getItem("workery-create-client-locality"),
            postalCode: localStorage.getItem("workery-create-client-postalCode"),
            streetAddress: localStorage.getItem("workery-create-client-streetAddress"),
            errors: {},
            isLoading: false
        }

        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onNextClick = this.onNextClick.bind(this);
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
         const key = "workery-create-client-"+[e.target.name];
         localStorage.setItem(key, e.target.value)
     }

     onSelectChange(option) {
         const optionKey = [option.selectName]+"Option";
         this.setState({
             [option.selectName]: option.value,
             optionKey: option,
         });
         localStorage.setItem('workery-create-client-'+[option.selectName], option.value);
         localStorageSetObjectOrArrayItem('workery-create-client-'+optionKey, option);
         // console.log([option.selectName], optionKey, "|", this.state); // For debugging purposes only.
         // console.log(this.state);
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

    onNextClick(e) {
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
            country, region, locality,
            postalCode, streetAddress,
        } = this.state;
        const { user } = this.props;
        return (
            <ClientCreateStep5Component
                country={country}
                region={region}
                locality={locality}
                streetAddress={streetAddress}
                postalCode={postalCode}
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
