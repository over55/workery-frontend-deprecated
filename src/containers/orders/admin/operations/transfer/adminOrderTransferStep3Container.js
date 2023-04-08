import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import AdminOrderTransferStep3Component from "../../../../../components/orders/admin/operations/transfer/adminOrderTransferStep3Component";
import { validateSearchInput } from "../../../../../validators/associateValidator";
import { localStorageSetObjectOrArrayItem } from '../../../../../helpers/localStorageUtility';


class AssociateListContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props)
        this.state = {
            keyword: "",
            advancedSearchActive: false,
            givenName: "",
            lastName: "",
            telephone: "",
            email: "",
            errors: {},
        }
        this.onTextChange = this.onTextChange.bind(this);
        this.onAdvancedSearchPanelToggle = this.onAdvancedSearchPanelToggle.bind(this);
        this.onSearchClick = this.onSearchClick.bind(this);
        this.onAdvancedSearchClick = this.onAdvancedSearchClick.bind(this);
        this.onSkipClick = this.onSkipClick.bind(this);
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
        this.setState({ [e.target.name]: e.target.value, });
    }

    onAdvancedSearchPanelToggle() {
        this.setState({ advancedSearchActive: !this.state.advancedSearchActive });
    }

    onSearchClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();
        this.setState({ advancedSearchActive: false, }, ()=> {
            // Perform associate-side validation.
            const { errors, isValid } = validateSearchInput(this.state);

            // CASE 1 OF 2: Validation passed successfully.
            if (isValid) {

                    localStorageSetObjectOrArrayItem('workery-search-associate-details', this.state);
                    this.props.history.push("/order/"+this.props.orderDetail.id+"/transfer-step-4");

            // CASE 2 OF 2: Validation was a failure.
            } else {
                this.setState({ errors: errors });

                // The following code will cause the screen to scroll to the top of
                // the page. Please see ``react-scroll`` for more information:
                // https://github.com/fisshy/react-scroll
                var scroll = Scroll.animateScroll;
                scroll.scrollToTop();
            }
        });
    }

    onAdvancedSearchClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();
        this.setState({ advancedSearchActive: true, }, ()=> {
            // Perform associate-side validation.
            const { errors, isValid } = validateSearchInput(this.state);

            // CASE 1 OF 2: Validation passed successfully.
            if (isValid) {

                    localStorageSetObjectOrArrayItem('workery-search-associate-details', this.state);
                    this.props.history.push("/order/"+this.props.orderDetail.id+"/transfer-step-4");

            // CASE 2 OF 2: Validation was a failure.
            } else {
                this.setState({ errors: errors });

                // The following code will cause the screen to scroll to the top of
                // the page. Please see ``react-scroll`` for more information:
                // https://github.com/fisshy/react-scroll
                var scroll = Scroll.animateScroll;
                scroll.scrollToTop();
            }
        });
    }

    onSkipClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        console.log("onSkipClick", this.props.orderDetail.associate);

        if (this.props.orderDetail.associate !== undefined && this.props.orderDetail.associate !== null && this.props.orderDetail.associate !== "") {
            // Set the default associate.
            localStorage.setItem("workery-transfer-order-associateId", this.props.orderDetail.associate.id);
            localStorage.setItem("workery-transfer-order-associateGivenName", this.props.orderDetail.associate.givenName);
            localStorage.setItem("workery-transfer-order-associateLastName", this.props.orderDetail.associate.lastName);

            // Redirect to the review page.
            this.props.history.push("/order/"+this.props.orderDetail.id+"/transfer-step-5");
        } else {
            // alert("associate not attached to this work order, please pick an associate");
            this.setState({ "errors": {"associate":"not found attached to this work order, please pick an associate before proceeding"} });
        }

    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        return (
            <AdminOrderTransferStep3Component
                keyword={this.state.keyword}
                givenName={this.state.givenName}
                lastName={this.state.lastName}
                telephone={this.state.telephone}
                email={this.state.email}
                onTextChange={this.onTextChange}
                advancedSearchActive={this.state.advancedSearchActive}
                onAdvancedSearchPanelToggle={this.onAdvancedSearchPanelToggle}
                onSearchClick={this.onSearchClick}
                onAdvancedSearchClick={this.onAdvancedSearchClick}
                onSkipClick={this.onSkipClick}
                errors={this.state.errors}
                orderDetail={this.props.orderDetail}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        orderDetail: store.orderDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AssociateListContainer);
