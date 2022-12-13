import { LoanDetails } from '../../models/LoanDetails';
import bankingClient, { BankingApiResponse } from './bankingClient';

const baseURL = '/loans';

export const apiCreateLoan = async (
  userId: number,
  reason: string,
  initialAmount: number,
  password: string
): Promise<BankingApiResponse> => {
  const response = await bankingClient.post<LoanDetails>(
    `${baseURL}/${userId}`,
    { reason, initialAmount, password },
    {
      headers: { 'Current-User': userId },
      withCredentials: true,
    }
  );
  return { status: response.status, headers: response.headers, payload: response.data as LoanDetails };
};

export const apiGetLoans = async (
  userId: number,
  token: string
): Promise<BankingApiResponse> => {
  const response = await bankingClient.get<LoanDetails[]>(
    `${baseURL}/${userId}`,
    {
      headers: { 'authorization': token },
      withCredentials: true,
    }
  );
  return { status: response.status, headers: response.headers, payload: response.data as LoanDetails[] };
};

export const apiGetPendingLoans = async (
  userType: string,
  token: string
): Promise<BankingApiResponse> => {
  const response = await bankingClient.get<LoanDetails[]>(
    `${baseURL}/pending-loans`,
    {
      headers: { 'authorization': token },
      withCredentials: true,
    }
  );
  return { status: response.status, headers: response.headers, payload: response.data as LoanDetails[] };
};

export const apiChangeStatus = async ( 
  currentLoan: LoanDetails,
  token: string
): Promise<BankingApiResponse> => {
  const response = await bankingClient.put<LoanDetails>(
    `${baseURL}/pending-loans`,
    {...currentLoan},
    {
      headers: { 'authorization': token }, //check if this is an ADMIN type
      withCredentials: true,
    }
  );
  return { status: response.status, headers: response.headers, payload: response.data as LoanDetails };
};