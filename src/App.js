import { useEffect, useState } from "react";
import useFetch from "./helpers/useFetch";
import SideBar from "./components/SideBar";
import HomePage from "./components/HomePage";
import { Route, Routes } from "react-router-dom";
import Products from "./components/Products";
import OrdersPage from "./components/OrdersPage";

export default function App() {
  const [orders, setOrders] = useState(null);
  const [users, setUsers] = useState(null);
  const [products, setProducts] = useState(null);

  const orderData = useFetch("https://assessment.api.vweb.app/orders");
  const productsData = useFetch("https://assessment.api.vweb.app/products");
  const userData = useFetch("https://assessment.api.vweb.app/users");

  // Return productname wrt product_id
  function findProductNameAndPrice(product_id) {
    const name = products[product_id].name;
    const selling_price = products[product_id].selling_price;
    return { name, selling_price };
  }

  // Return username wrt user_id
  function findUserName(user_id) {
    return users[user_id];
  }

  // Product data is stored as product_id:key details:value
  // details = { name, stock, selling_price }
  useEffect(() => {
    if (productsData.data) {
      const products_data = productsData.data;
      const products_object = {};
      for (let i = 0; i < products_data.length; i++) {
        const details = {
          name: products_data[i].name,
          stock: products_data[i].stock,
          selling_price: products_data[i].selling_price,
        };
        products_object[products_data[i].product_id] = details;
      }
      setProducts(products_object);
    }
  }, [productsData.data, productsData.loading]);

  // Userdata is stored in an Object as user_id:key and user_name:value to have fast retrival
  useEffect(() => {
    if (userData.data) {
      const user_data = userData.data;
      const user_object = {};
      for (let i = 0; i < user_data.length; i++) {
        user_object[user_data[i].user_id] = user_data[i].name;
      }
      setUsers(user_object);
    }
  }, [userData.data, userData.loading]);

  // data cleanup when productsData and userData is available
  useEffect(() => {
    if (orderData.data && users && products) {
      let data = orderData.data;
      for (let i = 0; i < data.length; i++) {
        data[i]["product_name"] = findProductNameAndPrice(
          data[i]["product_id"]
        ).name;
        data[i]["user_name"] = findUserName(data[i]["user_id"]);
        data[i]["normal_date"] = new Date(parseInt(data[i].order_date, 10));
        data[i]["sale_amount"] =
          findProductNameAndPrice(data[i]["product_id"]).selling_price *
          data[i].quantity;
      }
      setOrders(data);
    }
  }, [orderData.data, users, products]);

  return (
    <div className="App">
      <div className="flex">
        <SideBar />
        <div className="h-screen flex-1 p-7">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage products={products} users={users} orders={orders} />
              }
            />

            <Route path="/orders" element={<OrdersPage orders={orders} />} />
            <Route
              path="/products"
              element={<Products products={productsData.data} />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}
