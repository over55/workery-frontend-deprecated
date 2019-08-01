import React, { Component } from 'react';
import { connect } from 'react-redux';
import { camelizeKeys, decamelize } from 'humps';

import ClientListComponent from "../../../components/clients/list/clientListComponent";
import { clearFlashMessage } from "../../../actions/flashMessageActions";
import { pullClientList } from "../../../actions/clientActions";


class ClientListContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            filter: "active",
            clients: [],
        }
        this.onFilterClick = this.onFilterClick.bind(this);
        this.onTableChange = this.onTableChange.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.

        this.props.pullClientList(1); // Load up the default page.
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

    onSuccessfulSubmissionCallback(profile) {
        console.log(profile);
    }

    onFailedSubmissionCallback(errors) {
        console.log(errors);
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onFilterClick(e, filter) {
        e.preventDefault();
        this.setState({
            filter: filter,
        })
    }

    onTableChange(type, { sortField, sortOrder, data }) {
        if (type === "sort") {
            var filtersMap = new Map();
            if (sortOrder === "asc") {
                filtersMap.set('o', decamelize(sortField));
            }
            if (sortOrder === "desc") {
                filtersMap.set('o', "-"+decamelize(sortField));
            }
            this.props.pullClientList(this.state.page, filtersMap);
        }
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {

        return (
            <ClientListComponent
                filter={this.state.filter}
                onFilterClick={this.onFilterClick}
                clientList={this.props.clientList}
                onTableChange={this.onTableChange}
                flashMessage={this.props.flashMessage}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        flashMessage: store.flashMessageState,
        clientList: store.clientListState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        },
        pullClientList: (page, filtersMap) => {
            dispatch(
                pullClientList(page, filtersMap)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ClientListContainer);
