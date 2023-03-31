import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';
import * as moment from 'moment';

import StaffAccountUpdateComponent from "../../../components/staff/update/staffAccountUpdateComponent";
import { validateAccountUpdateInput } from "../../../validators/staffValidator";
import { setFlashMessage } from "../../../actions/flashMessageActions";
import { putStaffAccountDetail } from '../../../actions/staffActions';


class StaffAccountUpdateContainer extends Component {
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
        const country = this.props.staffDetail.addressCountry === "CA" ? "Canada" : this.props.staffDetail.addressCountry;
        const region = this.props.staffDetail.addressRegion === "ON" ? "Ontario" : this.props.staffDetail.addressRegion;
        const isActive = this.props.staffDetail.state === 1 ? 1 : 2;
        const policeCheckObj = new Date(this.props.staffDetail.policeCheck);
        policeCheckObj.setMinutes( policeCheckObj.getMinutes() + policeCheckObj.getTimezoneOffset() );

        this.state = {
            id: id,
            givenName: this.props.staffDetail.givenName,
            lastName: this.props.staffDetail.lastName,
            description: this.props.staffDetail.description,
            emergencyContactName: this.props.staffDetail.emergencyContactName,
            emergencyContactRelationship: this.props.staffDetail.emergencyContactRelationship,
            emergencyContactTelephone: this.props.staffDetail.emergencyContactTelephone,
            emergencyContactAlternativeTelephone: this.props.staffDetail.emergencyContactAlternativeTelephone,
            description: this.props.staffDetail.description,
            policeCheck: policeCheckObj,
            isActive: isActive,
            errors: {},
            isLoading: false
        }

        this.getPostData = this.getPostData.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onPoliceCheckDateChange = this.onPoliceCheckDateChange.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
        this.onNextClick = this.onNextClick.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
    }

    /**
     *  Utility function used to create the `postData` we will be submitting to
     *  the API; as a result, this function will structure some dictionary key
     *  items under different key names to support our API web-service's API.
     */
    getPostData() {
        let postData = Object.assign({}, this.state);

        if (parseInt(this.state.isActive) === 1) {
            postData.isActive = true;
        }
        if (parseInt(this.state.isActive) === 0) {
            postData.isActive = false;
        }

        // (2) Join date - We need to format as per required API format.
        const policeCheckMoment = moment(this.state.policeCheck);
        postData.policeCheck = policeCheckMoment.format("YYYY-MM-DD")

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

    onSuccessfulSubmissionCallback(staff) {
        this.setState({ errors: {}, isLoading: true, })
        this.props.setFlashMessage("success", "Staff has been successfully updated.");
        this.props.history.push("/staff/"+this.state.id+"/full");
    }

    onFailedSubmissionCallback(errors) {
        console.log("onFailedSubmissionCallback", errors);
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
        const key = "workery-create-staff-"+[e.target.name];
        localStorage.setItem(key, e.target.value)
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
        const storageValueKey = "workery-create-staff-"+[e.target.name];
        const storageLabelKey =  "workery-create-staff-"+[e.target.name].toString()+"-label";
        const value = e.target.value;
        const label = e.target.dataset.label; // Note: 'dataset' is a react data via https://stackoverflow.com/a/20383295
        const storeValueKey = [e.target.name].toString();
        const storeLabelKey = [e.target.name].toString()+"Label";

        // Save the data.
        this.setState({ [e.target.name]: value, }); // Save to store.
        this.setState({ [storeLabelKey]: label, }); // Save to store.
    }

    onPoliceCheckDateChange(dateObj) {
        this.setState(
            { policeCheck: dateObj },
            ()=>{  }
        );
    }

    onNextClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform staff-side validation.
        const { errors, isValid } = validateAccountUpdateInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.setState({ isLoading: true, errors: {}, }, ()=>{
                this.props.putStaffAccountDetail(
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
            id, givenName, lastName, description, policeCheck,
            emergencyContactName, emergencyContactRelationship, emergencyContactTelephone, emergencyContactAlternativeTelephone,
            isActive, errors, isLoading, returnURL
        } = this.state;

        const { user } = this.props;
        return (
            <StaffAccountUpdateComponent
                id={id}
                givenName={givenName}
                lastName={lastName}

                description={description}
                emergencyContactName={emergencyContactName}
                emergencyContactRelationship={emergencyContactRelationship}
                emergencyContactTelephone={emergencyContactTelephone}
                emergencyContactAlternativeTelephone={emergencyContactAlternativeTelephone}
                onTextChange={this.onTextChange}

                policeCheck={policeCheck}
                onPoliceCheckDateChange={this.onPoliceCheckDateChange}

                onSelectChange={this.onSelectChange}

                isActive={isActive}
                onRadioChange={this.onRadioChange}

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
        staffDetail: store.staffDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
        putStaffAccountDetail: (data, onSuccessfulSubmissionCallback, onFailedSubmissionCallback) => {
            dispatch(putStaffAccountDetail(data, onSuccessfulSubmissionCallback, onFailedSubmissionCallback))
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StaffAccountUpdateContainer);
