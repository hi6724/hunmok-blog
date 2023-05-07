import React from "react";
import Button from "../../Button";
import { CustomConfirmAlert } from "./ContactMe.styles";
import { send } from "@emailjs/browser";
import { toast } from "react-toastify";

const EMAILJS_SERVICE_KEY = "service_ibn0zqm";
const EMAILJS_TEMPLATE = "template_tfjt1wb";
const EMAILJS_SECRET_KEY = "service_ibn0zqm";

function ConfirmAlert({ data, onClose }: any) {
  const sendEmail = (data: any) => {
    send(EMAILJS_SERVICE_KEY, EMAILJS_TEMPLATE, data, EMAILJS_SECRET_KEY);
    toast("제출되었습니다");
  };

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
}

export default ConfirmAlert;
