import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import SkillsetSearchComponent from "../../components/skillsets/skillsetSearchComponent";
import { localStorageGetArrayItem, localStorageSetObjectOrArrayItem } from '../../helpers/localStorageUtility';
import { validateInput } from "../../validators/skillsetsValidator";

import { getSkillSetReactSelectOptions, pullSkillSetList } from "../../actions/skillSetActions";


class SkillsetSearchContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        this.state = {
            skillSets: [],
            errors: {},
            isLoading: false
        }

        this.onClick = this.onClick.bind(this);
        this.onSkillSetMultiChange = this.onSkillSetMultiChange.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.

        // DEVELOPERS NOTE: Fetch our skillset list.
        this.props.pullSkillSetList(1, 1000);
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

    onSkillSetMultiChange(...args) {
        // Extract the select options from the parameter.
        const selectedOptions = args[0];

        // Set all the skill sets we have selected to the STORE.
        this.setState({
            skillSets: selectedOptions,
        });

        // // Set all the tags we have selected to the STORAGE.
        const key = 'workery-search-skillsets-' + args[1].name;
        localStorageSetObjectOrArrayItem(key, selectedOptions);
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform associate-side validation.
        const { errors, isValid } = validateInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.setState({ errors: {}, isLoading: true, })
            this.props.history.push("/skillset/results");

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
            errors, isLoading, returnURL
        } = this.state;

        const { user } = this.props;
        return (
            <SkillsetSearchComponent
                skillSets={skillSets}
                skillSetOptions={getSkillSetReactSelectOptions(this.props.skillSetList)}
                onSkillSetMultiChange={this.onSkillSetMultiChange}

                onClick={this.onClick}
                errors={errors}
                returnURL={returnURL}
                isLoading={isLoading}
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
