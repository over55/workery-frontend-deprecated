import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import TagSearchComponent from "../../components/tags/tagSearchComponent";
import { localStorageGetArrayItem, localStorageSetObjectOrArrayItem } from '../../helpers/localStorageUtility';
import { validateInput } from "../../validators/tagSearchValidator";

import { getTagReactSelectOptions, getPickedTagReactSelectOptions, pullTagList } from "../../actions/tagActions";


class TagSearchContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        this.state = {
            isTagLoading: true,
            isTagsLoading: true,
            tags: [],
            errors: {},
            isLoading: false,
        }

        this.onClick = this.onClick.bind(this);
        this.onTagMultiChange = this.onTagMultiChange.bind(this);
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
        this.onTagSuccessFetch = this.onTagSuccessFetch.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.

        // DEVELOPERS NOTE: Fetch our tag list.
        const parametersMap = new Map();
        parametersMap.set("state", 1);
        this.props.pullTagList(0, 1000, parametersMap, this.onTagSuccessFetch);
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

    onSuccessCallback(response) {
        this.setState({ isTagsLoading: false, });
    }

    onTagSuccessFetch(howHearList) {
        this.setState({ isTagLoading: false, });
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

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
         this.setState({ tags: pickedTags, });

         // // Set all the tags we have selected to the STORAGE.
         localStorageSetObjectOrArrayItem("workery-search-tags", pickedTags);
     }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform associate-side validation.
        const { errors, isValid } = validateInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.setState({ errors: {}, isLoading: true, })
            this.props.history.push("/tag/results");

        // CASE 2 OF 2: Validation was a failure.
        } else {
            this.setState({ errors: errors, isLoading: false, });

            // The following code will cause the screen to scroll to the top of
            // the page. Please see ``react-scroll`` for more information:
            // https://github.com/fisshy/react-scroll
            var scroll = Scroll.animateScroll;
            scroll.scrollToTop();
        }
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const {
            tags,
        } = this.state;

        const tagOptions = getTagReactSelectOptions(this.props.tagList);
        const transcodedTags = getPickedTagReactSelectOptions(tags, this.props.tagList)

        return (
            <TagSearchComponent
                {...this}
                {...this.state}
                {...this.props}
                tags={transcodedTags}
                tagOptions={tagOptions}
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
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TagSearchContainer);
