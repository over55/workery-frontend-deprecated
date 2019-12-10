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
            clientGivenName, clientLastName, skillSets, description, isLoading, errors, onSubmitClick,
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

                <ReactModal
                   isOpen={showModal}
                    style={customStyles}
             contentLabel="Minimal Modal Example"
           onRequestClose={onCloseModalClick}>
                   <div>

                        <h1>
                            <i className="fas fa-exclamation-triangle"></i>&nbsp;Confirmation Required
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

                        <BootstrapErrorsProcessingAlert errors={errors} />

                        <div className="jumbotron">
                            <h1 className="display-4"><i className="fas fa-exclamation-triangle"></i>&nbsp;Confirmation - Add Job</h1>

                            <table className="table table-bordered custom-cell-w">
                                <tbody>
                                    <tr className="bg-dark">
                                        <th scope="row" colSpan="2" className="text-light">
                                            <i className="fas fa-user-circle"></i>&nbsp;Summary
                                        </th>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Client</th>
                                        <td>{clientGivenName}&nbsp;{clientLastName}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Description</th>
                                        <td>{description}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Skill sets</th>
                                        <td>
                                            {skillSets && skillSets.map(
                                                (skill) => <SkillItem tag={skill} key={skill.id} />)
                                            }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <hr />
                            <p>Please click <strong>save</strong> to proceed.</p>
                            <p>
                            <Link to="/orders/add/step-5" className="btn btn-orange btn-lg  float-left">
                                <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                            </Link>
                            &nbsp;&nbsp;&nbsp;
                                <button className="btn btn-success btn-lg" disabled={isLoading} onClick={onSubmitClick}>
                                    <i className="fas fa-check-circle"></i>&nbsp;Save
                                </button>
                            </p>
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
