import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import OrderTransferOperationComponent from "../../../components/orders/operations/orderTransferOperationComponent";
import { setFlashMessage } from "../../../actions/flashMessageActions";
import { validateInput } from "../../../validators/orderValidator";
import {
    RESIDENCE_TYPE_OF, BUSINESS_TYPE_OF, COMMUNITY_CARES_TYPE_OF, BASIC_STREET_TYPE_CHOICES, STREET_DIRECTION_CHOICES
} from '../../../constants/api';
import { pullAssociateList, getAssociateReactSelectOptions } from "../../../actions/associateActions";
import { pullClientList, getClientReactSelectOptions } from "../../../actions/clientActions";


class OrderTransferOperationContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { id } = this.props.match.params;

        this.state = {
            associate: "",
            associateOptions: [],
            isAssociatesLoading: true,
            client: "",
            clientOptions: [],
            isClientLoading: true,
            reason: "",
            errors: {},
            isLoading: false,
            id: id,
        }

        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onAssociatesListCallback = this.onAssociatesListCallback.bind(this);
        this.onClientListCallback = this.onClientListCallback.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.

        const parametersMap = new Map();
        parametersMap.set('state', 1);
        this.props.pullAssociateList(1, 100, parametersMap, this.onAssociatesListCallback, null);
        parametersMap.set('state', "active");
        this.props.pullClientList(1, 100, parametersMap, this.onClientListCallback, null);
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

    onSuccessfulSubmissionCallback(order) {
        this.setState({ errors: {}, isLoading: true, })
        this.props.setFlashMessage("success", "Order has been successfully transfered.");
        this.props.history.push("/order/"+this.state.slug+"/full");
    }

    onFailedSubmissionCallback(errors) {
        this.setState({
            errors: errors
        })

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    onAssociatesListCallback(associateList) {
        this.setState({
            associateOptions: getAssociateReactSelectOptions(associateList),
            isAssociatesLoading: false,
        });
    }

    onClientListCallback(clientList) {
        this.setState({
            clientOptions: getClientReactSelectOptions(clientList),
            isClientLoading: false,
        });
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onTextChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.onSuccessfulSubmissionCallback();

        // CASE 2 OF 2: Validation was a failure.
        } else {
            this.onFailedSubmissionCallback(errors);
        }
    }

    onSelectChange(option) {
        const optionKey = [option.selectName].toString()+"Option";
        this.setState({
            [option.selectName]: option.value,
            optionKey: option,
        });
        console.log([option.selectName], optionKey, "|",option); // For debugging purposes only.
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const {
            associate, associateOptions, isAssociatesLoading,
            client, clientOptions, isClientLoading,
            reason, errors, id, isLoading
        } = this.state;
        const order = this.props.orderDetail ? this.props.orderDetail : {};
        return (
            <OrderTransferOperationComponent
                id={id}
                order={order}
                associate={associate}
                associateOptions={associateOptions}
                isAssociatesLoading={isAssociatesLoading}
                client={client}
                clientOptions={clientOptions}
                isClientLoading={isClientLoading}
                reason={reason}
                errors={errors}
                isLoading={isLoading}
                onTextChange={this.onTextChange}
                onSelectChange={this.onSelectChange}
                onClick={this.onClick}
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
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
        pullAssociateList: (page, sizePerPage, map, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullAssociateList(page, sizePerPage, map, onSuccessCallback, onFailureCallback)
            )
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
)(OrderTransferOperationContainer);
