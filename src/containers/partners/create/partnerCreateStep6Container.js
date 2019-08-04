import React, { Component } from 'react';
import { connect } from 'react-redux';

import PartnerCreateStep6Component from "../../../components/partners/create/partnerCreateStep6Component";
import { setFlashMessage } from "../../../actions/flashMessageActions";
import {
    RESIDENCE_TYPE_OF,
    BUSINESS_TYPE_OF,
    COMMUNITY_CARES_TYPE_OF
} from '../../../constants/api';


class PartnerCreateStep6Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Get the type of.
        const typeOf = parseInt(localStorage.getItem("nwapp-create-partner-typeOf"));
        let returnURL;
        if (typeOf === RESIDENCE_TYPE_OF || typeOf === COMMUNITY_CARES_TYPE_OF) {
            returnURL = "/partners/add/step-4-rez-or-cc";
        }
        else if (typeOf === BUSINESS_TYPE_OF) {
            returnURL = "/partners/add/step-4-biz";
        }

        this.state = {
            returnURL: returnURL,
            watchSlug: localStorage.getItem('nwapp-create-partner-watch-slug'),
            watchIcon: localStorage.getItem('nwapp-create-partner-watch-icon'),
            watchName: localStorage.getItem('nwapp-create-partner-watch-name'),
            typeOf: typeOf,
        }
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.

        // REPLACE THIS CODE WITH API CODE.
        const tableData = [
            {
                slug: "argyle-watch",
                icon: "home",
                name: "Argyle Community Watch"
            },{
                slug: "byron-watch",
                icon: "building",
                name: "Byron Business Watch"
            },{
                slug: "carling-watch",
                icon: "university",
                name: "Carling Retirement Centre Watch"
            }
        ];

        // Set our state.
        this.setState({
            tableData: tableData,
            isLoading: false,
        });

        // Set our event handling.
        this.onTableRowClick = this.onTableRowClick.bind(this);
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

    onTableRowClick(e, slug, icon, name) {
        e.preventDefault();
        this.setState({
            isLoading: true
        })
        localStorage.setItem('nwapp-create-partner-watch-slug', slug);
        localStorage.setItem('nwapp-create-partner-watch-icon', icon);
        localStorage.setItem('nwapp-create-partner-watch-name', name);
        this.props.history.push("/partners/add/step-7");
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { returnURL, tableData, isLoading } = this.state;
        return (
            <PartnerCreateStep6Component
                tableData={tableData}
                returnURL={returnURL}
                isLoading={isLoading}
                onTableRowClick={this.onTableRowClick}
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
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PartnerCreateStep6Container);
