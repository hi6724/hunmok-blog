import React from "react";
import { useForm } from "react-hook-form";
import { IoLogoInstagram, IoLogoFacebook, IoLogoGithub } from "react-icons/io";
import styled from "styled-components";
import { send } from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import velog from "../../assets/logo/velog.ico";

import { colors } from "../../color";
import Button from "../Button";

const MetaData = () => {
  return (
    <>
      <SlimText>부천시 장말로 136</SlimText>
      <SlimText>hi6724@gmail.com | +8210-4362-6724</SlimText>
      <div style={{ display: "flex", gap: 15 }}>
        <SnsLink href={"https://github.com/hi6724"} target="_blank">
          <IoLogoGithub size={"2rem"} color={colors.link} />
        </SnsLink>
        <SnsLink href={"https://velog.io/@hunmok1027"} target="_blank">
          <img
            src={velog}
            alt=""
            style={{ width: "2rem", padding: "0.1rem" }}
          />
        </SnsLink>
        <SnsLink href={"https://www.instagram.com/ha_hunmok/"} target="_blank">
          <IoLogoInstagram size={"2rem"} color={colors.pink} />
        </SnsLink>
      </div>
    </>
  );
};

export default function ContactMe() {
  const { register, handleSubmit, formState, reset } = useForm({
    mode: "onSubmit",
  });
  const onValid = (data: any) => {
    console.log(data);
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <CustomConfirmAlert>
            <h1>내용이 맞습니까?</h1>
            <section>
              <p>
                <span>이름</span>
                {data.from_name}
              </p>
              <p>
                <span>이메일</span> {data.from_email}
              </p>
              <p>
                <span>내용</span>
                {data.message}
              </p>
            </section>
            <div>
              <Button onClick={onClose}>취소</Button>
              <Button
                onClick={() => {
                  sendEmail(data);
                  onClose();
                }}
              >
                보내기
              </Button>
            </div>
          </CustomConfirmAlert>
        );
      },
    });
  };
  const sendEmail = (data: any) => {
    send("service_ibn0zqm", "template_tfjt1wb", data, "nR6ZXXMVRBD0CIHOb");
    toast("제출되었습니다");
    reset();
  };
  return (
    <Wrapper>
      <Container>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <BoldText style={{ fontSize: 20, marginBottom: 10 }}>
            문의 및 피드백을 기다립니다!
          </BoldText>
          <BoldText style={{ fontSize: 50 }}>문의하기</BoldText>
          <MetaData />
        </div>
        <div>
          <form
            action="#"
            onSubmit={handleSubmit(onValid)}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Input
              isError={formState?.errors?.from_name?.message}
              placeholder={
                formState?.errors?.from_name?.message
                  ? (formState?.errors?.from_name?.message as string)
                  : "이름"
              }
              {...register("from_name", {
                required: { value: true, message: "이름을 입력해주세요" },
              })}
            />
            {formState?.errors?.from_email?.type === "pattern" && (
              <ErrorMsg>옳바른 이메일을 입력해주세요</ErrorMsg>
            )}

            <Input
              isError={formState?.errors?.from_email?.message}
              placeholder={
                formState?.errors?.from_email?.type
                  ? (formState?.errors?.from_email?.message as string)
                  : "이메일"
              }
              {...register("from_email", {
                required: { value: true, message: "이메일을 입력해주세요" },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "옳바른 이메일을 입력해주세요",
                },
              })}
            />

            <InputBox
              isError={formState?.errors?.message?.message}
              placeholder={
                formState?.errors?.message?.message
                  ? (formState?.errors?.message?.message as string)
                  : "메세지"
              }
              {...register("message", {
                required: { value: true, message: "내용을 입력해주세요" },
              })}
            />
          </form>
          <div style={{ justifyContent: "flex-end", display: "flex" }}>
            <Button onClick={handleSubmit(onValid)}>제출</Button>
          </div>
        </div>
      </Container>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Wrapper>
  );
}
const CustomConfirmAlert = styled.div`
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
const ErrorMsg = styled.h1`
  color: tomato;
  font-family: "BM-Air";
`;

const Input = styled.input<any>`
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
      color: ${colors.fluor};
    }
  }
  transition: all 0.3s;
`;
const InputBox = styled(Input)`
  transition: all 0.2s;
  :focus {
    height: 15vh;
  }
`;
const SlimText = styled.h1`
  font-family: "BM-Air";
`;
const BoldText = styled.h1`
  font-family: "BM-Pro";
`;
const Container = styled.div`
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

const Wrapper = styled.div`
  margin: 20vh 0 0;
  padding-bottom: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const SnsLink = styled.a`
  transition: all 0.2s;
  :hover {
    scale: 1.2;
  }
`;
