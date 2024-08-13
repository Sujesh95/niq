import styled from "styled-components";
import { Box, styled as muiStyled } from "@mui/material";

export const StyledMainHeader = styled.h1`
  text-align: center;
`;

export const StyledContainer = styled.div`
  margin: 2rem;
  display: flex;
  gap: 1rem;
`;

export const StyledChartWrapper = styled.div`
  align-self: center;
  flex-grow: 1;
`;

export const StyledFlex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const StyledFilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid black;
  width: 15rem;
  height: 80vh;
  padding: 1rem;
  gap: 1.5rem;
  flex-shrink: 0;
`;

export const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StyledLoader = muiStyled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
`;
