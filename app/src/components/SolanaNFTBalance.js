import styled from "styled-components";
export const DivStyled = styled.div`
  display: grid;
  gap: ${({ gap }) => `${gap}px`};
`;

export const DivFlexStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;
