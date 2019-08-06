import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import AssociateCreateStep7Component from "../../../components/associates/create/associateCreateStep7Component";
import { validateStep7CreateInput } from "../../../validators/associateValidator";
import {
    localStorageGetObjectItem, localStorageSetObjectOrArrayItem, localStorageGetArrayItem, localStorageGetDateItem, localStorageGetIntegerItem
} from '../../../helpers/localStorageUtility';
import { getHowHearReactSelectOptions, pullHowHearList } from "../../../actions/howHearActions";
import { getTagReactSelectOptions, pullTagList } from "../../../actions/tagActions";
import {
    RESIDENTIAL_CUSTOMER_TYPE_OF_ID,
    COMMERCIAL_CUSTOMER_TYPE_OF_ID
} from '../../../constants/api';


class AssociateCreateStep7Container extends Component {
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
            returnURL: returnURL,
            typeOf: typeOf,
            tags: localStorageGetArrayItem("workery-create-associate-tags"),
            dateOfBirth: localStorageGetDateItem("workery-create-associate-dateOfBirth"),
            gender: localStorageGetIntegerItem("workery-create-associate-gender"),
            howHear: localStorageGetIntegerItem("workery-create-associate-howHear"),
            howHearOption: localStorageGetObjectItem('workery-create-associate-howHearOption'),
            howHearOther: localStorage.getItem("workery-create-associate-howHearOther"),
            joinDate: localStorageGetDateItem("workery-create-associate-joinDate"),
            comment: localStorage.getItem("workery-create-associate-comment"),
            errors: {},
            isLoading: false
        }

        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onDateOfBirthChange = this.onDateOfBirthChange.bind(this);
        this.onJoinDateChange = this.onJoinDateChange.bind(this);
        this.onMultiChange = this.onMultiChange.bind(this);
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

         // Fetch all our GUI drop-down options which are populated by the API.
        this.props.pullHowHearList(1,1000);
        this.props.pullTagList(1,1000);
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
        });

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
        localStorage.setItem('workery-create-associate-'+[e.target.name], e.target.value);
    }

    onSelectChange(option) {
        const optionKey = [option.selectName]+"Option";
        this.setState({
            [option.selectName]: option.value,
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

    onMultiChange(...args) {
        // Extract the select options from the parameter.
        const selectedOptions = args[0];

        // Set all the tags we have selected to the STORE.
        this.setState({
            tags: selectedOptions,
        });

        // // Set all the tags we have selected to the STORAGE.
        const key = 'workery-create-associate-' + args[1].name;
        localStorageSetObjectOrArrayItem(key, selectedOptions);
    }

    onDateOfBirthChange(dateObj) {
        this.setState({
            dateOfBirth: dateObj,
        })
        localStorageSetObjectOrArrayItem('workery-create-associate-dateOfBirth', dateObj);
    }

    onJoinDateChange(dateObj) {
        this.setState({
            joinDate: dateObj,
        })
        localStorageSetObjectOrArrayItem('workery-create-associate-joinDate', dateObj);
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // console.log(this.state); // For debugging purposes only.

        // Perform associate-side validation.
        const { errors, isValid } = validateStep7CreateInput(this.state);

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
            typeOf, returnURL, tags, dateOfBirth, gender, howHear, howHearOther, joinDate, comment,
            errors
        } = this.state;

        const howHearOptions = getHowHearReactSelectOptions(this.props.howHearList);
        const tagOptions = getTagReactSelectOptions(this.props.tagList);

        return (
            <AssociateCreateStep7Component
                typeOf={typeOf}
                returnURL={returnURL}
                tags={tags}
                tagOptions={tagOptions}
                dateOfBirth={dateOfBirth}
                gender={gender}
                joinDate={joinDate}
                errors={errors}
                onTextChange={this.onTextChange}
                howHear={howHear}
                howHearOptions={howHearOptions}
                howHearOther={howHearOther}
                comment={comment}
                onSelectChange={this.onSelectChange}
                onRadioChange={this.onRadioChange}
                onMultiChange={this.onMultiChange}
                onDateOfBirthChange={this.onDateOfBirthChange}
                onJoinDateChange={this.onJoinDateChange}
                onClick={this.onClick}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        tagList: store.tagListState,
        howHearList: store.howHearListState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
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
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AssociateCreateStep7Container);
