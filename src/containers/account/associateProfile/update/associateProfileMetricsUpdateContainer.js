import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';
import * as moment from 'moment';

import AssociateProfileMetricsUpdateComponent from "../../../../components/account/associateProfile/update/associateProfileMetricsUpdateComponent";
import { setFlashMessage } from "../../../../actions/flashMessageActions";
import { validateMetricsInput } from "../../../../validators/associateValidator";
import { getHowHearReactSelectOptions, pullHowHearList } from "../../../../actions/howHearActions";
import { getTagReactSelectOptions, getPickedTagReactSelectOptions, pullTagList } from "../../../../actions/tagActions";
import { putAssociateMetricsDetail } from "../../../../actions/associateActions";


class AssociateProfileMetricsUpdateContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Get our dates based on our browsers timezone.
        // https://github.com/angular-ui/bootstrap/issues/2628#issuecomment-55125516
        const birthdateObj = this.props.user.birthdate ? new Date(this.props.user.birthdate) : null;
        birthdateObj.setMinutes( birthdateObj.getMinutes() + birthdateObj.getTimezoneOffset() );
        const joinDateObj = new Date(this.props.user.joinDate);
        joinDateObj.setMinutes( joinDateObj.getMinutes() + joinDateObj.getTimezoneOffset() );

        this.state = {
            // STEP 3
            // typeOf: typeOf,

            // STEP 4
            givenName: this.props.user.givenName,
            lastName: this.props.user.lastName,

            // STEP 7
            isTagsLoading: true,
            tags: this.props.user.tags,
            gender: this.props.user.gender,
            isHowHearLoading: true,
            howHear: this.props.user.howHear,
            howHearOption: this.props.user.howHearOption,
            howHearOther: this.props.user.howHearOther,
            dateOfBirth: birthdateObj,
            joinDate: joinDateObj,

            // Everything else...
            errors: {},
            isLoading: false,
            associateId: this.props.user.associateId,
            id: this.props.user.associateId,
            fullName: this.props.user.fullName,
        }

        this.getPostData = this.getPostData.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onTagMultiChange = this.onTagMultiChange.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
        this.onJoinDateChange = this.onJoinDateChange.bind(this);
        this.onDateOfBirthChange = this.onDateOfBirthChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
        this.onTagsSuccessFetch = this.onTagsSuccessFetch.bind(this);
        this.onHowHearSuccessFetch = this.onHowHearSuccessFetch.bind(this);
    }

    /**
     *  Utility function used to create the `postData` we will be submitting to
     *  the API; as a result, this function will structure some dictionary key
     *  items under different key names to support our API web-service's API.
     */
    getPostData() {
        let postData = Object.assign({}, this.state);

        // (1) Join date - We need to format as per required API format.
        const joinDateMoment = moment(this.state.joinDate);
        postData.joinDate = joinDateMoment.format("YYYY-MM-DD");

        // (2) Birthdate date - We need to format as per required API format.
        const birthDateMoment = moment(this.state.dateOfBirth);
        postData.birthdate = birthDateMoment.format("YYYY-MM-DD");

        // (4) How Hear Other - This field may not be null, therefore make blank.
        if (this.state.howHearOther === undefined || this.state.howHearOther === null) {
            postData.howHearOther = "";
        }

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
        this.props.pullHowHearList(1,1000, parametersMap, this.onHowHearSuccessFetch);
        this.props.pullTagList(1, 1000, parametersMap, this.onTagsSuccessFetch);
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
        this.props.history.push("/profile/associate/full");
    }

    onFailedSubmissionCallback(errors) {
        this.setState({ errors: errors, isLoading: false, });

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    onTagsSuccessFetch(tags) {
        this.setState({ isTagsLoading: false, });
    }

    onHowHearSuccessFetch(howHearList) {
        this.setState({ isHowHearLoading: false, });
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onTextChange(e) {
        // MetricsUpdate our state.
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

    onJoinDateChange(dateObj) {
        this.setState({ joinDate: dateObj });
    }

    onDateOfBirthChange(dateObj) {
        this.setState(
            { dateOfBirth: dateObj }
        );
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateMetricsInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.setState({ errors: {}, isLoading: true}, ()=>{
                this.props.putAssociateMetricsDetail(
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
            // Step 4
            givenName, lastName,

            // Step 7
            isTagsLoading, tags, dateOfBirth, gender, isHowHearLoading, howHear, howHearOther, joinDate,

            // Everything else...
            errors, id, fullName, isLoading,
        } = this.state;

        const howHearOptions = getHowHearReactSelectOptions(this.props.howHearList);
        const tagOptions = getTagReactSelectOptions(this.props.tagList);
        const transcodedTags = getPickedTagReactSelectOptions(tags, this.props.tagList);

        return (
            <AssociateProfileMetricsUpdateComponent
                // Step 4
                givenName={givenName}
                lastName={lastName}

                // Step 7
                isTagsLoading={isTagsLoading}
                tags={transcodedTags}
                tagOptions={tagOptions}
                dateOfBirth={dateOfBirth}
                gender={gender}
                joinDate={joinDate}
                errors={errors}
                onTextChange={this.onTextChange}
                isHowHearLoading={isHowHearLoading}
                howHear={howHear}
                howHearOptions={howHearOptions}
                howHearOther={howHearOther}

                // Everything else...
                id={id}
                errors={errors}
                onTextChange={this.onTextChange}
                onRadioChange={this.onRadioChange}
                onSelectChange={this.onSelectChange}
                onJoinDateChange={this.onJoinDateChange}
                onDateOfBirthChange={this.onDateOfBirthChange}
                onTagMultiChange={this.onTagMultiChange}
                onClick={this.onClick}
                fullName={fullName}
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
        putAssociateMetricsDetail: (data, onSuccessCallback, onFailureCallback) => {
            dispatch(
                putAssociateMetricsDetail(data, onSuccessCallback, onFailureCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AssociateProfileMetricsUpdateContainer);
