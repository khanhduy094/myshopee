import React, { useEffect } from "react";
import { Button } from "../../../assets/styles/ultis";
import * as S from "./register.style";
import { Link, useHistory } from "react-router-dom";
import { path } from "../../../constants/path";
import InputText from "../../../components/InputText/InputText";
import InputPassWord from "../../../components/InputPassword/InputPassWord";
import { Controller, useForm } from "react-hook-form";
import { rules } from "../../../constants/rules";
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";
import http from "../../../utils/http";
import { useDispatch } from "react-redux";
import { register } from "../auth.slice";
import { unwrapResult } from "@reduxjs/toolkit";

export default function Register() {
  const {
    handleSubmit,
    formState: { errors },
    getValues,
    control,
    setError
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmedPassword: "",
    },
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const handleRegister = async (data) => {
    const body = {
      email: data.email,
      password: data.password,
    };
    try{
      let res = await  dispatch(register(body)) ;
      unwrapResult(res);
      history.push(path.home)
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

  // useEffect(() =>  {
  //   http.get('products').then(res => {
  //     console.log(res);
  //   })
  // }, [])

  return (
 
      <S.StyleRegister>
        <S.Container className="container">
          <S.Banner></S.Banner>
          <S.FormWrapper>
            <S.FormTitle>Đăng ký</S.FormTitle>
            <S.Form noValidate onSubmit={handleSubmit(handleRegister)}>
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
              <S.FormControl>
                <Controller
                  name="confirmedPassword"
                  control={control}
                  rules={{
                    ...rules.confirmedPassword,
                    validate: {
                      samePassword: (value) =>
                        value === getValues("password") ||
                        "Nhập lại mật khẩu không khớp",
                    },
                  }}
                  render={({ field }) => (
                    <InputPassWord
                      name="confirmedPassword"
                      placeholder="Nhập lại mật khẩu"
                      value={getValues("comfirmedPassword")}
                      onChange={field.onChange}
                    />
                  )}
                />
                <ErrorMessage name="confirmedPassword" errors={errors} />
              </S.FormControl>
              <S.FormButton>
                <Button type="submmit">Đăng ký</Button>
              </S.FormButton>
            </S.Form>
            <S.FormFooter>
              <span>Bạn đã có tài khoản?</span>
              <Link to={path.login} className="link">
                Đăng nhập{" "}
              </Link>
            </S.FormFooter>
          </S.FormWrapper>
        </S.Container>
      </S.StyleRegister>
    
  );
}
