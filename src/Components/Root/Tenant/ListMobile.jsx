import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faCalendarMinus, faCalendarPlus, faDumbbell, faCalendar, faGauge, faSearch, faEye, faPencil, faTrashCan, faPlus, faArrowRight, faTable, faArrowUpRightFromSquare, faFilter, faRefresh, faCalendarCheck, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';
import { DateTime } from "luxon";

import FormErrorBox from "../../Reusable/FormErrorBox";
import { PAGE_SIZE_OPTIONS } from "../../../Constants/FieldOptions";

/*
Display for both tablet and mobile.
*/
function RootTenantListMobile(props) {
    const { listData, setPageSize, pageSize, previousCursors, onPreviousClicked, onNextClicked, onSelectTenantForDeletion } = props;
    return (
        <>
            {listData && listData.results && listData.results.map(function(datum, i){
                return <div class="mb-5" key={`mobile_tablet_${datum.id}`}>
                    {i !== 0 && <hr />}
                    <strong>Schema:</strong>&nbsp;{datum.schemaName}
                    <br />
                    <br />
                    <strong>Name:</strong>&nbsp;{datum.name}
                    <br />
                    <br />

                    {/* Tablet only */}
                    <div class="is-hidden-mobile pt-2" key={`tablet_${datum.id}`}>
                        <div className="buttons is-right">
                            <Link to={`/root/tenant/${datum.id}`} class="button is-small is-primary" type="button">
                                <FontAwesomeIcon className="mdi" icon={faEye} />&nbsp;View
                            </Link>
                            <Link to={`/root/tenant/${datum.id}/edit`} class="button is-small is-warning" type="button">
                                <FontAwesomeIcon className="mdi" icon={faPencil} />&nbsp;Edit
                            </Link>
                            <div class="column">
                                <Link to={`/root/tenant/${datum.id}/start`} class="button is-small is-success">Start&nbsp;<FontAwesomeIcon icon={faChevronRight} /></Link>
                            </div>
                        </div>
                    </div>

                    {/* Mobile only */}
                    <div class="is-hidden-tablet pt-2" key={`mobile_${datum.id}`}>
                        <div class="columns is-mobile">
                            <div class="column">
                                <Link to={`/root/tenant/${datum.id}`} class="button is-small is-primary is-fullwidth" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faEye} />&nbsp;View
                                </Link>
                            </div>
                            <div class="column">
                                <Link to={`/root/tenant/${datum.id}/edit`} class="button is-small is-warning is-fullwidth" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faPencil} />&nbsp;Edit
                                </Link>
                            </div>
                            <div class="column">
                                <Link to={`/root/tenant/${datum.id}/start`} class="button is-small is-success is-fullwidth">Start&nbsp;<FontAwesomeIcon icon={faChevronRight} /></Link>
                            </div>
                        </div>
                    </div>

                </div>;
            })}

            <div class="columns pt-4">
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
        </>
    );
}

export default RootTenantListMobile;
