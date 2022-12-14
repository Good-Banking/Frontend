import { CreditCard } from "../models/CreditCard";
import { CreditCardTransaction } from "../models/CreditCardTransaction";
import bankingClient from "../remote/banking-api/bankingClient";
import { apiCreateCCApplication, apiGetCreditCards, apiGetCreditCardTransactions, apiGetPendingCreditCards, apiUpdateCreditCardStatus } from "../remote/banking-api/creditcard.api";
import { apiUpdate } from "../remote/banking-api/update.api";

jest.mock('../remote/banking-api/bankingClient');
const bankingClientMock = bankingClient as jest.Mocked<typeof bankingClient>;
describe('Credit Card Api test suite', () => {

    it('should return credit cards from user id', async () => {

        (bankingClientMock.get as jest.MockedFunction<typeof bankingClient.get>).mockResolvedValue({
            data: {id: 1},
            status: 200
        });

        const result = await apiGetCreditCards(1, "testtoken43u924");

        expect(bankingClient.get).toHaveBeenCalledWith(
            '/credit-card/1',
            {
                headers: { 'authorization': "testtoken43u924"},
                withCredentials: true
            }
        );
        expect(result.status).toBe(200);
    });

    it('should return pending credit cards', async () => {
        (bankingClientMock.get as jest.MockedFunction<typeof bankingClient.get>).mockResolvedValue({
            status: 201
        });

        const result = await apiGetPendingCreditCards("testtoken242ha");

        expect(bankingClient.get).toHaveBeenCalledWith(
            '/credit-card/get-pending',
            {
                headers: { 'authorization': "testtoken242ha"},
                withCredentials: true
            }
        );
        expect(result.status).toBe(201);
    });

    it('create CC application should return a credit card', async () => {
        (bankingClientMock.post as jest.MockedFunction<typeof bankingClient.post>).mockResolvedValue({
            data: {creditCard: CreditCard },
            status: 200
        });

        const result = await apiCreateCCApplication(3, '123');

        expect(bankingClient.post).toHaveBeenCalledWith(
            `/credit-card/credit-card-application`,
            { initialAmount: 3},
            {
                headers: { 'authorization': '123' },
                withCredentials: true
            }
        )
        expect(result.status).toBe(200);
    });
//care ian ^
    it('update credit card status should return a credit card', async () => {
        (bankingClientMock.put as jest.MockedFunction<typeof bankingClientMock.put>).mockResolvedValue({
            data: {creditCard: CreditCard},
            status: 200
        });

        const result = await apiUpdateCreditCardStatus('Approved', 3, '123');

        expect(bankingClient.put).toHaveBeenCalledWith(
        `/credit-card/update-status`, 
        {id: 3, status: 'Approved'},
    {
        headers: { 'authorization': '123' },
        withCredentials: true,
    }
        )
        expect(result.status).toEqual(200);
    });

    it('getCCTransactions should return cc transactions', async () => {
        (bankingClientMock.get as jest.MockedFunction<typeof bankingClientMock.get>).mockResolvedValue({
            data: {
                id: 1,
                amount: 2,
                description: 'fun',
                type: 'funny',
                creditCardId: 1234123412341234,
                accountId: 324
            },
            status: 200
        });

        const result = await apiGetCreditCardTransactions('123', 1);

        expect(bankingClient.get).toHaveBeenCalledWith(
            `/credit-card/1/transactions`,
            {
                headers: { 'authorization': '123' },
                withCredentials: true
            }
        )
        expect(result.status).toEqual(200);
});



})