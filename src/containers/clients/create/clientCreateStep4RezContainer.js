import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import ClientCreateStep4RezComponent from "../../../components/clients/create/clientCreateStep4RezComponent";
import { validateStep4RezCreateInput } from "../../../validators/clientValidator";
import { RESIDENCE_TYPE_OF } from '../../../constants/api';


class ClientCreateStep4RezContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            firstName: localStorage.getItem("nwapp-create-client-rez-or-com-firstName"),
            lastName: localStorage.getItem("nwapp-create-client-rez-or-com-lastName"),
            primaryPhone: localStorage.getItem("nwapp-create-client-rez-or-com-primaryPhone"),
            secondaryPhone: localStorage.getItem("nwapp-create-client-rez-or-com-secondaryPhone"),
            email: localStorage.getItem("nwapp-create-client-rez-or-com-email"),
            errors: {},
            isLoading: false
        }

        this.onTextChange = this.onTextChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.

        // DEVELOPERS NOTE:
        // Since we are in this page, we need to assign the user to be
        // a residential type user. If the user is community cares type
        // then this variable will be set then in page 4.
        localStorage.setItem("nwapp-create-client-typeOf", RESIDENCE_TYPE_OF);
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

    onSuccessfulSubmissionCallback(client) {
        this.props.history.push("/clients/add/step-5");
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

    onTextChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
        const key = "nwapp-create-client-rez-or-com-"+[e.target.name];
        localStorage.setItem(key, e.target.value);
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateStep4RezCreateInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.onSuccessfulSubmissionCallback();

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
        const { firstName, lastName, primaryPhone, secondaryPhone, email, errors } = this.state;
        return (
            <ClientCreateStep4RezComponent
                firstName={firstName}
                lastName={lastName}
                primaryPhone={primaryPhone}
                secondaryPhone={secondaryPhone}
                email={email}
                errors={errors}
                onTextChange={this.onTextChange}
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
    return {}
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ClientCreateStep4RezContainer);