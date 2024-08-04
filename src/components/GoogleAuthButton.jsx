import { GoogleLogin } from "@react-oauth/google";
import React from "react";
// import { toastAction } from "../../../redux/slices/alertSlice";
import { useDispatch } from "react-redux";
import { authGoogleAction } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const GoogleAuthButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await dispatch(
        authGoogleAction(data?.credential),
      ).unwrap();

      // await dispatch(
      //   toastAction({ message: response.message, type: "SUCCESS" })
      // ).unwrap();

      navigate("/");
    } catch (error) {
      console.log(error);
      // await dispatch(
      //   toastAction({ message: error.message, type: "ERROR" })
      // ).unwrap();
    }
  };

  return (
    <GoogleLogin
      onSuccess={onSubmit}
      onError={() => {
        console.log("Login Failed");
      }}
      useOneTap
    />
  );
};

export default GoogleAuthButton;
