import React, { Component } from 'react';
import { connect } from 'react-redux';
import { camelizeKeys, decamelize } from 'humps';
import Scroll from 'react-scroll';

import PartnerSearchResultComponent from "../../../components/partners/search/partnerSearchResultComponent";
import { clearFlashMessage } from "../../../actions/flashMessageActions";
import { pullPartnerList } from "../../../actions/partnerActions";
import { STANDARD_RESULTS_SIZE_PER_PAGE_PAGINATION } from "../../../constants/api";
import { localStorageGetObjectItem } from '../../../helpers/localStorageUtility';


class AdminPartnerSearchResultContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        const search = localStorageGetObjectItem('workery-search-partner-details');
        this.state = {
            // Pagination
            offset: 0,
            sizePerPage: 100,
            totalSize: 0,

            // Everything else
            isLoading: true,
            search: search,
        }
        this.getParametersMapFromState = this.getParametersMapFromState.bind(this);
        this.onPartnerClick = this.onPartnerClick.bind(this);
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
        this.onFailureCallback = this.onFailureCallback.bind(this);
        this.onNextClick = this.onNextClick.bind(this);
        this.onPreviousClick = this.onPreviousClick.bind(this);
    }

    getParametersMapFromState() {
        const search = localStorageGetObjectItem('workery-search-partner-details');
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
                this.props.pullPartnerList(this.state.offset, this.state.sizePerPage, this.getParametersMapFromState(), this.onSuccessCallback, this.onFailureCallback);
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

    onPartnerClick(e, partnerId, partnerGivenName, partnerLastName) {
        this.setState(
            { isLoading: true },
            ()=>{
                this.props.history.push("/partner/"+partnerId+"");
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
                this.props.pullPartnerList(offset, 100, this.getParametersMapFromState(), this.onSuccessCallback, this.onFailureCallback);
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
                this.props.pullPartnerList(offset, 100, this.getParametersMapFromState(), this.onSuccessCallback, this.onFailureCallback);
            }
        )
    }



    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { offset, sizePerPage, totalSize, isLoading, errors } = this.state;
        const partners = (this.props.partnerList && this.props.partnerList.results) ? this.props.partnerList.results : [];
        const hasNext = this.props.partnerList.next !== null;
        const hasPrevious = this.props.partnerList.previous !== null;
        return (
            <PartnerSearchResultComponent
                offset={offset}
                sizePerPage={sizePerPage}
                totalSize={totalSize}
                partners={partners}
                isLoading={isLoading}
                errors={errors}
                onPartnerClick={this.onPartnerClick}
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
        partnerList: store.partnerListState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        },
        pullPartnerList: (offset, sizePerPage, map, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullPartnerList(offset, sizePerPage, map, onSuccessCallback, onFailureCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminPartnerSearchResultContainer);
