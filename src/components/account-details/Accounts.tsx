import { Stack, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setUserAccounts } from '../../features/account/accountSlice';
import { Account } from '../../models/Account';
import { apiGetAccounts } from '../../remote/banking-api/account.api';
import OpenAccount from '../home/OpenAccountForm';
import AccountListItem from './AccountListItem';

export default function Accounts() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checked, setChecked] = useState(false);
  const accounts = useAppSelector((state) => state.account.userAccounts);
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setLoggedIn(true);
      fetchData();
    } else {
      setLoggedIn(false);
      navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, navigate]);

  const fetchData = async () => {
    if (user) {
      let token: string = sessionStorage.getItem('token') || '';
      const result = await apiGetAccounts(user?.id, token);
      dispatch(setUserAccounts(result.payload));
    }
  };

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  if (!loggedIn) return <></>;
  //if logged in and there is an account
  return (
    <>
      <Stack spacing={2} sx={{ alignItems: 'center' }}>
        {(accounts.length > 0) ? (
          <>
            <Typography sx={{ fontSize: 22, color: '#5E548E' }}>
              Accounts:
            </Typography>

            {accounts.map((account: Account) => (
              <AccountListItem key={account.id} account={account} />
            ))}
          </>
        ) : (
          ''
        )}

        <Button
          onClick={() => {
            handleChange();
          }}
          sx={{ margin: '0 auto', display: 'flex' }}
        >
          Open A New Account
        </Button>
        <OpenAccount checked={checked} setChecked={setChecked} />
      </Stack>
    </>
  );
}
