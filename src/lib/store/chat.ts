import { create } from 'zustand'
import { z } from 'zod'

export const InputSchema = z.object({
  userInput: z.string(),
  userId: z.string()
});

export const ResponseSchema = z.object({
  intro: z.string()
    .min(10)
    .max(1000)
    .describe("An engaging introduction paragraph about the topic"),
  contentSections: z.array(
    z.object({
      title: z.string()
        .min(2)
        .max(200)
        .describe("Title of the content section"),
      content: z.string()
        .min(10)
        .max(1000)
        .describe("Main content of the section"),
      links: z.array(
        z.object({
          url: z.string()
            .describe("URL of the reference"),
          title: z.string()
            .min(2)
            .max(200)
            .describe("Title or description of the link")
        })
      )
        .min(0)
        .describe("Related links for this section")
    })
  )
    .min(0)
    .describe("Array of content sections with their associated links"),
  outro: z.string()
    .min(10)
    .max(1000)
    .describe("A concluding paragraph that summarizes key points")
});

export type ResponseType = z.infer<typeof ResponseSchema>;

type Message = {
  content: string | ResponseType;
  role: 'user' | 'assistant';
  isStructured?: boolean;
  isStreaming?: boolean;
}

type ChatStore = {
  messages: Message[];
  isLoading: boolean;
  isStreaming: boolean;
  currentStreamedContent: string;
  addMessage: (message: Message) => void;
  updateLastMessage: (content: string) => void;
  appendToLastMessage: (chunk: string) => void;
  setLoading: (loading: boolean) => void;
  setStreaming: (streaming: boolean) => void;
  clearMessages: () => void;
  finalizeStreamedMessage: () => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  isLoading: false,
  isStreaming: false,
  currentStreamedContent: '',
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  updateLastMessage: (content) => set((state) => {
    const messages = [...state.messages];
    if (messages.length > 0) {
      messages[messages.length - 1].content = content;
    }
    return { messages };
  }),
  appendToLastMessage: (chunk) => set((state) => {
    // If there are no messages yet, we need to create one first
    if (state.messages.length === 0) {
      return {
        messages: [{ role: 'assistant', content: chunk, isStreaming: true }],
        currentStreamedContent: chunk
      };
    }

    const updatedContent = state.currentStreamedContent + chunk;
    const messages = [...state.messages];
    const lastMessage = messages[messages.length - 1];

    // Only update if the last message is from the assistant and is streaming
    if (lastMessage.role === 'assistant' && lastMessage.isStreaming) {
      lastMessage.content = updatedContent;
      return { messages, currentStreamedContent: updatedContent };
    }

    // If last message is not from assistant or not streaming, add a new message
    return {
      messages: [...messages, { role: 'assistant', content: chunk, isStreaming: true }],
      currentStreamedContent: chunk
    };
  }),
  setLoading: (loading) => set({ isLoading: loading }),
  setStreaming: (streaming) => set({
    isStreaming: streaming,
    currentStreamedContent: streaming ? get().currentStreamedContent : ''
  }),
  clearMessages: () => set({ messages: [], currentStreamedContent: '' }),
  finalizeStreamedMessage: () => set((state) => {
    const messages = [...state.messages];
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.isStreaming) {
        lastMessage.isStreaming = false;
      }
    }
    return { messages, isStreaming: false, currentStreamedContent: '' };
  })
}))
