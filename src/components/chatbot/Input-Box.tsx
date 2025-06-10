"use client"

import { ArrowUp, Loader2, Plus, X, Key } from "lucide-react"
import { useState, useEffect } from "react"
import TextareaAutosize from "react-textarea-autosize"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"

const formSchema = z.object({
  message: z.string().min(1, { message: "Message cannot be empty" }),
})

type FormValues = z.infer<typeof formSchema>

type InputBoxProps = {
  id: string
  onSendMessage: (message: string) => Promise<void>
  greeting?: string
  hasMessages: boolean
  setSecretKey: (secretKey: string) => void
}

export default function InputBox({ setSecretKey, onSendMessage, greeting, hasMessages }: InputBoxProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSecretKeyInput, setShowSecretKeyInput] = useState(false)
  const [currentSecretKey, setCurrentSecretKey] = useState("")
  const [tempSecretKey, setTempSecretKey] = useState("")

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { message: "" },
  })

  useEffect(() => {
    // Load secret key from localStorage on component mount
    const savedKey = localStorage.getItem("secretKey")
    if (savedKey) {
      setCurrentSecretKey(savedKey)
      setSecretKey(savedKey)
    }
  }, [setSecretKey])

  const handleSaveSecretKey = () => {
    if (tempSecretKey.trim()) {
      setCurrentSecretKey(tempSecretKey.trim())
      setSecretKey(tempSecretKey.trim())
      localStorage.setItem("secretKey", tempSecretKey.trim())
      setTempSecretKey("")
      setShowSecretKeyInput(false)
    }
  }

  const handleRemoveSecretKey = () => {
    setCurrentSecretKey("")
    setSecretKey("")
    localStorage.removeItem("secretKey")
  }

  const onSubmit = async (values: FormValues) => {
    if (!values.message.trim() || isSubmitting) return

    try {
      setIsSubmitting(true)
      await onSendMessage(values.message)
      form.reset()
    } catch (error) {
      console.error("Error submitting message:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Position classes change based on whether there are messages
  const containerPositionClass = hasMessages
    ? "fixed bottom-0 left-0 right-0 pb-4 z-50"
    : "fixed inset-0 flex items-center justify-center pointer-events-none z-50"

  // Dynamic styling based on secret key presence
  const hasSecretKey = !!currentSecretKey
  const borderColor = hasSecretKey
    ? "border-emerald-200 dark:border-emerald-700"
    : "border-slate-200 dark:border-gray-700"
  const bgColor = hasSecretKey ? "bg-emerald-50 dark:bg-emerald-950/20" : "bg-white dark:bg-zinc-800"
  const focusBorderColor = hasSecretKey
    ? "focus-within:border-emerald-400 dark:focus-within:border-emerald-500"
    : "focus-within:border-blue-300 dark:focus-within:border-zinc-400"
  const ringColor = hasSecretKey ? "ring-emerald-100 dark:ring-emerald-900/20" : "ring-slate-100 dark:ring-transparent"

  return (
    <div className={containerPositionClass}>
      <div
        className={`w-full max-w-[800px] mx-auto px-4 pointer-events-auto ${hasMessages ? "" : "flex flex-col items-center"}`}
      >
        {greeting && !hasMessages && (
          <h1 className="text-2xl font-medium text-slate-900 dark:text-white mb-5 text-center transition-colors">
            {greeting}
          </h1>
        )}
        <div className="w-full">
          <div
            className={`border ${borderColor} ${bgColor} rounded-xl p-3 shadow-md hover:shadow-lg ${focusBorderColor} transition-all w-full ring-1 ${ringColor}`}
          >
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
                            placeholder={hasSecretKey ? "Ask with your secret key active..." : "Find your Links?"}
                            className={`w-full bg-transparent resize-none text-base py-2 px-1 outline-none border-none disabled:opacity-50 transition-colors ${
                              hasSecretKey
                                ? "text-emerald-800 dark:text-emerald-200 placeholder:text-emerald-600 dark:placeholder:text-emerald-400"
                                : "text-slate-800 dark:text-gray-200 placeholder:text-slate-500 dark:placeholder:text-gray-400"
                            }`}
                            onKeyDown={(event: any) => {
                              if (event.key === "Enter" && !event.shiftKey && !isSubmitting) {
                                event.preventDefault()
                                form.handleSubmit(onSubmit)()
                              }
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex gap-2 items-center">
                      {showSecretKeyInput ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="password"
                            value={tempSecretKey}
                            onChange={(e) => setTempSecretKey(e.target.value)}
                            placeholder="Enter your secret key"
                            className="bg-slate-100 dark:bg-zinc-700 border border-slate-300 dark:border-gray-600 text-slate-800 dark:text-gray-200 text-sm rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition-all min-w-[200px]"
                            autoFocus
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault()
                                handleSaveSecretKey()
                              }
                              if (e.key === "Escape") {
                                setShowSecretKeyInput(false)
                                setTempSecretKey("")
                              }
                            }}
                          />
                          <button
                            type="button"
                            onClick={handleSaveSecretKey}
                            disabled={!tempSecretKey.trim()}
                            className="text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none font-medium rounded-lg text-xs px-3 py-1.5 shadow-sm hover:shadow-md transition-all duration-200"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setShowSecretKeyInput(false)
                              setTempSecretKey("")
                            }}
                            className="p-1.5 text-slate-500 dark:text-gray-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-700 rounded-full transition-all"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : hasSecretKey ? (
                        <div className="flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700 rounded-lg px-3 py-1.5">
                          <Key size={14} className="text-emerald-600 dark:text-emerald-400" />
                          <span className="text-sm text-emerald-700 dark:text-emerald-300 font-medium">
                            {currentSecretKey.substring(0, 8)}...
                          </span>
                          <button
                            type="button"
                            onClick={handleRemoveSecretKey}
                            className="p-1 text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-200 hover:bg-emerald-200 dark:hover:bg-emerald-800/50 rounded-full transition-all"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setShowSecretKeyInput(true)}
                          className="h-8 w-8 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-zinc-700 dark:to-zinc-600 border border-slate-300 dark:border-gray-600 rounded-md flex items-center justify-center text-slate-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-gray-300 hover:border-slate-400 dark:hover:border-gray-500 transition-all hover:shadow-sm hover:scale-105"
                        >
                          <span className="sr-only">Enter your secret key</span>
                          <Plus className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <div className="flex items-center">
                      <button
                        type="submit"
                        className={`h-8 w-8 text-white cursor-pointer rounded-md transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md hover:scale-105 ${
                          hasSecretKey
                            ? "bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
                            : "bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                        }`}
                        disabled={!form.formState.isValid || isSubmitting}
                      >
                        {isSubmitting ? (
                          <Loader2 className="w-4 h-4 text-white animate-spin" />
                        ) : (
                          <ArrowUp className="w-4 h-4 text-white" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}
