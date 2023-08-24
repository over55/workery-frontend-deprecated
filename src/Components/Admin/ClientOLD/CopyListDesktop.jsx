import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faCalendarMinus, faCalendarPlus, faDumbbell, faCalendar, faGauge, faSearch, faEye, faPencil, faTrashCan, faPlus, faArrowRight, faTable, faArrowUpRightFromSquare, faFilter, faRefresh, faCalendarCheck, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';
import { DateTime } from "luxon";

import FormErrorBox from "../../Reusable/FormErrorBox";
import { PAGE_SIZE_OPTIONS, USER_ROLES } from "../../../Constants/FieldOptions";


function AdminClientListDesktop(props) {
    const { listData, setPageSize, pageSize, previousCursors, onPreviousClicked, onNextClicked, onSelectClientForDeletion } = props;
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
                                <td></td>
                                <td data-label="First Name">{user.givenName}</td>
                                <td data-label="Last Name">{user.lastName}</td>
                                <td data-label="Telephone"><Link to={`tel:${user.telephone}`}>{user.telephone}</Link></td>
                                <td data-label="Email"><Link to={`mailto:${user.email}`}>{user.email}</Link></td>
                                <td data-label="Organization">{user.organizationName}</td>
                                <td data-label="Joined">{DateTime.fromISO(user.joinDate).toLocaleString(DateTime.DATE_MED)}</td>
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
                                     name="pageSize"
                                 onChange={(e)=>setPageSize(parseInt(e.target.value))}>
                                {PAGE_SIZE_OPTIONS.map(function(option, i){
                                    return <option selected={pageSize === option.value} value={option.value}>{option.label}</option>;
                                })}
                            </select>
                        </span>

                    </div>
                    <div class="column is-half has-text-right">
                        {previousCursors.length > 0 &&
                            <button class="button" onClick={onPreviousClicked}>Previous</button>
                        }
                        {listData.hasNextPage && <>
                            <button class="button" onClick={onNextClicked}>Next</button>
                        </>}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default AdminClientListDesktop;
