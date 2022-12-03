import * as React from 'react';
import Button from '@mui/material/Button';
import { apiCreateAccount } from '../../remote/banking-api/account.api';
import { Account } from '../../models/Account';
import Paper from '@mui/material/Paper';
import { Input, InputLabel } from '@mui/material';
import Slide from '@mui/material/Slide';
import { useAppSelector } from '../../app/hooks';

export default function OpenAccount(prop: { checked: boolean }) {
  const user = useAppSelector((state) => state.user.user);

  const currentDate = new Date();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (user) {
      event.preventDefault();
      const result = new FormData(event.currentTarget);
      apiCreateAccount(
        new Account(
          0,
          result.get('name')?.toString() || '',
          Number(result.get('balance')) || 0,
          result.get('type')?.toString() || 'CHECKING',
          currentDate.toISOString()
        ),
        user.id.toString()
      );
    }
  };

  return (
    <Slide direction="up" in={prop.checked} mountOnEnter unmountOnExit>
      <Paper
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ maxWidth: 1, p: 2, mt: 1 }}
      >
        <InputLabel htmlFor="name">Name</InputLabel>
        <Input id="name" fullWidth required name="name" type="text" />

        <InputLabel htmlFor="name">Account Type</InputLabel>
        <Input id="type" fullWidth required name="type" type="text" />

        <InputLabel htmlFor="name">Balance</InputLabel>
        <Input id="balance" fullWidth required name="balance" type="text" />
        <Button type="submit">Submit</Button>
      </Paper>
    </Slide>
  );
}
