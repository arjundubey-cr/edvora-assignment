import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
const Products = ({ products }) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    console.log(products);
    if (products) {
      setData(products);
    }
  }, [products]);
  const columns = [
    {
      name: "Product Id",
      selector: (row) => row.product_id,
      sortable: true,
    },
    {
      name: "Product Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Selling Price",
      selector: (row) => row.selling_price,
      sortable: true,
    },
    {
      name: "Stock",
      selector: (row) => row.stock,
      sortable: true,
    },
  ];
  const conditionalRowStyles = [
    {
      when: (row) => row.stock < 10,
      style: {
        backgroundColor: "rgb(252 165 165)",
      },
    },
  ];
  if (data) {
    return (
      <>
        <h1 className="text-center text-4xl font-bold">List of Products</h1>
        <h2>Products having low stock are highlighed.</h2>
        <DataTable
          fixedHeader={true}
          fixedHeaderScrollHeight={"100%"}
          columns={columns}
          data={data}
          conditionalRowStyles={conditionalRowStyles}
        />
      </>
    );
  }
};

export default Products;
