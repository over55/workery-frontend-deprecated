import React, { Component } from 'react';
import { connect } from 'react-redux';

import  AdminOrderCreateStep3Component from "../../../../components/orders/admin/create/adminOrderCreateStep3Component";
import {
    localStorageSetObjectOrArrayItem, localStorageGetDateItem, localStorageGetIntegerItem
} from '../../../../helpers/localStorageUtility';
import { validateStep3CreateInput } from "../../../../validators/orderValidator";


class  AdminOrderCreateStep3Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            startDate: localStorageGetDateItem("workery-create-order-startDate"),
            jobType: localStorageGetIntegerItem("workery-create-order-jobType"),
            homeSupport: localStorageGetIntegerItem("workery-create-order-homeSupport"),
            isLoading: true,
            errors: {},
            page: 1,
        }

        this.onStartDateChange = this.onStartDateChange.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
        this.onNextClick = this.onNextClick.bind(this);
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

    onRadioChange(e) {
        // Get the values.
        const storageValueKey = "workery-create-order-"+[e.target.name];
        const storageLabelKey =  "workery-create-order-"+[e.target.name].toString()+"-label";
        const value = e.target.value;
        const label = e.target.dataset.label; // Note: 'dataset' is a react data via https://stackoverflow.com/a/20383295
        const storeValueKey = [e.target.name].toString();
        const storeLabelKey = [e.target.name].toString()+"Label";

        // Save the data.
        this.setState({ [e.target.name]: value, }); // Save to store.
        this.setState({ storeLabelKey: label, }); // Save to store.
        localStorage.setItem(storageValueKey, value) // Save to storage.
        localStorage.setItem(storageLabelKey, label) // Save to storage.

        // For the debugging purposes only.
        console.log({
            "STORE-VALUE-KEY": storageValueKey,
            "STORE-VALUE": value,
            "STORAGE-VALUE-KEY": storeValueKey,
            "STORAGE-VALUE": value,
            "STORAGE-LABEL-KEY": storeLabelKey,
            "STORAGE-LABEL": label,
        });
    }

    onStartDateChange(dateObj) {
        this.setState({
            startDate: dateObj,
        });
        localStorageSetObjectOrArrayItem('workery-create-order-startDate', dateObj);
    }

    onNextClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // console.log(this.state); // For debugging purposes only.

        // Perform client-side validation.
        const { errors, isValid } = validateStep3CreateInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.props.history.push("/orders/add/step-4");

        // CASE 2 OF 2: Validation was a failure.
        } else {
            this.setState({
                isLoading: false,
                errors: errors,
            })
        }
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { startDate, jobType, homeSupport, errors } = this.state;
        return (
            < AdminOrderCreateStep3Component
                startDate={startDate}
                onStartDateChange={this.onStartDateChange}
                jobType={jobType}
                homeSupport={homeSupport}
                onRadioChange={this.onRadioChange}
                errors={errors}
                onNextClick={this.onNextClick}
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
    return {}
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)( AdminOrderCreateStep3Container);
