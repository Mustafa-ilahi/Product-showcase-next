import Link from "next/link";
import { notFound } from "next/navigation";

type ProductPageProps = {
  params: { id: string };
};

async function getProduct(id: string) {
  const res = await fetch(`http://localhost:3000/api/products/${id}`);
  if (!res.ok) {
    return null;
  }
  return res.json();
}

export async function generateMetadata({ params }: ProductPageProps) {
  const product = await getProduct(params.id);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The product you are looking for does not exist.",
    };
  }

  return {
    title: `${product.name} - Our Store`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      url: `http://localhost:3000/products/${params.id}`,
      images: [
        {
          url: product.image || "/default-product.jpg", // Use a default image if not available
          alt: product.name,
        },
      ],
    },
  };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="flex justify-center items-start py-48">
      <div className="max-w-4xl w-full p-6 bg-white rounded-lg shadow-lg">
        <div className="mb-6">
          <Link href={"/"}>
          <button className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-indigo-600 hover:text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          Back to Home
            </button>
          </Link>
        </div>
        <h2 className="text-4xl font-semibold text-gray-800 text-center mb-6">
          Product Detail
        </h2>
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-cover rounded-lg shadow-md"
            />
          </div>
          <div className="lg:ml-8 mt-4 lg:mt-0 text-center lg:text-left">
            <h1 className="text-3xl font-semibold text-gray-800">
              {product.name}
            </h1>
            <p className="text-lg text-gray-600 mt-2">{product.category}</p>
            <p className="text-2xl font-bold text-indigo-600 mt-4">
              ${product.price}
            </p>
            <p className="text-base text-gray-700 mt-6">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
