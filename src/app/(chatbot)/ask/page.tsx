"use client"

import { useEffect, useState } from "react";
import Chatcomponent from "@/components/chatbot/Chatcomponent";

export default function ChatPage() {
  const [greeting, setGreeting] = useState<string>("");

  useEffect(() => {
    const getGreeting = () => {
      return "How can i help you today ?";
    };

    setGreeting(getGreeting());
  }, []);

  return (
    <Chatcomponent greetings={greeting} />
  );
}