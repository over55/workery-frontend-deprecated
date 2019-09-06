import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import InsuranceRequirementDeleteComponent from "../../../../components/settings/insuranceRequirements/delete/insuranceRequirementDeleteComponent";
import { setFlashMessage } from "../../../../actions/flashMessageActions";
import validateInput from "../../../../validators/insuranceRequirementValidator";
import { pullInsuranceRequirementDetail, deleteInsuranceRequirementDetail } from "../../../../actions/insuranceRequirementActions";


class InsuranceRequirementDeleteContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { id } = this.props.match.params;

        this.state = {
            text: "",
            description: "",
            errors: {},
            isLoading: false,
            id: parseInt(id)
        }

        this.onClick = this.onClick.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
        this.onIRFetchCallback = this.onIRFetchCallback.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
        this.props.pullInsuranceRequirementDetail(this.state.id, this.onIRFetchCallback)
    }

    componentWillUnmount() {
        // This code will fix the "ReactJS & Redux: Can't perform a React state
        // delete on an unmounted component" issue as explained in:
        // https://stackoverflow.com/a/53829700
        this.setState = (state,callback)=>{
            return;
        };
    }

    /**
     *  API callback functions
     *------------------------------------------------------------
     */

    onSuccessfulSubmissionCallback(insuranceRequirement) {
        this.setState({ errors: {}, isLoading: true, })
        this.props.setFlashMessage("success", "Insurance requirement has been successfully deleted.");
        this.props.history.push("/settings/insurance-requirements");
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

    onIRFetchCallback(irDetail) {
        this.setState({
            text: irDetail.text,
            description: irDetail.description,
            isLoading: false,
        });
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.setState({
                errors: [], isLoading: true,
            }, ()=>{
                this.props.deleteInsuranceRequirementDetail(
                    this.state.id,
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
        const { text, description, errors, isLoading } = this.state;
        return (
            <InsuranceRequirementDeleteComponent
                text={text}
                description={description}
                errors={errors}
                onTextChange={this.onTextChange}
                onClick={this.onClick}
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
    return {
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
        pullInsuranceRequirementDetail: (id, onSuccessCallback, onFailureCallback) => {
            dispatch(pullInsuranceRequirementDetail(id, onSuccessCallback, onFailureCallback))
        },
        deleteInsuranceRequirementDetail: (postData, successCallback, failedCallback) => {
            dispatch(deleteInsuranceRequirementDetail(postData, successCallback, failedCallback))
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InsuranceRequirementDeleteContainer);
