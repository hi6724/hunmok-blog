import styled from "styled-components";
import { colors } from "../../../color";

export const CustomConfirmAlert = styled.div`
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  padding: 2rem;
  box-shadow: 0 20px 75px rgb(0 0 0 / 23%);
  color: ${colors.lightGray};
  background-color: ${colors.darkBlack};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  h1 {
    font-size: 2rem;
    font-family: "NEXON-Bold";
    padding-bottom: 1rem;
    margin-bottom: 1rem;
  }
  section {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1rem;
    border-bottom: 1px solid ${colors.darkGray};
    padding-bottom: 2.5rem;
    margin-bottom: 2.5rem;
  }
  p {
    span {
      width: 4rem;
      font-size: 1.2rem;
    }
    display: flex;
    gap: 1rem;
    width: 100%;
    font-size: 1.2rem;
  }
  div {
    display: flex;
    gap: 1rem;
    width: 100%;
    min-width: 60vw;
  }
`;
export const ErrorMsg = styled.h1`
  color: tomato;
  font-family: "BM-Air";
`;

export const Input = styled.input<any>`
  margin-bottom: 15px;
  height: 5vh;
  padding: 5px 15px;
  font-size: 16px;
  font-family: "BM-Air";
  border: none;
  border-bottom: 2px solid white;
  outline: none;
  background-color: #1d1d1d;
  color: ${colors.lightGray};
  ::placeholder,
  ::-webkit-input-placeholder {
    color: ${(props) => (props.isError ? "tomato" : colors.lightGray)};
  }
  :focus {
    border-color: ${colors.fluor};
    color: ${colors.fluor};
    ::placeholder,
    ::-webkit-input-placeholder {
      color: ${(props) => (props.isError ? "tomato" : colors.fluor)};
    }
  }
  transition: all 0.3s;
`;
export const InputBox = styled.textarea<any>`
  transition: all 0.2s;
  font-size: 16px;
  font-family: "BM-Air";
  background-color: #1d1d1d;
  color: ${colors.lightGray};
  border: none;
  border-bottom: 2px solid white;
  outline: none;
  margin-bottom: 1rem;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: ${(props) => (props.isError ? "tomato" : colors.lightGray)};
  }
  :focus {
    border-color: ${colors.fluor};
    color: ${colors.fluor};
    ::placeholder,
    ::-webkit-input-placeholder {
      color: ${colors.fluor};
    }
  }
  height: 15vh;
  resize: none;
`;

export const SlimText = styled.h1`
  font-family: "BM-Air";
`;
export const BoldText = styled.h1`
  font-family: "BM-Pro";
`;
export const Container = styled.div`
  box-shadow: rgba(150, 150, 205, 0.75) 0px 2px 5px 0px,
    rgba(100, 100, 100, 0.35) 0px 1px 1px 0px;
  padding: 5vh 5vw;
  color: ${colors.lightGray};
  display: grid;
  grid-template-columns: repeat(2, 30vw);
  @media screen and (max-width: 1000px) {
    grid-template-columns: repeat(1, 80vw);
    gap: 3rem;
  }
`;

export const Wrapper = styled.div`
  margin: 20vh 0 0;
  padding-bottom: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
export const SnsLink = styled.a`
  transition: all 0.2s;
  :hover {
    scale: 1.2;
  }
`;
