import React, { Component } from 'react';
import { connect } from 'react-redux';

import PartnerFullRetrieveComponent from "../../../components/partners/retrieve/partnerFullRetrieveComponent";
import { clearFlashMessage } from "../../../actions/flashMessageActions";
import { pullPartnerDetail } from "../../../actions/partnerActions";


class PartnerFullRetrieveContainer extends Component {
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
            partner: {}
        }

        // Update functions.
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
        this.onFailureCallback = this.onFailureCallback.bind(this);
        this.onPartnerClick = this.onPartnerClick.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
        this.props.pullPartnerDetail(this.state.id, this.onSuccessCallback, this.onFailureCallback);
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

    onSuccessCallback(response) {
        console.log("onSuccessCallback | Fetched:", response);
    }

    onFailureCallback(errors) {
        console.log("onFailureCallback | errors:", errors);
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onPartnerClick(e) {
        e.preventDefault();
        localStorage.setItem("workery-create-order-partnerId", this.props.partnerDetail.id);
        localStorage.setItem("workery-create-order-partnerGivenName", this.props.partnerDetail.givenName);
        localStorage.setItem("workery-create-order-partnerLastName", this.props.partnerDetail.lastName);
        this.props.history.push("/orders/add/step-3");
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { id } = this.state;
        const partner = this.props.partnerDetail ? this.props.partnerDetail : [];
        return (
            <PartnerFullRetrieveComponent
                id={id}
                partner={partner}
                flashMessage={this.props.flashMessage}
                onPartnerClick={this.onPartnerClick}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        flashMessage: store.flashMessageState,
        partnerDetail: store.partnerDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        },
        pullPartnerDetail: (id, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullPartnerDetail(id, onSuccessCallback, onFailureCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PartnerFullRetrieveContainer);
