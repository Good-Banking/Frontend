import { Account } from "../models/Account";
import { Transaction } from "../models/Transaction";
import { apiCreateAccount, apiGetAccounts, apiGetAllTransactions, apiGetTotalTransactionSize, apiGetTransactions } from "../remote/banking-api/account.api";
import bankingClient from "../remote/banking-api/bankingClient";

jest.mock('../remote/banking-api/bankingClient');
const bankingClientMock = bankingClient as jest.Mocked<typeof bankingClient>;
describe('Account test suite', () => {
 
    it('Create account should return an Account', async () => {
        (bankingClientMock.post as jest.MockedFunction<typeof bankingClient.post>).mockResolvedValue({
            data: {account: Account},
            status: 200
        });
        

        let stubbedAccount : Account = {
            id: 3,
            name: "Checking",
            balance: 1000,
            accountType: "Checking",
            creationDate: undefined
        }
        const result = await apiCreateAccount (stubbedAccount, '3', '123');

        expect(bankingClient.post).toHaveBeenCalledWith(`/account`, 
            stubbedAccount, {
            headers: { 'authorization': '123' }
            });
        expect(result.status).toBe(200);
    });

    it('Get accounts should return an array of Accounts', async () => {
        (bankingClientMock.get as jest.MockedFunction<typeof bankingClient.get>).mockResolvedValue({
            data: {accounts: [] as Account[]},
            status: 200
        });

        const token = 'token';
        const result = await apiGetAccounts (1, token);
        expect(bankingClient.get).toHaveBeenCalledWith('/account/1', {
            headers: { 'authorization': token},
            withCredentials: true
        })
        expect(result.status).toBe(200);
    })

    it('Get transactions should return an array of Transactions', async () => {
        (bankingClientMock.get as jest.MockedFunction<typeof bankingClient.get>).mockResolvedValue({
            data: {transactions: [] as Transaction[]},
            status: 200
        })
        const token = 'token';
        const id = 1;
        const page = 2;
        const result = await apiGetTransactions (id, token, page);
        expect(bankingClient.get).toHaveBeenCalledWith(`/account/${id}/transaction/${page}`, {
            headers: {'authorization': token},
            withCredentials: true
        })
        expect(result.status).toBe(200);
    })

    it('Get all transactions should return an array of Transactions', async () => {
        (bankingClientMock.get as jest.MockedFunction<typeof bankingClient.get>).mockResolvedValue({
            data: {transactions: [] as Transaction[]},
            status: 200
        })
        const token = 'token';
        const id = 1;
        
        const result = await apiGetAllTransactions (id, token, );
        expect(bankingClient.get).toHaveBeenCalledWith(`/account/${id}/transaction`, {
            headers: {'authorization': token},
            withCredentials: true
        })
        expect(result.status).toBe(200);
    })

    it('Get total transaction size should return the amount of transactons', async () => {
        (bankingClientMock.get as jest.MockedFunction<typeof bankingClient.get>).mockResolvedValue({
            data: {num: Number},
            status: 200
        })
        const id = 1;
        const result = await apiGetTotalTransactionSize (id);
        expect(bankingClient.get).toHaveBeenCalledWith(`/account/${id}/transactions`,
        {withCredentials: true});
        expect(result.status).toBe(200);
    })

})