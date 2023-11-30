//base api
export const BASE_URL = 'http://localhost:5000/capcp';

//FOR LOGIN API HERE
export const LOGIN = `${BASE_URL}/login`;

//FOR ROLES API HERE
export const ROLE_ACCESS = `${BASE_URL}/roleaccess/add`;

//FOR LEADS API HERE
export const LEAD_CREATION = `${BASE_URL}/lead/create`;
export const LEAD_GET = `${BASE_URL}/lead/get`;
export const LEAD_GET_ID = (id) => `${BASE_URL}/lead/getbyid/${id}`;
export const LEAD_UPDATE = (id) => `${BASE_URL}/lead/update/${id}`;
export const LEAD_DELETE = (id) => `${BASE_URL}/lead//delete/${id}`;

//FOR TEAMS
export const TEAMS_GET = `${BASE_URL}/roleaccess/getall`;

//FOR PROFILES
export const PROFILES_GET = `${BASE_URL}/employee/getall`;
export const PROFILES_GET_ID = (id) => `${BASE_URL}/employee/getbyid/${id}`;
export const PROFILES_CREATE = `${BASE_URL}/employee/add`;
export const PROFILES_UPDATE = (id) => `${BASE_URL}/employee/update/${id}`;
export const PROFILES_DELETE = (id) => `${BASE_URL}/employee/delete/${id}`;
