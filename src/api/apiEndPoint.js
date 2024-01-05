//base api
export const BASE_URL = 'http://localhost:5000/capcp';

//FOR LOGIN API HERE
export const LOGIN = `${BASE_URL}/login`;

//FOR LEADS API HERE
export const LEAD_CREATION = `${BASE_URL}/lead/create`;
export const LEAD_GET = `${BASE_URL}/lead/get`;
export const LEAD_GET_BY_HOLD = `${BASE_URL}/lead/getbyhold`;
export const LEAD_GET_BY_REJECT = `${BASE_URL}/lead/getbyreject`;
export const LEAD_GET_BY_PENDINGS = `${BASE_URL}/lead/getbypendings`;
export const LEAD_GET_ID = (id) => `${BASE_URL}/lead/getbyid/${id}`;
export const LEAD_UPDATE = (id) => `${BASE_URL}/lead/update/${id}`;
export const LEAD_DELETE = (id) => `${BASE_URL}/lead/delete/${id}`;

//FOR RFQ API HERE
export const RFQ_CREATION = `${BASE_URL}/rfq/create`;
export const RFQ_GET = `${BASE_URL}/rfq/get`;
export const RFQ_GET_BY_LOST = `${BASE_URL}/rfq/getLosted`;
export const RFQ_GET_BY_PENDINGS = `${BASE_URL}/rfq/getPending`;
export const RFQ_GET_STATUS = `${BASE_URL}/rfq/status/Business%20Award`;
export const RFQ_GET_ID = (id) => `${BASE_URL}/rfq/getbyid/${id}`;
export const RFQ_UPDATE = (id) => `${BASE_URL}/rfq/update/${id}`;
export const RFQ_DELETE = (id) => `${BASE_URL}/rfq/delete/${id}`;

//FOR PROFILES
export const PROFILES_GET = `${BASE_URL}/employee/getall`;
export const PROFILES_GET_ID = (id) => `${BASE_URL}/employee/getbyid/${id}`;
export const PROFILES_GET_ROLE = (id) => `${BASE_URL}/employees/role/${id}`;
export const PROFILES_GET_CODE = (id) => `${BASE_URL}/employees/code/${id}`;
export const PROFILES_CREATE = `${BASE_URL}/employee/add`;
export const PROFILES_UPLOAD = `${BASE_URL}/employee/bulk`;
export const PROFILES_UPDATE = (id) => `${BASE_URL}/employee/update/${id}`;
export const PROFILES_DELETE = (id) => `${BASE_URL}/employee/delete/${id}`;
export const PROFILES_BULK_DELETE = `${BASE_URL}/employee/bulk/delete`;
export const PROFILES_GETBY_CAE = `${BASE_URL}/employee/getbydirecthire`;
export const PROFILES_GETBY_CAC = `${BASE_URL}/employee/getbyconsultanthire`;
export const PROFILES_GETBY_STATUS = (id) => `${BASE_URL}/employee/status/${id}`;

//FOR PROJECT
export const PROJECT_GET = `${BASE_URL}/project/get-all`;
export const PROJECT_CREATE = `${BASE_URL}/project/create`;
export const PROJECT_DELETE = (id) => `${BASE_URL}/project/delete/${id}`;
export const PROJECT_UPDATE = (id) => `${BASE_URL}/project/update/${id}`;

//FOR CATEGORY
export const CATEGORY_CREATE = `${BASE_URL}/categories`;
export const CATEGORY_GET = `${BASE_URL}/categories`;

//FOR MILESTONE
export const MILESTONE_GET = `${BASE_URL}/milestones`;
export const MILESTONE_CREATE = `${BASE_URL}/milestone`;

//FOR LOCATION
export const LOCATION_GET = `${BASE_URL}/locations`;
export const LOCATION_CREATE = `${BASE_URL}/location`;

//FOR TEAM
export const TEAM_CREATION = `${BASE_URL}/roleaccess/add`;
export const TEAM_GET_ALL = `${BASE_URL}/roleaccess/getall`;
export const TEAM_DELETE = (id) => `${BASE_URL}/roleaccess/delete/${id}`;
export const TEAM_UPDATE = (id) => `${BASE_URL}/roleaccess/update/${id}`;
export const TEAM_GET_BY_ID = (id) => `${BASE_URL}/roleaccess/getbyid/${id}`;

//FOR TASK
export const TASKS_GET_ALL =  `${BASE_URL}/tasks`;
export const TASKS_CREATE =  `${BASE_URL}/tasks/manual`;

//FOR TCO NUMBER
export const TCO_NUMBER =  `${BASE_URL}/tco`;