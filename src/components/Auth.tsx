// src/components/Auth.tsx
import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const Auth: React.FC<{ onAuth: () => void }> = ({ onAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onAuth();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isRegistering ? "Register" : "Login"}</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">{isRegistering ? "Register" : "Login"}</button>
      <button type="button" onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? "Switch to Login" : "Switch to Register"}
      </button>
    </form>
  );
};

export default Auth;
