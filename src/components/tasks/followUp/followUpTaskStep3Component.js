import React, { Component } from 'react';
import { Link } from "react-router-dom";


export default class FollowUpTaskStep3Component extends Component {
    render() {
        const { id, task, onBack, onClick } = this.props;
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/tasks`}><i className="fas fa-tasks"></i>&nbsp;Tasks</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-thumbtack"></i>&nbsp;Task # {task && task.job.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
                        </li>
                    </ol>
                </nav>

                <h1><i className="fas fa-thumbtack"></i>&nbsp;Task # {task && task.job.toLocaleString(navigator.language, { minimumFractionDigits: 0 })} - 48 Hour Follow Up</h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to={`/task/2/${id}/step-1`}>
                                <span className="num">1.</span><span className="">Info</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to={`/task/2/${id}/step-2`}>
                                <span className="num">2.</span><span className="">Decision</span>
                            </Link>
                        </div>
                        <div id="step-3" className="st-grey active">
                            <strong>
                                <span className="num">3.</span><span className="">Review</span>
                            </strong>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-10 mx-auto p-2">
                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-wrench"></i>&nbsp;Order
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Job #</th>
                                    <td>
                                        <Link to={`/order/${task.job}`} target="_blank">
                                            {task && task.job.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}&nbsp;<i className="fas fa-external-link-alt"></i>
                                        </Link>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Client Name</th>
                                    <td>
                                        <Link to={`/client/${task.jobCustomer}`} target="_blank">
                                            {task && task.jobCustomerFullName}&nbsp;<i className="fas fa-external-link-alt"></i>
                                        </Link>
                                    </td>
                                </tr>



                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-calendar-alt"></i>&nbsp;48 Hour Follow Up
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Description</th>
                                    <td>{task && task.description}</td>
                                </tr>
                                

                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-project-diagram"></i>&nbsp;Functions
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Available Choices</th>
                                    <td>
                                        <ul>
                                            <li>
                                                <Link to={`/order/${task.job}/postpone`}>
                                                    Postpone Order&nbsp;<i className="fas fa-chevron-right"></i>
                                                </Link>
                                                </li>
                                            <li>
                                                <Link to={`/order/${task.job}/close`}>
                                                    Close Order&nbsp;<i className="fas fa-chevron-right"></i>
                                                </Link>
                                            </li>
                                        </ul>
                                    </td>
                                </tr>

                            </tbody>
                        </table>

                        <div className="form-group col-md-12 mb-3 p-0 mx-auto text-center">
                            <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" onClick={onClick}>
                                <i className="fas fa-check-circle"></i>&nbsp;Save
                            </button>

                            <Link className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4" to={`/task/2/${id}/step-2`}>
                                <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                            </Link>
                        </div>

                    </div>
                </div>


            </div>
        );
    }
}


class TagItem extends Component {
    render() {
        const { id, text } = this.props.tag;
        return (
            <span className="badge badge-info badge-lg" value={id}>{text}</span>
        );
    };
}


class SkillSetItem extends Component {
    render() {
        const { subCategory, value } = this.props.skillSet;
        return (
            <span className="badge badge-info badge-lg" value={value}>{subCategory}</span>
        );
    };
}
