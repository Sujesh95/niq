import { FC } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Button,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { FilterProps } from "../types";
import { StyledFilterContainer, StyledFlex, StyledHeader } from "../styles";

const Filter: FC<FilterProps> = ({
  categories,
  products,
  selectedCategory,
  selectedProductTitles,
  enableRunButton,
  onCategorySelect,
  onProductsSelect,
  onRunReport,
  onClearFilter,
}) => {
  const handleProductsChange = (e: SelectChangeEvent<string[]>) => {
    const value = e.target.value;
    onProductsSelect(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <StyledFilterContainer>
      <StyledFlex>
        <StyledHeader>
          <h3>Filters</h3>
          <Button variant="text" onClick={onClearFilter}>
            Clear
          </Button>
        </StyledHeader>
        <StyledFlex>
          <FormControl>
            <InputLabel id="select-category">Select category</InputLabel>
            <Select
              labelId="select-category"
              value={selectedCategory}
              onChange={(e) => onCategorySelect(e.target.value)}
            >
              {categories?.map((x) => {
                return (
                  <MenuItem key={x.slug} value={x.slug}>
                    {x.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="select-products">Select products</InputLabel>
            <Select
              labelId="select-products"
              multiple
              value={selectedProductTitles}
              onChange={handleProductsChange}
              renderValue={(selected) => selected.join(", ")}
              disabled={!selectedCategory}
            >
              {products?.map((x) => {
                return (
                  <MenuItem key={x.id} value={x.title}>
                    <Checkbox
                      checked={selectedProductTitles.indexOf(x.title) > -1}
                    />
                    <ListItemText primary={x.title} />
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </StyledFlex>
      </StyledFlex>

      <StyledFlex>
        <Button
          variant="contained"
          disabled={!enableRunButton}
          onClick={onRunReport}
        >
          Run report
        </Button>
      </StyledFlex>
    </StyledFilterContainer>
  );
};

export default Filter;
