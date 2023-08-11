export const PAGE_SIZE_OPTIONS = [
    { value: 2, label: '2 Rows' },
    { value: 5, label: '5 Rows' },
    { value: 10, label: '10 Rows' },
    { value: 25, label: '25 Rows' },
    { value: 50, label: '50 Rows' },
    { value: 100, label: '100 Rows' },
    { value: 250, label: '250 Rows' },
];

export const OFFSET_STEP_OPTIONS = [
    { value: 2, label: '2 Rows' },
    { value: 5, label: '5 Rows' },
    { value: 10, label: '10 Rows' },
    { value: 25, label: '25 Rows' },
    { value: 50, label: '50 Rows' },
    { value: 100, label: '100 Rows' },
    { value: 250, label: '250 Rows' },
];

export const USER_ROLE_LIST_OPTIONS = [
    { value: 1, label: 'Root' },
    { value: 2, label: 'Staff' },
    { value: 3, label: 'Customer' },
];

export const USER_ROLE_LIST_OPTIONS_WITH_EMPTY_OPTIONS = [
    { value: 0, label: "Please select" }, // EMPTY OPTION
    ...USER_ROLE_LIST_OPTIONS
];

export const ORGANIZATION_STATUS_LIST_OPTIONS = [
    { value: 0, label: 'All' },
    { value: 1, label: 'Waiting for receiving' },
    { value: 2, label: 'Processing' },
    { value: 3, label: 'In Review' },
    { value: 4, label: 'Reviewed' },
    { value: 5, label: 'Sent back' },
];

export const USER_STATUS_LIST_OPTIONS = [
        { value: 0, label: 'All' },
        { value: 1, label: 'Active' },
        { value: 100, label: 'Archived' },
];

export const USER_ROLES = []

//----------------------------------------------------------------------------//
//                                Clients                                     //
//----------------------------------------------------------------------------//

export const CLIENT_SORT_OPTIONS = [
    { value: "last_name,ASC", label: 'Last Name A -> Z' },
    { value: "last_name,DESC", label: 'Last Name Z -> A' },
];

export const CLIENT_STATUS_FILTER_OPTIONS = [
        { value: 1, label: 'Active' },
        { value: 0, label: 'Archived' },
];
