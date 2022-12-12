import bankingClient, { bankingApiResponse } from './bankingClient';

const baseURL = '/auth';

export const apiLogin = async (
  email: string,
  password: string,
): Promise<bankingApiResponse> => {
  const response = await bankingClient.post<any>(`${baseURL}/login`, {
    email: email,
    password: password,
  });
  return { status: response.status, headers: response.headers, payload: response.data };
};

export const apiLogout = async (): Promise<bankingApiResponse> => {
  const response = await bankingClient.post<any>(`${baseURL}/logout`);
  return { status: response.status, headers: response.headers, payload: response.data };
};

export const apiRegister = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  securityQuestion: string,
  securityAnswer: string
): Promise<bankingApiResponse> => {
  const response = await bankingClient.post<any>(`${baseURL}/register`, {
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
    securityQuestion: securityQuestion,
    securityAnswer: securityAnswer
  });
  return { status: response.status, headers: response.headers, payload: response.data };
};