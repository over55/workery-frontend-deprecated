import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';
import * as moment from 'moment';

import AssociateInvoiceCreateStep4Component from "../../../../components/financials/associate/create/associateInvoiceCreateStep4Component";
import { setFlashMessage } from "../../../../actions/flashMessageActions";
import { pullOrderDetail, invoiceOrderOperation } from "../../../../actions/orderActions";
import { validateInvoiceSectionThirdInput } from "../../../../validators/orderValidator";
import {
    localStorageGetIntegerItem, localStorageGetDateItem, localStorageSetObjectOrArrayItem, localStorageGetFloatItem, localStorageGetBooleanOrNullItem, localStorageRemoveItemsContaining
} from '../../../../helpers/localStorageUtility';
import { putStaffContactDetail } from '../../../../actions/staffActions';


class AssociateInvoiceCreateStep4Container extends Component {
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
            // LINE 01
            line01Quantity: localStorageGetIntegerItem("workery-create-invoice-line01Quantity"),
            line01Description: localStorage.getItem("workery-create-invoice-line01Description"),
            line01UnitPrice: localStorageGetFloatItem("workery-create-invoice-line01UnitPrice"),
            line01Amount: localStorageGetFloatItem("workery-create-invoice-line01Amount"),
            // LINE 02
            line02Quantity: localStorageGetIntegerItem("workery-create-invoice-line02Quantity"),
            line02Description: localStorage.getItem("workery-create-invoice-line02Description"),
            line02UnitPrice: localStorageGetFloatItem("workery-create-invoice-line02UnitPrice"),
            line02Amount: localStorageGetFloatItem("workery-create-invoice-line02Amount"),
            // LINE 03
            line03Quantity: localStorageGetIntegerItem("workery-create-invoice-line03Quantity"),
            line03Description: localStorage.getItem("workery-create-invoice-line03Description"),
            line03UnitPrice: localStorageGetFloatItem("workery-create-invoice-line03UnitPrice"),
            line03Amount: localStorageGetFloatItem("workery-create-invoice-line03Amount"),
            // LINE 04
            line04Quantity: localStorageGetIntegerItem("workery-create-invoice-line04Quantity"),
            line04Description: localStorage.getItem("workery-create-invoice-line04Description"),
            line04UnitPrice: localStorageGetFloatItem("workery-create-invoice-line04UnitPrice"),
            line04Amount: localStorageGetFloatItem("workery-create-invoice-line04Amount"),
            // LINE 05
            line05Quantity: localStorageGetIntegerItem("workery-create-invoice-line05Quantity"),
            line05Description: localStorage.getItem("workery-create-invoice-line05Description"),
            line05UnitPrice: localStorageGetFloatItem("workery-create-invoice-line05UnitPrice"),
            line05Amount: localStorageGetFloatItem("workery-create-invoice-line05Amount"),
            // LINE 06
            line06Quantity: localStorageGetIntegerItem("workery-create-invoice-line06Quantity"),
            line06Description: localStorage.getItem("workery-create-invoice-line06Description"),
            line06UnitPrice: localStorageGetFloatItem("workery-create-invoice-line06UnitPrice"),
            line06Amount: localStorageGetFloatItem("workery-create-invoice-line06Amount"),
            // LINE 07
            line07Quantity: localStorageGetIntegerItem("workery-create-invoice-line07Quantity"),
            line07Description: localStorage.getItem("workery-create-invoice-line07Description"),
            line07UnitPrice: localStorageGetFloatItem("workery-create-invoice-line07UnitPrice"),
            line07Amount: localStorageGetFloatItem("workery-create-invoice-line07Amount"),
            // LINE 08
            line08Quantity: localStorageGetIntegerItem("workery-create-invoice-line08Quantity"),
            line08Description: localStorage.getItem("workery-create-invoice-line08Description"),
            line08UnitPrice: localStorageGetFloatItem("workery-create-invoice-line08UnitPrice"),
            line08Amount: localStorageGetFloatItem("workery-create-invoice-line08Amount"),
            // LINE 09
            line09Quantity: localStorageGetIntegerItem("workery-create-invoice-line09Quantity"),
            line09Description: localStorage.getItem("workery-create-invoice-line09Description"),
            line09UnitPrice: localStorageGetFloatItem("workery-create-invoice-line09UnitPrice"),
            line09Amount: localStorageGetFloatItem("workery-create-invoice-line09Amount"),
            // LINE 10
            line10Quantity: localStorageGetIntegerItem("workery-create-invoice-line10Quantity"),
            line10Description: localStorage.getItem("workery-create-invoice-line10Description"),
            line10UnitPrice: localStorageGetFloatItem("workery-create-invoice-line10UnitPrice"),
            line10Amount: localStorageGetFloatItem("workery-create-invoice-line10Amount"),
            // LINE 11
            line11Quantity: localStorageGetIntegerItem("workery-create-invoice-line11Quantity"),
            line11Description: localStorage.getItem("workery-create-invoice-line11Description"),
            line11UnitPrice: localStorageGetFloatItem("workery-create-invoice-line11UnitPrice"),
            line11Amount: localStorageGetFloatItem("workery-create-invoice-line11Amount"),
            // LINE 12
            line12Quantity: localStorageGetIntegerItem("workery-create-invoice-line12Quantity"),
            line12Description: localStorage.getItem("workery-create-invoice-line12Description"),
            line12UnitPrice: localStorageGetFloatItem("workery-create-invoice-line12UnitPrice"),
            line12Amount: localStorageGetFloatItem("workery-create-invoice-line12Amount"),
            // LINE 13
            line13Quantity: localStorageGetIntegerItem("workery-create-invoice-line13Quantity"),
            line13Description: localStorage.getItem("workery-create-invoice-line13Description"),
            line13UnitPrice: localStorageGetFloatItem("workery-create-invoice-line13UnitPrice"),
            line13Amount: localStorageGetFloatItem("workery-create-invoice-line13Amount"),
            // LINE 14
            line14Quantity: localStorageGetIntegerItem("workery-create-invoice-line14Quantity"),
            line14Description: localStorage.getItem("workery-create-invoice-line14Description"),
            line14UnitPrice: localStorageGetFloatItem("workery-create-invoice-line14UnitPrice"),
            line14Amount: localStorageGetFloatItem("workery-create-invoice-line14Amount"),
            // LINE 15
            line15Quantity: localStorageGetIntegerItem("workery-create-invoice-line15Quantity"),
            line15Description: localStorage.getItem("workery-create-invoice-line15Description"),
            line15UnitPrice: localStorageGetFloatItem("workery-create-invoice-line15UnitPrice"),
            line15Amount: localStorageGetFloatItem("workery-create-invoice-line15Amount"),
            // Everything else.
            orderId: parseInt(id),
            invoiceId: this.props.orderDetail.invoiceIds,
            invoiceDate: new Date(this.props.orderDetail.invoiceDate),
            invoiceQuoteDays: localStorageGetIntegerItem("workery-create-invoice-invoiceQuoteDays"),
            invoiceQuoteDate: localStorageGetDateItem("workery-create-invoice-invoiceQuoteDate"),
            invoiceCustomersApproval: localStorage.getItem("workery-create-invoice-invoiceCustomersApproval"),
            gender: localStorage.getItem("workery-create-invoice-gender"),
            line01Notes: localStorage.getItem("workery-create-invoice-line01Notes"),
            line02Notes: localStorage.getItem("workery-create-invoice-line02Notes"),
            paymentDate: localStorageGetDateItem("workery-create-invoice-paymentDate"),
            cash: localStorageGetBooleanOrNullItem("workery-create-invoice-cash"),
            cheque: localStorageGetBooleanOrNullItem("workery-create-invoice-cheque"),
            debit: localStorageGetBooleanOrNullItem("workery-create-invoice-debit"),
            credit:localStorageGetBooleanOrNullItem("workery-create-invoice-credit"),
            other: localStorageGetBooleanOrNullItem("workery-create-invoice-other"),
            clientSignature: localStorage.getItem("workery-create-invoice-clientSignature"),
            associateSignDate: localStorageGetDateItem("workery-create-invoice-associateSignDate"),
            associateSignature: localStorage.getItem("workery-create-invoice-associateSignature"),
            errors: {},
            isLoading: false
        }

        this.getPostData = this.getPostData.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
        this.onFailureCallback = this.onFailureCallback.bind(this);
        this.onSuccessOrderCallback = this.onSuccessOrderCallback.bind(this);
    }

    /**
     *  Utility function used to create the `postData` we will be submitting to
     *  the API; as a result, this function will structure some dictionary key
     *  items under different key names to support our API web-service's API.
     */
    getPostData() {
        let postData = Object.assign({}, this.state);

        const invoiceDateMoment = moment(this.state.invoiceDate);
        postData.invoiceDate = invoiceDateMoment.format("YYYY-MM-DD");

        // LINE 1 OF 15
        postData.line01Qty = isNaN(this.state.line01Quantity) ? 0 : this.state.line01Quantity;
        postData.line01Desc = this.state.line01Description;
        postData.line01Price = this.state.line01UnitPrice;
        postData.line01Amount = this.state.line01Amount;
        // LINE 2 OF 15
        postData.line02Qty = isNaN(this.state.line02Quantity) ? 0 : this.state.line02Quantity;
        postData.line02Desc = this.state.line02Description;
        postData.line02Price = this.state.line02UnitPrice;
        postData.line02Amount = this.state.line02Amount;
        // LINE 3 OF 15
        postData.line03Qty = isNaN(this.state.line03Quantity) ? 0 : this.state.line03Quantity;
        postData.line03Desc = this.state.line03Description;
        postData.line03Price = this.state.line03UnitPrice;
        postData.line03Amount = this.state.line03Amount;
        // LINE 4 OF 15
        postData.line04Qty = isNaN(this.state.line04Quantity) ? 0 : this.state.line04Quantity;
        postData.line04Desc = this.state.line04Description;
        postData.line04Price = this.state.line04UnitPrice;
        postData.line04Amount = this.state.line04Amount;
        // LINE 5 OF 15
        postData.line05Qty = isNaN(this.state.line05Quantity) ? 0 : this.state.line05Quantity;
        postData.line05Desc = this.state.line05Description;
        postData.line05Price = this.state.line05UnitPrice;
        postData.line05Amount = this.state.line05Amount;
        // LINE 6 OF 15
        postData.line06Qty = isNaN(this.state.line06Quantity) ? 0 : this.state.line06Quantity;
        postData.line06Desc = this.state.line06Description;
        postData.line06Price = this.state.line06UnitPrice;
        postData.line06Amount = this.state.line06Amount;
        // LINE 7 OF 15
        postData.line07Qty = isNaN(this.state.line07Quantity) ? 0 : this.state.line07Quantity;
        postData.line07Desc = this.state.line07Description;
        postData.line07Price = this.state.line07UnitPrice;
        postData.line07Amount = this.state.line07Amount;
        // LINE 8 OF 15
        postData.line08Qty = isNaN(this.state.line08Quantity) ? 0 : this.state.line08Quantity;
        postData.line08Desc = this.state.line08Description;
        postData.line08Price = this.state.line08UnitPrice;
        postData.line08Amount = this.state.line08Amount;
        // LINE 9 OF 15
        postData.line09Qty = isNaN(this.state.line09Quantity) ? 0 : this.state.line09Quantity;
        postData.line09Desc = this.state.line09Description;
        postData.line09Price = this.state.line09UnitPrice;
        postData.line09Amount = this.state.line09Amount;
        // LINE 10 OF 15
        postData.line10Qty = isNaN(this.state.line10Quantity) ? 0 : this.state.line10Quantity;
        postData.line10Desc = this.state.line10Description;
        postData.line10Price = this.state.line10UnitPrice;
        postData.line10Amount = this.state.line10Amount;
        // LINE 11 OF 15
        postData.line11Qty = isNaN(this.state.line11Quantity) ? 0 : this.state.line11Quantity;
        postData.line11Desc = this.state.line11Description;
        postData.line11Price = this.state.line11UnitPrice;
        postData.line11Amount = this.state.line11Amount;
        // LINE 12 OF 15
        postData.line12Qty = isNaN(this.state.line12Quantity) ? 0 : this.state.line12Quantity;
        postData.line12Desc = this.state.line12Description;
        postData.line12Price = this.state.line12UnitPrice;
        postData.line12Amount = this.state.line12Amount;
        // LINE 13 OF 15
        postData.line13Qty = isNaN(this.state.line13Quantity) ? 0 : this.state.line13Quantity;
        postData.line13Desc = this.state.line13Description;
        postData.line13Price = this.state.line13UnitPrice;
        postData.line13Amount = this.state.line13Amount;
        // LINE 14 OF 15
        postData.line14Qty = isNaN(this.state.line14Quantity) ? 0 : this.state.line14Quantity;
        postData.line14Desc = this.state.line14Description;
        postData.line14Price = this.state.line14UnitPrice;
        postData.line14Amount = this.state.line14Amount;
        // LINE 15 OF 15
        postData.line15Qty = isNaN(this.state.line15Quantity) ? 0 : this.state.line15Quantity;
        postData.line15Desc = this.state.line15Description;
        postData.line15Price = this.state.line15UnitPrice;
        postData.line15Amount = this.state.line15Amount;

        const invoiceQuoteDateMoment = moment(this.state.invoiceQuoteDate);
        postData.invoiceQuoteDate = invoiceQuoteDateMoment.format("YYYY-MM-DD");

        const paymentDateMoment = moment(this.state.paymentDate);
        postData.paymentDate = paymentDateMoment.format("YYYY-MM-DD");

        const associateSignDateMoment = moment(this.state.associateSignDate);
        postData.associateSignDate = associateSignDateMoment.format("YYYY-MM-DD");

        const cash = this.state.cash;
        const cheque = this.state.cheque;
        const debit = this.state.debit;
        const credit = this.state.credit;
        const other = this.state.other;
        if (cash === undefined || cash === null || cash === "") {
            postData.cash = false;
        } else {
            postData.cash = true;
        }
        if (cheque === undefined || cheque === null || cheque === "") {
            postData.cheque = false;
        } else {
            postData.cheque = true;
        }
        if (debit === undefined || debit === null || debit === "") {
            postData.debit = false;
        } else {
            postData.debit = true;
        }
        if (credit === undefined || credit === null || credit === "") {
            postData.credit = false;
        } else {
            postData.credit = true;
        }
        if (other === undefined || other === null || other === "") {
            postData.other = false;
        } else {
            postData.other = true;
        }

        postData.workOrderId = this.state.orderId;

        // Finally: Return our new modified data.
        console.log("getPostData |", postData);
        return postData;
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
        this.props.pullOrderDetail(this.state.orderId, this.onSuccessOrderCallback, this.onFailureCallback);
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

    onFailureCallback(errors) {
        this.setState({ errors: errors, isLoading: false, });

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    onSuccessCallback(response) {
        localStorageRemoveItemsContaining("workery-create-invoice-");
        this.props.setFlashMessage("success", "Invoice has been successfully created.");
        this.props.history.push("/financial/"+this.state.orderId+"/invoice");
    }

    onSuccessOrderCallback(response) {
        var { clientSignature, associateSignature } = this.state;
        if (clientSignature === undefined || clientSignature === null || clientSignature === "") {
            this.setState({
                clientSignature: response['customerFullName'],
            });
        }
        if (associateSignature === undefined || associateSignature === null || associateSignature === "") {
            this.setState({
                associateSignature: response['associateFullName'],
            });
        }
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform staff-side validation.
        const { errors, isValid } = validateInvoiceSectionThirdInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.setState({
                isLoading: true, errors: {}
            }, ()=>{
                this.props.invoiceOrderOperation(
                    this.getPostData(),
                    this.onSuccessCallback,
                    this.onFailureCallback,
                );
            })

        // CASE 2 OF 2: Validation was a failure.
        } else {
            this.onFailureCallback(errors);
        }
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const {
            orderId, errors, isLoading, invoiceId, invoiceDate, invoiceQuoteDays, invoiceQuoteDate, invoiceCustomersApproval, line01Notes, line02Notes, paymentDate,
            cash, cheque, debit, credit, other, gender,
            clientSignature, associateSignDate, associateSignature
        } = this.state;
        const {
            line01Quantity, line01Description, line01UnitPrice, line01Amount,
            line02Quantity, line02Description, line02UnitPrice, line02Amount,
            line03Quantity, line03Description, line03UnitPrice, line03Amount,
            line04Quantity, line04Description, line04UnitPrice, line04Amount,
            line05Quantity, line05Description, line05UnitPrice, line05Amount,
            line06Quantity, line06Description, line06UnitPrice, line06Amount,
            line07Quantity, line07Description, line07UnitPrice, line07Amount,
            line08Quantity, line08Description, line08UnitPrice, line08Amount,
            line09Quantity, line09Description, line09UnitPrice, line09Amount,
            line10Quantity, line10Description, line10UnitPrice, line10Amount,
            line11Quantity, line11Description, line11UnitPrice, line11Amount,
            line12Quantity, line12Description, line12UnitPrice, line12Amount,
            line13Quantity, line13Description, line13UnitPrice, line13Amount,
            line14Quantity, line14Description, line14UnitPrice, line14Amount,
            line15Quantity, line15Description, line15UnitPrice, line15Amount
        } = this.state;
        return (
            <AssociateInvoiceCreateStep4Component
                orderId={orderId}
                order={this.props.orderDetail}
                invoiceId={invoiceId}
                invoiceDate={invoiceDate}
                invoiceQuoteDays={invoiceQuoteDays}
                invoiceQuoteDate={invoiceQuoteDate}
                invoiceCustomersApproval={invoiceCustomersApproval}
                line01Notes={line01Notes}
                line02Notes={line02Notes}
                onAmountChange={this.onAmountChange}
                paymentDate={paymentDate}
                cash={cash}
                cheque={cheque}
                debit={debit}
                credit={credit}
                other={other}
                clientSignature={clientSignature}
                associateSignDate={associateSignDate}
                associateSignature={associateSignature}
                gender={gender}
                errors={errors}
                isLoading={isLoading}
                onClick={this.onClick}

                line01Quantity={line01Quantity}
                line01Description={line01Description}
                line01UnitPrice={line01UnitPrice}
                line01Amount={line01Amount}
                line02Quantity={line02Quantity}
                line02Description={line02Description}
                line02UnitPrice={line02UnitPrice}
                line02Amount={line02Amount}
                line03Quantity={line03Quantity}
                line03Description={line03Description}
                line03UnitPrice={line03UnitPrice}
                line03Amount={line03Amount}
                line04Quantity={line04Quantity}
                line04Description={line04Description}
                line04UnitPrice={line04UnitPrice}
                line04Amount={line04Amount}
                line05Quantity={line05Quantity}
                line05Description={line05Description}
                line05UnitPrice={line05UnitPrice}
                line05Amount={line05Amount}
                line06Quantity={line06Quantity}
                line06Description={line06Description}
                line06UnitPrice={line06UnitPrice}
                line06Amount={line06Amount}
                line07Quantity={line07Quantity}
                line07Description={line07Description}
                line07UnitPrice={line07UnitPrice}
                line07Amount={line07Amount}
                line08Quantity={line08Quantity}
                line08Description={line08Description}
                line08UnitPrice={line08UnitPrice}
                line08Amount={line08Amount}
                line09Quantity={line09Quantity}
                line09Description={line09Description}
                line09UnitPrice={line09UnitPrice}
                line09Amount={line09Amount}
                line10Quantity={line10Quantity}
                line10Description={line10Description}
                line10UnitPrice={line10UnitPrice}
                line10Amount={line10Amount}
                line11Quantity={line11Quantity}
                line11Description={line11Description}
                line11UnitPrice={line11UnitPrice}
                line11Amount={line11Amount}
                line12Quantity={line12Quantity}
                line12Description={line12Description}
                line12UnitPrice={line12UnitPrice}
                line12Amount={line12Amount}
                line13Quantity={line13Quantity}
                line13Description={line13Description}
                line13UnitPrice={line13UnitPrice}
                line13Amount={line13Amount}
                line14Quantity={line14Quantity}
                line14Description={line14Description}
                line14UnitPrice={line14UnitPrice}
                line14Amount={line14Amount}
                line15Quantity={line15Quantity}
                line15Description={line15Description}
                line15UnitPrice={line15UnitPrice}
                line15Amount={line15Amount}
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
        putStaffContactDetail: (data, onSuccessCallback, onFailureCallback) => {
            dispatch(putStaffContactDetail(data, onSuccessCallback, onFailureCallback))
        },
        pullOrderDetail: (id, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullOrderDetail(id, onSuccessCallback, onFailureCallback)
            )
        },
        invoiceOrderOperation: (postData, onSuccessCallback, onFailureCallback) => {
            dispatch(
                invoiceOrderOperation(postData, onSuccessCallback, onFailureCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AssociateInvoiceCreateStep4Container);
