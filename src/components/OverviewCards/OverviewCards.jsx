import Card from "./Card/Card";

const OverviewCards = ({ products, users, orders }) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      <Card data={Object.keys(products).length} heading="Total Products"/>
      <Card data={Object.keys(users).length} heading="Total Users"/>
      <Card data={orders.length} heading="Total Orders"/>
    </div>
  );
};

export default OverviewCards;
