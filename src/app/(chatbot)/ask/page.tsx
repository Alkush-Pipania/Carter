import Chatcomponent from "@/components/chatbot/Chatcomponent";

export default async function ChatPage() {
  const getGreeting = (users: string) => {
    const hour = new Date().getHours();
    let greetingText = "";

    if (hour >= 5 && hour < 12) {
      greetingText = "Good morning";
    } else if (hour >= 12 && hour < 17) {
      greetingText = "Good afternoon";
    } else if (hour >= 17 && hour < 22) {
      greetingText = "Good evening";
    } else {
        greetingText = "Good night";
      }

    if (users) {
      greetingText += `, ${users || 'there'}`;
    } else {
      greetingText = "Welcome to GOOG";
    }

    return greetingText;
  };
    // right now the name is harcoded ...
  return (
    <Chatcomponent greetings={getGreeting("alkush")} />
  );
}