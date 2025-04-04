// components/InputBox.tsx
"use client";

import { ArrowUp, Loader2 } from "lucide-react";
import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

const formSchema = z.object({
  message: z.string().min(1, { message: "Message cannot be empty" })
});

type FormValues = z.infer<typeof formSchema>;

type InputBoxProps = {
  isMobile: boolean;
  id: string;
  onSendMessage: (message: string) => Promise<void>;
}

export default function InputBox({ isMobile, onSendMessage }: InputBoxProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { message: "" }
  });

  const onSubmit = async (values: FormValues) => {
    if (!values.message.trim() || isSubmitting) return;
    
    try {
      setIsSubmitting(true);
      await onSendMessage(values.message);
      form.reset();
    } catch (error) {
      console.error('Error submitting message:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`w-full max-w-4xl mx-auto px-4 ${isMobile ? "fixed bottom-0 left-0 right-0 pb-4 z-50 backdrop-blur-sm" : "pb-4"}`}>
      <div className="border border-gray-600 bg-InputBG/90 duration-150 ease-in-out rounded-2xl p-3 shadow-lg    focus-within:outline focus-within:outline-1 focus-within:outline-primary-purple/primary-purple-500 transition-all">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="relative">
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <TextareaAutosize
                        {...field}
                        autoFocus
                        disabled={isSubmitting}
                        minRows={1}
                        maxRows={6}
                        placeholder="find what you saved before"
                        className="w-full bg-transparent resize-none custom-scrollbar text-gray-200 text-lg font-Quan py-2 px-1 outline-none border-none disabled:opacity-50"
                        onKeyDown={(event) => {
                          if (event.key === "Enter" && !event.shiftKey && !isSubmitting) {
                            event.preventDefault();
                            form.handleSubmit(onSubmit)();
                          }
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-end mt-2">
                <button
                  type="submit"
                  className="p-2 bg-primary-purple/primary-purple-500 hover:bg-primary-purple/primary-purple-600 cursor-pointer rounded-full transition-all duration-200 shadow-lg shadow-primary-purple/primary-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!form.formState.isValid || isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 text-white animate-spin" />
                  ) : (
                    <ArrowUp className="w-5 h-5 text-white" />
                  )}
                </button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}