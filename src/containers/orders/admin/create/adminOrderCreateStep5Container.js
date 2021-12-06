import React, { Component } from 'react';
import { connect } from 'react-redux';

import  AdminOrderCreateStep5Component from "../../../../components/orders/admin/create/adminOrderCreateStep5Component";
import { validateStep5CreateInput } from "../../../../validators/orderValidator";
import { getTagReactSelectOptions, getPickedTagReactSelectOptions, pullTagList } from "../../../../actions/tagActions";
import { localStorageSetObjectOrArrayItem, localStorageGetArrayItem } from '../../../../helpers/localStorageUtility';


class  AdminOrderCreateStep5Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            comment: localStorage.getItem("workery-create-order-comment"),
            isTagsLoading: true,
            tags: localStorageGetArrayItem("workery-create-order-tags"),
            isLoading: true,
            errors: {},
            page: 1,
        }
        this.onTextChange = this.onTextChange.bind(this);
        this.onTagMultiChange = this.onTagMultiChange.bind(this);
        this.onTagsSuccessFetch = this.onTagsSuccessFetch.bind(this);
        this.onNextClick = this.onNextClick.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.

       // Fetch all our GUI drop-down options which are populated by the API.
       const parametersMap = new Map();
       parametersMap.set("state", 1);
       this.props.pullTagList(0,1000, parametersMap, this.onTagsSuccessFetch);
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

    onTagsSuccessFetch(tags) {
        this.setState({ isTagsLoading: false, });
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onTextChange(e) {
        // Update our state.
        this.setState({
            [e.target.name]: e.target.value,
        });

        // Update our persistent storage.
        const key = "workery-create-order-"+[e.target.name];
        localStorage.setItem(key, e.target.value)
    }

    onTagMultiChange(...args) {
        // Extract the select options from the parameter.
        const selectedOptions = args[0];

        // We need to only return our `id` values, therefore strip out the
        // `react-select` options format of the data and convert it into an
        // array of integers to hold the primary keys of the `Tag` items selected.
        let pickedTags = [];
        if (selectedOptions !== null && selectedOptions !== undefined) {
            for (let i = 0; i < selectedOptions.length; i++) {
                let pickedOption = selectedOptions[i];
                pickedOption.tagId = pickedOption.value;
                pickedTags.push(pickedOption);
            }
        }
        this.setState({ tags: pickedTags, }, ()=>{
            const key = 'workery-create-order-' + args[1].name;
            localStorageSetObjectOrArrayItem(key, selectedOptions);
        });
    }

    onNextClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // console.log(this.state); // For debugging purposes only.

        // Perform client-side validation.
        const { errors, isValid } = validateStep5CreateInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.props.history.push("/orders/add/step-6");

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
        const { tags } = this.state;
        const tagOptions = getTagReactSelectOptions(this.props.tagList);
        const transcodedTags = getPickedTagReactSelectOptions(tags, this.props.tagList);
        return (
            < AdminOrderCreateStep5Component
                {...this}
                {...this.state}
                {...this.props}
                tagOptions={tagOptions}
                tags={transcodedTags}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        tagList: store.tagListState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullTagList: (page, sizePerPage, map, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullTagList(page, sizePerPage, map, onSuccessCallback, onFailureCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)( AdminOrderCreateStep5Container);
