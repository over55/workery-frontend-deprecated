
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import Scroll from 'react-scroll';

import TenantRedirectComponent from "../../components/dashboard/tenantRedirectComponent";
import { postLogout, attemptLogout } from "../../actions/logoutAction";
import { setFlashMessage } from "../../actions/flashMessageActions";
import { APP_STATE } from "../../constants/redux";


class LogoutContainer extends Component {

    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            isLoading: true
        }
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentWillUnmount() {
        // This code will fix the "ReactJS & Redux: Can't perform a React state
        // update on an unmounted component" issue as explained in:
        // https://stackoverflow.com/a/53829700
        this.setState = (state,callback)=>{
            return;
        };
    }

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.

        // For debugging purposes only.
        console.log("REACT_APP_WWW_PROTOCOL:", process.env.REACT_APP_WWW_PROTOCOL);
        console.log("REACT_APP_WWW_DOMAIN:", process.env.REACT_APP_WWW_DOMAIN);
        console.log("REACT_APP_API_PROTOCOL:", process.env.REACT_APP_API_PROTOCOL);
        console.log("REACT_APP_API_DOMAIN:", process.env.REACT_APP_API_DOMAIN);

        const { user } = this.props;
        if (user !== undefined && user.token !== undefined && user.token !== null) {
            // DEVELOPERS NOTE:
            // Regardless of any server related errors, the client browser will
            // automatically clear the storage pertaining to the user session.
            this.props.postLogout( // Call the API endpoint to log out.
                this.props.user,
                this.onSuccessfulSubmissionCallback,
                this.onFailedSubmissionCallback
            );
        } else {
            // CLEAR THE LOCAL STORAGE IF WE SUCCESSFULLY LOGGED OUT!
            localStorage.removeItem(APP_STATE) // Clear the state data of the app.
            localStorage.clear(); // Clear any remaining items.

            this.props.setFlashMessage("success", "You have successfully logged out.");
            this.setState({
                isLoading: false,
            })
        }
    }

    /**
     *  API callback functions
     *------------------------------------------------------------
     */

    onSuccessfulSubmissionCallback(member) {
        // CLEAR THE LOCAL STORAGE IF WE SUCCESSFULLY LOGGED OUT!
        localStorage.removeItem(APP_STATE) // Clear the state data of the app.
        localStorage.clear(); // Clear any remaining items.

        // Create a flash message telling the user that they successfully logged out.
        this.props.setFlashMessage("success", "You have successfully logged out.");

        const aURL = process.env.REACT_APP_WWW_PROTOCOL + "://" + process.env.REACT_APP_WWW_DOMAIN + "/login";
        console.log("aURL:", aURL);
        window.location.href = aURL;

        // Tell the state that we've successfully finished loading this page
        // as a result we will redirect to the login page.
        this.setState({
            isLoading: false,
        });
    }

    // onFailedSubmissionCallback(errors) {
    //     this.setState({
    //         errors: errors
    //     })
    //
    //     // The following code will cause the screen to scroll to the top of
    //     // the page. Please see ``react-scroll`` for more information:
    //     // https://github.com/fisshy/react-scroll
    //     var scroll = Scroll.animateScroll;
    //     scroll.scrollToTop();
    // }

    onFailedSubmissionCallback(errors) {
        // CLEAR THE LOCAL STORAGE IF WE SUCCESSFULLY LOGGED OUT!
        localStorage.removeItem(APP_STATE) // Clear the state data of the app.
        localStorage.clear(); // Clear any remaining items.

        // Create a flash message telling the user that they successfully logged out.
        this.props.setFlashMessage("success", "You have successfully logged out.");

        // Tell the state that we've successfully finished loading this page
        // as a result we will redirect to the login page.
        this.setState({
            isLoading: false,
        });
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    // Nothing...

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { isLoading, errors } = this.state;

        // DEVELOPERS NOTE:
        // - Do not use the `reac-router-dom` library to redirect by using the
        //  'Redirect' code because I tried and it did not set the correct
        //  sub-domain in the URL path, so I decided to use the
        //  `window.location.href` instead.
        if (isLoading == false) {
            const aURL = process.env.REACT_APP_WWW_PROTOCOL + "://" + process.env.REACT_APP_WWW_DOMAIN + "/login";
            console.log("aURL:", aURL);
            window.location.href = aURL;
        }

        return (
            <TenantRedirectComponent errors={errors} />
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
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
        postLogout: (user, onSuccessCallback, onFailureCallback) => {
            dispatch(postLogout(user, onSuccessCallback, onFailureCallback))
        },
        attemptLogout: () => {
            dispatch(attemptLogout())
        }
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LogoutContainer);
