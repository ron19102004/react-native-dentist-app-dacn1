// config.ts
export const API_HOST_NAME = "192.168.213.179:8080"; 
// export const API_HOST_NAME = "103.172.79.67"; 
export const IS_SECURE = false;

const PROTOCOL = IS_SECURE ? "https://" : "http://";
export const WS_POINT = (IS_SECURE ? "wss://" : "ws://") + API_HOST_NAME;
export const API_URL_ORIGIN: string = PROTOCOL + API_HOST_NAME;


const withPrefix = (prefix: string) => (url: string) => `${API_URL_ORIGIN}${prefix}${url}`;

export const authApi = withPrefix("/api/auth");
export const adminApi = withPrefix("/api/admin");
export const medicineApi = withPrefix("/api/medicines");
export const dentalServiceApi = withPrefix("/api/dental-services");
export const appointmentUserApi = withPrefix("/api/user/appointments");
export const staffApi = withPrefix("/api/staffs");
export const medicineCategoryApi = withPrefix("/api/medicine-categories");
export const expertiseApi = withPrefix("/api/expertise");
export const appointmentDentistApi = withPrefix("/api/dentist/appointments");
export const dentistApi = withPrefix("/api/dentists");
export const activityLogApi = withPrefix("/api/activity-logs");
