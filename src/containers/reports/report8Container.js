import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import Report8Component from "../../components/reports/report8Component";
import { pullAssociateList, getAssociateReactSelectOptions } from "../../actions/associateActions";
import { validateReport8Input } from "../../validators/reportValidator";
import { WORKERY_REPORT_EIGHT_CSV_DOWNLOAD_API_ENDPOINT } from "../../constants/api";
import { getSubdomain } from "../../helpers/urlUtility";


class Report8Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            associate: "",
            associateOptions: [],
            isAssociatesLoading: true,
            errors: {},
            isLoading: false
        }

        this.onSelectChange = this.onSelectChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onAssociatesListCallback = this.onAssociatesListCallback.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.

        const parametersMap = new Map();
        parametersMap.set('state', 1);
        this.props.pullAssociateList(0, 100, parametersMap, this.onAssociatesListCallback, null);
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

    onAssociatesListCallback(associateList) {
        this.setState({
            associateOptions: getAssociateReactSelectOptions(associateList),
            isAssociatesLoading: false,
        });
    }

    onSuccessfulSubmissionCallback(staff) {
        // --- Update the GUI ---
        this.setState({ errors: {}, isLoading: true, })

        // --- Move to our next page ---
        this.props.history.push("/reports");
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

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onSelectChange(option) {
        const optionKey = [option.selectName]+"Option";
        this.setState({
            [option.selectName]: option.value,
            [optionKey]: option,
        });
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateReport8Input(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            // Disable the button so the user cannot double click and download
            // the file multiple times.
            this.setState({ isLoading: true, })

            // DEVELOPERS NOTE:
            // Because we have a multi-tenant architecture, we need to make calls
            // to the specific tenant for the CSV download API to work.
            const schema = getSubdomain();

            // Extract the selected options and convert to ISO string format, also
            // create our URL to be used for submission.
            const { associate } = this.state;
            const url = process.env.REACT_APP_API_PROTOCOL + "://" + schema + "." + process.env.REACT_APP_API_DOMAIN + "/" + WORKERY_REPORT_EIGHT_CSV_DOWNLOAD_API_ENDPOINT + "?associate_id="+associate;
            console.log(url);

            // The following code will open up a new browser tab and load up the
            // URL that you inputted.
            var win = window.open(url, '_blank');
            win.focus();

            // Add minor delay and then run to remove the button ``disable`` state
            // so the user is able to click the download button again.
            setTimeout(() => {
                this.setState({ isLoading: false, errors: [], })
            }, 100); // 0.10 seconds.

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
            associate, associateOptions, isAssociatesLoading,
            errors, isLoading
        } = this.state;


        return (
            <Report8Component
                associate={associate}
                associateOptions={associateOptions}
                isAssociatesLoading={isAssociatesLoading}
                isLoading={isLoading}
                errors={errors}
                onSelectChange={this.onSelectChange}
                onClick={this.onClick}
                flashMessage={this.props.flashMessage}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        flashMessage: store.flashMessageState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullAssociateList: (page, sizePerPage, map, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullAssociateList(page, sizePerPage, map, onSuccessCallback, onFailureCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Report8Container);
