import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ConvertToAmPm from "../helpers/ConverToAmPm";

const OrdersWrtHour = ({ orders }) => {
  const [orderData, setOrderData] = useState(null);
  useEffect(() => {
    if (orders) {
      const orders_wrt_hour = {};
      orders.forEach((element) => {
        const hour = element.normal_date.getHours();
        const number_order = element.quantity;
        orders_wrt_hour[hour] =
          orders_wrt_hour[hour] + number_order || number_order;
      });
      console.log(orders_wrt_hour);
      let orders_data = [];
      for (let i = 0; i < 24; i++) {
        const obj = {
          name: ConvertToAmPm(i),
          orders: orders_wrt_hour[i] || 0,
        };
        orders_data.push(obj);
      }
      setOrderData(orders_data);
    }
  }, [orders]);
  if (orderData) {
    return (
      <BarChart width={730} height={250} data={orderData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="orders" fill="#8884d8" />
      </BarChart>
    );
  }
};

export default OrdersWrtHour;
