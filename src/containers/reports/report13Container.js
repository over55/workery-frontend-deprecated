import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import Report13Component from "../../components/reports/report13Component";
import { getSkillSetReactSelectOptions, pullSkillSetList } from "../../actions/skillSetActions";
import { validateReport13Input } from "../../validators/reportValidator";
import { WORKERY_REPORT_THIRTEEN_CSV_DOWNLOAD_API_ENDPOINT } from "../../constants/api";
import { getSubdomain } from "../../helpers/urlUtility";
import { getAccessTokenFromLocalStorage } from "../../helpers/jwtUtility";


class Report13Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            skillSets: [],
            skillSetOptions: [],
            isSkillSetsLoading: true,
            fromDate: "",
            toDate: "",
            jobState: "",
            errors: {},
            isLoading: false
        }

        this.onSkillSetMultiChange = this.onSkillSetMultiChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onFromDateChange = this.onFromDateChange.bind(this);
        this.onToDateChange = this.onToDateChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onSkillSetsListCallback = this.onSkillSetsListCallback.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.

        // DEVELOPERS NOTE: Fetch our skillset list.
        const filtersMap = new Map();
        this.props.pullSkillSetList(0, 1000, filtersMap, this.onSkillSetsListCallback);
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

     onSkillSetMultiChange(...args) {
         // Extract the select options from the parameter.
         const selectedOptions = args[0];

         // Set all the skill sets we have selected to the STORE.
         this.setState({
             skillSets: selectedOptions,
         });
    }

    onSkillSetsListCallback(response) {
        this.setState({
            skillSetOptions: getSkillSetReactSelectOptions(response),
            isSkillSetsLoading: false,
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

    onFromDateChange(dateObj) {
        this.setState({ fromDate: dateObj, });
    }

    onToDateChange(dateObj) {
        this.setState({ toDate: dateObj, });
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateReport13Input(this.state);

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
            const { skillSets, fromDate, toDate, jobState } = this.state;
            const toDateString = toDate.getTime();
            const fromDateString = fromDate.getTime();
            console.log(skillSets);

            let skillsetIds = "";
            for (let i = 0; i < skillSets.length; i++) {
                let value = skillSets[i].value;
                console.log(value);
                skillsetIds = skillsetIds + value + ",";
            }

            // If there are more then one keys then we must remove the last comma character.
            let url = null;
            if (skillSets.length > 0) {
                skillsetIds = skillsetIds.slice(0, -1); // Removed last character.
            }
            const accessToken = getAccessTokenFromLocalStorage();
            url = process.env.REACT_APP_API_PROTOCOL + "://" + schema + "." + process.env.REACT_APP_API_DOMAIN + "/en/" + WORKERY_REPORT_THIRTEEN_CSV_DOWNLOAD_API_ENDPOINT + "?skillset_ids=" + skillsetIds + "&from_dt="+fromDateString+"&to_dt="+toDateString+"&state="+jobState+"&token="+accessToken;

            // For debugging purposes only.
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
            skillSets, skillSetOptions, isSkillSetsLoading, fromDate, toDate, jobState,
            errors, isLoading
        } = this.state;


        return (
            <Report13Component
                skillSets={skillSets}
                skillSetOptions={skillSetOptions}
                isSkillSetsLoading={isSkillSetsLoading}
                onSkillSetMultiChange={this.onSkillSetMultiChange}
                fromDate={fromDate}
                toDate={toDate}
                jobState={jobState}
                isLoading={isLoading}
                errors={errors}
                onSelectChange={this.onSelectChange}
                onFromDateChange={this.onFromDateChange}
                onToDateChange={this.onToDateChange}
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
        skillSets: store.skillSetsState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullSkillSetList: (page, sizePerPage, map, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullSkillSetList(page, sizePerPage, map, onSuccessCallback, onFailureCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Report13Container);
