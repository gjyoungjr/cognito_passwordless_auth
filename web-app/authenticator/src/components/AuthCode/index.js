import React, { useState } from "react";
import AuthCode from "react-auth-code-input";
import "./authcode.css";
export default function AuthorizationCode() {
  const [result, setResult] = useState();
  const handleOnChange = (res) => {
    setResult(res);
  };

  return (
    <AuthCode
      allowedCharacters="numeric"
      onChange={handleOnChange}
      length={6}
      containerClassName="container"
      inputClassName="input-container"
    />
  );
}
