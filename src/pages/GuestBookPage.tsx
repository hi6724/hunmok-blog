import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "../color";
import GradientButton from "../components/GradientButton";
import GuestbookItem from "../components/Guestbook/GuestbookItem";
import ProjectsPageHeader from "../components/ProjectsPageHeader";
import Modal from "react-modal";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import { useMobile } from "../utils/useMobile";
import axios from "axios";
import { getGuestbooksApi } from "../utils/apiRoutes";
import { toast, ToastContainer } from "react-toastify";
import useSWR from "swr";

function GuestBookPage() {
  const { mutate } = useSWR(getGuestbooksApi);
  const isMobile = useMobile();
  const [isLoading, setIsLoading] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, formState, reset } = useForm();
  const onValid = async (data: any) => {
    if (isLoading) return;
    setIsLoading(true);
    const result = await axios({
      method: "POST",
      url: getGuestbooksApi,
      data: {
        ...data,
        user: {
          username: data.username,
          password: data.password,
        },
      },
    });

    toast("제출되었습니다");
    reset();
    setIsOpen(false);
    mutate();
    setIsLoading(false);
  };
  return (
    <>
      <Container>
        <ProjectsPageHeader text="GUESTBOOK" />
        <GuestbookItem isLoading={isLoading} />
        <div
          onClick={() => setIsOpen(true)}
          style={{ width: "80%", margin: "2rem auto" }}
        >
          <GradientButton>방명록 남기기</GradientButton>
        </div>
      </Container>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={{
          content: {
            top: "50%",
            left: isMobile ? "50%" : "calc(50% + 10vh)",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: colors.lightBlack,
            border: "none",
            boxShadow:
              "rgba(150, 150, 205, 0.75) 0px 2px 5px 0px,rgba(100, 100, 100, 0.35) 0px 1px 1px 0px",
          },
          overlay: {
            backgroundColor: "rgba(0,0,0,0.8)",
          },
        }}
        ariaHideApp={false}
      >
        <div style={{ width: isMobile ? "80vw" : "60vw" }}>
          <ModalTitle>방명록을 남겨주세요 </ModalTitle>
          <StyledForm action="#" onSubmit={handleSubmit(onValid)}>
            <Input
              isError={formState?.errors?.username?.message}
              placeholder={
                formState?.errors?.username?.message
                  ? (formState?.errors?.username?.message as string)
                  : "아이디"
              }
              {...register("username", {
                required: { value: true, message: "아이디을 입력해주세요" },
              })}
            />
            <Input
              isError={formState?.errors?.password?.message}
              placeholder={
                formState?.errors?.password?.type
                  ? (formState?.errors?.password?.message as string)
                  : "비밀번호 (수정 및 삭제에 사용됩니다)"
              }
              {...register("password", {
                required: { value: true, message: "비밀번호를 입력해주세요" },
              })}
            />
            <Input
              isError={formState?.errors?.title?.message}
              placeholder={
                formState?.errors?.title?.type
                  ? (formState?.errors?.title?.message as string)
                  : "제목"
              }
              {...register("title", {
                required: { value: true, message: "제목을 입력해주세요" },
              })}
              style={{ gridColumnEnd: -1, gridColumnStart: 1 }}
            />

            <InputBox
              isError={formState?.errors?.content?.message}
              placeholder={
                formState?.errors?.content?.message
                  ? (formState?.errors?.content?.message as string)
                  : "메세지"
              }
              {...register("content", {
                required: { value: true, message: "내용을 입력해주세요" },
              })}
              style={{ gridColumnEnd: -1, gridColumnStart: 1 }}
            />
          </StyledForm>
          <div style={{ justifyContent: "flex-end", display: "flex" }}>
            <Button
              style={{
                color: "white",
                backgroundColor: colors.primary,
                opacity: isLoading ? 0.6 : 1,
                filter: isLoading ? "grayscale(40%)" : "",
                cursor: isLoading ? "not-allowed" : "pointer",
              }}
              onClick={handleSubmit(onValid)}
            >
              제출
            </Button>
          </div>
        </div>
      </Modal>
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
    </>
  );
}

export default GuestBookPage;
const Container = styled.div`
  padding: 0 0 10vh 0;

  background-color: ${colors.lightBlack};
  min-height: 100vh;
  z-index: 9;
`;
export const Input = styled.input<any>`
  margin-bottom: 15px;
  height: 5vh;
  padding: 5px 15px;
  font-size: 16px;
  font-family: "BM-Air";
  border: none;
  border-bottom: 2px solid ${colors.darkGray};
  outline: none;
  background-color: #1d1d1d;
  color: ${colors.lightGray};
  ::placeholder,
  ::-webkit-input-placeholder {
    color: ${(props) => (props.isError ? "tomato" : colors.darkGray)};
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
  @media screen and (max-width: 1000px) {
    font-size: "1rem";
  }
`;
export const InputBox = styled(Input)`
  transition: all 0.2s;
  :focus {
    height: 15vh;
  }
`;
export const ModalTitle = styled.h1`
  font-size: 3rem;
  padding: 2rem 0;
  font-family: "BM-Pro";
  color: ${colors.lightGray};
  @media screen and (max-width: 1000px) {
    font-size: 2rem;
    padding: 1rem 0;
  }
`;

export const StyledForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
`;
