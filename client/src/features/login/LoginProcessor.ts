// src/features/auth/useLoginHandler.ts
import type { Message } from "../../app/models/message"; // ✅ Correct
 import type { CredentialResponse } from '@react-oauth/google';


import { useLoginOrRegisterMutation, useLoginWithGoogleMutation } from "./LoginAPI";
import { useNavigate } from "react-router-dom";
export const useLoginHandler = (
  email: string,
  password: string,
  setMessage: (msg: Message | null) => void
) => {
    const [loginWithGoogle] = useLoginWithGoogleMutation();
const navigate = useNavigate();
  const [loginOrRegister, { isLoading }] = useLoginOrRegisterMutation();

  const isValidEmail = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);

    const normalizedEmail = email.trim().toLowerCase();

    if (!isValidEmail(normalizedEmail)) {
      setMessage({ type: "error", text: "Please enter a valid email." });
      return;
    }

    if (password.length < 6) {
      setMessage({
        type: "error",
        text: "Password must be at least 6 characters long.",
      });
      return;
    }

    try {
      const result = await loginOrRegister({
        email: normalizedEmail,
        password,
      }).unwrap();

    
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", result.email); 
      localStorage.setItem("username", result.username);    
      if(result.token)
      setMessage({ type: "success", text: "Login Successful" });
    else
     setMessage({
        type: "error",
        text:  "Please check your username and password",
      });
      navigate('/post');
    } catch (error: unknown) {
     let errorMessage = "Something went wrong";

  if (error !== null) {
    errorMessage = (error as { data: string }).data;
  }

  setMessage({
    type: "error", // or any other enum/type you use
    text: errorMessage,
  });
}
  };

    const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    try { 
      
        if (!credentialResponse.credential) {
      setMessage({ type: "error", text: "No credential returned." });
      return;
      }
      const idToken = credentialResponse.credential;

      if (!idToken) {
        setMessage({ type: "error", text: "Google authentication failed." });
        return;
      }

      const result = await loginWithGoogle({ idToken }).unwrap();

      localStorage.setItem("token", result.token);
      localStorage.setItem("user", result.email);
      localStorage.setItem("username", result.username);

      setMessage({ type: "success", text: "Login Successful" });
      navigate("/post");
    } catch (error: unknown) {
      let errorMessage = "Something went wrong";
        if (error !== null) {
      errorMessage = (error as { data: string }).data;
      }
      setMessage({ type: "error", text: errorMessage });
    }
  };
  return { handleGoogleLogin,handleSubmit, isLoading };
};
