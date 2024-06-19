"use client";

import { useEffect, useRef, useState } from "react";

import {
  addDoc,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db, storage } from "../configs/firebase";
import { User } from "@/page";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

type Message = {
  id: string;
  user: string;
  message: string;
  date: {
    seconds: number;
    nanoseconds: number;
  };
};

type Props = {
  user: User;
};

const Chat = ({ user }: Props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = async () => {
    if (inputRef.current) {
      const inputValue = inputRef.current.value;

      if (inputValue.trim() === "") {
        alert("Please type a message.");
        return;
      }

      try {
        await addDoc(collection(db, "messages"), {
          user: user.uid,
          message: inputValue,
          date: serverTimestamp(),
        });

        inputRef.current.value = "";
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert("Please select a file.");
      return;
    }

    try {
      // TODO: possible add in the future to prevent file name duplication
      // const randomId = Math.random().toString(36).substring(7);
      const storageRef = ref(storage, `files/${file.name}`);

      try {
        const uploadedFile = await uploadBytes(storageRef, file);
        console.log("uploadedFile:", uploadedFile);

        const downloadURL = await getDownloadURL(storageRef);

        await addDoc(collection(db, "messages"), {
          user: user.uid,
          message: `File uploaded, access it here: ${downloadURL}`,
          date: serverTimestamp(),
        });
      } catch (error) {
        console.log("error:", error);
      }
    } catch (error) {
      console.log("error:", error);
    }

    setFile(null);
    fileInputRef.current!.value = "";
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "messages"), orderBy("date"), limit(100)),
      (snapshot) => {
        const fetchedMessages = [] as Message[];

        snapshot.forEach((document) => {
          const message: Message = {
            id: document.id,
            user: document.data().user,
            message: document.data().message,
            date: document.data().date,
          };

          fetchedMessages.push(message);
        });

        setMessages(fetchedMessages);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl">Chat</h1>
      <ul className="mt-4">
        {messages.map((message) => (
          <li key={message.id} className="mb-2">
            <strong>{message.user}</strong>: <br />
            {message.message}
            <br />
            <small>
              {new Date(
                message.date && message.date.seconds * 1000
              ).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: false,
              })}
            </small>
          </li>
        ))}
      </ul>
      <hr className="my-4" />
      <input
        type="text"
        placeholder="Type a message..."
        className="border border-gray-300 rounded px-2 py-1 mr-2"
        ref={inputRef}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleButtonClick}
      >
        Send
      </button>
      <hr className="my-4" />

      <div>
        <h2 className="text-xl">Select and upload a file:</h2>
        <input
          type="file"
          ref={fileInputRef}
          onChange={(event) => {
            setFile(event.target.files && event.target.files[0]);
          }}
        />
        <button
          className="bg-blue-700 text-white px-4 py-2 rounded"
          onClick={handleFileUpload}
        >
          Upload file
        </button>
      </div>
    </div>
  );
};

export default Chat;
