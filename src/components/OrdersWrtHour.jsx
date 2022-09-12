import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Label,
} from "recharts";
import ConvertToAmPm from "../helpers/ConverToAmPm";

const OrdersWrtHour = ({ orders }) => {
  const [orderData, setOrderData] = useState(null);
  const [totalOrders, setTotalOrders] = useState(0);
  useEffect(() => {
    if (orders) {
      const orders_wrt_hour = {};
      let order_total = 0;
      orders.forEach((element) => {
        const hour = element.normal_date.getHours();
        const number_order = element.quantity;
        order_total = order_total + element.quantity;
        orders_wrt_hour[hour] =
          orders_wrt_hour[hour] + number_order || number_order;
      });
      setTotalOrders(order_total);
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
      <div className="mt-2 py-2 grid grid-cols-12 h-full p-3 border border-gray-100 shadow-xl rounded-xl">
        <div className="col-span-12 md:col-span-8 xl:col-span-10">
          <ResponsiveContainer width="95%" height="95%">
            <BarChart
              data={orderData}
              margin={{
                top: 10,
                right: 30,
                left: 20,
                bottom: 10,
              }}>
              <CartesianGrid strokeDasharray="3" vertical={false} />
              <XAxis dataKey="name">
                <Label
                  value="Time of Order"
                  offset={-5}
                  position="insideBottom"
                />
              </XAxis>
              <YAxis>
                <Label
                  value="Order Amount"
                  offset={5}
                  position="insideLeft"
                  angle={-90}
                />
              </YAxis>
              <Tooltip />
              <Legend verticalAlign="top" iconSize={16} />
              <Bar dataKey="orders" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="col-span-2 flex items-center justify-center flex-col">
          <div className="">Total Orders</div>
          <div className="text-purple-700 text-2xl xl:text-5xl font-medium">
            {totalOrders}
          </div>
        </div>
      </div>
    );
  }
};

export default OrdersWrtHour;
