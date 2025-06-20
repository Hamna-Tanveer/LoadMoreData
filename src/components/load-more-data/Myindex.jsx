import { useState } from "react";
import "./Styles.css";
import { useEffect } from "react";
export default function MyLoadMoreData() {
  const [loading, setloading] = useState(false);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [errorMsg, setErrMsg] = useState(null);

  // onClick ()=>{handleLoadMoreData}
  const handleLoadMoreData = () => {
    setCount((prevCount) => prevCount + 1);
    if (count == 100) {
      Alert.alert("You have Load all Products");
    }
    if (count < 100) {
      fetchProducts(count * 20);
    }
  };
  // MyApproach less optimized
  async function fetchProducts(skip) {
    try {
      setloading(true);
      const response = await fetch(
        `https://dummyjson.com/products?limit=20&skip=${count == 0 ? 0 : skip}`
      );
      const data = await response.json();
      if (data && data.products && data.products.length) {
        //setProducts(data.products); only set current 20 products
        setProducts((prevProducts) => [...prevProducts, ...data.products]);
        setloading(false);
      }
    } catch (e) {
      setErrMsg(e);
      setloading(false);
    }
  }
  useEffect(() => {
    fetchProducts(0);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (errorMsg !== null) {
    return <div>Error Occured! : {errorMsg}</div>;
  }
  console.log(products);
  return (
    <div className="container">
      <div className="product-container">
        {products && products.length
          ? products.map((items) => (
              <div className="product" key={items.id}>
                <img src={items.thumbnail} alt={items.title} />
                <p>{items.title}</p>
                <p>{items.description}</p>
              </div>
            ))
          : null}
      </div>
      <div className="button-container">
        <button onClick={handleLoadMoreData}>Load More Products</button>
      </div>
    </div>
  );
}
