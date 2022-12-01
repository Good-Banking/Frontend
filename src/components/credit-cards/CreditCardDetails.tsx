import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { CreditCard } from "../../models/CreditCard";
import { apiGetCreditCards } from "../../remote/banking-api/creditcard.api";
import SideBar from "../account-details/SideBar";
import Navbar from "../navbar/Navbar";


export default function CreditDetails() {
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.user.user);
    const [creditCard, setCreditCard] = useState<CreditCard[]>([]);
    const currentCreditCard = useAppSelector((state) => state.creditCard.currentCreditCard);

    useEffect(() => {
        if (!user) {
          navigate('/');
        }
        const fetchData = async () => {
          if (user) {
            // const resultAcct = await apiGetAccounts(user.id);
            // setAccount(resultAcct.payload);
            const result = await apiGetCreditCards(currentCreditCard?.id);
            setCreditCard(result.payload.reverse());
          }
        };
        fetchData();
      }, [user, navigate]);

      let outstandingBalance = {}

      return (
        <>
            <Navbar />
            <div className={'top-container'}>
            <SideBar />
            <div className="account-wrap">
                <div className="account-details">
                    <h2>{currentCreditCard.cardNumber}</h2>
                    <h1>{currentCreditCard.}</h1>
                    <Button
                    onClick={() => {
                        navigate('/');
                    }}
                    >
                    Go Back
                    </Button>
                </div>
            </div>
            </div>
        </>
      )

}