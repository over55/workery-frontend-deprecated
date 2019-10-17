import React, { Component } from 'react';
import { connect } from 'react-redux';
import { camelizeKeys, decamelize } from 'humps';
import Scroll from 'react-scroll';

import AdminAssociateChangePasswordOperationComponent from "../../../../components/associates/admin/operations/adminAssociateChangePasswordOperationComponent";
import { setFlashMessage } from "../../../../actions/flashMessageActions";
import { postAssociateChangePasswordOperation } from "../../../../actions/associateActions";
import { validateChangePasswordOperationInput } from "../../../../validators/associateValidator"


class AdminAssociateAvatarOperationContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        const { id } = this.props.match.params;
        this.state = {
            isLoading: false,
            password: "",
            repeatPassword: "",

            // Everything else...
            associate: id,
            id: id,
            errors: {},
        }
        this.getPostData = this.getPostData.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
        this.onFailureCallback = this.onFailureCallback.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    /**
     *  Utility function used to create the `postData` we will be submitting to
     *  the API; as a result, this function will structure some dictionary key
     *  items under different key names to support our API web-service's API.
     */
    getPostData() {
        let postData = Object.assign({}, this.state);

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

    onSuccessCallback(response) {
        console.log("onSuccessCallback | Fetched:",response); // For debugging purposes only.
        this.setState({ errors: {}, isLoading: false, })
        this.props.setFlashMessage("success", "Associate's password has been successfully updated.");
        this.props.history.push("/associate/"+this.state.id+"/operations");
    }

    onFailureCallback(errors) {
        console.log("onFailureCallback |", errors);
        this.setState({ isLoading: false, errors: errors, });
    }

    onTagFetchSuccessCallback(response) {
        this.setState({ isTagSetsLoading: false, });
    }


    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onTextChange(e) {
        // AddressUpdate our state.
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    onClick(e) {
        e.preventDefault();

        const { errors, isValid } = validateChangePasswordOperationInput(this.state);
        // console.log(errors, isValid); // For debugging purposes only.

        if (isValid) {
            this.setState({ isLoading: true, errors: [] }, ()=>{
                this.props.postAssociateChangePasswordOperation(
                    this.getPostData(),
                    this.onSuccessCallback,
                    this.onFailureCallback
                );
            });
        } else {
            this.setState({
                errors: errors,
                isLoading: false,
            });

            // The following code will cause the screen to scroll to the top of
            // the page. Please see ``react-scroll`` for more information:
            // https://github.com/fisshy/react-scroll
            var scroll = Scroll.animateScroll;
            scroll.scrollToTop();
        }
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { isLoading, id, errors, file } = this.state;
        const associate = this.props.associateDetail ? this.props.associateDetail : {};
        return (
            <AdminAssociateChangePasswordOperationComponent
                id={id}
                associate={associate}
                isLoading={isLoading}
                errors={errors}
                onClick={this.onClick}
                onTextChange={this.onTextChange}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        associateDetail: store.associateDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
        postAssociateChangePasswordOperation: (postData, successCallback, failedCallback) => {
            dispatch(postAssociateChangePasswordOperation(postData, successCallback, failedCallback))
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminAssociateAvatarOperationContainer);
