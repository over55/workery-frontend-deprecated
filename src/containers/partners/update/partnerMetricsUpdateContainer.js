import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';
import * as moment from 'moment';

import PartnerMetricsUpdateComponent from "../../../components/partners/update/partnerMetricsUpdateComponent";
import { validateMetricsInput } from "../../../validators/partnerValidator";
import { getHowHearReactSelectOptions, pullHowHearList } from "../../../actions/howHearActions";
import { setFlashMessage } from "../../../actions/flashMessageActions";
import { putPartnerMetricsDetail } from '../../../actions/partnerActions';


class PartnerMetricsUpdateContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { id } = this.props.match.params;

        const birthdateObj = new Date(this.props.partnerDetail.birthdate);
        const joinDateObj = new Date(this.props.partnerDetail.joinDate);

        this.state = {
            id: id,
            givenName: this.props.partnerDetail.givenName,
            lastName: this.props.partnerDetail.lastName,
            dateOfBirth: birthdateObj,
            gender: this.props.partnerDetail.gender,
            isHowHearLoading: true,
            howHear: this.props.partnerDetail.howHear,
            howHearOther: this.props.partnerDetail.howHearOther,
            joinDate: joinDateObj,
            errors: {},
            isLoading: false
        }

        this.getPostData = this.getPostData.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onDateOfBirthChange = this.onDateOfBirthChange.bind(this);
        this.onJoinDateChange = this.onJoinDateChange.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
        this.onHowHearSuccessFetch = this.onHowHearSuccessFetch.bind(this);
    }

    /**
     *  Utility function used to create the `postData` we will be submitting to
     *  the API; as a result, this function will structure some dictionary key
     *  items under different key names to support our API web-service's API.
     */
    getPostData() {
        let postData = Object.assign({}, this.state);

        // (1) birthdate - We need to format as per required API format.
        const birthdateMoment = moment(this.state.dateOfBirth);
        postData.birthdate = birthdateMoment.format("YYYY-MM-DD");

        // (2) Join date - We need to format as per required API format.
        const joinDateMoment = moment(this.state.joinDate);
        postData.joinDate = joinDateMoment.format("YYYY-MM-DD");

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
        this.props.pullHowHearList(1,1000, new Map(), this.onHowHearSuccessFetch);
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

    onSuccessfulSubmissionCallback(partner) {
        this.props.setFlashMessage("success", "Partner has been successfully updated.");
        this.props.history.push("/partner/"+this.state.id+"/full");
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

    onHowHearSuccessFetch(howHearList) {
        this.setState({ isHowHearLoading: false, });
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onTextChange(e) {
        this.setState({ [e.target.name]: e.target.value, });
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
        const storageValueKey = "workery-create-partner-"+[e.target.name];
        const storageLabelKey =  "workery-create-partner-"+[e.target.name].toString()+"-label";
        const value = e.target.value;
        const label = e.target.dataset.label; // Note: 'dataset' is a react data via https://stackoverflow.com/a/20383295
        const storeValueKey = [e.target.name].toString();
        const storeLabelKey = [e.target.name].toString()+"Label";

        // Save the data.
        this.setState({ [e.target.name]: value, }); // Save to store.
        this.setState({ storeLabelKey: label, }); // Save to store.
    }

    onDateOfBirthChange(dateObj) {
        this.setState({ dateOfBirth: dateObj, });
    }

    onJoinDateChange(dateObj) {
        this.setState({ joinDate: dateObj, });
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // console.log(this.state); // For debugging purposes only.

        // Perform partner-side validation.
        const { errors, isValid } = validateMetricsInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.props.putPartnerMetricsDetail(
                this.getPostData(),
                this.onSuccessfulSubmissionCallback,
                this.onFailedSubmissionCallback
            );

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
            id, givenName, lastName,
            typeOf, dateOfBirth, gender, isHowHearLoading, howHear, howHearOther, joinDate,
            errors
        } = this.state;

        const howHearOptions = getHowHearReactSelectOptions(this.props.howHearList);

        return (
            <PartnerMetricsUpdateComponent
                id={id}
                givenName={givenName}
                lastName={lastName}
                typeOf={typeOf}
                dateOfBirth={dateOfBirth}
                gender={gender}
                joinDate={joinDate}
                errors={errors}
                onTextChange={this.onTextChange}
                isHowHearLoading={isHowHearLoading}
                howHear={howHear}
                howHearOptions={howHearOptions}
                howHearOther={howHearOther}
                onSelectChange={this.onSelectChange}
                onRadioChange={this.onRadioChange}
                onTagMultiChange={this.onTagMultiChange}
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
        howHearList: store.howHearListState,
        partnerDetail: store.partnerDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullHowHearList: (page, sizePerPage, map, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullHowHearList(page, sizePerPage, map, onSuccessCallback, onFailureCallback)
            )
        },
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
        putPartnerMetricsDetail: (data, onSuccessfulSubmissionCallback, onFailedSubmissionCallback) => {
            dispatch(putPartnerMetricsDetail(data, onSuccessfulSubmissionCallback, onFailedSubmissionCallback))
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PartnerMetricsUpdateContainer);
