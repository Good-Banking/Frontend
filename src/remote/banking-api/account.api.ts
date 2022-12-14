import { Account } from '../../models/Account';
import { Transaction } from '../../models/Transaction';
import { Transfer } from '../../models/Transfer';
import bankingClient, { BankingApiResponse } from './bankingClient';

const baseURL = '/account';

export const apiGetAccounts = async (
  id: number,
  token: string
): Promise<BankingApiResponse> => {
  const response = await bankingClient.get<Account[]>(`${baseURL}/${id}`, {
    headers: { 'authorization': token },
    withCredentials: true,
  });
  return { status: response.status, headers: response.headers, payload: response.data as Account[] };
};

export const apiCreateAccount = async (
  account: Account,
  userId: string,
  token: string
): Promise<BankingApiResponse> => {
  let num = account.balance;
  account.balance = Math.round((num + Number.EPSILON) * 100) / 100;
  const response = await bankingClient.post<Account>(`${baseURL}`, account, {
    headers: { 'authorization': token },
    // withCredentials: true,
  });
  return { status: response.status, headers: response.headers, payload: response.data };
};

export const apiGetTransactions = async (
  id: number,
  token: string,
  page: number
): Promise<BankingApiResponse> => {
  const response = await bankingClient.get<Transaction[]>(
    `${baseURL}/${id}/transaction/${page}`,
    { 
      headers: { 'authorization': token },
      withCredentials: true }
  );
  return { status: response.status, headers: response.headers, payload: response.data };
};

export const apiGetAllTransactions = async (
  id: number,
  token: string,
): Promise<BankingApiResponse> => {
  const response = await bankingClient.get<Transaction[]>(
    `${baseURL}/${id}/transaction`,
    { 
      headers: { 'authorization': token },
      withCredentials: true }
  );
  return { status: response.status, headers: response.headers, payload: response.data };
};



export const apiGetTotalTransactionSize = async (id: number): Promise<BankingApiResponse> => {
  const response = await bankingClient.get<Transaction[]>(
    `${baseURL}/${id}/transactions`,
    { withCredentials: true });
    return { status: response.status, headers: response.headers, payload: response.data };
}

export const apiUpsertTransaction = async (
  id: number,
  transaction: Transaction,
  token: string
): Promise<BankingApiResponse> => {
  let num = transaction.amount;
  transaction.amount = Math.round((num + Number.EPSILON) * 100) / 100;
  const response = await bankingClient.post<any>(
    `${baseURL}/${id}/transaction`,
    transaction,
    { 
      headers: { 'authorization': token },
      withCredentials: true }
  );
  return { status: response.status, headers: response.headers, payload: response.data };
};

export const apiTransferTransaction = async (
id: number,
transfer: Transfer
): Promise<BankingApiResponse> => {
  const response = await bankingClient.post<Transaction[]>(
  `${baseURL}/${id}/transfer`,
  transfer,
  { withCredentials: true }
    );
    return { status: response.status, headers: response.headers, payload: response.data };
};