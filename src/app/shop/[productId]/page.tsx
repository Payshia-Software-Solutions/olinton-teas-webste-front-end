
import { type ApiProduct } from '@/lib/products';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ProductDetailsClient from './product-details-client';

type Props = {
  params: { productId: string };
};

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

async function getProducts(): Promise<ApiProduct[]> {
    try {
        const companyId = process.env.NEXT_PUBLIC_COMPANY_ID || 15;
        if (!serverUrl) {
            console.error("Server URL is not defined in environment variables.");
            return [];
        }
        const res = await fetch(`${serverUrl}/products/with-variants/by-company?company_id=${companyId}`);
        const data = await res.json();
        if (data && Array.isArray(data.products)) {
            return data.products;
        }
        return [];
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const products = await getProducts();
  const product = products.find((p: ApiProduct) => p.product.id === params.productId);
  
  if (!product) {
    return {
      title: 'Product not found',
    }
  }
 
  return {
    title: product.product.name,
  }
}

export default async function ProductPage({ params }: Props) {
    const { productId } = params;
    const allProducts = await getProducts();
    const product = allProducts.find(p => p.product.id === productId);

    if (!product) {
        notFound();
    }
    
    return <ProductDetailsClient product={product} allProducts={allProducts} />;
}
