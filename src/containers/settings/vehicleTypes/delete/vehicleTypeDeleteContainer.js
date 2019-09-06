import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import VehicleTypeDeleteComponent from "../../../../components/settings/vehicleTypes/delete/vehicleTypeDeleteComponent";
import { setFlashMessage } from "../../../../actions/flashMessageActions";
import validateInput from "../../../../validators/vehicleTypeValidator";
import { pullVehicleTypeDetail, deleteVehicleTypeDetail } from "../../../../actions/vehicleTypeActions";


class VehicleTypeDeleteContainer extends Component {
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
            text: "",
            description: "",
            errors: {},
            isLoading: false,
            id: parseInt(id),
        }

        this.onClick = this.onClick.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
        this.onVehicleTypeFetchedCallback = this.onVehicleTypeFetchedCallback.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
        this.props.pullVehicleTypeDetail(this.state.id, this.onVehicleTypeFetchedCallback)
    }

    componentWillUnmount() {
        // This code will fix the "ReactJS & Redux: Can't perform a React state
        // delete on an unmounted component" issue as explained in:
        // https://stackoverflow.com/a/53829700
        this.setState = (state,callback)=>{
            return;
        };
    }

    /**
     *  API callback functions
     *------------------------------------------------------------
     */

    onSuccessfulSubmissionCallback(vehicleType) {
        this.setState({ errors: {}, isLoading: true, })
        this.props.setFlashMessage("success", "Vehicle type has been successfully deleted.");
        this.props.history.push("/settings/vehicle-types");
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

    onVehicleTypeFetchedCallback(vehicleTypeDetail) {
        this.setState({
            text: vehicleTypeDetail.text,
            description: vehicleTypeDetail.description,
            isLoading: false,
        });
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        this.setState({
            errors: [], isLoading: true,
        }, ()=>{
            this.props.deleteVehicleTypeDetail(
                this.state.id,
                this.onSuccessfulSubmissionCallback,
                this.onFailedSubmissionCallback
            );
        });
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { text, description, errors, isLoading } = this.state;
        return (
            <VehicleTypeDeleteComponent
                text={text}
                description={description}
                errors={errors}
                onClick={this.onClick}
                isLoading={isLoading}
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
    return {
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
        pullVehicleTypeDetail: (id, onSuccessCallback, onFailureCallback) => {
            dispatch(pullVehicleTypeDetail(id, onSuccessCallback, onFailureCallback))
        },
        deleteVehicleTypeDetail: (id, successCallback, failedCallback) => {
            dispatch(deleteVehicleTypeDetail(id, successCallback, failedCallback))
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VehicleTypeDeleteContainer);
