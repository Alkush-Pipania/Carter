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
}

type ChatStore = {
  messages: Message[];
  isLoading: boolean;
  addMessage: (message: Message) => void;
  setLoading: (loading: boolean) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  isLoading: false,
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  setLoading: (loading) => set({ isLoading: loading }),
  clearMessages: () => set({ messages: [] })
}))
