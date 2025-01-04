"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const Home = () => {
  interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    image: string;
    description: string;
  }

  const [products, setProducts] = useState<Product[]>([]); // Filtered products to display
  const [allProducts, setAllProducts] = useState<Product[]>([]); // All products fetched
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Fetch products on initial load
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/products/0");
        const data = await response.json();

        if (response.ok) {
          setProducts(data);
          setAllProducts(data); // Store all products for filtering
        } else {
          console.error("Error fetching products:", data.error);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Handle search input change
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  // Handle category filter selection
  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
  };

  // Filter products based on search and category selection
  const filteredProducts = allProducts
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm)
    )
    .filter((product) =>
      selectedCategory === "All" ? true : product.category === selectedCategory
    );

  // Extract unique categories from products
  const categories = [
    "All",
    ...new Set(allProducts.map((product) => product.category)),
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-indigo-600 leading-tight">
          Welcome to Our Store
        </h1>
        <p className="text-xl text-gray-600 mt-4 mb-8">
          Explore our featured products and find the best deals!
        </p>

        {/* Category filter buttons */}
        <div className="flex justify-center space-x-6 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryFilter(category)}
              className={`px-6 py-2 rounded-full transition duration-300 ${
                selectedCategory === category
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative mt-8 max-w-3xl mx-auto">
          <input
            type="text"
            placeholder="Search products..."
            onChange={handleSearch}
            className="w-full p-4 pl-12 rounded-full border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="absolute left-4 top-3 text-gray-400">
            <i className="fas fa-search"></i>
          </div>
        </div>
      </header>

      {/* Display filtered products */}
      <section>
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105"
              >
                <Link href={`/products/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover rounded-t-xl"
                  />
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold text-gray-800 hover:text-indigo-600 transition-colors duration-200">
                      {product.name}
                    </h3>
                    <p className="text-lg text-gray-500 mt-3 truncate">
                      {product.description}
                    </p>
                    <p className="text-xl font-bold text-indigo-600 mt-4">
                      ${product.price}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No products found</p>
        )}
      </section>
    </div>
  );
};

export default Home;
