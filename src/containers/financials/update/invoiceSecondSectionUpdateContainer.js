import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import InvoiceSecondSectionUpdateComponent from "../../../components/financials/update/invoiceSecondSectionUpdateComponent";
import { pullOrderDetail } from "../../../actions/orderActions";
import { validateInvoiceSectionTwoInput } from "../../../validators/orderValidator";
import { localStorageGetIntegerItem, localStorageGetFloatItem } from '../../../helpers/localStorageUtility';
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

    onSuccessfulSubmissionCallback(staff) {
        this.props.history.push("/staff/"+this.state.id+"/full");
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
        console.log(response);
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
        localStorage.setItem('workery-create-invoice-'+[e.target.name], e.target.value);
    }

    /**
     *  Function will take the currency string and save it as a float value in
     *  the state for the field.
     */
    onAmountChange(e) {
        const amount = e.target.value.replace("$","").replace(",", "");
        this.setState(
            { [e.target.name]: parseFloat(amount), }, ()=>{
                localStorage.setItem('workery-create-invoice-'+[e.target.name], parseFloat(amount) );
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
        })

        localStorage.setItem('workery-create-invoice-line01Amount', line01Amount );
        localStorage.setItem('workery-create-invoice-line02Amount', line02Amount );
        localStorage.setItem('workery-create-invoice-line03Amount', line03Amount );
        localStorage.setItem('workery-create-invoice-line04Amount', line04Amount );
        localStorage.setItem('workery-create-invoice-line05Amount', line05Amount );
        localStorage.setItem('workery-create-invoice-line06Amount', line06Amount );
        localStorage.setItem('workery-create-invoice-line07Amount', line07Amount );
        localStorage.setItem('workery-create-invoice-line08Amount', line08Amount );
        localStorage.setItem('workery-create-invoice-line09Amount', line09Amount );
        localStorage.setItem('workery-create-invoice-line10Amount', line10Amount );
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform staff-side validation.
        const { errors, isValid } = validateInvoiceSectionTwoInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.props.history.push("/financial/"+this.state.orderId+"/invoice/create/step-3");

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
        putStaffContactDetail: (data, onSuccessfulSubmissionCallback, onFailedSubmissionCallback) => {
            dispatch(putStaffContactDetail(data, onSuccessfulSubmissionCallback, onFailedSubmissionCallback))
        },
        pullOrderDetail: (id, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullOrderDetail(id, onSuccessCallback, onFailureCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InvoiceSecondSectionUpdateContainer);
