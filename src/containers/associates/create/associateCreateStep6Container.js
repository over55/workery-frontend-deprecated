import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import AssociateCreateStep6Component from "../../../components/associates/create/associateCreateStep6Component";
import {
    localStorageGetObjectItem, localStorageSetObjectOrArrayItem, localStorageGetArrayItem
} from '../../../helpers/localStorageUtility';
import { validateStep6CreateInput } from "../../../validators/associateValidator";
import {
    RESIDENTIAL_CUSTOMER_TYPE_OF_ID,
    COMMERCIAL_CUSTOMER_TYPE_OF_ID
} from '../../../constants/api';
import { getSkillSetReactSelectOptions, pullSkillSetList } from "../../../actions/skillSetActions";


class AssociateCreateStep6Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Get the type of.
        const typeOf = parseInt(localStorage.getItem("workery-create-associate-typeOf"));
        let returnURL;
        if (typeOf === RESIDENTIAL_CUSTOMER_TYPE_OF_ID) {
            returnURL = "/associates/add/step-4-rez-or-cc";
        }
        else if (typeOf === COMMERCIAL_CUSTOMER_TYPE_OF_ID) {
            returnURL = "/associates/add/step-4-biz";
        }

        this.state = {
            skillSet: localStorageGetArrayItem("workery-create-associate-skillSet"),
            returnURL: returnURL,
            typeOf: typeOf,
            errors: {},
            isLoading: false
        }

        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onSkillSetMultiChange = this.onSkillSetMultiChange.bind(this);
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
            [optionKey]: option,
        });
        localStorage.setItem('workery-create-associate-'+[option.selectName], option.value);
        localStorageSetObjectOrArrayItem('workery-create-associate-'+optionKey, option);
        // console.log([option.selectName], optionKey, "|", this.state); // For debugging purposes only.
        // console.log(this.state);
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

        // Set all the skill sets we have selected to the STORE.
        this.setState({
            skillSet: selectedOptions,
        });

        // // Set all the tags we have selected to the STORAGE.
        const key = 'workery-create-associate-' + args[1].name;
        localStorageSetObjectOrArrayItem(key, selectedOptions);
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
        const { skillSet, errors, isLoading, returnURL } = this.state;
        const {
            country, region, locality,
            postalCode, streetAddress,
        } = this.state;
        const { user } = this.props;
        console.log("RENDER", skillSet);
        return (
            <AssociateCreateStep6Component
                skillSet={skillSet}
                skillSetOptions={getSkillSetReactSelectOptions(this.props.skillSetList)}

                onTextChange={this.onTextChange}
                onSelectChange={this.onSelectChange}
                onRadioChange={this.onRadioChange}
                onSkillSetMultiChange={this.onSkillSetMultiChange}
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
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullSkillSetList: (page, sizePerPage, map, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullSkillSetList(page, sizePerPage, map, onSuccessCallback, onFailureCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AssociateCreateStep6Container);
