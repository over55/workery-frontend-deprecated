import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import InvoiceSecondSectionUpdateComponent from "../../../components/financials/update/invoiceSecondSectionUpdateComponent";
import { setFlashMessage } from "../../../actions/flashMessageActions";
import { pullOrderDetail, putInvoiceSecondSection } from "../../../actions/orderActions";
import { validateInvoiceSectionTwoInput } from "../../../validators/orderValidator";
import { putStaffContactDetail } from '../../../actions/staffActions';


class InvoiceSecondSectionUpdateContainer extends Component {
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
            line01Quantity: this.props.orderDetail.line01Qty,
            line01Description: this.props.orderDetail.line01Desc,
            line01UnitPrice: this.props.orderDetail.line01Price,
            line01Amount: this.props.orderDetail.line01Amount,
            // LINE 02
            line02Quantity: this.props.orderDetail.line02Qty,
            line02Description: this.props.orderDetail.line02Desc,
            line02UnitPrice: this.props.orderDetail.line02Price,
            line02Amount: this.props.orderDetail.line02Amount,
            // LINE 03
            line03Quantity: this.props.orderDetail.line03Qty,
            line03Description: this.props.orderDetail.line03Desc,
            line03UnitPrice: this.props.orderDetail.line03Price,
            line03Amount: this.props.orderDetail.line03Amount,
            // LINE 04
            line04Quantity: this.props.orderDetail.line04Qty,
            line04Description: this.props.orderDetail.line04Desc,
            line04UnitPrice: this.props.orderDetail.line04Price,
            line04Amount: this.props.orderDetail.line04Amount,
            // LINE 05
            line05Quantity: this.props.orderDetail.line05Qty,
            line05Description: this.props.orderDetail.line05Desc,
            line05UnitPrice: this.props.orderDetail.line05Price,
            line05Amount: this.props.orderDetail.line05Amount,
            // LINE 06
            line06Quantity: this.props.orderDetail.line06Qty,
            line06Description: this.props.orderDetail.line06Desc,
            line06UnitPrice: this.props.orderDetail.line06Price,
            line06Amount: this.props.orderDetail.line06Amount,
            // LINE 07
            line07Quantity: this.props.orderDetail.line07Qty,
            line07Description: this.props.orderDetail.line07Desc,
            line07UnitPrice: this.props.orderDetail.line07Price,
            line07Amount: this.props.orderDetail.line07Amount,
            // LINE 08
            line08Quantity: this.props.orderDetail.line08Qty,
            line08Description: this.props.orderDetail.line08Desc,
            line08UnitPrice: this.props.orderDetail.line08Price,
            line08Amount: this.props.orderDetail.line08Amount,
            // LINE 09
            line09Quantity: this.props.orderDetail.line09Qty,
            line09Description: this.props.orderDetail.line09Desc,
            line09UnitPrice: this.props.orderDetail.line09Price,
            line09Amount: this.props.orderDetail.line09Amount,
            // LINE 10
            line10Quantity: this.props.orderDetail.line10Desc,
            line10Description:  this.props.orderDetail.line10Desc,
            line10UnitPrice: this.props.orderDetail.line10Price,
            line10Amount: this.props.orderDetail.line10Amount,
            // LINE 11
            line11Quantity: this.props.orderDetail.line11Qty,
            line11Description: this.props.orderDetail.line11Desc,
            line11UnitPrice: this.props.orderDetail.line11Price,
            line11Amount: this.props.orderDetail.line11Amount,
            // LINE 12
            line12Quantity: this.props.orderDetail.line12Qty,
            line12Description: this.props.orderDetail.line12Desc,
            line12UnitPrice: this.props.orderDetail.line12Price,
            line12Amount: this.props.orderDetail.line12Amount,
            // LINE 13
            line13Quantity: this.props.orderDetail.line13Qty,
            line13Description: this.props.orderDetail.line13Desc,
            line13UnitPrice: this.props.orderDetail.line13Price,
            line13Amount: this.props.orderDetail.line13Amount,
            // LINE 14
            line14Quantity: this.props.orderDetail.line14Qty,
            line14Description: this.props.orderDetail.line14Desc,
            line14UnitPrice: this.props.orderDetail.line14Price,
            line14Amount: this.props.orderDetail.line14Amount,
            // LINE 15
            line15Quantity: this.props.orderDetail.line15Qty,
            line15Description: this.props.orderDetail.line15Desc,
            line15UnitPrice: this.props.orderDetail.line15Price,
            line15Amount: this.props.orderDetail.line15Amount,
            // OTHER
            orderId: parseInt(id),
            errors: {},
            isLoading: false
        }

        this.getPostData = this.getPostData.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onAmountChange = this.onAmountChange.bind(this);
        this.calculateTotalAmounts = this.calculateTotalAmounts.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
    }

    /**
     *  Utility function used to create the `postData` we will be submitting to
     *  the API; as a result, this function will structure some dictionary key
     *  items under different key names to support our API web-service's API.
     */
    getPostData() {
        let postData = Object.assign({}, this.state);

        postData.line01Qty = this.state.line01Quantity;
        postData.line02Qty = this.state.line02Quantity;
        postData.line03Qty = this.state.line03Quantity;
        postData.line04Qty = this.state.line04Quantity;
        postData.line05Qty = this.state.line05Quantity;
        postData.line06Qty = this.state.line06Quantity;
        postData.line07Qty = this.state.line07Quantity;
        postData.line08Qty = this.state.line08Quantity;
        postData.line09Qty = this.state.line09Quantity;
        postData.line10Qty = this.state.line10Quantity;
        postData.line11Qty = this.state.line11Quantity;
        postData.line12Qty = this.state.line12Quantity;
        postData.line13Qty = this.state.line13Quantity;
        postData.line14Qty = this.state.line14Quantity;
        postData.line15Qty = this.state.line15Quantity;

        postData.line01Desc = this.state.line01Description;
        postData.line02Desc = this.state.line02Description;
        postData.line03Desc = this.state.line03Description;
        postData.line04Desc = this.state.line04Description;
        postData.line05Desc = this.state.line05Description;
        postData.line06Desc = this.state.line06Description;
        postData.line07Desc = this.state.line07Description;
        postData.line08Desc = this.state.line08Description;
        postData.line09Desc = this.state.line09Description;
        postData.line10Desc = this.state.line10Description;
        postData.line11Desc = this.state.line11Description;
        postData.line12Desc = this.state.line12Description;
        postData.line13Desc = this.state.line13Description;
        postData.line14Desc = this.state.line14Description;
        postData.line15Desc = this.state.line15Description;

        postData.line01Price = this.state.line01UnitPrice;
        postData.line02Price = this.state.line02UnitPrice;
        postData.line03Price = this.state.line03UnitPrice;
        postData.line04Price = this.state.line04UnitPrice;
        postData.line05Price = this.state.line05UnitPrice;
        postData.line06Price = this.state.line06UnitPrice;
        postData.line07Price = this.state.line07UnitPrice;
        postData.line08Price = this.state.line08UnitPrice;
        postData.line09Price = this.state.line09UnitPrice;
        postData.line10Price = this.state.line10UnitPrice;
        postData.line11Price = this.state.line11UnitPrice;
        postData.line12Price = this.state.line12UnitPrice;
        postData.line13Price = this.state.line13UnitPrice;
        postData.line14Price = this.state.line14UnitPrice;
        postData.line15Price = this.state.line15UnitPrice;

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
        this.props.pullOrderDetail(this.state.orderId, this.onSuccessCallback, this.onFailureCallback);
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

    onSuccessfulSubmissionCallback(response) {
        console.log("onSuccessfulSubmissionCallback |", response);
        this.props.setFlashMessage("success", "Invoice has been successfully update.");
        this.props.history.push("/financial/"+this.state.orderId+"/invoice");
    }

    onFailedSubmissionCallback(errors) {
        this.setState({ errors: errors, });

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    onSuccessCallback(response) {
        console.log("onSuccessCallback |",response);
        this.setState({ isLoading: false, })
    }

    onFailureCallback(errors) {
        console.log(errors);
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onTextChange(e) {
        this.setState(
            { [e.target.name]: e.target.value, },
            ()=> {
                this.calculateTotalAmounts();
            }
        );
    }

    /**
     *  Function will take the currency string and save it as a float value in
     *  the state for the field.
     */
    onAmountChange(e) {
        const amount = e.target.value.replace("$","").replace(",", "");
        this.setState(
            { [e.target.name]: parseFloat(amount), }, ()=>{
                this.calculateTotalAmounts();
            }
        );
    }

    calculateTotalAmounts() {
        const line01Amount = this.state.line01Quantity * this.state.line01UnitPrice;
        const line02Amount = this.state.line02Quantity * this.state.line02UnitPrice;
        const line03Amount = this.state.line03Quantity * this.state.line03UnitPrice;
        const line04Amount = this.state.line04Quantity * this.state.line04UnitPrice;
        const line05Amount = this.state.line05Quantity * this.state.line05UnitPrice;
        const line06Amount = this.state.line06Quantity * this.state.line06UnitPrice;
        const line07Amount = this.state.line07Quantity * this.state.line07UnitPrice;
        const line08Amount = this.state.line08Quantity * this.state.line08UnitPrice;
        const line09Amount = this.state.line09Quantity * this.state.line09UnitPrice;
        const line10Amount = this.state.line10Quantity * this.state.line10UnitPrice;
        const line11Amount = this.state.line11Quantity * this.state.line11UnitPrice;
        const line12Amount = this.state.line12Quantity * this.state.line12UnitPrice;
        const line13Amount = this.state.line13Quantity * this.state.line13UnitPrice;
        const line14Amount = this.state.line14Quantity * this.state.line14UnitPrice;
        const line15Amount = this.state.line15Quantity * this.state.line15UnitPrice;

        this.setState({
            line01Amount: line01Amount,
            line02Amount: line02Amount,
            line03Amount: line03Amount,
            line04Amount: line04Amount,
            line05Amount: line05Amount,
            line06Amount: line06Amount,
            line07Amount: line07Amount,
            line08Amount: line08Amount,
            line09Amount: line09Amount,
            line10Amount: line10Amount,
            line11Amount: line11Amount,
            line12Amount: line12Amount,
            line13Amount: line13Amount,
            line14Amount: line14Amount,
            line15Amount: line15Amount,
        });
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform staff-side validation.
        const { errors, isValid } = validateInvoiceSectionTwoInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.props.putInvoiceSecondSection(
                this.getPostData(),
                this.onSuccessfulSubmissionCallback,
                this.onFailedSubmissionCallback
            );

        // CASE 2 OF 2: Validation was a failure.
        } else {
            this.onFailedSubmissionCallback(errors);
        }
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const {
            orderId, errors,
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
            <InvoiceSecondSectionUpdateComponent
                orderId={orderId}
                order={this.props.orderDetail}
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
                errors={errors}
                onTextChange={this.onTextChange}
                onAmountChange={this.onAmountChange}
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
        putStaffContactDetail: (data, onSuccessfulSubmissionCallback, onFailedSubmissionCallback) => {
            dispatch(putStaffContactDetail(data, onSuccessfulSubmissionCallback, onFailedSubmissionCallback))
        },
        pullOrderDetail: (id, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullOrderDetail(id, onSuccessCallback, onFailureCallback)
            )
        },
        putInvoiceSecondSection: (postData, onSuccessCallback, onFailureCallback) => {
            dispatch(putInvoiceSecondSection(postData, onSuccessCallback, onFailureCallback))
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InvoiceSecondSectionUpdateContainer);
