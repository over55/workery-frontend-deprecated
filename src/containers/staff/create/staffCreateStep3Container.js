import React, { Component } from 'react';
import { connect } from 'react-redux';

import StaffCreateStep3Component from "../../../components/staff/create/staffCreateStep3Component";



class StaffCreateStep3Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            accountType: localStorage.getItem("workery-create-staff-accountType"),
            isLoading: true,
            errors: {},
            page: 1,
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
    onClick(e, accountType) {
        e.preventDefault();
        localStorage.setItem("workery-create-staff-accountType", accountType);
        this.props.history.push("/staff/add/step-4");
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        return (
            <StaffCreateStep3Component onClick={this.onClick} />
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
)(StaffCreateStep3Container);
