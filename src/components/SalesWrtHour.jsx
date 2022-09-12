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
  Label,
} from "recharts";
import ConvertToAmPm from "../helpers/ConverToAmPm";

const SalesWrtHour = ({ orders }) => {
  const [salesData, setSalesData] = useState(null);
  const [totalSales, setTotalSales] = useState(0);
  useEffect(() => {
    if (orders) {
      const sales_wrt_hour = {};
      let total_sales_amount = 0;
      orders.forEach((element) => {
        const hour = element.normal_date.getHours();
        const salesValue = element.sale_amount;
        total_sales_amount += element.sale_amount;
        sales_wrt_hour[hour] = sales_wrt_hour[hour] + salesValue || salesValue;
      });
      setTotalSales(total_sales_amount);
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
      <div className="mt-2 py-2 grid grid-cols-12 h-full p-3 border border-gray-100 shadow-xl rounded-xl">
        <div className="col-span-12 md:col-span-8 xl:col-span-10">
          <ResponsiveContainer width="95%" height="95%">
            <LineChart
              data={salesData}
              margin={{
                top: 10,
                right: 30,
                left: 20,
                bottom: 10,
              }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name">
                <Label
                  value="Time of Order"
                  offset={-5}
                  position="insideBottom"
                />
              </XAxis>
              <YAxis>
                <Label
                  value="Sales Values"
                  offset={0}
                  position="insideLeft"
                  angle={-90}
                />
              </YAxis>
              <Tooltip />
              <Legend verticalAlign="right" iconSize={16} />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#8884d8"
                activeDot={{ r: 9 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="col-span-2 flex items-center justify-center flex-col">
          <div className="">Total Sales Amount</div>
          <div className="text-purple-700 text-2xl xl:text-5xl font-medium">
            {totalSales}
          </div>
        </div>
      </div>
    );
  }
};

export default SalesWrtHour;
