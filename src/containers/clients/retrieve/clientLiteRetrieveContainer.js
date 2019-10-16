import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import ClientLiteRetrieveComponent from "../../../components/clients/retrieve/clientLiteRetrieveComponent";
import { clearFlashMessage } from "../../../actions/flashMessageActions";
import { pullClientDetail } from "../../../actions/clientActions";
import {
    localStorageGetObjectItem, localStorageSetObjectOrArrayItem
} from '../../../helpers/localStorageUtility';


class ClientLiteRetrieveContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        const { id } = this.props.match.params;

        // The following code will extract our financial data from the local
        // storage if the financial data was previously saved.
        const client = localStorageGetObjectItem("workery-admin-retrieve-client-"+id.toString() );
        const isLoading = isEmpty(client);

        // Update state.
        this.state = {
            id: id,
            client: client,
            isLoading: isLoading,
        }

        // Update functions.
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
        this.onFailureCallback = this.onFailureCallback.bind(this);
        this.onClientClick = this.onClientClick.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
        this.props.pullClientDetail(this.state.id, this.onSuccessCallback, this.onFailureCallback);
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
        this.setState({ isLoading: false, client: response, });

        // The following code will save the object to the browser's local
        // storage to be retrieved later more quickly.
        localStorageSetObjectOrArrayItem("workery-admin-retrieve-client-"+this.state.id.toString(), response);
    }

    onFailureCallback(errors) {
        console.log("onFailureCallback | errors:", errors);
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onClientClick(e) {
        e.preventDefault();
        localStorage.setItem("workery-create-order-clientId", this.props.clientDetail.id);
        localStorage.setItem("workery-create-order-clientGivenName", this.props.clientDetail.givenName);
        localStorage.setItem("workery-create-order-clientLastName", this.props.clientDetail.lastName);
        this.props.history.push("/orders/add/step-3");
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { id, isLoading } = this.state;
        const client = isEmpty(this.state.client) ? {} : this.state.client;
        return (
            <ClientLiteRetrieveComponent
                id={id}
                isLoading={isLoading}
                client={client}
                flashMessage={this.props.flashMessage}
                onClientClick={this.onClientClick}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        flashMessage: store.flashMessageState,
        clientDetail: store.clientDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        },
        pullClientDetail: (id, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullClientDetail(id, onSuccessCallback, onFailureCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ClientLiteRetrieveContainer);
