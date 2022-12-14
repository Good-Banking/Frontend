import {
  apiChangeStatus,
  apiCreateLoan,
  apiGetLoans,
  apiGetPendingLoans,
} from '../remote/banking-api/loan.api';
import bankingClient from '../remote/banking-api/bankingClient';
import { LoanDetails } from '../models/LoanDetails';

jest.mock('../remote/banking-api/bankingClient');
const bankingClientMock = bankingClient as jest.Mocked<typeof bankingClient>;

describe('Loan api test suite', () => {
  it('Should create loan.', async () => {
    (
      bankingClientMock.post as jest.MockedFunction<typeof bankingClient.post>
    ).mockResolvedValue({
      data: { reason: 'test reason', initialAmount: 213, password: 'pass' },
      Headers: { 'Current-User': 1 },
      withCredentials: true,
      status: 201,
    });

    const result = await apiCreateLoan(1, 'test reason', 213, 'pass');

    expect(bankingClient.post).toHaveBeenCalledWith(
      `/loans/1`,
      { reason: 'test reason', initialAmount: 213, password: 'pass' },
      {
        headers: { 'Current-User': 1 },
        withCredentials: true,
      }
    );
    expect(result.status).toBe(201);
    expect(result.payload).toStrictEqual({
      reason: 'test reason',
      initialAmount: 213,
      password: 'pass',
    });
  });

  it('Should return loan details.', async () => {
    (
      bankingClientMock.get as jest.MockedFunction<typeof bankingClient.get>
    ).mockResolvedValue({
      status: 200,
      headers: { authorization: '123' },
      data: {
        userId: 1,
        loanID: 1,
        reason: 'test reason',
        initialAmount: 213,
        balance: 123,
        creationDate: '2022-12-13T20:10:23.416Z',
        status: 'Approved',
      },
    });
    const result = await apiGetLoans(1, '123');

    expect(bankingClient.get).toHaveBeenCalledWith(`/loans/1`, {
      headers: { authorization: '123' },
      withCredentials: true,
    });
    expect(result.status).toBe(200);
    expect(result.payload).toStrictEqual({
      userId: 1,
      loanID: 1,
      reason: 'test reason',
      initialAmount: 213,
      balance: 123,
      creationDate: '2022-12-13T20:10:23.416Z',
      status: 'Approved',
    });
  });

  it('Should return pending loan.', async () => {
    (
      bankingClientMock.get as jest.MockedFunction<typeof bankingClient.get>
    ).mockResolvedValue({
      status: 200,
      headers: { authorization: '123' },
      data: {
        userId: 1,
        loanID: 1,
        reason: 'test reason',
        initialAmount: 213,
        balance: 123,
        creationDate: '2022-12-13T20:10:23.416Z',
        status: 'Pending',
      },
    });

    const result = await apiGetPendingLoans('Admin', '123');

    expect(bankingClient.get).toHaveBeenCalledWith('/loans/pending-loans', {
      headers: { authorization: '123' },
      withCredentials: true,
    });
    expect(result.status).toBe(200);
    expect(result.payload).toStrictEqual({
      userId: 1,
      loanID: 1,
      reason: 'test reason',
      initialAmount: 213,
      balance: 123,
      creationDate: '2022-12-13T20:10:23.416Z',
      status: 'Pending',
    });
  });

  it('Should change the status of a pending loan', async () => {
    const loanDetails: LoanDetails = {
      userId: 1,
      loanID: 1,
      reason: 'test reason',
      initialAmount: 213,
      balance: 123,
      creationDate: '2022-12-13T20:10:23.416Z',
      status: 'Pending',
    };
    (
      bankingClientMock.put as jest.MockedFunction<typeof bankingClient.put>
    ).mockResolvedValue({
      status: 200,
      data: {
        userId: 1,
        loanID: 1,
        reason: 'test reason',
        initialAmount: 213,
        balance: 123,
        creationDate: '2022-12-13T20:10:23.416Z',
        status: 'Approved',
      },
      headers: { authorization: '123' },
      withCredentials: true,
    });

    const result = await apiChangeStatus(loanDetails, '123');

    expect(result.status).toBe(200);
    expect(bankingClient.put).toHaveBeenCalledWith('/loans/pending-loans',
    {...loanDetails},
    {
      headers: { 'authorization': '123' }, //check if this is an ADMIN type
      withCredentials: true,
    });
    expect(result.payload).toStrictEqual({
      userId: 1,
      loanID: 1,
      reason: 'test reason',
      initialAmount: 213,
      balance: 123,
      creationDate: '2022-12-13T20:10:23.416Z',
      status: 'Approved',
    });
  });
});
