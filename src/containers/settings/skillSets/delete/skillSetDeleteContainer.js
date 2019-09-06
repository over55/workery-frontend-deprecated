import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import SkillSetDeleteComponent from "../../../../components/settings/skillSets/delete/skillSetDeleteComponent";
import { setFlashMessage } from "../../../../actions/flashMessageActions";
import { pullSkillSetDetail, deleteSkillSetDetail } from "../../../../actions/skillSetActions";
import { getPickedInsuranceRequirementReactSelectOptions } from "../../../../actions/insuranceRequirementActions";


class SkillSetDeleteContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { id } = this.props.match.params;

        // Update state.
        this.state = {
            id: id,
            category: "",
            subCategory: "",
            insuranceRequirements: [],
            description: "",
            errors: {},
            isLoading: false
        }

        this.onBack = this.onBack.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
        this.onRetrieveSuccessCallback = this.onRetrieveSuccessCallback.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

     componentDidMount() {
         window.scrollTo(0, 0);  // Start the page at the top of the page.
         this.props.pullSkillSetDetail(this.state.id, this.onRetrieveSuccessCallback);
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

    onSuccessfulSubmissionCallback(profile) {
        this.setState({ errors: {}, isLoading: true, })
        this.props.setFlashMessage("success", "Skillset has been successfully deleted.");
        this.props.history.push("/settings/skill-sets");
    }

    onFailedSubmissionCallback(errors) {
        this.setState({
            errors: errors, isLoading: false,
        })

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    onRetrieveSuccessCallback(detail) {
        console.log("onRetrieveCallback |", detail);
        this.setState({
            category: detail.category,
            subCategory: detail.subCategory,
            insuranceRequirements: getPickedInsuranceRequirementReactSelectOptions(detail.insuranceRequirements, this.props.insuranceRequirementList),
            description: detail.description,
            errors: {},
            isLoading: false
        });
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onBack(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();
        this.props.history.push("/settings/skill-sets");
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();
        this.setState({ errors: {}, isLoading: true, }, ()=>{
            this.props.deleteSkillSetDetail(
                this.state.id,
                this.onSuccessfulSubmissionCallback,
                this.onFailedSubmissionCallback
            );
        });
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { category, subCategory, insuranceRequirements, description, errors, isLoading } = this.state;
        return (
            <SkillSetDeleteComponent
                category={category}
                subCategory={subCategory}
                description={description}
                insuranceRequirements={insuranceRequirements}
                isLoading={isLoading}
                onBack={this.onBack}
                onClick={this.onClick}
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
        pullSkillSetDetail: (bbiId, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullSkillSetDetail(bbiId, onSuccessCallback, onFailureCallback)
            )
        },
        deleteSkillSetDetail: (bbiId, onSuccessCallback, onFailureCallback) => {
            dispatch(
                deleteSkillSetDetail(bbiId, onSuccessCallback, onFailureCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SkillSetDeleteContainer);
