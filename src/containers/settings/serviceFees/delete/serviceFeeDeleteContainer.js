import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import ServiceFeeDeleteComponent from "../../../../components/settings/serviceFees/delete/serviceFeeDeleteComponent";
import { setFlashMessage } from "../../../../actions/flashMessageActions";
import validateInput from "../../../../validators/serviceFeeValidator";
import { deleteServiceFeeDetail, pullServiceFeeDetail } from "../../../../actions/serviceFeeActions";


class ServiceFeeDeleteContainer extends Component {
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
            title: "",
            percentage: "",
            description: "",
            errors: {},
            isLoading: false,
            id: parseInt(id),
        }

        this.getPostData = this.getPostData.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
        this.onFailureCallback = this.onFailureCallback.bind(this);
        this.onServiceFeeCallback = this.onServiceFeeCallback.bind(this);
    }

    getPostData() {
        let postData = Object.assign({}, this.state);

        postData.extraText = this.state.text;

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
        this.props.pullServiceFeeDetail(this.state.id, this.onServiceFeeCallback)
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

    onSuccessCallback(serviceFee) {
        this.setState({ errors: {}, isLoading: true, })
        this.props.setFlashMessage("success", "Service fee has been successfully deleted.");
        this.props.history.push("/settings/service-fees");
    }

    onFailureCallback(errors) {
        this.setState({
            errors: errors
        })

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    onServiceFeeCallback(sfDetail) {
        this.setState({
            title: sfDetail.title,
            percentage: sfDetail.percentage,
            description: sfDetail.description,
            errors: {},
        })
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
        this.setState({ errors: {}, isLoading: true, }, ()=>{
            this.props.deleteServiceFeeDetail(
                this.state.id,
                this.onSuccessCallback,
                this.onFailureCallback
            );
        });
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { title, percentage, description, errors, isLoading } = this.state;
        return (
            <ServiceFeeDeleteComponent
                title={title}
                percentage={percentage}
                description={description}
                errors={errors}
                onTextChange={this.onTextChange}
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
        deleteServiceFeeDetail: (postData, successCallback, failedCallback) => {
            dispatch(deleteServiceFeeDetail(postData, successCallback, failedCallback))
        },
        pullServiceFeeDetail: (id, successCallback, failedCallback) => {
            dispatch(pullServiceFeeDetail(id, successCallback, failedCallback))
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ServiceFeeDeleteContainer);
