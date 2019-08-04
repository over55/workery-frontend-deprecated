import React, { Component } from 'react';
import { connect } from 'react-redux';

import PartnerCreateStep8Component from "../../../components/partners/create/partnerCreateStep8Component";
import { setFlashMessage } from "../../../actions/flashMessageActions";
import {
    localStorageGetObjectItem, localStorageGetArrayItem
} from '../../../helpers/localStorageUtility';
import {
    RESIDENCE_TYPE_OF,
    BUSINESS_TYPE_OF,
    COMMUNITY_CARES_TYPE_OF
} from '../../../constants/api';


class PartnerCreateStep8Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Get the type of.
        const typeOf = parseInt(localStorage.getItem("nwapp-create-partner-typeOf"));
        let returnURL;
        if (typeOf === RESIDENCE_TYPE_OF || typeOf === COMMUNITY_CARES_TYPE_OF) {
            returnURL = "/partners/add/step-4-rez-or-cc";
        }
        else if (typeOf === BUSINESS_TYPE_OF) {
            returnURL = "/partners/add/step-4-biz";
        }

        this.state = {
            returnURL: returnURL,
            typeOf: typeOf,
            bizCompanyName: localStorage.getItem("nwapp-create-partner-biz-companyName"),
            bizContactFirstName: localStorage.getItem("nwapp-create-partner-biz-contactFirstName"),
            bizContactLastName: localStorage.getItem("nwapp-create-partner-biz-contactLastName"),
            bizPrimaryPhone: localStorage.getItem("nwapp-create-partner-biz-primaryPhone"),
            bizSecondaryPhone: localStorage.getItem("nwapp-create-partner-biz-secondaryPhone"),
            bizEmail: localStorage.getItem("nwapp-create-partner-biz-email"),
            rezFirstName: localStorage.getItem("nwapp-create-partner-rez-or-com-firstName"),
            rezLastName: localStorage.getItem("nwapp-create-partner-rez-or-com-lastName"),
            rezPrimaryPhone: localStorage.getItem("nwapp-create-partner-rez-or-com-primaryPhone"),
            rezSecondaryPhone: localStorage.getItem("nwapp-create-partner-rez-or-com-secondaryPhone"),
            rezEmail: localStorage.getItem("nwapp-create-partner-rez-or-com-email"),
            streetNumber: localStorage.getItem("nwapp-create-partner-streetNumber"),
            streetName: localStorage.getItem("nwapp-create-partner-streetName"),
            streetType: localStorage.getItem("nwapp-create-partner-streetType"),
            streetTypeOption: localStorageGetObjectItem('nwapp-create-partner-streetTypeOption'),
            streetTypeOther: localStorage.getItem("nwapp-create-partner-streetTypeOther"),
            apartmentUnit: localStorage.getItem("nwapp-create-partner-apartmentUnit"),
            streetDirection: localStorage.getItem("nwapp-create-partner-streetDirection"),
            streetDirectionOption: localStorageGetObjectItem('nwapp-create-partner-streetDirectionOption'),
            postalCode: localStorage.getItem("nwapp-create-partner-postalCode"),
            watchSlug: localStorage.getItem('nwapp-create-partner-watch-slug'),
            watchIcon: localStorage.getItem('nwapp-create-partner-watch-icon'),
            watchName: localStorage.getItem('nwapp-create-partner-watch-name'),
            tags: localStorageGetArrayItem("nwapp-create-partner-tags"),
            birthYear: localStorage.getItem("nwapp-create-partner-birthYear"),
            gender: parseInt(localStorage.getItem("nwapp-create-partner-gender")),
            genderLabel: localStorage.getItem("nwapp-create-partner-gender-label"),
            howDidYouHear: localStorage.getItem("nwapp-create-partner-howDidYouHear"),
            howDidYouHearLabel: localStorage.getItem("nwapp-create-partner-howDidYouHearLabel"),
            howDidYouHearOption: localStorageGetObjectItem('nwapp-create-partner-howDidYouHearOption'),
            howDidYouHearOther: localStorage.getItem("nwapp-create-partner-howDidYouHearOther"),
            meaning: localStorage.getItem("nwapp-create-partner-meaning"),
            expectations: localStorage.getItem("nwapp-create-partner-expectations"),
            willingToVolunteer: parseInt(localStorage.getItem("nwapp-create-partner-willingToVolunteer")),
            willingToVolunteerLabel: localStorage.getItem("nwapp-create-partner-willingToVolunteer-label"),
            anotherHouseholdPartnerRegistered: parseInt(localStorage.getItem("nwapp-create-partner-anotherHouseholdPartnerRegistered")),
            anotherHouseholdPartnerRegisteredLabel: localStorage.getItem("nwapp-create-partner-anotherHouseholdPartnerRegistered-label"),
            totalHouseholdCount: parseInt(localStorage.getItem("nwapp-create-partner-totalHouseholdCount")),
            under18YearsHouseholdCount: parseInt(localStorage.getItem("nwapp-create-partner-under18YearsHouseholdCount")),
            companyEmployeeCount: parseInt(localStorage.getItem("nwapp-create-partner-companyEmployeeCount")),
            companyYearsInOperation: parseInt(localStorage.getItem("nwapp-create-partner-companyYearsInOperation")),
            companyType: localStorage.getItem("nwapp-create-partner-companyType"),
            errors: {},
            isLoading: false
        }

        this.onClick = this.onClick.bind(this);
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

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        this.setState({ errors: {}, isLoading: true, })
        this.props.setFlashMessage("success", "Partner has been successfully created.");
        this.props.history.push("/partners");
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const {
            returnURL, typeOf, errors,
            bizCompanyName, bizContactFirstName, bizContactLastName, bizPrimaryPhone, bizSecondaryPhone, bizEmail,
            rezFirstName, rezLastName, rezPrimaryPhone, rezSecondaryPhone, rezEmail,
            streetNumber, streetName, streetType, streetTypeOption, streetTypeOther, apartmentUnit, streetDirection, streetDirectionOption, postalCode,
            watchSlug, watchIcon, watchName,
            tags, birthYear, gender, genderLabel, howDidYouHear, howDidYouHearOther, howDidYouHearLabel, meaning, expectations,
            willingToVolunteer, willingToVolunteerLabel, anotherHouseholdPartnerRegistered, anotherHouseholdPartnerRegisteredLabel, totalHouseholdCount, under18YearsHouseholdCount,
            companyEmployeeCount, companyYearsInOperation, companyType,
        } = this.state;

        return (
            <PartnerCreateStep8Component
                returnURL={returnURL}
                typeOf={typeOf}
                bizCompanyName={bizCompanyName}
                bizContactFirstName={bizContactFirstName}
                bizContactLastName={bizContactLastName}
                bizPrimaryPhone={bizPrimaryPhone}
                bizSecondaryPhone={bizSecondaryPhone}
                bizEmail={bizEmail}
                rezFirstName={rezFirstName}
                rezLastName={rezLastName}
                rezPrimaryPhone={rezPrimaryPhone}
                rezSecondaryPhone={rezSecondaryPhone}
                rezEmail={rezEmail}
                streetNumber={streetNumber}
                streetName={streetName}
                streetType={streetType}
                streetTypeOption={streetTypeOption}
                streetTypeOther={streetTypeOther}
                apartmentUnit={apartmentUnit}
                streetDirection={streetDirection}
                streetDirectionOption={streetDirectionOption}
                postalCode={postalCode}
                watchSlug={watchSlug}
                watchIcon={watchIcon}
                watchName={watchName}
                tags={tags}
                birthYear={birthYear}
                gender={gender}
                genderLabel={genderLabel}
                howDidYouHear={howDidYouHear}
                howDidYouHearLabel={howDidYouHearLabel}
                howDidYouHearOther={howDidYouHearOther}
                meaning={meaning}
                expectations={expectations}
                willingToVolunteer={willingToVolunteer}
                willingToVolunteerLabel={willingToVolunteerLabel}
                anotherHouseholdPartnerRegistered={anotherHouseholdPartnerRegistered}
                anotherHouseholdPartnerRegisteredLabel={anotherHouseholdPartnerRegisteredLabel}
                totalHouseholdCount={totalHouseholdCount}
                under18YearsHouseholdCount={under18YearsHouseholdCount}
                companyEmployeeCount={companyEmployeeCount}
                companyYearsInOperation={companyYearsInOperation}
                companyType={companyType}
                errors={errors}
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
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PartnerCreateStep8Container);
