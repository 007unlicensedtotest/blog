// src/App.tsx
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Auth from "./components/Auth";
import RatingForm from "./components/RatingForm";

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.email}</h1>
          <RatingForm userId={user.uid} />
        </div>
      ) : (
        <Auth onAuth={() => setUser(auth.currentUser)} />
      )}
    </div>
  );
};

export default App;
