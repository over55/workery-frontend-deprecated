import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion, faHome, faBuilding, faChevronRight, faCalendarMinus, faCalendarPlus, faDumbbell, faCalendar, faGauge, faSearch, faEye, faPencil, faTrashCan, faPlus, faArrowRight, faTable, faArrowUpRightFromSquare, faFilter, faRefresh, faCalendarCheck, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';
import { DateTime } from "luxon";

import FormErrorBox from "../../Reusable/FormErrorBox";
import { OFFSET_STEP_OPTIONS, USER_ROLES } from "../../../Constants/FieldOptions";
import { RESIDENTIAL_CUSTOMER_TYPE_OF_ID, COMMERCIAL_CUSTOMER_TYPE_OF_ID, } from "../../../Constants/App";


function AdminClientListDesktop(props) {
    const { listData, setOffsetStep, offsetStep, previousOffsets, onPreviousClicked, onNextClicked, onSelectClientForDeletion } = props;
    return (
        <div class="b-table">
            <div class="table-wrapper has-mobile-cards">
                <table class="table is-fullwidth is-striped is-hoverable is-fullwidth">
                    <thead>
                        <tr>
                            <th></th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Organization</th>
                            <th>Joined</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        {listData && listData.results && listData.results.map(function(user, i){
                            return <tr>
                                <td>
                                    {iconFormatter(user.typeOf)}
                                </td>
                                <td data-label="First Name">{user.givenName}</td>
                                <td data-label="Last Name">{user.lastName}</td>
                                <td data-label="Telephone"><Link to={`tel:${user.telephone}`}>{user.telephone}</Link></td>
                                <td data-label="Email"><Link to={`mailto:${user.email}`}>{user.email}</Link></td>
                                <td data-label="Organization">{user.organizationName}</td>
                                <td data-label="Joined">
                                    {user.joinDate !== undefined && user.joinDate !== null && user.joinDate !== ""
                                        ? <>{DateTime.fromISO(user.joinDate).toLocaleString(DateTime.DATE_MED)}</>
                                        : <>-</>
                                    }
                                </td>
                                <td class="is-actions-cell">
                                    <div class="buttons is-right">
                                        <Link to={`/admin/user/${user.id}`} class="is-small">
                                            View&nbsp;<FontAwesomeIcon className="mdi" icon={faChevronRight} />
                                        </Link>
                                    </div>
                                </td>
                            </tr>;
                        })}
                    </tbody>
                </table>

                <div class="columns">
                    <div class="column is-half">
                        <span class="select">
                            <select class={`input has-text-grey-light`}
                                     name="offsetStep"
                                 onChange={(e)=>setOffsetStep(parseInt(e.target.value))}>
                                {OFFSET_STEP_OPTIONS.map(function(option, i){
                                    return <option selected={offsetStep === option.value} value={option.value}>{option.label}</option>;
                                })}
                            </select>
                        </span>

                    </div>
                    <div class="column is-half has-text-right">
                        {previousOffsets.length > 0 &&
                            <button class="button" onClick={onPreviousClicked}>Previous</button>
                        }
                        {listData.nextId && <>
                            <button class="button" onClick={onNextClicked}>Next</button>
                        </>}
                    </div>
                </div>

            </div>
        </div>
    );
}

function iconFormatter(typeOf){
    console.log("typeOf", typeOf);
    switch(typeOf) {
        case COMMERCIAL_CUSTOMER_TYPE_OF_ID:
            return <FontAwesomeIcon className="mdi" icon={faBuilding} />;
            break;
        case RESIDENTIAL_CUSTOMER_TYPE_OF_ID:
            return <FontAwesomeIcon className="mdi" icon={faHome} />;
            break;
        default:
            return <FontAwesomeIcon className="mdi" icon={faQuestion} />;
            break;
    }
}

export default AdminClientListDesktop;
