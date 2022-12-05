import { Box, Button, InputAdornment } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { Transaction } from '../../models/Transaction';
import { apiTransferTransaction } from '../../remote/banking-api/account.api';

export default function TransferMoney() {
  const currentAccount = useAppSelector(
    (state) => state.account.currentAccount
  );
  const user = useAppSelector((state) => state.user.user);
  const accounts = useAppSelector((state) => state.account.userAccounts);

  console.log('account', currentAccount);
  console.log('userAccounts', accounts);

  console.log('user', user);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const update = new FormData(event.currentTarget);
    let transfer = new Transaction(
      currentAccount.id,
      parseFloat(update.get('amount')?.toString() || '0'),
      update.get('description')?.toString() || '',
      update.get('type')?.toString() || 'Transfer',
      Number(update.get('toAccount') || 0)
    );
    await apiTransferTransaction(currentAccount.id, transfer).then(
      (response) => {
        console.log('response', response);
      }
    );
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          id="outlined-select-account"
          label="From"
          value={currentAccount.id}
          helperText="Current Account"
          variant="standard"
          InputProps={{
            readOnly: true,
          }}
        ></TextField>
        {accounts.length > 0 ? (
          <TextField
            required
            id="account"
            name="account"
            label="To"
            fullWidth
            select
            helperText="Select Account"
            variant="standard"
            {...accounts.map(
              ({ accountType, balance, creationDate, id, name }, index) => (
                <MenuItem key={name} value={id}>
                  {index}
                </MenuItem>
              )
            )}
          ></TextField>
        ) : (
          ''
        )}

        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <Input
            required
            id="amount"
            name="amount"
            type="number"
            placeholder="0.00"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
          <InputLabel htmlFor="amount">Amount</InputLabel>
        </FormControl>
        <Button type="submit">Submit</Button>
      </Box>
    </>
  );
}