"use client";
import React, { useEffect, useState } from 'react';
import { Badge } from "@/components/ui/badge"
import {useUser} from "@clerk/clerk-react";
import axios from 'axios';

const StockHolding = ({  influencerId }) => {

  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    // Handle loading state however you like
    return null;
  }

  const [stockHolding, setStockHolding] = useState(null);
  console.log("influencerId", influencerId)
  console.log("userId", user.id)

  useEffect(() => {
    const fetchStockHolding = async () => {
      try {
        const response = await axios.get(`/api/creator/${influencerId}`);
        setStockHolding(response.data);
      } catch (error) {
        console.error('Failed to fetch stock holding:', error);
      }
    };

    fetchStockHolding();
  }, []);

  if (!stockHolding) {
    return <div>Loading...</div>;
  }

  return (
    <Badge>
        Current Holding : {stockHolding}
    </Badge>
  );
};

export default StockHolding;