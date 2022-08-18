export const API_URL = 'http://localhost:8000/'

export const registerPath = () => API_URL + 'users'
export const loginPath = () => API_URL + 'login'
export const usersPath = () => API_URL + 'users'
export const contactPath = (string: string) => API_URL + 'users/' + string