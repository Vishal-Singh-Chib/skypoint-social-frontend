// src/features/auth/useLoginHandler.ts
import type { Message } from "../../app/models/message"; // ✅ Correct

 
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "./RegisterAPI";

export const useLoginHandler = (
  email: string,
  password: string,
  username:string,
  setMessage: (msg: Message | null) => void
) => {
const navigate = useNavigate();
  const [Register, { isLoading }] = useRegisterMutation();

  const isValidEmail = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);

    const normalizedEmail = email.trim().toLowerCase();

    
   if (username.length  < 1 ) {
      setMessage({
        type: "error",
        text: "Username is mandatory",
      });
      return;
    }
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
      const result = await Register({
        email: normalizedEmail,
        password,
        username
      }).unwrap();

      if(result.token)
      setMessage({ type: "success", text: "Login Successful" });
    else
     setMessage({
        type: "error",
        text:  "Please check your username and password",
      });
      navigate('/Login');
    } catch (error: unknown) {
     let errorMessage = "Something went wrong";

  if ( error !== null) {
    errorMessage = (error as { data: string }).data;
  }

  setMessage({
    type: "error",
    text: errorMessage,
  });
}
  };

  return { handleSubmit, isLoading };
};
