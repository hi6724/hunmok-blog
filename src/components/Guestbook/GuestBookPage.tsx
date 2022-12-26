import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { colors } from "../../color";
import { IGuestbook } from "./GuestbookItem";
import Modal from "react-modal";
import { useMobile } from "../../utils/useMobile";
import { useForm } from "react-hook-form";
import {
  Input,
  InputBox,
  ModalTitle,
  StyledForm,
} from "../../pages/GuestBookPage";
import Button from "../Button";
import axios from "axios";
import { getGuestbooksApi } from "../../utils/apiRoutes";
import { toast, ToastContainer } from "react-toastify";
import useSWR from "swr";

interface pageProps {
  guestBooks: IGuestbook[];
  page: number;
  bookRef: any;
  edit: boolean;
}

const GuestBookPage = React.forwardRef(
  ({ guestBooks, page, edit }: pageProps, ref: any) => {
    const { mutate } = useSWR(getGuestbooksApi);
    const isMobile = useMobile();
    const [isLoading, setIsLoading] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [editId, setEditId] = useState("");
    const { register, handleSubmit, formState, setValue, setFocus } = useForm();
    const handleClick = (guestBook: IGuestbook) => {
      setEditId(guestBook.id);
      setValue("username", guestBook.user.username);
      setValue("content", guestBook.content);
      setValue("title", guestBook.title);
      setIsOpen(true);
    };
    const onValid = async (formData: any) => {
      if (isLoading) return;
      setIsLoading(true);
      const { data } = await axios({
        url: `${getGuestbooksApi}/${editId}`,
        method: "PUT",
        data: {
          ...formData,
          user: {
            username: formData.username,
            password: formData.password,
          },
        },
      });
      if (data.ok) {
        toast("수정되었습니다", { type: "success" });
        setIsOpen(false);
        mutate();
        setIsLoading(false);
        return;
      }
      setFocus("password");
      toast("비밀번호를 확인해주세요", { type: "error" });
      setIsLoading(false);
      return;
    };
    const handleDelete = async (formData: any) => {
      if (isLoading) return;
      setIsLoading(true);
      const { data } = await axios({
        url: `${getGuestbooksApi}/${editId}`,
        method: "POST",
        data: {
          ...formData,
          user: {
            username: formData.username,
            password: formData.password,
          },
        },
      });
      if (data.ok) {
        toast("삭제되었습니다", { type: "success" });
        setIsOpen(false);
        mutate();
        setIsLoading(false);
        return;
      }
      setFocus("password");
      toast("비밀번호를 확인해주세요", { type: "error" });
      setIsLoading(false);
      return;
    };
    useEffect(() => {
      setValue("password", "");
    }, [modalIsOpen]);
    return (
      <>
        <GuestBookPageStyle ref={ref}>
          <div className="page-content">
            {guestBooks?.map((guestBook) => (
              <div style={{ padding: "0.5rem 1rem" }} key={guestBook.id}>
                <div>
                  <h2 className="page-header">
                    <p>{guestBook.title}</p>
                    {edit && (
                      <EditButton onMouseDown={() => handleClick(guestBook)}>
                        수정
                      </EditButton>
                    )}
                  </h2>
                </div>

                <div className="page-text">
                  <p>작성자 : {guestBook.user.username}</p>
                  {guestBook.content}
                </div>
              </div>
            ))}
            <div className="page-footer">
              <p>{page + 2}</p>
            </div>
          </div>
        </GuestBookPageStyle>
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
            <ModalTitle>방명록 수정하기</ModalTitle>
            <StyledForm action="#" onSubmit={handleSubmit(onValid)}>
              <Input disabled={true} {...register("username")} />
              <Input
                type="password"
                isError={formState?.errors?.password?.message}
                placeholder={
                  formState?.errors?.password?.type
                    ? (formState?.errors?.password?.message as string)
                    : "비밀번호"
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
            <div style={{ justifyContent: "space-around", display: "flex" }}>
              <Button
                style={{
                  color: "white",
                  backgroundColor: "#fb3b12",
                  opacity: isLoading ? 0.6 : 1,
                  filter: isLoading ? "grayscale(40%)" : "",
                  cursor: isLoading ? "not-allowed" : "pointer",
                }}
                onClick={handleSubmit(handleDelete)}
              >
                삭제하기
              </Button>

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
                수정하기
              </Button>
            </div>
          </div>
        </Modal>
      </>
    );
  }
);

export default GuestBookPage;
const EditButton = styled.button`
  color: ${colors.darkGray};
  border: none;
  background-color: ${colors.lightGray};
  font-size: 1rem;
  font-family: "NEXON-Bold";
  padding: 0.2rem 0.8rem;
  border-radius: 0.3rem;
  cursor: pointer;
  transition: all 0.2s;
  :hover {
    color: ${colors.white};
    background-color: ${colors.lightBlack};
  }
`;
export const GuestBookPageStyle = styled.div`
  @media (max-width: 1000px) {
    padding: 10px 0;
  }
  padding: 20px;
  background-color: #fdfaf7;
  color: #785e3a;
  border: solid 1px #c2b5a3;
  overflow: hidden;

  .page-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: "NEXON-Bold";
      height: 2rem;
      font-size: 1.4rem;
      text-transform: uppercase;
    }

    .page-image {
      height: 100%;
      background-size: contain;
      background-position: center center;
      background-repeat: no-repeat;
    }

    .page-text {
      height: 100%;
      flex-grow: 1;
      font-size: 1rem;
      text-align: justify;
      margin-top: 10px;
      padding-top: 10px;
      box-sizing: border-box;
      border-top: solid 1px #f4e8d7;
      p {
        font-size: 0.8rem;
        display: flex;
        margin-bottom: 0.3rem;
        flex-direction: row-reverse;
        white-space: break-spaces;
      }
    }

    .page-footer {
      margin: 0 auto;
      height: 30px;
      border-top: solid 1px hsl(35, 55, 90);
      font-size: 80%;
      color: hsl(35, 20, 50);
    }
  }

  &.--left {
    // for left page (property will be added automatically)
    border-right: 0;
    box-shadow: inset -7px 0 30px -7px rgba(0, 0, 0, 0.4);
  }

  &.--right {
    // for right page (property will be added automatically)
    border-left: 0;
    box-shadow: inset 7px 0 30px -7px rgba(0, 0, 0, 0.4);

    .page-footer {
      text-align: right;
    }
  }

  &.hard {
    // for hard page
    background-color: hsl(35, 50, 90);
    border: solid 1px hsl(35, 20, 50);
  }

  &.page-cover {
    background-color: #e3d0b5;
    color: #785e3a;
    border: solid 1px #998466;

    h2 {
      text-align: center;
      padding-top: 50%;
      font-size: 210%;
    }

    &.page-cover-top {
      box-shadow: inset 0px 0 30px 0px rgba(36, 10, 3, 0.5),
        -2px 0 5px 2px rgba(0, 0, 0, 0.4);
    }

    &.page-cover-bottom {
      box-shadow: inset 0px 0 30px 0px rgba(36, 10, 3, 0.5),
        10px 0 8px 0px rgba(0, 0, 0, 0.4);
    }
  }
`;
