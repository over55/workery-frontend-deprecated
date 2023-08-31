import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faBuilding, faHome, faQuestion, faChevronRight, faCalendarMinus, faCalendarPlus, faDumbbell, faCalendar, faGauge, faSearch, faEye, faPencil, faTrashCan, faPlus, faArrowRight, faTable, faArrowUpRightFromSquare, faFilter, faRefresh, faCalendarCheck, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';
import { DateTime } from "luxon";

import FormErrorBox from "../../../Reusable/FormErrorBox";
import { PAGE_SIZE_OPTIONS, USER_ROLES } from "../../../../Constants/FieldOptions";


function AdminClientOrderListDesktop(props) {
    const { listData, setPageSize, pageSize, previousCursors, onPreviousClicked, onNextClicked, onSelectClientForDeletion } = props;
    return (
        <div class="b-table">
            <div class="table-wrapper has-mobile-cards">
                <table class="table is-fullwidth is-striped is-hoverable is-fullwidth">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Type</th>
                            <th>Job #</th>
                            <th>Associate</th>
                            <th>Assign Date</th>
                            <th>Start Date</th>
                            <th>Completion Date</th>
                            <th>Status</th>
                            <th>Invoice (PDF)</th>
                            <th>Financial</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        {listData && listData.results && listData.results.map(function(datum, i){
                            return <tr>
                                <td></td>
                                <td data-label="Type">
                                    <IconFormatter typeOf={datum.type} />
                                </td>
                                <td data-label="Job #">{datum.id}</td>
                                <td data-label="Associate">
                                    <Link to={`/admin/associate/${datum.associateId}`} target="_blank" rel="noreferrer">
                                        {datum.associateName}&nbsp;<FontAwesomeIcon className="mdi" icon={faExternalLinkAlt} />
                                    </Link>
                                </td>
                                <td data-label="Assign Date">
                                    <DateFormatter value={datum.assignmentDate} />
                                </td>
                                <td data-label="Start Date">
                                    <DateFormatter value={datum.startDate} />
                                </td>
                                <td data-label="Completion Date">
                                    <DateFormatter value={datum.completionDate} />
                                </td>
                                <td data-label="Status">
                                    <StatusFormatter value={datum.status} />
                                </td>
                                <td data-label="Invoice (PDF)">
                                    <Link to={`/admin/associate/${datum.associateId}`} target="_blank" rel="noreferrer">
                                        View&nbsp;<FontAwesomeIcon className="mdi" icon={faExternalLinkAlt} />
                                    </Link>
                                </td>
                                <td data-label="Financial">
                                    <Link to={`/admin/associate/${datum.associateId}`} target="_blank" rel="noreferrer">
                                        View&nbsp;<FontAwesomeIcon className="mdi" icon={faExternalLinkAlt} />
                                    </Link>
                                </td>
                                {/*
                                <td data-label="Organization">{datum.organizationName}</td>

                                <td data-label="Joined">{DateTime.fromISO(datum.joinDate).toLocaleString(DateTime.DATE_MED)}</td>
                                */}
                                <td class="is-actions-cell">
                                    <div class="buttons is-right">
                                        <Link to={`/admin/client/${datum.id}`} class="is-small">
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

function IconFormatter({ typeOf }) {
    switch(typeOf) {
        case 2:
            return <FontAwesomeIcon className="mdi" icon={faBuilding} />;
            break;
        case 1:
            return <FontAwesomeIcon className="mdi" icon={faHome} />;
            break;
        default:
            return <FontAwesomeIcon className="mdi" icon={faQuestion} />;
            break;
    }
}

function DateTimeFormatter({ value }) {
    return DateTime.fromISO(value).toLocaleString(DateTime.DATETIME_MED);
}

function DateFormatter({ value }) {
    return DateTime.fromISO(value).toLocaleString(DateTime.DATE_MED);
}

const selectOptions = {
    0: 'Archived',
    1: 'New',
    2: 'Declined',
    3: 'Pending',
    4: 'Cancelled',
    5: 'Ongoing',
    6: 'In-progress',
    7: 'Completed and Unpaid',
    8: 'Completed and Paid',
};

function StatusFormatter({ value }) {
    return selectOptions[value];
}

export default AdminClientOrderListDesktop;
