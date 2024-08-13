import "./App.css";
import Chart from "./components/Chart";
import Filter from "./components/Filter";
import { useMemo, useRef, useState } from "react";
import { Product } from "./types";
import { CircularProgress } from "@mui/material";
import useFetch from "./hooks/useFetch";
import { fetchData } from "./utils";
import { StyledContainer, StyledLoader, StyledMainHeader } from "./styles";

function App() {
  const { value: categories = [] } = useFetch(
    "https://dummyjson.com/products/categories"
  );
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductTitles, setSelectedProductTitles] = useState<string[]>(
    []
  );
  const [mainState, setMainState] = useState<string | undefined>("chart");
  const [enableRunButton, setEnableRunButton] = useState(false);
  const timerId = useRef<number>();

  const resetState = () => {
    setMainState(undefined);
    setEnableRunButton(true);
  };

  const onCategorySelect = async (category: string) => {
    setSelectedCategory(category);
    setSelectedProductTitles([]);
    resetState();

    const url = categories?.find((x) => x.slug === category)?.url;
    if (url) {
      try {
        const data = await fetchData(url);
        setProducts(
          (data.products as Product[]).map(({ id, title, price }) => ({
            id,
            title,
            price,
          }))
        );
      } catch {
        //do nothing
      }
    }
  };

  const onProductSelect = (products: string[]) => {
    resetState();
    setSelectedProductTitles(products);
  };

  const onRunReport = () => {
    setMainState("loading");
    setEnableRunButton(false);
    timerId.current = setTimeout(() => {
      clearTimeout(timerId.current);
      timerId.current = undefined;
      setMainState("chart");
    }, 3000);
  };

  const onClearFilter = () => {
    setSelectedCategory("");
    setSelectedProductTitles([]);
    setMainState("chart");
  };

  const filteredProducts = useMemo(() => {
    return selectedProductTitles.length > 0
      ? products.filter((x) => selectedProductTitles.includes(x.title))
      : products;
  }, [selectedProductTitles, products]);

  return (
    <>
      <StyledMainHeader> Products dashboard </StyledMainHeader>
      <StyledContainer>
        <Filter
          categories={categories}
          products={products}
          selectedCategory={selectedCategory}
          selectedProductTitles={selectedProductTitles}
          enableRunButton={enableRunButton}
          onProductsSelect={onProductSelect}
          onCategorySelect={onCategorySelect}
          onRunReport={onRunReport}
          onClearFilter={onClearFilter}
        />
        {mainState === "loading" && (
          <StyledLoader>
            <CircularProgress />
          </StyledLoader>
        )}
        {mainState === "chart" && (
          <Chart
            products={filteredProducts}
            categories={categories}
            category={selectedCategory}
          />
        )}
      </StyledContainer>
    </>
  );
}

export default App;
