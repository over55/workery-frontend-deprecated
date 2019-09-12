import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';
import * as moment from 'moment';

import StaffChangeRoleComponent from "../../../components/staff/operations/staffChangeRoleComponent";
import { validateChangeRoleInput } from "../../../validators/staffValidator";
import { setFlashMessage } from "../../../actions/flashMessageActions";
import { putStaffMetricsDetail } from '../../../actions/staffActions';


class StaffChangeRoleContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { id } = this.props.match.params;

        const birthdateObj = new Date(this.props.staffDetail.birthdate);
        const joinDateObj = new Date(this.props.staffDetail.joinDate);

        this.state = {
            id: id,
            givenName: this.props.staffDetail.givenName,
            lastName: this.props.staffDetail.lastName,
            role: this.props.staffDetail.role,
            errors: {},
            isLoading: false
        }

        this.getPostData = this.getPostData.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
        this.onClick = this.onClick.bind(this);
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

        // (1) birthdate - We need to format as per required API format.
        const birthdateMoment = moment(this.state.dateOfBirth);
        postData.birthdate = birthdateMoment.format("YYYY-MM-DD");

        // (2) Join date - We need to format as per required API format.
        const joinDateMoment = moment(this.state.joinDate);
        postData.joinDate = joinDateMoment.format("YYYY-MM-DD");

        // // (3) Tags - We need to only return our `id` values.
        // let idTags = [];
        // for (let i = 0; i < this.state.tags.length; i++) {
        //     let tag = this.state.tags[i];
        //     idTags.push(tag.value);
        // }
        // postData.tags = idTags;

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
        this.props.setFlashMessage("success", "Staff has been successfully updated.");
        this.props.history.push("/staff/"+this.state.id+"/full");
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
        this.setState({ storeLabelKey: label, }); // Save to store.
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // console.log(this.state); // For debugging purposes only.

        // Perform staff-side validation.
        const { errors, isValid } = validateChangeRoleInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.props.putStaffMetricsDetail(
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
            id, givenName, lastName, role,
            errors
        } = this.state;

        return (
            <StaffChangeRoleComponent
                id={id}
                givenName={givenName}
                lastName={lastName}
                role={role}
                errors={errors}
                onRadioChange={this.onRadioChange}
                onClick={this.onClick}
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
        putStaffMetricsDetail: (data, onSuccessfulSubmissionCallback, onFailedSubmissionCallback) => {
            dispatch(putStaffMetricsDetail(data, onSuccessfulSubmissionCallback, onFailedSubmissionCallback))
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StaffChangeRoleContainer);
