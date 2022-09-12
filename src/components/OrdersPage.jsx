import React, { useEffect } from "react";
import DataTable from "react-data-table-component";

const OrdersPage = ({ orders }) => {
  const columns = [
    {
      name: "Order Id",
      selector: (row) => row.order_id,
      sortable: true,
    },
    {
      name: "Customer Name",
      selector: (row) => row.user_name,
      sortable: true,
    },
    {
      name: "Product Name",
      selector: (row) => row.product_name,
      sortable: true,
    },
    {
      name: "Quantity Ordered",
      selector: (row) => row.quantity,
      sortable: true,
    },

    {
      name: "Order Value",
      selector: (row) => row.sale_amount,
      sortable: true,
    },
  ];
  useEffect(() => {
    console.log(orders);
  });
  if (orders) {
    return (
      <>
        <h1 className="text-center text-4xl font-bold">Orders</h1>
        <DataTable columns={columns} data={orders} fixedHeader={true} fixedHeaderScrollHeight={"100%"} responsive={true}/>
      </>
    );
  }
  return <div>OrdersPage</div>;
};

export default OrdersPage;
