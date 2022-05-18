import styled from "styled-components";
import { Button } from "../../../assets/styles/ultis";
import Select from "../../../components/Select/Select";

export const Profile = styled.div`
  padding: 0 30px 20px;
  background: #fff;
  box-shadow: 0 1px 2px 0 rgba(0 0 0 / 13%);
  border-radius: 2px;
`;
export const ProfileHeader = styled.div`
  padding: 22px 0;
  border-bottom: 1px solid #efefef;
`;
export const ProfileHeaderTitle = styled.div`
  font-size: 1.8rem;
  font-weight: 500;
  color: #333;
  text-transform: capitalize;
`;
export const ProfileHeaderSub = styled.div`
  font-size: 1.4rem;
  color: #555;
  margin-top: 3px;
`;
export const ProfileInfo = styled.div`
  display: flex;
  align-items: flex-start;
  padding-top: 30px;
`;
export const ProfileLeft = styled.form`
  padding-right: 50px;
  flex-grow: 1;
`;
export const ProfileRight = styled.div`
  border-left: 1px solid #efefef;
  width: 28rem;
  display: flex;
  justify-content: center;
`;
export const InputLabel = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  margin-bottom: 30px;
`;
export const InputLabelLabel = styled.div`
  width: 20%;
  padding-top: 1rem;
  text-align: right;
  color: rgba(85, 85, 85, 0.8);
  text-transform: capitalize;
  overflow: hidden;
`;
export const InputLabelContent = styled.div`
  width: 80%;
  padding-left: 2rem;
`;
export const DateSelect = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const SelectDate = styled(Select)`
  width: 32%;
`;
export const ContentText = styled.div`
  font-size: 1.4;
  color: #333;
  padding-top: 1rem;
`;
export const Submit = styled.div`
  margin-bottom: 60px;
  padding-left: calc(20% + 20px);
`;
export const ButtonSubmit = styled(Button)`
  height: 4rem;
  min-width: 7rem;
`;
export const AvartarUpload = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
export const Avatar = styled.div`
  width: 100px;
  height: 100px;
  margin: 20px 0;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;
export const InputFile = styled.input`
  display: none;
`;
export const ButtonUpload = styled(Button)`
  height: 4rem;
  padding: 0 2.5rem;
`;
export const UploadTextContainer = styled.div`
  margin-top: 12px;
  > div {
    color: #999;
  }
`;

export const ErrorMessage = styled.div`
  width: 100%;
  padding-left: calc(20% + 2rem);
`;
