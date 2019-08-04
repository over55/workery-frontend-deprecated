import React, { Component } from 'react';
import { connect } from 'react-redux';

import FinancialRetrieveComponent from "../../../components/financials/retrieve/financialRetrieveComponent";
import { clearFlashMessage } from "../../../actions/flashMessageActions";
import { getHowHearReactSelectOptions } from "../../../actions/howHearActions";
import { getTagReactSelectOptions } from "../../../actions/tagActions";
import {
    RESIDENCE_TYPE_OF,
    BUSINESS_TYPE_OF,
    COMMUNITY_CARES_TYPE_OF
} from '../../../constants/api';


class FinancialRetrieveContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        const { id } = this.props.match.params;

        // Update state.
        this.state = {
            id: id,
            financialData: {},
            errors: {},
            isLoading: false
        }
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.

        this.setState({
            financialData: {
                slug: 'argyle',
                number: 1,
                name: 'Argyle',
                absoluteUrl: '/financial/argyle',
                typeOf: RESIDENCE_TYPE_OF,
                bizCompanyName: "",
                bizContactFirstName: "",
                bizContactLastName: "",
                bizPrimaryPhone: "",
                bizSecondaryPhone: "",
                bizEmail: "",
                rezFirstName: "Shinji",
                rezLastName: "Ikari",
                rezPrimaryPhone:  "(111) 111-1111",
                rezSecondaryPhone: "(222) 222-2222",
                rezEmail: "shinji.ikari@nerv.worldgov",
                streetNumber: 123,
                streetName: "Somewhere",
                streetType: "Street",
                streetTypeOption: "",
                streetTypeOther: "",
                apartmentUnit: "Upper",
                streetDirection: "North",
                streetDirectionOption: "",
                postalCode: "N6J4X4",
                watchSlug: "argyle",
                watchIcon: "home",
                watchName: "Argyle",
                tags:[
                    "security", "fitness"
                ],
                // tags:[
                //     {selectName: "tags", value: "security", label: "Security"},
                //     {selectName: "tags", value: "fitness", label: "Fitness"}
                // ],
                birthYear: 1980,
                gender: 2,
                genderLabel: "Female",
                howDidYouHear: "internet",
                howDidYouHearOption: "",
                howDidYouHearOther: "",
                howDidYouHearLabel: "Internet",
                meaning: "Insert meaning here",
                expectations: "Insert expectations here",
                willingToVolunteerLabel: "Yes",
                anotherHouseholdFinancialRegisteredLabel: "Yes",
            }
        });
    }

    componentWillUnmount() {
        // This code will fix the "ReactJS & Redux: Can't perform a React state
        // update on an unmounted component" issue as explained in:
        // https://stackoverflow.com/a/53829700
        this.setState = (state,callback)=>{
            return;
        };

        // Clear any and all flash messages in our queue to be rendered.
        this.props.clearFlashMessage();
    }

    /**
     *  API callback functions
     *------------------------------------------------------------
     */

    onSuccessfulSubmissionCallback(profile) {
        console.log(profile);
    }

    onFailedSubmissionCallback(errors) {
        console.log(errors);
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const howDidYouHearOptions = getHowHearReactSelectOptions(this.state.howDidYouHearData, "howDidYouHear");
        const tagOptions = getTagReactSelectOptions(this.state.tagsData, "tags");
        return (
            <FinancialRetrieveComponent
                slug={this.state.slug}
                financialData={this.state.financialData}
                flashMessage={this.props.flashMessage}
                tagOptions={tagOptions}
                howDidYouHearOptions={howDidYouHearOptions}
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
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FinancialRetrieveContainer);
