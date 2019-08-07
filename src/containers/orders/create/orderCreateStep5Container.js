import React, { Component } from 'react';
import { connect } from 'react-redux';

import OrderCreateStep5Component from "../../../components/orders/create/orderCreateStep5Component";
import { validateStep5CreateInput } from "../../../validators/orderValidator";


class OrderCreateStep5Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            comment: localStorage.getItem("workery-create-order-comment"),
            isLoading: true,
            errors: {},
            page: 1,
        }
        this.onTextChange = this.onTextChange.bind(this);
        this.onNextClick = this.onNextClick.bind(this);
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

    onTextChange(e) {
        // Update our state.
        this.setState({
            [e.target.name]: e.target.value,
        });

        // Update our persistent storage.
        const key = "workery-create-order-"+[e.target.name];
        localStorage.setItem(key, e.target.value)
    }

    onNextClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // console.log(this.state); // For debugging purposes only.

        // Perform client-side validation.
        const { errors, isValid } = validateStep5CreateInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.props.history.push("/orders/add/step-6");

        // CASE 2 OF 2: Validation was a failure.
        } else {
            this.setState({
                isLoading: false,
                errors: errors,
            })
        }
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { comment, errors } = this.state;
        return (
            <OrderCreateStep5Component
                comment={comment}
                onTextChange={this.onTextChange}
                onNextClick={this.onNextClick}
                errors={errors}
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
)(OrderCreateStep5Container);
