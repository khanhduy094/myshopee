import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";
import InputPassWord from "../../../components/InputPassword/InputPassWord";
import { rules } from "../../../constants/rules";
import { updateMe } from "../../Auth/auth.slice";
import * as S from "../Profile/profile.style";
import * as SS from "./password.style";

export default function Password() {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
    setError,
    reset
  } = useForm({
    defaultValues: {
      password: "",
      new_password: "",
      confirmed_new_password: "",
    },
  });
  const dispatch = useDispatch();
  const update = async (data) => {
    const body = {
      password: data.password,
      new_password: data.new_password,
    };
    try {
      await dispatch(updateMe(body)).then(unwrapResult);
      reset();
      toast.success("Đổi mật khẩu thành công", {
        position: "top-center",
        autoClose: 3000
      })
    }catch(error){
      if(error.status === 422){
        for(let key in error.data){
          setError(key , {
            type: "server",
            message: error.data[key]
          })
        }
      }
    }

  };

  return (
    <S.Profile>
      <S.ProfileHeader>
        <S.ProfileHeaderTitle>Đổi mật khẩu</S.ProfileHeaderTitle>
        <S.ProfileHeaderSub>
          Để bảo mật tài khoản, vui lòng không chia sẽ mật khẩu cho người khác.
        </S.ProfileHeaderSub>
        <SS.PasswordContent onSubmit={handleSubmit(update)}>
          <S.InputLabel>
            <S.InputLabelLabel>Mật khẩu cũ</S.InputLabelLabel>
            <S.InputLabelContent>
              <Controller
                name="password"
                control={control}
                rules={rules.password}
                render={({ field }) => (
                  <InputPassWord
                    name="password"
                    value={getValues("password")}
                    onChange={field.onChange}
                  />
                )}
              />
              <ErrorMessage name="password" errors={errors} />
            </S.InputLabelContent>
          </S.InputLabel>
          <S.InputLabel>
            <S.InputLabelLabel>Mật khẩu mới</S.InputLabelLabel>
            <S.InputLabelContent>
              <Controller
                name="new_password"
                control={control}
                rules={rules.password}
                render={({ field }) => (
                  <InputPassWord
                    name="new_password"
                    value={getValues("new_password")}
                    onChange={field.onChange}
                  />
                )}
              />
              <ErrorMessage name="new_password" errors={errors} />
            </S.InputLabelContent>
          </S.InputLabel>
          <S.InputLabel>
            <S.InputLabelLabel>Nhập lại mật khẩu</S.InputLabelLabel>
            <S.InputLabelContent>
              <Controller
                name="confirmed_new_password"
                control={control}
                rules={{
                  ...rules.password,
                  validate: {
                    samePassword: (value) =>
                      value === getValues("new_password") ||
                      "Nhập lại mật khẩu không khớp",
                  },
                }}
                render={({ field }) => (
                  <InputPassWord
                    name="confirmed_new_password"
                    value={getValues("confirmed_new_password")}
                    onChange={field.onChange}
                  />
                )}
              />
              <ErrorMessage name="confirmed_new_password" errors={errors} />
            </S.InputLabelContent>
          </S.InputLabel>
          <S.Submit>
            <S.ButtonSubmit type="submit">Lưu</S.ButtonSubmit>
          </S.Submit>
        </SS.PasswordContent>
      </S.ProfileHeader>
    </S.Profile>
  );
}
