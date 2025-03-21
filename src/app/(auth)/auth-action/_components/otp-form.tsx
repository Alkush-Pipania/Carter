'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const formSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits').regex(/^\d+$/, 'OTP must contain only numbers'),
})

interface OtpFormProps {
  email: string
  onSubmit: (otp: string , form : any) => void
  onBack: () => void
  isLoading: boolean
}

export default function OtpForm({ email, onSubmit, onBack, isLoading }: OtpFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: '',
    },
  })

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values.otp , form)
  }

  return (
    <div className="space-y-4 sm:space-y-6 w-full">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold">Enter Verification Code</h2>
        <p className="text-sm sm:text-base text-gray-400">
          We've sent a verification code to {email}
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Enter 6-digit code"
                    className="rounded-lg border border-gray-600 bg-transparent px-3 sm:px-4 py-2 sm:py-3 text-white placeholder-gray-400 focus:border-[#8d33ff] focus:outline-none w-full text-sm sm:text-base text-center tracking-wider"
                    maxLength={6}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage className="text-sm text-center" />
              </FormItem>
            )}
          />
          <div className="space-y-3">
            <Button
              type="submit"
              className="w-full rounded-lg bg-[#8d33ff] px-4 py-2 sm:py-3 font-medium text-white hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-[#8d33ff] focus:ring-offset-2 focus:ring-offset-[#030014] disabled:opacity-50 text-sm sm:text-base"
              disabled={isLoading}
            >
              {isLoading ? 'Verifying...' : 'Verify Code'}
            </Button>
            <Button
              type="button"
              onClick={onBack}
              variant="link"
              className="w-full text-sm sm:text-base text-[#8d33ff] hover:text-opacity-80"
              disabled={isLoading}
            >
              Back to Email
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

