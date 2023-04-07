import React, { Component } from 'react';
import { connect } from 'react-redux';
import { camelizeKeys, decamelize } from 'humps';
import Scroll from 'react-scroll';

import AdminAssociateSearchResultComponent from "../../../../components/associates/admin/search/adminAssociateSearchResultComponent";
import { clearFlashMessage } from "../../../../actions/flashMessageActions";
import { pullAssociateList } from "../../../../actions/associateActions";
import { localStorageGetObjectItem } from '../../../../helpers/localStorageUtility';


class AdminAssociateSearchResultContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        const search = localStorageGetObjectItem('workery-search-associate-details');
        this.state = {
            // Pagination
            offset: 0,
            sizePerPage: 500,
            totalSize: 0,

            // Everything else
            isLoading: true,
            search: search,
        }
        this.getParametersMapFromState = this.getParametersMapFromState.bind(this);
        this.onAssociateClick = this.onAssociateClick.bind(this);
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
        this.onFailureCallback = this.onFailureCallback.bind(this);
        this.onNextClick = this.onNextClick.bind(this);
        this.onPreviousClick = this.onPreviousClick.bind(this);
    }

    getParametersMapFromState() {
        const search = localStorageGetObjectItem('workery-search-associate-details');
        const parametersMap = new Map();
        if (search.keyword !== undefined && search.keyword !== "") {
            parametersMap.set("search", search.keyword);
        }
        if (search.givenName !== undefined && search.givenName !== "") {
            parametersMap.set("given_name", search.givenName);
        }
        if (search.lastName !== undefined && search.lastName !== "") {
            parametersMap.set("last_name", search.lastName);
        }
        if (search.telephone !== undefined && search.telephone !== "") {
            parametersMap.set("telephone", search.telephone);
        }
        if (search.email !== undefined && search.email !== "") {
            parametersMap.set("email", search.email);
        }
        console.log("FILTERING", parametersMap); // For debugging purposes only.
        return parametersMap;
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the offset at the top of the offset.

        this.setState(
            { parametersMap: this.getParametersMapFromState(), isLoading: true, },
            ()=>{
                // STEP 3:
                // SUBMIT TO OUR API.
                this.props.pullAssociateList(this.state.offset, this.state.sizePerPage, this.getParametersMapFromState(), this.onSuccessCallback, this.onFailureCallback);
            }
        );
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

    onSuccessCallback(response) {
        console.log("onSuccessCallback | State (Pre-Fetch):", this.state);
        this.setState(
            {
                offset: response.offset,
                totalSize: response.count,
                isLoading: false,
            },
            ()=>{
                console.log("onSuccessCallback | Fetched:",response); // For debugging purposes only.
                console.log("onSuccessCallback | State (Post-Fetch):", this.state);
            }
        )
    }

    onFailureCallback(errors) {
        this.setState({
            errors: errors,
            isLoading: false
        })

        // The following code will cause the screen to scroll to the top of
        // the offset. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onAssociateClick(e, associateId, associateGivenName, associateLastName) {
        this.setState(
            { isLoading: true },
            ()=>{
                this.props.history.push("/associate/"+associateId+"");
            }
        );
    }

    onNextClick(e) {
        const offset = this.state.offset + 1;
        this.setState(
            {
                offset: offset,
                isLoading: true,
            },
            ()=>{
                this.props.pullAssociateList(offset, this.state.sizePerPage, this.getParametersMapFromState(), this.onSuccessCallback, this.onFailureCallback);
            }
        )
    }

    onPreviousClick(e) {
        const offset = this.state.offset - 1;
        this.setState(
            {
                offset: offset,
                isLoading: true,
            },
            ()=>{
                this.props.pullAssociateList(offset, this.state.sizePerPage, this.getParametersMapFromState(), this.onSuccessCallback, this.onFailureCallback);
            }
        )
    }



    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { offset, sizePerPage, totalSize, isLoading, errors } = this.state;
        const associates = (this.props.associateList && this.props.associateList.results) ? this.props.associateList.results : [];
        const hasNext = this.props.associateList.next !== null;
        const hasPrevious = this.props.associateList.previous !== null;
        return (
            <AdminAssociateSearchResultComponent
                offset={offset}
                sizePerPage={sizePerPage}
                totalSize={totalSize}
                associates={associates}
                isLoading={isLoading}
                errors={errors}
                onAssociateClick={this.onAssociateClick}
                hasNext={hasNext}
                onNextClick={this.onNextClick}
                hasPrevious={hasPrevious}
                onPreviousClick={this.onPreviousClick}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        flashMessage: store.flashMessageState,
        associateList: store.associateListState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        },
        pullAssociateList: (offset, sizePerPage, map, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullAssociateList(offset, sizePerPage, map, onSuccessCallback, onFailureCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminAssociateSearchResultContainer);
