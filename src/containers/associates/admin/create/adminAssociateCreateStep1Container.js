import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import AssociateCreateStep1Component from "../../../components/associates/create/associateCreateStep1Component";


class AssociateCreateStep1Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            givenName: localStorage.getItem("workery-create-associate-givenName"),
            lastName: localStorage.getItem("workery-create-associate-lastName"),
            email: localStorage.getItem("workery-create-associate-email"),
            phone: localStorage.getItem("workery-create-associate-phone"),
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

    onSuccessfulSubmissionCallback(associate) {
        this.setState({ errors: {}, isLoading: true, })
        this.props.history.push("/associates/add/step-2");
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

        const key = "workery-create-associate-"+[e.target.name].toString();
        localStorage.setItem(key, e.target.value);
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        this.onSuccessfulSubmissionCallback();
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { givenName, lastName, email, phone, errors, isLoading } = this.state
        return (
            <AssociateCreateStep1Component
                givenName={givenName}
                lastName={lastName}
                email={email}
                phone={phone}
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
    return {
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AssociateCreateStep1Container);
