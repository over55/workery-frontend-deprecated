import React, { Component } from 'react';
import { connect } from 'react-redux';

import OngoingOrderFullRetrieveComponent from "../../../components/ongoingOrders/retrieve/ongoingOrderFullRetrieveComponent";
import { pullOngoingOrderDetail } from "../../../actions/ongoingOrderActions";
import { clearFlashMessage } from "../../../actions/flashMessageActions";
import { getHowHearReactSelectOptions } from "../../../actions/howHearActions";
import { getTagReactSelectOptions } from "../../../actions/tagActions";
import {
    RESIDENCE_TYPE_OF,
    BUSINESS_TYPE_OF,
    COMMUNITY_CARES_TYPE_OF
} from '../../../constants/api';


class OngoingOrderFullRetrieveContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        const { id } = this.props.match.params;

        // Update state.
        this.state = {
            id: parseInt(id),
            order: {}
        }

        // Update functions.
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
        this.onFailureCallback = this.onFailureCallback.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
        this.props.pullOngoingOrderDetail(this.state.id, this.onSuccessCallback, this.onFailureCallback);
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

    onSuccessCallback(profile) {
        console.log(profile);
    }

    onFailureCallback(errors) {
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
        const ongoingOrder = this.props.ongoingOrderDetail ? this.props.ongoingOrderDetail : {};
        return (
            <OngoingOrderFullRetrieveComponent
                id={this.state.id}
                ongoingOrder={ongoingOrder}
                flashMessage={this.props.flashMessage}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        flashMessage: store.flashMessageState,
        ongoingOrderDetail: store.ongoingOrderDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        },
        pullOngoingOrderDetail: (id, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullOngoingOrderDetail(id, onSuccessCallback, onFailureCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OngoingOrderFullRetrieveContainer);
