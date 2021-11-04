import React, { Component } from 'react';
import { connect } from 'react-redux';

import AdminAssociateCreateStep3Component from "../../../../components/associates/admin/create/adminAssociateCreateStep3Component";
import { localStorageGetIntegerItem } from '../../../../helpers/localStorageUtility';


class AdminAssociateCreateStep3Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            typeOf: localStorageGetIntegerItem("workery-create-associate-typeOf"),
            typeOfLabel: localStorage.getItem("workery-create-associate-typeOf-label"),
        };
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

    onClick(e, typeOf, typeOfLabel) {
        e.preventDefault();
        console.log("onClick", typeOf, typeOfLabel);
        localStorage.setItem("workery-create-associate-typeOf", parseInt(typeOf));
        localStorage.setItem("workery-create-associate-typeOf-label", typeOfLabel);
        this.props.history.push("/associates/add/step-4");
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        return (
            <AdminAssociateCreateStep3Component 
                {...this}
                {...this.state}
                {...this.props}
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
)(AdminAssociateCreateStep3Container);
