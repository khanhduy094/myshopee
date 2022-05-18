import React from "react";
import * as S from "../Register/register.style";
import { Controller, useForm } from "react-hook-form";
import InputText from "../../../components/InputText/InputText";
import InputPassWord from "../../../components/InputPassword/InputPassWord";
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";
import { rules } from "../../../constants/rules";
import { path } from "../../../constants/path";
import { Button } from "../../../assets/styles/ultis";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../auth.slice";
import { unwrapResult } from "@reduxjs/toolkit";
export default function Login() {
  const {
    handleSubmit,
    formState: { errors },
    getValues,
    control,
    setError,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogin = async (data) => {
    const body = {
      email: data.email,
      password: data.password,
    };
    try{
      let res = await  dispatch(login(body)) ;
      unwrapResult(res);
      history.push(path.home);
    }catch(error){

      if(error.status === 422){
        // error.data lỗi trả về khi call api lỗi
        console.log(data);
        console.log(body);
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
    <S.StyleRegister>
      <S.Container className="container">
        <S.Banner></S.Banner>
        <S.FormWrapper>
          <S.FormTitle>Đăng Nhập</S.FormTitle>
          <S.Form noValidate onSubmit={handleSubmit(handleLogin)}>
            <S.FormControl>
              <Controller
                name="email"
                control={control}
                rules={rules.email}
                render={({ field }) => (
                  <InputText
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={getValues("email")}
                    onChange={field.onChange}
                  />
                )}
              />
              <ErrorMessage name="email" errors={errors} />
            </S.FormControl>
            <S.FormControl>
              <Controller
                name="password"
                control={control}
                rules={rules.password}
                render={({ field }) => (
                  <InputPassWord
                    name="password"
                    placeholder="Mật khẩu"
                    value={getValues("password")}
                    onChange={field.onChange}
                  />
                )}
              />
              <ErrorMessage name="password" errors={errors} />
            </S.FormControl>
            <S.FormButton>
              <Button type="submmit">Đăng nhập</Button>
            </S.FormButton>
          </S.Form>
          <S.FormFooter>
            <span>Bạn chưa có tài khoản ?</span>
            <Link to={path.register} className="link">
              Đăng ký{" "}
            </Link>
          </S.FormFooter>
        </S.FormWrapper>
      </S.Container>
    </S.StyleRegister>
  );
}

