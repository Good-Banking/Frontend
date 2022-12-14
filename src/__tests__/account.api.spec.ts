import { Account } from "../models/Account";
import { Transaction } from "../models/Transaction";
import { Transfer } from "../models/Transfer";
import { apiCreateAccount, apiGetAccounts, apiTransferTransaction, apiUpsertTransaction } from "../remote/banking-api/account.api";
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

    it('upsert transaction should return a transaction (theoretically)', async () => {
        const transaction = {} as Transaction;
        (bankingClientMock.post as jest.MockedFunction<typeof bankingClient.post>).mockResolvedValue({
            data: {transaction: transaction},
            status: 201
        });

        const token = 'token';
        const result = await apiUpsertTransaction (1, transaction, token);
        expect(bankingClient.post).toHaveBeenCalledWith('/account/1/transaction',
        transaction,
        {
            headers: { 'authorization': token},
            withCredentials: true
        });
        expect(result.status).toBe(201);
    })

    it('transfer transaction should return an array of transactions', async () => {

        let transactions = [] as Transaction[]
        for(let i = 0; i < 4; i++){
            transactions.push({id:i, amount: i*300, description: 'description', type: 'INCOME'})
        }
        (bankingClientMock.post as jest.MockedFunction<typeof bankingClient.post>).mockResolvedValue({
            data: {transactions: transactions},
            status: 201
        });
        
        

        const transfer: Transfer = {
            amount: 100,
            account: {} as Account,
            type: 'INCOME',
            toAccountId: 1,
        };
        const response = await apiTransferTransaction (1, transfer);
        expect(bankingClient.post).toHaveBeenCalledWith('/account/1/transfer', 
        transfer,
        {withCredentials: true}
        );
        expect(response.status).toBe(201);
    })

    

})