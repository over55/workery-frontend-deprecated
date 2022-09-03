import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import AdminAssociateCreateStep5Component from "../../../../components/associates/admin/create/adminAssociateCreateStep5Component";
import {
    localStorageGetObjectItem, localStorageSetObjectOrArrayItem
} from '../../../../helpers/localStorageUtility';
import { validateStep5CreateInput } from "../../../../validators/associateValidator";
import {
    RESIDENTIAL_CUSTOMER_TYPE_OF_ID,
    COMMERCIAL_CUSTOMER_TYPE_OF_ID
} from '../../../../constants/api';
import { BASIC_STREET_TYPE_CHOICES, STREET_DIRECTION_CHOICES } from "../../../../constants/api";



class AdminAssociateCreateStep5Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Auto-fill the `country` and `region` fields.
        let country = localStorage.getItem("workery-create-associate-country");
        if (country === null || country === "") {
            country = "Canada";
            localStorage.setItem('workery-create-associate-country', country);
        }
        let region = localStorage.getItem("workery-create-associate-region");
        if (region === null || region === "") {
            region = "Ontario";
            localStorage.setItem('workery-create-associate-region', region);
        }

        // Initialize our containers state.
        this.state = {
            country: country,
            region: region,
            locality: localStorage.getItem("workery-create-associate-locality"),
            postalCode: localStorage.getItem("workery-create-associate-postalCode"),
            streetAddress: localStorage.getItem("workery-create-associate-streetAddress"),
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

    onSuccessfulSubmissionCallback(associate) {
        this.setState({ errors: {}, isLoading: true, })
        this.props.history.push("/associates/add/step-6");
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
         const key = "workery-create-associate-"+[e.target.name];
         localStorage.setItem(key, e.target.value)
     }

     onSelectChange(option) {
         const optionKey = [option.selectName]+"Option";
         this.setState({
             [option.selectName]: option.value,
             optionKey: option,
         });
         localStorage.setItem('workery-create-associate-'+[option.selectName], option.value);
         localStorageSetObjectOrArrayItem('workery-create-associate-'+optionKey, option);
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
        localStorage.setItem('workery-create-associate-country', value);
        localStorage.setItem('workery-create-associate-region', null);
    }

    onBillingRegionChange(value) {
        this.setState({ region: value }); // Update state.
        localStorage.setItem('workery-create-associate-region', value); // Update persistent storage.
    }

    onNextClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform associate-side validation.
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
        return (
            <AdminAssociateCreateStep5Component
                {...this}
                {...this.state}
                {...this.props}
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
)(AdminAssociateCreateStep5Container);
