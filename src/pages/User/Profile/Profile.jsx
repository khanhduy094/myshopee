import React from "react";
import InputText from "../../../components/InputText/InputText";
import * as S from "./profile.style";
import range from "lodash/range";
import { useSelector, useDispatch } from "react-redux";
import { getDate, getMonth, getYear, isExists } from "date-fns";
import { Controller, useForm } from "react-hook-form";
import { rules } from "../../../constants/rules";
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";
import { updateMe } from "../../Auth/auth.slice";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export default function Profile() {
  const profile = useSelector((state) => state.auth.profile);
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      name: profile.name || "",
      phone: profile.phone || "",
      address: profile.address || "",
      date: profile.date_of_birth
        ? getDate(new Date(profile.date_of_birth))
        : "",
      month: profile.date_of_birth
        ? getMonth(new Date(profile.date_of_birth))
        : "",
      year: profile.date_of_birth
        ? getYear(new Date(profile.date_of_birth))
        : "",
    },
  });
  const dispatch = useDispatch();

  const updateUser = async (data) => {
    const body = {
      name: data.name,
      phone: data.phone,
      address: data.address,
      date_of_birth: new Date(data.date, data.month, data.year).toISOString()
    }
    try {
       const res = await dispatch(updateMe(body)).then(unwrapResult);
       toast.success(res.message, {
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

  const validateDate = () => {
    return (
      isExists(
        Number(getValues("year")),
        Number(getValues("month")),
        Number(getValues("date"))
      ) || "Ngày sinh không đúng"
    );
  };

  return (
    <S.Profile>
      <S.ProfileHeader>
        <S.ProfileHeaderTitle>Hồ sơ của tôi</S.ProfileHeaderTitle>
        <S.ProfileHeaderSub>
          Quản lí thông tin hồ sơ để bảo mật tài khoản
        </S.ProfileHeaderSub>
      </S.ProfileHeader>
      <S.ProfileInfo>
        <S.ProfileLeft onSubmit={handleSubmit(updateUser)}>
          <S.InputLabel>
            <S.InputLabelLabel>Email</S.InputLabelLabel>
            <S.InputLabelContent>
              <S.ContentText>{profile.email}</S.ContentText>
            </S.InputLabelContent>
          </S.InputLabel>

          <S.InputLabel>
            <S.InputLabelLabel>Tên</S.InputLabelLabel>
            <S.InputLabelContent>
              <Controller
                name="name"
                control={control}
                rules={rules.name}
                render={({ field }) => (
                  <InputText
                    name="name"
                    type="text"
                    onChange={field.onChange}
                    value={getValues("name")}
                  />
                )}
              />
              <ErrorMessage name="name" errors={errors} />
            </S.InputLabelContent>
          </S.InputLabel>

          <S.InputLabel>
            <S.InputLabelLabel>Số điện thoại</S.InputLabelLabel>
            <S.InputLabelContent>
              <Controller
                name="phone"
                control={control}
                rules={rules.phone}
                render={({ field }) => (
                  <InputText
                    name="phone"
                    type="text"
                    onChange={field.onChange}
                    value={getValues("phone")}
                  />
                )}
              />
              <ErrorMessage name="phone" errors={errors} />
            </S.InputLabelContent>
          </S.InputLabel>

          <S.InputLabel>
            <S.InputLabelLabel>Địa chỉ</S.InputLabelLabel>
            <S.InputLabelContent>
              <Controller
                name="address"
                control={control}
                rules={rules.phone}
                render={({ field }) => (
                  <InputText
                    name="address"
                    type="text"
                    onChange={field.onChange}
                    value={getValues("address")}
                  />
                )}
              />
              <ErrorMessage name="address" errors={errors} />
            </S.InputLabelContent>
          </S.InputLabel>

          <S.InputLabel>
            <S.InputLabelLabel>Ngày sinh</S.InputLabelLabel>
            <S.InputLabelContent>
              <S.DateSelect>
                <Controller
                  name="date"
                  control={control}
                  rules={{
                    validate: {
                      date: validateDate,
                    },
                  }}
                  render={({ field }) => (
                    <S.SelectDate
                      title="Ngày"
                      options={range(1, 32).map((item) => ({
                        name: item,
                        value: item,
                      }))}
                      onChange={field.onChange}
                      value={getValues("date")}
                    />
                  )}
                />
                <Controller
                  name="month"
                  control={control}
                  rules={{
                    validate: {
                      date: validateDate,
                    },
                  }}
                  render={({ field }) => (
                    <S.SelectDate
                      title="Tháng"
                      options={range(0, 12).map((item) => ({
                        name: item + 1,
                        value: item,
                      }))}
                      onChange={field.onChange}
                      value={getValues("month")}
                    />
                  )}
                />

                <Controller
                  name="year"
                  control={control}
                  rules={{
                    validate: {
                      date: validateDate,
                    },
                  }}
                  render={({ field }) => (
                    <S.SelectDate
                      title="Năm"
                      options={range(1900, 2022).map((item) => ({
                        name: item,
                        value: item,
                      }))}
                      onChange={field.onChange}
                      value={getValues("year")}
                    />
                  )}
                />
              </S.DateSelect>
            </S.InputLabelContent>
            <S.ErrorMessage>
              <ErrorMessage name="date" errors={errors}/>
            </S.ErrorMessage>
          </S.InputLabel>
          <S.Submit>
            <S.ButtonSubmit type="submit">Lưu</S.ButtonSubmit>
          </S.Submit>
        </S.ProfileLeft>
        <S.ProfileRight>
          <S.AvartarUpload>
            <S.Avatar>
              <img src="" alt="sss" />
            </S.Avatar>
            <S.InputFile type="file" accept=".jpg, .jpeg, .png" />
            <S.ButtonUpload>Chọn ảnh</S.ButtonUpload>
            <S.UploadTextContainer>
              <div>Dung lượng tối đa là 1MB</div>
              <div>Định dạng: .JPEG, .PNG</div>
            </S.UploadTextContainer>
          </S.AvartarUpload>
        </S.ProfileRight>
      </S.ProfileInfo>
    </S.Profile>
  );
}
