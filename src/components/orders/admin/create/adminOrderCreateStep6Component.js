// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
// import 'moment-timezone';
import ReactModal from 'react-modal';

import { BootstrapErrorsProcessingAlert } from "../../../bootstrap/bootstrapAlert";
import { BootstrapPageLoadingAnimation } from "../../../bootstrap/bootstrapPageLoadingAnimation"


export default class AdminOrderCreateStep6Component extends Component {
    render() {
        const {
            clientGivenName, clientLastName, startDate, jobTypeLabel, homeSupportLabel, skillSets, description, tags, comment, isLoading, errors, onSubmitClick,
            showModal, onShowModalClick, onCloseModalClick, onAgreeModalClick
        } = this.props;

        // Apply our styling for our modal component.
        const customStyles = {
            content : {
                top                   : '50%',
                left                  : '50%',
                right                 : 'auto',
                bottom                : 'auto',
                marginRight           : '-50%',
                transform             : 'translate(-50%, -50%)'
            }
        };

        return (
            <main id="main" role="main">
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/orders"><i className="fas fa-wrench"></i>&nbsp;Orders</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-plus"></i>&nbsp;Add
                        </li>
                    </ol>
                </nav>

                <h1>
                    <i className="fas fa-plus"></i>&nbsp;Add Order
                </h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to="/orders/add/step-1">
                                <span className="num">1.</span><span className="">Search</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to="/orders/add/step-2">
                                <span className="num">2.</span><span className="">Results</span>
                            </Link>
                        </div>
                        <div id="step-3" className="st-grey">
                            <Link to="/orders/add/step-3">
                                <span className="num">3.</span><span className="">Job Type</span>
                            </Link>
                        </div>
                        <div id="step-4" className="st-grey">
                            <Link to="/orders/add/step-4">
                                <span className="num">4.</span><span className="">Skills</span>
                            </Link>
                        </div>
                        <div id="step-5" className="st-grey">
                            <Link to="/orders/add/step-5">
                                <span className="num">5.</span><span className="">Comments</span>
                            </Link>
                        </div>
                        <div id="step-6" className="st-grey active">
                            <strong>
                                <span className="num">6.</span><span className="">Review</span>
                            </strong>
                        </div>
                    </div>
                </div>

                <ReactModal
                   isOpen={showModal}
                    style={customStyles}
             contentLabel="Minimal Modal Example"
           onRequestClose={onCloseModalClick}>
                   <div>

                        <h1>
                            <i className="fas fa-exclamation-triangle"></i>&nbsp;Confirmation Required
                           <button type="button" className="btn btn-orange btn-lg float-right" onClick={onCloseModalClick}>
                               <span className="fa fa-times"></span>
                           </button>
                        </h1>
                        <div className="row">
                            <div className="col-md-8 mx-auto mt-2">

                                <form className="needs-validation" noValidate>

                                   <p>This will create a new job, which will need to be assigned to a member. Do you want to continue?</p>

                                   <button
                                       onClick={onCloseModalClick}
                                       type="button"
                                       className="btn btn-lg btn-danger float-left">
                                       <i className="fas fa-times"></i>&nbsp;No
                                   </button>
                                   <button
                                       onClick={onAgreeModalClick}
                                       type="button"
                                       className="btn btn-lg btn-success float-right">
                                       <i className="fas fa-check-circle"></i>&nbsp;Yes
                                   </button>
                               </form>
                           </div>
                       </div>
                   </div>
                </ReactModal>

                <div className="row pt-3 mb-4 pb-2">
                    <div className="col-md-10 mx-auto p-2">

                        <h2>
                            <i className="fas fa-table"></i>&nbsp;Review
                        </h2>

                        <BootstrapErrorsProcessingAlert errors={errors} />
                        <p><strong>Please confirm these details before adding the order:</strong></p>
                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-user-circle"></i>&nbsp;Client
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Full-Name</th>
                                    <td>{clientGivenName}&nbsp;{clientLastName}</td>
                                </tr>

                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-cog"></i>&nbsp;Job Type
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Start Date</th>
                                    <td>
                                        {startDate
                                            ? <Moment format="MM/DD/YYYY">{startDate}</Moment>
                                            : "-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Job Type</th>
                                    <td>{jobTypeLabel}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Home Support?</th>
                                    <td>{homeSupportLabel}</td>
                                </tr>


                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-graduation-cap"></i>&nbsp;Skills and Description
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Skill sets</th>
                                    <td>
                                        {skillSets && skillSets.map(
                                            (skill) => <SkillItem tag={skill} key={skill.id} />)
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Description</th>
                                    <td>{description}</td>
                                </tr>

                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-chart-pie"></i>&nbsp;Comments
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Tags</th>
                                    <td>
                                        {tags && tags.map(
                                            (tag) => <TagItem tag={tag} key={tag.id} />)
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Additional Comment(s)</th>
                                    <td>{comment}</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="form-group">
                            <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" onClick={onShowModalClick}>
                                <i className="fas fa-check-circle"></i>&nbsp;Save
                            </button>
                            <Link to="/orders/add/step-5" className="btn btn-orange btn-lg mt-4 float-left pl-4 pr-4">
                                <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                            </Link>
                        </div>

                    </div>
                </div>



            </main>
        );
    }
}


class SkillItem extends Component {
    render() {
        const { label, value } = this.props.tag;
        return (
            <span className="badge badge-info badge-lg" value={value}>{label}</span>
        );
    };
}


class TagItem extends Component {
    render() {
        const { label, value } = this.props.tag;
        return (
            <span className="badge badge-info badge-lg" value={value}>{label}</span>
        );
    };
}
