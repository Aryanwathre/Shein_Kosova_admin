type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
};

let products: Product[] = [];

let markupPercentage = 0;

export const db = {
  getProducts: () => products,
  addProduct: (product: Product) => {
    const markedPrice = product.price + (product.price * markupPercentage) / 100;
    const newProduct = { ...product, price: markedPrice };
    products.push(newProduct);
    return newProduct;
  },
  updateProduct: (id: string, updated: Partial<Product>) => {
    const index = products.findIndex(p => p.id === id);
    if (index === -1) throw new Error("Product not found");
    products[index] = { ...products[index], ...updated };
    return products[index];
  },
  deleteProduct: (id: string) => {
    products = products.filter(p => p.id !== id);
  },
  setMarkup: (percent: number) => (markupPercentage = percent),
  getMarkup: () => markupPercentage,
};
