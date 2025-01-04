import Link from "next/link";

const Home = () => {
  const products = [
    { id: "1", name: "Product 1" },
    { id: "2", name: "Product 2" },
  ];
  return (
    <div>
      <h1>Welcome to Our Store</h1>
      <p>Explore our featured products!</p>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link href={`/products/${product.id}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
