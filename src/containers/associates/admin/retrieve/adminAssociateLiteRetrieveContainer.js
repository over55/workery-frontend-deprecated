import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import AdminAssociateLiteRetrieveComponent from "../../../../components/associates/admin/retrieve/adminAssociateLiteRetrieveComponent";
import { clearFlashMessage } from "../../../../actions/flashMessageActions";
import { pullAssociateDetail } from "../../../../actions/associateActions";
import {
    localStorageGetObjectItem, localStorageSetObjectOrArrayItem
} from '../../../../helpers/localStorageUtility';


class AdminAssociateLiteRetrieveContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        const { id } = this.props.match.params;

        // The following code will extract our financial data from the local
        // storage if the financial data was previously saved.
        const associate = localStorageGetObjectItem("workery-admin-retrieve-associate-"+id.toString() );
        const isLoading = isEmpty(associate);

        // Update state.
        this.state = {
            id: id,
            associate: associate,
            isLoading: isLoading,
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
        this.props.pullAssociateDetail(this.state.id, this.onSuccessCallback, this.onFailureCallback);
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
        console.log(response);
        this.setState({ isLoading: false, associate: response, });

        // The following code will save the object to the browser's local
        // storage to be retrieved later more quickly.
        localStorageSetObjectOrArrayItem("workery-admin-retrieve-associate-"+this.state.id.toString(), response);

    }

    onFailureCallback(errors) {
        console.log("onFailureCallback | errors:", errors);
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
        const associate = isEmpty(this.state.associate) ? {} : this.state.associate;
        return (
            <AdminAssociateLiteRetrieveComponent
                {...this}
                {...this.state}
                {...this.props}
                associate={associate}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        flashMessage: store.flashMessageState,
        associateDetail: store.associateDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        },
        pullAssociateDetail: (id, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullAssociateDetail(id, onSuccessCallback, onFailureCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminAssociateLiteRetrieveContainer);
