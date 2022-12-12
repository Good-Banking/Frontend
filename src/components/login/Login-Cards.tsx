import React from 'react';
import Box from '@mui/material/Box';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';

import pig from '../../images/svg/piggy.png';
import home from '../../images/svg/house.png';
import card from '../../images/svg/cards.png';
import { useNavigate } from 'react-router-dom';

export default function LoginBody() {
  const navigate = useNavigate();
  function navigateRegister() {
    navigate('/register');
  }

  const cards = [
    {
      name: 'Loans',
      img: home,
      description: 'Buying a House? We can Help.',
    },
    {
      name: 'Savings',
      img: pig,
      description: 'Take action, saving starts here.',
    },
    {
      name: 'Credit Card',
      img: card,
      description: 'Get the right card for you here.',
    },
  ];
  return (
    <>
      <div className="cards">
        {cards.map((card) => (
          <Box className="flex" key={card.name}>
            <Box>
              <Card>
                <CardActionArea>
                  <img className="center" src={card.img} alt={card.name} />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {card.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {card.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    onClick={navigateRegister}
                    size="small"
                    color="primary"
                  >
                    Sign up today
                  </Button>
                </CardActions>
              </Card>
            </Box>
          </Box>
        ))}
      </div>
    </>
  );
}
