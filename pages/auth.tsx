// components/LoginForm.tsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/auth/authThunks";

export default function LoginForm() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    dispatch(
      loginUser({
        email,
        password,
      })
    );
  };

  return (
    <div className="p-40 flex flex-col gap-8">
      <input
        type="text"
        placeholder="email"
        value={email}
        className="rounded-sm p-4 border-2 border-gray-300"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        className="rounded-sm p-4 border-2 border-gray-300"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white p-4 rounded-sm"
       onClick={handleLogin}>Login</button>
    </div>
  );
}
