export interface FetchError {
  message: string;
}

export interface Category {
  slug: string;
  name: string;
  url: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
}

export interface ChartProps {
  categories: Category[];
  products: Product[];
  category: string;
}

export interface FilterProps {
  categories: Category[];
  products: Product[];
  selectedCategory: string;
  selectedProductTitles: string[];
  enableRunButton: boolean;
  onCategorySelect: (category: string) => void;
  onProductsSelect: (products: string[]) => void;
  onRunReport: () => void;
  onClearFilter: () => void;
}
