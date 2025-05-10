'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from 'react-hook-form'

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
})

interface EmailFormProps {
  onSubmit: (email: string, form: ReturnType<typeof useForm<z.infer<typeof formSchema>>>) => void
  isLoading: boolean
}

export default function EmailForm({ onSubmit, isLoading }: EmailFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values.email, form)
  }

  return (
    <div className="space-y-4 sm:space-y-6 w-full mx-auto">
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold">Reset Password</h2>
        <p className="text-sm sm:text-base text-gray-400">
          Enter your email address and we&apos;ll send you a verification code.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="Email"
                    className="rounded-lg border border-zinc-600 bg-transparent px-3 sm:px-4 py-2 sm:py-3 text-white placeholder-gray-400 focus:outline-none w-full text-sm sm:text-base"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full rounded-lg bg-white/80 text-xs hover:bg-pureWhite hover:bg-opacity-90 focus:outline-none focus:ring-2 text-black focus:ring-offset-2 focus:ring-offset-[#030014] disabled:opacity-50 sm:text-base"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Verification Code'}
          </Button>
        </form>
      </Form>
    </div>
  )
}
