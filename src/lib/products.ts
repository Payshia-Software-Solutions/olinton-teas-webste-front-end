
export type ProductImage = {
  id: string;
  product_id: string;
  product_variant_id: string;
  company_id: string;
  image_type: string;
  img_url: string;
  created_at: string;
  created_by: string;
};

export type ProductVariant = {
  id: string;
  sku: string;
  product_id: string;
  price: string;
  cost_price: string;
  min_price: string;
  wholesale_price: string;
  color: string;
  size: string;
  created_at: string;
  updated_at: string;
  color_id: string | null;
  size_id: string | null;
  barcode: string;
  company_id: string;
};

export type Product = {
    id: string;
    name: string;
    description: string;
    category: string;
    price: string;
    slug: string;
    product_image_url: string;
    longDescription?: string; // Kept for compatibility with other components that might use it
};

export type ApiProduct = {
  product: Product & {
    tamil_name: string;
    display_name: string;
    cost_price: string;
    min_price: string;
    wholesale_price: string;
    stock_unit: string;
    status: string;
    created_at: string;
    updated_at: string;
    lead_time_days: string;
    reorder_level_qty: string;
    sinhala_name: string;
    print_name: string;
    item_type: string;
    base_location: string;
    recipe_type: string;
    barcode: string;
    available_locations: string;
    category_id: string;
    brand_id: string;
    supplier: string;
    company_id: string;
  };
  product_images: ProductImage[];
  variants: {
    variant: ProductVariant;
    images: ProductImage[];
  }[];
};
