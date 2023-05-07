import React from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import Button from "../../Button";
import {
  BoldText,
  Container,
  CustomConfirmAlert,
  ErrorMsg,
  Input,
  InputBox,
  Wrapper,
} from "./ContactMe.styles";
import MetaData from "./MetaData";
import ConfirmAlert from "./ConfirmAlert";

export default function ContactMe() {
  const { register, handleSubmit, formState, reset } = useForm({
    mode: "onSubmit",
  });
  const onValid = (data: any) => {
    confirmAlert({
      customUI: ({ onClose }) => <ConfirmAlert data={data} onClose={onClose} />,
    });
    reset();
  };

  const setPlaceHolder = (type: "from_name" | "from_email" | "message") => {
    const placeholderObj = {
      from_name: "이름",
      from_email: "이메일",
      message: "메세지",
    };

    return formState?.errors[type]?.message
      ? (formState?.errors?.message?.message as string)
      : placeholderObj[type]
      ? placeholderObj[type]
      : "없음";
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
              placeholder={setPlaceHolder("from_name")}
              {...register("from_name", {
                required: { value: true, message: "이름을 입력해주세요" },
              })}
            />
            {formState?.errors?.from_email?.type === "pattern" && (
              <ErrorMsg>옳바른 이메일을 입력해주세요</ErrorMsg>
            )}

            <Input
              isError={formState?.errors?.from_email?.message}
              placeholder={setPlaceHolder("from_email")}
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
              placeholder={setPlaceHolder("message")}
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
