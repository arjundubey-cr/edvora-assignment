import React from "react";
import { useEffect, useState } from "react";
import { ResponsiveContainer } from "recharts";
import useFetch from "../helpers/useFetch";
import SalesWrtHour from "./SalesWrtHour";
import OrdersWrtHour from "./OrdersWrtHour";
import OverviewCards from "./OverviewCards/OverviewCards";

const HomePage = ({ products, users, orders }) => {
  return (
    <div className="grid grid-rows-5 gap-2 h-screen">
      <div>
        <OverviewCards products={products} users={users} orders={orders} />
      </div>
      <div className="row-span-2">
        <OrdersWrtHour orders={orders} />
      </div>
      <div className="row-span-2">
        <SalesWrtHour orders={orders} />
      </div>
    </div>
  );
};

export default HomePage;
