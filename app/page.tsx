"use client";

import React, { useEffect, useState } from "react";

import Chat from "./components/Chat";
import { getAuth, signInAnonymously, signOut } from "firebase/auth";

export type User = {
  uid: string;
  isAnonymous: boolean;
};

const Homepage = () => {
  const [user, setUser] = useState<User | null>(null);

  const annonymousAuth = () => {
    const auth = getAuth();

    signInAnonymously(auth)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log({ errorCode, errorMessage });
      });
  };

  const logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {user && (
        <div>
          <h1>
            (Annonymous login) User ID:
            {user.uid}
          </h1>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            log out
          </button>
        </div>
      )}

      <hr className="my-4" />

      {user ? (
        <Chat user={user} />
      ) : (
        <h1>
          Please login
          <br />
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded"
            onClick={annonymousAuth}
          >
            Annonymous authentication
          </button>
        </h1>
      )}
    </div>
  );
};

export default Homepage;
