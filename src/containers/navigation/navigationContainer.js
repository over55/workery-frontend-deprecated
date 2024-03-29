import React from 'react'
import { Link, NavLink } from "react-router-dom";
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import { setFlashMessage } from "../../actions/flashMessageActions";
import { pullNavigation } from "../../actions/navigationActions";
import { getSubdomain } from '../../helpers/urlUtility';


import {
    EXECUTIVE_ROLE_ID,
    MANAGEMENT_ROLE_ID,
    FRONTLINE_ROLE_ID,
    ASSOCIATE_ROLE_ID,
    CUSTOMER_ROLE_ID,
    ANONYMOUS_ROLE_ID,
} from '../../constants/api';


const ANON_MENU_DATA = [
    {
        id: "anon-login",
        icon: "sign-in-alt",
        title: "Login",
        url: "/login"
    },{
        id: "anon-register",
        icon: "user",
        title: "Register",
        url: "/register"
    }
]


const AUTH_MANAGEMENT_STAFF_MENU_DATA = [
    {
        id: "full-dashboard",
        icon: "tachometer-alt",
        title: "Dashboard",
        url: "/dashboard"
    },{
        id: "full-tasks",
        icon: "tasks",
        title: "Tasks",
        url: "/tasks"
    },{
        id: "full-clients",
        icon: "user-circle",
        title: "Clients",
        url: "/clients"
    },{
        id: "full-jobs",
        icon: "wrench",
        title: "Orders",
        url: "/orders"
    },{
        id: "full-ongoing-jobs",
        icon: "undo-alt",
        title: "Ongoing Orders",
        url: "/ongoing-orders"
    },{
        id: "full-associates",
        icon: "crown",
        title: "Associates",
        url: "/associates"
    },{
        id: "full-reports",
        icon: "chart-bar",
        title: "Reports",
        url: "/reports"
    },{
        id: "full-toolbox",
        icon: "toolbox",
        title: "Skill Sets",
        url: "/skill-sets"
    },{
        id: "full-tags",
        icon: "tags",
        title: "Tags",
        url: "/tags"
    },{
        id: "full-financials",
        icon: "credit-card",
        title: "Financials",
        url: "/financials"
    },{
        id: "full-staff",
        icon: "user-tie",
        title: "Staff",
        url: "/staff"
    },{
        id: "full-settings",
        icon: "cogs",
        title: "Settings",
        url: "/settings"
    },{
        id: "full-help",
        icon: "question-circle",
        title: "Help",
        url: "/help"
    },{
        id: "full-logout",
        icon: "sign-out-alt",
        title: "Logout",
        url: "/logout"
    }
];


const AUTH_FRONTLINE_STAFF_MENU_DATA = [
    {
        id: "full-dashboard",
        icon: "tachometer-alt",
        title: "Dashboard",
        url: "/dashboard"
    },{
        id: "full-tasks",
        icon: "tasks",
        title: "Tasks",
        url: "/tasks"
    },{
        id: "full-clients",
        icon: "user-circle",
        title: "Clients",
        url: "/clients"
    },{
        id: "full-jobs",
        icon: "wrench",
        title: "Orders",
        url: "/orders"
    },{
        id: "full-ongoing-jobs",
        icon: "undo-alt",
        title: "Ongoing Order",
        url: "/ongoing-orders"
    },{
        id: "full-associates",
        icon: "crown",
        title: "Associates",
        url: "/associates"
    },{
        id: "full-toolbox",
        icon: "toolbox",
        title: "Skill Sets",
        url: "/skill-sets"
    },{
        id: "full-search",
        icon: "search",
        title: "Search",
        url: "/search"
    },{
        id: "full-help",
        icon: "question-circle",
        title: "Help",
        url: "/help"
    },{
        id: "full-logout",
        icon: "sign-out-alt",
        title: "Logout",
        url: "/logout"
    }
];


const AUTH_ASSOCIATE_MENU_DATA = [
    {
        id: "full-dashboard",
        icon: "tachometer-alt",
        title: "Dashboard",
        url: "/dashboard"
    },{
        id: "full-jobs",
        icon: "wrench",
        title: "Jobs",
        url: "/jobs"
    },{
        id: "full-profile",
        icon: "user-circle",
        title: "Profile",
        url: "/profile/associate/lite"
    },{
        id: "full-help",
        icon: "question-circle",
        title: "Help",
        url: "/help"
    },{
        id: "full-logout",
        icon: "sign-out-alt",
        title: "Logout",
        url: "/logout"
    }
];


const AUTH_MEMBER_MENU_DATA = [
    {
        id: "full-dashboard",
        icon: "tachometer-alt",
        title: "Dashboard",
        url: "/dashboard"
    },{
        id: "full-help",
        icon: "question-circle",
        title: "Help",
        url: "/help"
    },{
        id: "full-logout",
        icon: "sign-out-alt",
        title: "Logout",
        url: "/logout"
    }
];



export const NAVIGATION_TREE = {
    [EXECUTIVE_ROLE_ID]: AUTH_MANAGEMENT_STAFF_MENU_DATA,
    [MANAGEMENT_ROLE_ID]: AUTH_MANAGEMENT_STAFF_MENU_DATA,
    [FRONTLINE_ROLE_ID]: AUTH_FRONTLINE_STAFF_MENU_DATA,
    [ASSOCIATE_ROLE_ID]: AUTH_ASSOCIATE_MENU_DATA,
    [CUSTOMER_ROLE_ID]: AUTH_MEMBER_MENU_DATA,
    [ANONYMOUS_ROLE_ID]: ANON_MENU_DATA,
}



class ItemNode extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            isOpen:false
        }
    }

    toggle = () => {
        // console.log("isOpen:", this.state.isOpen);
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        const { id, icon, title, url, children } = this.props.menuData;
        // console.log("----->",id, icon, title, url, children);
        const sideMenuToggle = this.props.sideMenuToggle;
        if(children)
        {
            return (
                <li className="nav-item dropdown-btn" key={id}>
                    <Link className={`nav-link ${ this.state.isOpen ? "rotate-90" : ""}`} to="#" onClick={ this.toggle }>
                        <i className={`fa fa-${icon}`}></i>&nbsp;{ title }&nbsp;<i className="fa fa-caret-right" ></i>
                    </Link>
                    <ul style={{ display: this.state.isOpen ? "block" : "none"}}>
                        { children.map((item, index) => (
                            <ItemNode menuData={ item } key={ index } sideMenuToggle = { sideMenuToggle }></ItemNode>))
                        }
                    </ul>
                </li>)
        }
        else
        {
            return (
                <li className="nav-item" key={id}>
                    <NavLink className="nav-link" to={ url } onClick = { sideMenuToggle }>
                        <i className={`fa fa-${icon}`}></i>&nbsp;{ title }
                    </NavLink>
                </li>
            );
        }
    }
}

class NavigationContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false,
            intervalId: 0,
            tasksCount: this.props.navigation.tasksCount,
        }

        this.sideMenuToggle = this.sideMenuToggle.bind(this);
        this.onBackgroundRefreshTick = this.onBackgroundRefreshTick.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
    }

    sideMenuToggle() {
        this.setState({
            active: !this.state.active
        })
    }

    componentDidMount() {
        // Startup the background refresh task.
        var intervalId = setInterval(this.onBackgroundRefreshTick, 1000 * 30); // 1000 = 1 second.

        // store intervalId in the state so it can be accessed later:
        this.setState({intervalId: intervalId});

        // If logged in then fetch tasks count.
        const { user } = this.props;
        if (user !== null && user !== undefined) {
            const keysArr = Object.keys(user);
            const count = keysArr.length;
            if (count > 0) {
                this.props.pullNavigation(this.onSuccessfulSubmissionCallback, this.onFailedSubmissionCallback);
            }
        }
    }

    componentWillUnmount() {
        // use intervalId from the state to clear the interval
        clearInterval(this.state.intervalId);

        // This code will fix the "ReactJS & Redux: Can't perform a React state
        // update on an unmounted component" issue as explained in:
        // https://stackoverflow.com/a/53829700
        this.setState = (state,callback)=>{
            return;
        };
    }

    /**
     * Function used by the event timer to call the latest data from the API
     *  backend to get the latest navigation data.
     */
    onBackgroundRefreshTick() {
        // If logged in then fetch tasks count.
        const { user } = this.props;
        if (user !== null && user !== undefined) {
            const keysArr = Object.keys(user);
            const count = keysArr.length;
            if (count > 0) {
                this.props.pullNavigation(this.onSuccessfulSubmissionCallback, this.onFailedSubmissionCallback);
            }
        }
    }

    onSuccessfulSubmissionCallback(response) {
        this.setState({ tasksCount: response.tasksCount, });
    }

    onFailedSubmissionCallback(response) {

    }

    render() {
        const { user } = this.props;
        let menuTitle;
        let menuData;
        let isAuthenticated = false;

        if (user !== null && user !== undefined) {
            const keysArr = Object.keys(user);
            const count = keysArr.length;
            if (count > 0) {
                // Get our permission handling fields from the user object which
                // we received from the API endpoint.
                const { roleId } = user;

                // Indicate we are authenticated.
                isAuthenticated = true;

                // Generate a friendly message in the menu for authenitcatd users.
                menuTitle = "Hi, "+user.firstName;

                // Lookup the user group membership and get the navigation tree.
                menuData = NAVIGATION_TREE[parseInt(roleId)];
            }
        }

        // If no menu was set then we will create our anonymous menu by default.
        if (menuData === null || menuData === undefined) {
            isAuthenticated = false;
            menuTitle = "Menu"
            menuData = NAVIGATION_TREE[ANONYMOUS_ROLE_ID];
        }

        // Check if we are in a tenant or not.
        const isTenant = true; // TODO: HANDLE WHEN IN THE ORGANIZATION SECTION.

        // Get state variables.
        const { tasksCount } = this.state;

        // Render our top navigation.
        return (
            <div>
             {isAuthenticated && isTenant &&
                    <div>
                        <header className="top-navbar navbar navbar-dark fixed-top bg-dark justify-content-between">
                            <Link className="navbar-brand" to="/dashboard">
                                <img className="img-fluid" src="/img/compressed-logo.png" alt="Workery" width="200px" />
                            </Link>
                            <ul className="navbar-nav flex-row">
                                {isAuthenticated && isTenant &&
                                    <li className="dropdown-list dropdown nav-item">
                                        <Link aria-haspopup="true" to="/tasks" className="dropdown-toggle-nocaret nav-link text-white py-0" aria-expanded="false">
                                            <i className="far fa-check-square"></i>
                                            <span className="badge badge-orange">{tasksCount}</span>
                                        </Link>
                                    </li>
                                }

                                    <li className="nav-item">
                                        &nbsp;&nbsp;&nbsp;
                                    </li>

                                <li className="nav-item">
                                    <button className={`navbar-toggler ${ this.state.active ? "active" : ""}` } type="button" id="sidebarCollapse"
                                        onClick = { this.sideMenuToggle }>
                                        <i className="fa fa-bars"></i>
                                    </button>
                                </li>
                            </ul>

                        </header>
                        <nav id="sidebar" className={ `${ this.state.active ? "active" : ""}` }>
                            <div className="sideMenuTouchGlass"
                                   onClick={ this.sideMenuToggle }
                                     style={{ display: this.state.active ? "block" : "none"}}></div>
                            <Scrollbars>
                                <p className="text-center text-light mt-3 mb-2">{menuTitle}</p>
                                <hr className="nav-divider" />
                                <ul className="nav flex-column">
                                    { menuData.map((item, index)=>(
                                        <ItemNode menuData={item} key={index} sideMenuToggle={this.sideMenuToggle}></ItemNode>
                                    )) }
                                </ul>
                            </Scrollbars>
                        </nav>
                    </div>
             }
            </div>
        )
    }

}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        flashMessage: store.flashMessageState,
        navigation: store.navigationState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
        pullNavigation: (schema, successCallback, failureCallback) => {
            dispatch(pullNavigation(schema, successCallback, failureCallback))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavigationContainer);
