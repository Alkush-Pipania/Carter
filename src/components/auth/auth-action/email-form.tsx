'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from 'react-hook-form'
import Loader from '@/components/common/Loader'

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
    <div className="space-y-6 w-full mx-auto">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold text-gray-900">Reset Password</h2>
        <p className="text-sm text-gray-500">
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
                    placeholder="Email address"
                    className="h-12 rounded-full border-gray-200 bg-gray-50 px-4 text-gray-900 placeholder:text-gray-400 focus-visible:ring-purple-500"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full h-12 rounded-full bg-purple-500 text-white hover:bg-purple-600 font-medium"
            disabled={isLoading}
          >
            {isLoading ? <Loader /> : 'Send Verification Code'}
          </Button>
        </form>
      </Form>
    </div>
  )
}
