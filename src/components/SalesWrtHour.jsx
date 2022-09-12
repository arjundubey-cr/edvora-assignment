import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import ConvertToAmPm from "../helpers/ConverToAmPm";

const SalesWrtHour = ({ orders }) => {
  const [salesData, setSalesData] = useState(null);

  useEffect(() => {
    if (orders) {
      const sales_wrt_hour = {};
      orders.forEach((element) => {
        const hour = element.normal_date.getHours();
        const salesValue = element.sale_amount;
        sales_wrt_hour[hour] = sales_wrt_hour[hour] + salesValue || salesValue;
      });
      let sales_data = [];
      for (let i = 0; i < 24; i++) {
        const obj = {
          name: ConvertToAmPm(i),
          sales: sales_wrt_hour[i] || 0,
        };
        sales_data.push(obj);
      }
      console.log(sales_data);
      setSalesData(sales_data);
    }
  }, [orders]);

  if (salesData) {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={salesData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }
};

export default SalesWrtHour;
