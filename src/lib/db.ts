export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  size_pricing?: { Small: number, Medium: number, Large: number };
  product_collections?: any[];
}

export interface OrderItem {
  productId: string;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  email: string;
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
  date: string;
  items: OrderItem[];
  trackingNumber: string | null;
}

export interface Database {
  products: Product[];
  orders: Order[];
}
