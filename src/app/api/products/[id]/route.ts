import { NextResponse } from "next/server";

const products = [
  {
    id: "1",
    name: "Smartphone",
    price: 699,
    category: "Electronics",
    image:
      "https://www.stonegroup.co.uk/media/catalog/product/cache/2fa910946d31dd7ab8a5af6d2923c685/4/7/47453401-FF25-455D-82CB-8ED782D10335.jpg",
    description: "Description for Product 1",
  },
  {
    id: "2",
    name: "Novel",
    price: 15,
    category: "Books",
    image:
      "https://images-platform.99static.com//s7Ji7R7kzTssXRormmlrewsCA-U=/410x142:1340x1073/fit-in/500x500/99designs-contests-attachments/122/122531/attachment_122531218",
    description: "Description for Product 2",
  },
  {
    id:"3",
    name: "Jacket",
    price: 89,
    category: "Clothing",
    image:
      "https://static.vecteezy.com/system/resources/previews/050/511/812/non_2x/army-green-mens-denim-jacket-button-up-collar-and-long-sleeves-for-a-trendy-slim-fit-look-png.png",
    description: "Description for Product 3",
  },
  {
    id: "4",
    name: "Wireless Headphones",
    price: 199,
    category: "Electronics",
    image:
      "https://www.gamemaster.pk/wp-content/uploads/2024/04/p47-wireless-bluetooth-stereo-headphones-1.png",
    description: "Description for Product 4",
  },
  {
    id: "5",
    name: "Cooking Pan",
    price: 29,
    category: "Home Appliances",
    image:
      "https://img.freepik.com/free-vector/metal-black-nonstick-frying-pans-top-view_107791-1623.jpg",
    description: "Description for Product 5",
  },
  {
    id: "6",
    name: "Gaming Laptop",
    price: 1200,
    category: "Electronics",
    image:
      "https://globaliraq.net/cdn/shop/files/6_f59d1df1-630d-40c5-9322-e0b07c59f39d_2048x.png?v=1725532422",
    description: "Description for Product 6",
  },
  {
    id: "7",
    name: "Fiction Book",
    price: 20,
    category: "Books",
    image:
      "https://marloesdevries.com/wp-content/uploads/2022/05/greatescapewoodlandsnursinghome.jpg",
    description: "Description for Product 7",
  },
  {
    id: "8",
    name: "Winter Coat",
    price: 150,
    category: "Clothing",
    image:
      "https://i5.walmartimages.com/seo/Levmjia-Men-s-Puffer-Jacket-Hooded-Winter-Coat-Clearance-Men-s-Stand-up-Collar-Winter-Casual-Padded-Cotton-Jacket_194c47ab-549b-424d-bcd5-94de3010485d.d7bb5f861507c4ddd9ec8fb975c1080c.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
    description: "Description for Product 8",
  },
  {
    id: "9",
    name: "Vacuum Cleaner",
    price: 99,
    category: "Home Appliances",
    image: "https://cleaningproductstore.com/images/products/mc520.jpg",
    description: "Description for Product 9",
  },
  {
    id: "10",
    name: "Bluetooth Speaker",
    price: 49,
    category: "Electronics",
    image:
      "https://www.shutterstock.com/image-photo/black-wireless-portable-bluetooth-speaker-600nw-1545279014.jpg",
    description: "Description for Product 10",
  },
  {
    id: "11",
    name: "Coffee Maker",
    price: 79,
    category: "Home Appliances",
    image:
      "https://media.istockphoto.com/id/120874807/photo/modern-coffee-machine-isolated-on-white-background-with-clipping-path.jpg?s=612x612&w=0&k=20&c=_X3cdr1N5Cb8VjN_44v1i6ylbgUyjiiyR1Eqa7GDkjA=",
    description: "Description for Product 11",
  },
  {
    id: "12",
    name: "Sports Shoes",
    price: 59,
    category: "Clothing",
    image:
      "https://i5.walmartimages.com/asr/e4898cf3-731e-44aa-a69c-f09f65510708.f98397f328ea1dcbff50f7bb75017b36.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
    description: "Description for Product 12",
  },
];


export async function GET(
    req: Request,
    { params }: { params: { id?: string } }
  ) {
    if (params.id) {
      const product = products.find((p) => p.id === params.id);
  
      if (product) {
        return NextResponse.json(product);
      } else {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
      }
    }
    return NextResponse.json(products);
  }
