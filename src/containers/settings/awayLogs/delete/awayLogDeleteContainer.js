import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';
import * as moment from 'moment';

import AwayLogDeleteComponent from "../../../../components/settings/awayLogs/delete/awayLogDeleteComponent";
import { setFlashMessage } from "../../../../actions/flashMessageActions";
import validateInput from "../../../../validators/awayLogValidator";
import { deleteAwayLogDetail, pullAwayLogDetail } from "../../../../actions/awayLogActions";
import { pullAssociateList, getAssociateReactSelectOptions } from "../../../../actions/associateActions";


class AwayLogDeleteContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { id } = this.props.match.params;

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const backURL = urlParams.get('back')

        this.state = {
            id: parseInt(id),
            associateId: parseInt(id),
            associate: "",
            associateOption: "",
            startDate: "",
            reason: "",
            reasonOther: "",
            untilFurtherNotice: "",
            untilDate: "",
            backURL: backURL,
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
        this.onBack = this.onBack.bind(this);
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
        this.onFailureCallback = this.onFailureCallback.bind(this);
        this.onAwayLogFetchCallback = this.onAwayLogFetchCallback.bind(this);
    }

    getPostData() {
        let postData = Object.assign({}, this.state);

        const startDateMoment = moment(this.state.startDate);
        postData.startDate = startDateMoment.format("YYYY-MM-DD")

        if (postData.untilFurtherNotice === false || postData.untilFurtherNotice === "false" || postData.untilFurtherNotice === "0" || postData.untilFurtherNotice === 0) {
            const untilDate = this.state.untilDate ? this.state.untilDate : new Date();
            const untilDateMoment = moment(untilDate);
            postData.untilDate = untilDateMoment.format("YYYY-MM-DD")
        } else {
            postData.untilDate = null;
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

        // Get a filtered list of ALL the ACTIVE associates.
        const parametersMap = new Map();
        parametersMap.set('state', 1); // `1` is `true` in API.
        this.props.pullAssociateList(0, 10000, parametersMap);

        // Get our detail.
        this.props.pullAwayLogDetail(this.state.id, this.onAwayLogFetchCallback);
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

    onSuccessCallback(response) {
        this.props.setFlashMessage("success", "Away log has been successfully deleted.");
        if (this.state.backURL !== undefined && this.state.backURL !== null && this.state.backURL !== "") {
            this.props.history.push(this.state.backURL);
        } else {
            this.props.history.push("/settings/away-logs");
        }
    }

    onFailureCallback(errors) {
        if (errors !== null && errors !== undefined) {
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
    }

    onAwayLogFetchCallback(awayLogDetail) {
        console.log("onAwayLogFetchCallback |", awayLogDetail);
        this.setState({
            associate: parseInt(awayLogDetail.associate),
            associateOption: "",
            startDate: new Date(awayLogDetail.startDate),
            reason: parseInt(awayLogDetail.reason),
            reasonOther: awayLogDetail.reasonOther,
            untilFurtherNotice: (awayLogDetail.untilFurtherNotice === true || awayLogDetail.untilFurtherNotice === "true") ? 1 : 0,
            untilDate: new Date(awayLogDetail.untilDate),
            errors: {},
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

    onBack(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();
        if (this.state.backURL !== undefined && this.state.backURL !== null && this.state.backURL !== "") {
            this.props.history.push(this.state.backURL);
        } else {
            this.props.history.push("/settings/away-logs");
        }
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
                this.props.deleteAwayLogDetail(
                    this.state.id,
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
        const associateOptions = getAssociateReactSelectOptions(this.props.associateList);
        return (
            <AwayLogDeleteComponent
                {...this}
                {...this.state}
                {...this.props}
                associateOptions={associateOptions}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        associateList: store.associateListState,
        awayLogDetail: store.awayLogDetailState,
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
        deleteAwayLogDetail: (postData, successCallback, failedCallback) => {
            dispatch(
                deleteAwayLogDetail(postData, successCallback, failedCallback)
            )
        },
        pullAwayLogDetail: (awayLogId, successCallback, failedCallback) => {
            dispatch(
                pullAwayLogDetail(awayLogId, successCallback, failedCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AwayLogDeleteContainer);
