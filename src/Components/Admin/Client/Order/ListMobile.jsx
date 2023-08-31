import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faCalendarMinus, faCalendarPlus, faDumbbell, faCalendar, faGauge, faSearch, faEye, faPencil, faTrashCan, faPlus, faArrowRight, faTable, faArrowUpRightFromSquare, faFilter, faRefresh, faCalendarCheck, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';
import { DateTime } from "luxon";

import FormErrorBox from "../../../Reusable/FormErrorBox";
import { PAGE_SIZE_OPTIONS } from "../../../../Constants/FieldOptions";

/*
Display for both tablet and mobile.
*/
function AdminClientOrderListMobile(props) {
    const { listData, setPageSize, pageSize, previousCursors, onPreviousClicked, onNextClicked, onSelectClientForDeletion } = props;
    return (
        <>
            {listData && listData.results && listData.results.map(function(datum, i){
                return <div class="mb-5">
                    <hr />
                    <strong>First Name:</strong>&nbsp;{datum.firstName}
                    <br />
                    <br />
                    <strong>Last Name:</strong>&nbsp;{datum.lastName}
                    <br />
                    <br />
                    <strong>Phone:</strong>&nbsp;
                    {datum.phone
                        ? <Link to={`tel:${datum.phone}`}>{datum.phone}</Link>
                        : <>-</>
                    }
                    <br />
                    <br />
                    <strong>Email:</strong>&nbsp;<Link to={`mailto:${datum.email}`}>{datum.email}</Link>
                    <br />
                    <br />
                    <strong>Organization:</strong>&nbsp;{datum.organizationName}
                    <br />
                    <br />
                    <strong>Joined:</strong>&nbsp;{DateTime.fromISO(datum.joinDate).toLocaleString(DateTime.DATE_MED)}
                    <br />
                    <br />

                    <Link to={`/admin/client/${datum.id}`} class="button is-primary is-fullwidth-mobile" type="button">
                        View&nbsp;<FontAwesomeIcon className="mdi" icon={faChevronRight} />
                    </Link>

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

export default AdminClientOrderListMobile;