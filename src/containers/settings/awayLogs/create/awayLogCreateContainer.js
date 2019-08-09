import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';
import * as moment from 'moment';

import AwayLogCreateComponent from "../../../../components/settings/awayLogs/create/awayLogCreateComponent";
import { setFlashMessage } from "../../../../actions/flashMessageActions";
import validateInput from "../../../../validators/awayLogValidator";
import { postAwayLogDetail } from "../../../../actions/awayLogActions";
import { pullAssociateList, getAssociateReactSelectOptions } from "../../../../actions/associateActions";


class AwayLogCreateContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            associate: null,
            associateOption: null,
            startDate: null,
            reason: null,
            reasonOther: "",
            untilFurtherNotice: null,
            untilDate: null,
            errors: {},
            isLoading: false
        }
        this.getPostData = this.getPostData.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
        this.onStartDateChange = this.onStartDateChange.bind(this);
        this.onUntilDateChange = this.onUntilDateChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
        this.onFailureCallback = this.onFailureCallback.bind(this);
    }

    getPostData() {
        let postData = Object.assign({}, this.state);

        const startDateMoment = moment(this.state.startDate);
        postData.startDate = startDateMoment.format("YYYY-MM-DD")

        const untilDateMoment = moment(this.state.untilDate);
        postData.untilDate = untilDateMoment.format("YYYY-MM-DD")

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

        // Get a filtered list of ALL the ACTIVE associates.
        const parametersMap = new Map();
        parametersMap.set('state', 1); // `1` is `true` in API.
        this.props.pullAssociateList(1, 10000, parametersMap);
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

    onSuccessCallback(response) {
        if (response !== null && response !== undefined) {
            this.props.setFlashMessage("success", "Away log has been successfully created.");
            this.props.history.push("/settings/away-logs");
        } else {
            console.log("onSuccessCallback | ERROR:",response);
        }

    }

    onFailureCallback(errors) {
        this.setState({
            errors: errors,
            isLoading: false,
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
        this.setState({
            [e.target.name]: e.target.value,
        })
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
        const value = e.target.value;
        const label = e.target.dataset.label; // Note: 'dataset' is a react data via https://stackoverflow.com/a/20383295
        const storeValueKey = [e.target.name].toString();
        const storeLabelKey = [e.target.name].toString()+"Label";

        // Save the data.
        this.setState({ [e.target.name]: value, }); // Save to store.
        this.setState({ storeLabelKey: label, }); // Save to store.
    }

    onStartDateChange(dateObj) {
        this.setState({ startDate: dateObj, });
    }

    onUntilDateChange(dateObj) {
        this.setState({ untilDate: dateObj, });
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
                this.props.postAwayLogDetail(
                    this.getPostData(),
                    this.onSuccessCallback(),
                    this.onFailureCallback()
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
        const { associate, associateOption, startDate, reason, reasonOther, untilFurtherNotice, untilDate, errors } = this.state;
        const associateOptions = getAssociateReactSelectOptions(this.props.associateList);
        return (
            <AwayLogCreateComponent
                associate={associate}
                associateOptions={associateOptions}
                startDate={startDate}
                onStartDateChange={this.onStartDateChange}
                reason={reason}
                reasonOther={reasonOther}
                untilFurtherNotice={untilFurtherNotice}
                untilDate={untilDate}
                onUntilDateChange={this.onUntilDateChange}
                errors={errors}
                onTextChange={this.onTextChange}
                onRadioChange={this.onRadioChange}
                onSelectChange={this.onSelectChange}
                onClick={this.onClick}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        associateList: store.associateListState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
        pullAssociateList: (page, sizePerPage, map, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullAssociateList(page, sizePerPage, map, onSuccessCallback, onFailureCallback)
            )
        },
        postAwayLogDetail: (postData, successCallback, failedCallback) => {
            dispatch(
                postAwayLogDetail(postData, successCallback, failedCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AwayLogCreateContainer);
