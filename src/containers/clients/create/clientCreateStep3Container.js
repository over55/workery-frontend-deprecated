import React, { Component } from 'react';
import { connect } from 'react-redux';

import ClientCreateStep3Component from "../../../components/clients/create/clientCreateStep3Component";


class ClientCreateStep3Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */
    constructor(props) {
        super(props);
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

        localStorage.setItem("workery-create-client-typeOf", typeOf);
        localStorage.setItem("workery-create-client-typeOf-label", typeOfLabel);

        this.props.history.push("/clients/add/step-4");
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        return (
            <ClientCreateStep3Component onClick={this.onClick}/>
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
)(ClientCreateStep3Container);
