import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import SkillSetUpdateComponent from "../../../../components/settings/skillSets/update/skillSetUpdateComponent";
import { setFlashMessage } from "../../../../actions/flashMessageActions";
import validateInput from "../../../../validators/skillSetValidator";
import { getInsuranceRequirementReactSelectOptions, getPickedInsuranceRequirementReactSelectOptions, pullInsuranceRequirementList } from "../../../../actions/insuranceRequirementActions";
import { putSkillSetDetail, pullSkillSetDetail } from "../../../../actions/skillSetActions";


class SkillSetUpdateContainer extends Component {
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
            id: id,
            category: "",
            subCategory: "",
            insuranceRequirements: [],
            description: "",
            errors: {},
            isLoading: false
        }

        this.getPostData = this.getPostData.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onInsuranceRequirementMultiChange = this.onInsuranceRequirementMultiChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
        this.onFailureCallback = this.onFailureCallback.bind(this);
        this.onRetrieveCallback = this.onRetrieveCallback.bind(this);
    }

    getPostData() {
        let postData = Object.assign({}, this.state);

        // (3) insuranceRequirements - We need to only return our `id` values.
        let idInsuranceRequirements = [];
        for (let i = 0; i < this.state.insuranceRequirements.length; i++) {
            let insurance = this.state.insuranceRequirements[i];
            idInsuranceRequirements.push(insurance.value);
        }
        postData.insuranceRequirements = idInsuranceRequirements;

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
        this.props.pullInsuranceRequirementList(1, 1000);
        this.props.pullSkillSetDetail(this.state.id, this.onRetrieveCallback)
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

    onSuccessCallback(skillSet) {
        this.setState({ errors: {}, isLoading: true, })
        this.props.setFlashMessage("success", "Skill set has been successfully updated.");
        this.props.history.push("/settings/skill-sets");
    }

    onFailureCallback(errors) {
        this.setState({
            errors: errors, isLoading: false,
        })

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    onRetrieveCallback(detail) {
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

    onTextChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    onInsuranceRequirementMultiChange(...args) {
        // Extract the select options from the parameter.
        const selectedOptions = args[0];

        // Set all the skill sets we have selected to the STORE.
        this.setState({
            insuranceRequirements: selectedOptions,
        });
    }

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
                this.props.putSkillSetDetail(
                    this.getPostData(),
                    this.onSuccessCallback,
                    this.onFailureCallback
                );
            });

        // CASE 2 OF 2: Validation was a failure.
        } else {
            this.onFailureCallback(errors);
        }
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { category, subCategory, insuranceRequirements, description, errors, isLoading } = this.state;
        return (
            <SkillSetUpdateComponent
                category={category}
                subCategory={subCategory}
                description={description}
                insuranceRequirements={insuranceRequirements}
                insuranceRequirementOptions={getInsuranceRequirementReactSelectOptions(this.props.insuranceRequirementList)}
                onInsuranceRequirementMultiChange={this.onInsuranceRequirementMultiChange}
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
        insuranceRequirementList: store.insuranceRequirementListState,
        skillSetDetail: store.skillSetDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
        pullInsuranceRequirementList: (page, sizePerPage, map, onSuccessCallback, onFailureCallback) => {
            dispatch(pullInsuranceRequirementList(page, sizePerPage, map, onSuccessCallback, onFailureCallback))
        },
        putSkillSetDetail: (postData, successCallback, failedCallback) => {
            dispatch(putSkillSetDetail(postData, successCallback, failedCallback))
        },
        pullSkillSetDetail: (id, successCallback, failedCallback) => {
            dispatch(pullSkillSetDetail(id, successCallback, failedCallback))
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SkillSetUpdateContainer);
