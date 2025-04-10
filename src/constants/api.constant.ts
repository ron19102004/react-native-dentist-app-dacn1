const API_URL_ORIGIN:string = 'https://toilaron.icu';

export const authApi = (url:string) => {
    return `${API_URL_ORIGIN}/api/auth/${url}`;
}
export const adminApi = (url:string) => {
    return `${API_URL_ORIGIN}/api/admin/${url}`;
}