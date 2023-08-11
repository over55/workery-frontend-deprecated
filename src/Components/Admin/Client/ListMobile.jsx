import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faHome, faQuestion, faChevronRight, faCalendarMinus, faCalendarPlus, faDumbbell, faCalendar, faGauge, faSearch, faEye, faPencil, faTrashCan, faPlus, faArrowRight, faTable, faArrowUpRightFromSquare, faFilter, faRefresh, faCalendarCheck, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';
import { DateTime } from "luxon";

import FormErrorBox from "../../Reusable/FormErrorBox";
import { OFFSET_STEP_OPTIONS, USER_ROLES } from "../../../Constants/FieldOptions";
import { RESIDENTIAL_CUSTOMER_TYPE_OF_ID, COMMERCIAL_CUSTOMER_TYPE_OF_ID, } from "../../../Constants/App";

/*
Display for both tablet and mobile.
*/
function AdminClientListMobile(props) {
    const { listData, setOffsetStep, offsetStep, previousOffsets, onPreviousClicked, onNextClicked, onSelectClientForDeletion } = props;
    return (
        <>
            {listData && listData.results && listData.results.map(function(datum, i){
                return <div class="mb-5">
                    <hr />
                    {iconFormatter(datum.typeOf)}
                    <br />
                    <strong>First Name:</strong>&nbsp;{datum.givenName}
                    <br />
                    <br />
                    <strong>Last Name:</strong>&nbsp;{datum.lastName}
                    <br />
                    <br />
                    <strong>Phone:</strong>&nbsp;
                    {datum.phone
                        ? <Link to={`tel:${datum.telephone}`}>{datum.telephone}</Link>
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
                    <strong>Joined:</strong>&nbsp
                    {datum.joinDate !== undefined && datum.joinDate !== null && datum.joinDate !== ""
                        ? <>{DateTime.fromISO(datum.joinDate).toLocaleString(DateTime.DATE_MED)}</>
                        : <>-</>
                    }
                    <br />
                    <br />

                    <Link to={`/admin/user/${datum.id}`} class="button is-primary is-fullwidth-mobile" type="button">
                        View&nbsp;<FontAwesomeIcon className="mdi" icon={faChevronRight} />
                    </Link>

                </div>;
            })}

            <div class="columns pt-4">
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
                    {listData.hasNextPage && <>
                        <button class="button" onClick={onNextClicked}>Next</button>
                    </>}
                </div>
            </div>
        </>
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


export default AdminClientListMobile;
