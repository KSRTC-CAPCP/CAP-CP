//base api
export const BASE_URL = 'http://localhost:5000/capcp';

//FOR LOGIN API HERE
export const LOGIN = `${BASE_URL}/login`;

//FOR ROLES API HERE
export const ROLE_ACCESS = `${BASE_URL}/roleaccess/add`;

//FOR LEADS API HERE
export const LEAD_CREATION = `${BASE_URL}/lead/create`;
export const LEAD_GET = `${BASE_URL}/lead/get`;
export const LEAD_GET_ID = (id => `${BASE_URL}/lead/getbyid/${id}`);
export const LEAD_UPDATE = (id => `${BASE_URL}/lead/update/${id}`);
export const LEAD_DELETE = (id => `${BASE_URL}/lead//delete/${id}`);
