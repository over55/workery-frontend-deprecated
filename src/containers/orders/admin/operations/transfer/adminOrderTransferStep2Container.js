import React, { Component } from 'react';
import { connect } from 'react-redux';
import { camelizeKeys, decamelize } from 'humps';
import Scroll from 'react-scroll';

import AdminOrderTransferStep2Component from "../../../../../components/orders/admin/operations/transfer/adminOrderTransferStep2Component";
import { clearFlashMessage } from "../../../../../actions/flashMessageActions";
import { pullClientList } from "../../../../../actions/clientActions";
import { TINY_RESULTS_SIZE_PER_PAGE_PAGINATION } from "../../../../../constants/api";
import { localStorageGetObjectItem } from '../../../../../helpers/localStorageUtility';


class AdminOrderTransferStep2Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        const search = localStorageGetObjectItem('workery-transfer-order-details');
        this.state = {
            // Pagination
            page: 1,
            sizePerPage: 100,
            totalSize: 0,

            // Everything else
            isLoading: true,
            search: search,
        }
        this.getParametersMapFromState = this.getParametersMapFromState.bind(this);
        this.onClientClick = this.onClientClick.bind(this);
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
        this.onFailureCallback = this.onFailureCallback.bind(this);
        this.onNextClick = this.onNextClick.bind(this);
        this.onPreviousClick = this.onPreviousClick.bind(this);
    }

    getParametersMapFromState() {
        const search = localStorageGetObjectItem('workery-transfer-order-details');
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
        window.scrollTo(0, 0);  // Start the page at the top of the page.

        this.setState(
            { parametersMap: this.getParametersMapFromState(), isLoading: true, },
            ()=>{
                // STEP 3:
                // SUBMIT TO OUR API.
                this.props.pullClientList(this.state.page, this.state.sizePerPage, this.getParametersMapFromState(), this.onSuccessCallback, this.onFailureCallback);
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
                page: response.page,
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
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onClientClick(e, clientId, clientGivenName, clientLastName) {
        this.setState(
            { isLoading: true },
            ()=>{
                localStorage.setItem("workery-transfer-order-clientId", clientId);
                localStorage.setItem("workery-transfer-order-clientGivenName", clientGivenName);
                localStorage.setItem("workery-transfer-order-clientLastName", clientLastName);
                this.props.history.push("/order/"+this.props.orderDetail.id+"/transfer-step-3");
            }
        );
    }

    onNextClick(e) {
        const page = this.state.page + 1;
        this.setState(
            {
                page: page,
                isLoading: true,
            },
            ()=>{
                this.props.pullClientList(page, 100, this.getParametersMapFromState(), this.onSuccessCallback, this.onFailureCallback);
            }
        )
    }

    onPreviousClick(e) {
        const page = this.state.page - 1;
        this.setState(
            {
                page: page,
                isLoading: true,
            },
            ()=>{
                this.props.pullClientList(page, 100, this.getParametersMapFromState(), this.onSuccessCallback, this.onFailureCallback);
            }
        )
    }



    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { page, sizePerPage, totalSize, isLoading, errors } = this.state;
        const clients = (this.props.clientList && this.props.clientList.results) ? this.props.clientList.results : [];
        const hasNext = this.props.clientList.next !== null;
        const hasPrevious = this.props.clientList.previous !== null;
        return (
            <AdminOrderTransferStep2Component
                page={page}
                sizePerPage={sizePerPage}
                totalSize={totalSize}
                clients={clients}
                isLoading={isLoading}
                errors={errors}
                onClientClick={this.onClientClick}
                hasNext={hasNext}
                onNextClick={this.onNextClick}
                hasPrevious={hasPrevious}
                onPreviousClick={this.onPreviousClick}
                orderDetail={this.props.orderDetail}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        flashMessage: store.flashMessageState,
        clientList: store.clientListState,
        orderDetail: store.orderDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        },
        pullClientList: (page, sizePerPage, map, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullClientList(page, sizePerPage, map, onSuccessCallback, onFailureCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminOrderTransferStep2Container);