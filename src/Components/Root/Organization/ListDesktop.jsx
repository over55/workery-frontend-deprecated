import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faCalendarMinus, faCalendarPlus, faDumbbell, faCalendar, faGauge, faSearch, faEye, faPencil, faTrashCan, faPlus, faArrowRight, faTable, faArrowUpRightFromSquare, faFilter, faRefresh, faCalendarCheck, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';
import { DateTime } from "luxon";

import FormErrorBox from "../../Reusable/FormErrorBox";
import { PAGE_SIZE_OPTIONS } from "../../../Constants/FieldOptions";


function RootOrganizationListDesktop(props) {
    const { listData, setPageSize, pageSize, previousCursors, onPreviousClicked, onNextClicked, onSelectOrganizationForDeletion } = props;
    return (
        <div class="b-table">
            <div class="table-wrapper has-mobile-cards">
                <table class="table is-fullwidth is-striped is-hoverable is-fullwidth">
                    <thead>
                        <tr>
                            <th>Schema</th>
                            <th>Name</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        {listData && listData.results && listData.results.map(function(organization, i){
                            return <tr key={`desktop_${organization.id}`}>
                                <td data-label="Schema">{organization.schemaName}</td>
                                <td data-label="Name">{organization.name}</td>
                                <td class="is-actions-cell">
                                    <div class="buttons is-right">
                                        <Link to={`/root/organization/${organization.id}`} class="button is-small is-primary" type="button">
                                            <FontAwesomeIcon className="mdi" icon={faEye} />&nbsp;View
                                        </Link>
                                        <Link to={`/root/organization/${organization.id}/edit`} class="button is-small is-warning" type="button">
                                            <FontAwesomeIcon className="mdi" icon={faPencil} />&nbsp;Edit
                                        </Link>
                                        <Link to={`/root/organization/${organization.id}/start`} class="button is-small is-success">Start&nbsp;<FontAwesomeIcon icon={faChevronRight} /></Link>
                                    </div>
                                </td>
                            </tr>;
                        })}
                    </tbody>
                </table>

                {/* <div class="columns">
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
                */}

            </div>
        </div>
    );
}

export default RootOrganizationListDesktop;
