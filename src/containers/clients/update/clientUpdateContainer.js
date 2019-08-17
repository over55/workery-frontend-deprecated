import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';
import * as moment from 'moment';

import ClientBizUpdateComponent from "../../../components/clients/update/clientBizUpdateComponent";
import ClientRezUpdateComponent from "../../../components/clients/update/clientRezUpdateComponent";
import { setFlashMessage } from "../../../actions/flashMessageActions";
import { validateInput } from "../../../validators/clientValidator";
import {
    RESIDENTIAL_CUSTOMER_TYPE_OF_ID, COMMERCIAL_CUSTOMER_TYPE_OF_ID
} from '../../../constants/api';
import { getHowHearReactSelectOptions, pullHowHearList } from "../../../actions/howHearActions";
import { getTagReactSelectOptions, getPickedTagReactSelectOptions, pullTagList } from "../../../actions/tagActions";
import { putClientDetail } from "../../../actions/clientActions";


class ClientUpdateContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { id } = this.props.match.params;

        // Map the API fields to our fields.
        const country = this.props.clientDetail.addressCountry === "CA" ? "Canada" : this.props.clientDetail.addressCountry;
        const region = this.props.clientDetail.addressRegion === "ON" ? "Ontario" : this.props.clientDetail.addressRegion;
        const isOkToEmail = this.props.clientDetail.isOkToEmail === true ? 1 : 0;
        const isOkToText = this.props.clientDetail.isOkToText === true ? 1 : 0;
        const birthdateObj = new Date(this.props.clientDetail.birthdate);
        const joinDateObj = new Date(this.props.clientDetail.joinDate);

        this.state = {
            errors: {},
            isLoading: false,
            id: id,

            // STEP 3
            typeOf: this.props.clientDetail.typeOf,

            // STEP 4
            givenName: this.props.clientDetail.givenName,
            lastName: this.props.clientDetail.lastName,
            organizationName: this.props.clientDetail.organizationName,
            organizationTypeOf: this.props.clientDetail.organizationTypeOf,
            givenName: this.props.clientDetail.givenName,
            lastName: this.props.clientDetail.lastName,
            telephone: this.props.clientDetail.telephone,
            telephoneTypeOf: this.props.clientDetail.telephoneTypeOf,
            otherTelephone: this.props.clientDetail.otherTelephone,
            otherTelephoneTypeOf: this.props.clientDetail.otherTelephoneTypeOf,
            email: this.props.clientDetail.email,
            isOkToEmail: isOkToEmail,
            isOkToText: isOkToText,

            // STEP 5
            country: country,
            region: region,
            locality: this.props.clientDetail.addressLocality,
            postalCode: this.props.clientDetail.postalCode,
            streetAddress: this.props.clientDetail.streetAddress,

            // STEP 6
            tags: this.props.clientDetail.tags,
            dateOfBirth: birthdateObj,
            gender: this.props.clientDetail.gender,
            howHear: this.props.clientDetail.howHear,
            howHearOption: this.props.clientDetail.howHearOption,
            howHearOther: this.props.clientDetail.howHearOther,
            joinDate: joinDateObj,
            comment: this.props.clientDetail.comment,
        }

        this.getPostData = this.getPostData.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
        this.onTagMultiChange = this.onTagMultiChange.bind(this);
        this.onDOBDateTimeChange = this.onDOBDateTimeChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
        this.onFailedCallback = this.onFailedCallback.bind(this);
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
        postData.joinDate = joinDateMoment.format("YYYY-MM-DD")

        // (4) How Hear Other - This field may not be null, therefore make blank.
        if (this.state.howHearOther === undefined || this.state.howHearOther === null) {
            postData.howHearOther = "";
        }

        // // (5) Password & Password Repeat
        // if (this.state.password === undefined || this.state.password === null || this.state.password === '' || this.state.password.length == 0) {
        //     var randomString = Math.random().toString(34).slice(-10);
        //     randomString += "A";
        //     randomString += "!";
        //     postData.password = randomString;
        //     postData.passwordRepeat = randomString;
        // }

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
        if (this.state.telephoneTypeOf === undefined || this.state.telephoneTypeOf === null || this.state.telephoneTypeOf === "") {
            postData.telephoneTypeOf = 1;
        }
        if (this.state.otherTelephoneTypeOf === undefined || this.state.otherTelephoneTypeOf === null || this.state.otherTelephoneTypeOf === "") {
            postData.otherTelephoneTypeOf = 1;
        }

        // (9) Address Country: This field is required.
        postData.addressCountry = this.state.country;

        // (10) Address Locality: This field is required.
        postData.addressLocality = this.state.locality;

        // (11) Address Region: This field is required.
        postData.addressRegion = this.state.region

        // () First Name and Last Name if biz
        if (this.state.typeOf === COMMERCIAL_CUSTOMER_TYPE_OF_ID) {
            postData.givenName = this.state.givenName;
            postData.givenName = this.state.givenName;
            postData.givenName = this.state.givenName;
            postData.lastName = this.state.lastName;
        } else {

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

    onSuccessCallback(client) {
        this.setState({ errors: {}, isLoading: true, })
        this.props.setFlashMessage("success", "Client has been successfully updated.");
        this.props.history.push("/client/"+this.state.id+"/full");
    }

    onFailedCallback(errors) {
        this.setState({ errors: errors, isLoading: false, });

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
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.setState({ errors: {}, isLoading: true, }, ()=>{
                this.props.putClientDetail(
                    this.getPostData(),
                    this.onSuccessCallback,
                    this.onFailedCallback
                );
            });

        // CASE 2 OF 2: Validation was a failure.
        } else {
            this.onFailedCallback(errors);
        }
    }

    onSelectChange(option) {
        const optionKey = [option.selectName].toString()+"Option";
        this.setState({
            [option.selectName]: option.value,
            optionKey: option,
        });
        console.log([option.selectName], optionKey, "|",option); // For debugging purposes only.
    }

    onRadioChange(e) {
        // Get the values.
        const storageValueKey = "nwapp-create-client-"+[e.target.name];
        const value = e.target.value;
        const label = e.target.dataset.label; // Note: 'dataset' is a react data via https://stackoverflow.com/a/20383295
        const storeValueKey = [e.target.name].toString();
        const storeLabelKey = [e.target.name].toString()+"-label";

        // Save the data.
        this.setState({ [e.target.name]: value, }); // Save to store.
        localStorage.setItem(storageValueKey, value) // Save to storage.

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

    onDOBDateTimeChange(dateOfBirth) {
        this.setState({
            dateOfBirth: dateOfBirth,
        });
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const {
            errors, id,

            // STEP 3
            typeOf,

            // STEP 4 - REZ
            givenName, lastName, telephone, telephoneTypeOf, otherTelephone, otherTelephoneTypeOf, email, isOkToText, isOkToEmail,

            // STEP 4 - BIZ
            organizationName, organizationTypeOf,

            // STEP 5
            country, region, locality, postalCode, streetAddress,

            // STEP 6
            tags, birthdate, gender, howHear, howHearOption, howHearOther, joinDate, comment, dateOfBirth
        } = this.state;

        const howHearOptions = getHowHearReactSelectOptions(this.props.howHearList);
        const tagOptions = getTagReactSelectOptions(this.props.tagList);
        const transcodedTags = getPickedTagReactSelectOptions(tags, this.props.tagList)

        if (typeOf === RESIDENTIAL_CUSTOMER_TYPE_OF_ID) {
            return (
                <ClientRezUpdateComponent
                    // STEP 3
                    typeOf={typeOf}

                    // STEP 4 - REZ
                    givenName={givenName}
                    lastName={lastName}
                    telephone={telephone}
                    telephoneTypeOf={telephoneTypeOf}
                    otherTelephone={otherTelephone}
                    otherTelephoneTypeOf={otherTelephoneTypeOf}
                    email={email}
                    isOkToText={isOkToText}
                    isOkToEmail={isOkToEmail}

                    // STEP 5
                    country={country}
                    region={region}
                    locality={locality}
                    postalCode={postalCode}
                    streetAddress={streetAddress}

                    // STEP 6
                    tags={transcodedTags}
                    tagOptions={tagOptions}
                    onTagMultiChange={this.onTagMultiChange}
                    dateOfBirth={dateOfBirth}
                    gender={gender}
                    howHear={howHear}
                    howHearOptions={howHearOptions}
                    howHearOption={howHearOption}
                    howHearOther={howHearOther}
                    joinDate={joinDate}
                    comment={comment}

                    // EVERYTHING ELSE
                    id={id}
                    errors={errors}
                    onTextChange={this.onTextChange}
                    onSelectChange={this.onSelectChange}
                    onRadioChange={this.onRadioChange}
                    onClick={this.onClick}
                />
            );
        }
        if (typeOf === COMMERCIAL_CUSTOMER_TYPE_OF_ID) {
            return (
                <ClientBizUpdateComponent
                    // STEP 3
                    typeOf={typeOf}

                    // STEP 4
                    organizationName={organizationName}
                    organizationTypeOf={organizationTypeOf}
                    givenName={givenName}
                    lastName={lastName}
                    telephone={telephone}
                    telephoneTypeOf={telephoneTypeOf}
                    otherTelephone={otherTelephone}
                    otherTelephoneTypeOf={otherTelephoneTypeOf}
                    email={email}
                    isOkToEmail={isOkToEmail}
                    isOkToText={isOkToText}

                    // STEP 5
                    country={country}
                    region={region}
                    locality={locality}
                    postalCode={postalCode}
                    streetAddress={streetAddress}

                    // STEP 6
                    tags={transcodedTags}
                    tagOptions={tagOptions}
                    onTagMultiChange={this.onTagMultiChange}
                    dateOfBirth={dateOfBirth}
                    gender={gender}
                    howHear={howHear}
                    howHearOptions={howHearOptions}
                    howHearOption={howHearOption}
                    howHearOther={howHearOther}
                    joinDate={joinDate}
                    comment={comment}

                    // EVERYTHING ELSE
                    id={id}
                    errors={errors}
                    onTextChange={this.onTextChange}
                    onSelectChange={this.onSelectChange}
                    onRadioChange={this.onRadioChange}
                    onClick={this.onClick}
                />
            );
        }

        return (null);


    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        clientDetail: store.clientDetailState,
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
        putClientDetail: (data, onSuccessCallback, onFailureCallback) => {
            dispatch(
                putClientDetail(data, onSuccessCallback, onFailureCallback)
            )
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ClientUpdateContainer);
