import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import SkillsetSearchComponent from "../../components/skillsets/skillsetSearchComponent";
import { localStorageGetArrayItem, localStorageSetObjectOrArrayItem } from '../../helpers/localStorageUtility';
import { validateInput } from "../../validators/skillsetsValidator";

import { getSkillSetReactSelectOptions, getPickedSkillSetReactSelectOptions, pullSkillSetList } from "../../actions/skillSetActions";


class SkillsetSearchContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        this.state = {
            isSkillsetLoading: true,
            isSkillSetsLoading: true,
            skillSets: [],
            errors: {},
            isLoading: false,
        }

        this.onClick = this.onClick.bind(this);
        this.onSkillSetMultiChange = this.onSkillSetMultiChange.bind(this);
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
        this.onSkillSetSuccessFetch = this.onSkillSetSuccessFetch.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.

        // DEVELOPERS NOTE: Fetch our skillset list.
        const parametersMap = new Map();
        parametersMap.set("state", 1);
        this.props.pullSkillSetList(0, 1000, parametersMap, this.onSkillSetSuccessFetch);
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
        this.setState({ isSkillSetsLoading: false, });
    }

    onSkillSetSuccessFetch(howHearList) {
        this.setState({ isSkillsetLoading: false, });
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

     onSkillSetMultiChange(...args) {
         // Extract the select options from the parameter.
         const selectedOptions = args[0];

         // We need to only return our `id` values, therefore strip out the
         // `react-select` options format of the data and convert it into an
         // array of integers to hold the primary keys of the `Tag` items selected.
         let pickedSkillSets = [];
         if (selectedOptions !== null && selectedOptions !== undefined) {
             for (let i = 0; i < selectedOptions.length; i++) {
                 let pickedOption = selectedOptions[i];
                 pickedOption.skillSetId = pickedOption.value;
                 pickedSkillSets.push(pickedOption);
             }
         }
         this.setState({ skillSets: pickedSkillSets, });

         // // Set all the tags we have selected to the STORAGE.
         localStorageSetObjectOrArrayItem("workery-search-skillSets", pickedSkillSets);
     }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform associate-side validation.
        const { errors, isValid } = validateInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.setState({ errors: {}, isLoading: true, })
            this.props.history.push("/skill-sets/results");

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
            skillSets,
        } = this.state;

        const skillSetOptions = getSkillSetReactSelectOptions(this.props.skillSetList);
        const transcodedSkillSets = getPickedSkillSetReactSelectOptions(skillSets, this.props.skillSetList)

        return (
            <SkillsetSearchComponent
                {...this}
                {...this.state}
                {...this.props}
                skillSets={transcodedSkillSets}
                skillSetOptions={skillSetOptions}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        skillSetList: store.skillSetListState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullSkillSetList: (page, sizePerPage, map, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullSkillSetList(page, sizePerPage, map, onSuccessCallback, onFailureCallback)
            )
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SkillsetSearchContainer);
