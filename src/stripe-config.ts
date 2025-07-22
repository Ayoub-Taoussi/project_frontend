export interface Product {
  id: string;
  priceId: string;
  name: string;
  description: string;
  mode: 'subscription' | 'payment';
  price: number;
  currency: string;
  interval?: 'month' | 'year';
}

export const products: Product[] = [
  {
    id: 'prod_SYIHnnY2bzL6rt',
    priceId: 'price_1RdBgt08DTKTigBILvS2qp0D',
    name: 'Starter',
    description: 'Perfect for small businesses getting started with review management',
    mode: 'subscription',
    price: 79,
    currency: 'usd',
    interval: 'month'
  },
  {
    id: 'prod_SYIIhjm5nbuxjV',
    priceId: 'price_1RdBhb08DTKTigBID2XBJCPH',
    name: 'Boost',
    description: 'Most popular plan for growing businesses with advanced features',
    mode: 'subscription',
    price: 119,
    currency: 'usd',
    interval: 'month'
  },
  {
    id: 'prod_SYIITuFoLhd37S',
    priceId: 'price_1RdBiD08DTKTigBIynIPIVMP',
    name: 'Pro',
    description: 'Enterprise-grade solution with unlimited features and priority support',
    mode: 'subscription',
    price: 159,
    currency: 'usd',
    interval: 'month'
  }
];

export function getProductByPriceId(priceId: string): Product | undefined {
  return products.find(product => product.priceId === priceId);
}

export function getProductByName(name: string): Product | undefined {
  return products.find(product => product.name.toLowerCase() === name.toLowerCase());
}