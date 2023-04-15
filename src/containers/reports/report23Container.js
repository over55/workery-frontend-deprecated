import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import Report23Component from "../../components/reports/report23Component";
import { WORKERY_REPORT_TWENTY_THREE_CSV_DOWNLOAD_API_URL } from "../../constants/api";
import { getAccessTokenFromLocalStorage } from "../../helpers/jwtUtility";


class Report23Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            jobState: "",
            isLoading: false
        }

        this.onClick = this.onClick.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
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

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Disable the button so the user cannot double click and download
        // the file multiple times.
        this.setState({ isLoading: true, })

        const { jobState } = this.state;
        const accessToken = getAccessTokenFromLocalStorage();

        // Extract the selected options and convert to ISO string format, also
        // create our URL to be used for submission.
        const url = WORKERY_REPORT_TWENTY_THREE_CSV_DOWNLOAD_API_URL + "?token="+accessToken+"&state="+jobState;;
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
    }

    onSelectChange(option) {
        const optionKey = [option.selectName]+"Option";
        this.setState({
            [option.selectName]: option.value,
            [optionKey]: option,
        });
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const {
            errors, isLoading, jobState
        } = this.state;


        return (
            <Report23Component
                isLoading={isLoading}
                errors={errors}
                jobState={jobState}
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
        // setFlashMessage: (typeOf, text) => {
        //     dispatch(setFlashMessage(typeOf, text))
        // }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Report23Container);
