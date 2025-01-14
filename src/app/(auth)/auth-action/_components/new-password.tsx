'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from 'lucide-react'

const formSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

interface NewPasswordFormProps {
  onSubmit: (password: string , form : any) => void
  isLoading: boolean
}

export default function NewPasswordForm({ onSubmit, isLoading }: NewPasswordFormProps) {
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values.password ,form)
  }

  return (
    <div className="space-y-6 w-full">
      <h2 className="text-start text-2xl font-bold">Create New Password</h2>
      <p className="text-start text-sm text-gray-400">
        Please enter your new password
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="New Password"
                      className="rounded-lg border border-gray-600 bg-transparent px-4 py-3 text-white placeholder-gray-400 focus:border-[#8d33ff] focus:outline-none w-full"
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirm New Password"
                    className="rounded-lg border border-gray-600 bg-transparent px-4 py-3 text-white placeholder-gray-400 focus:border-[#8d33ff] focus:outline-none"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full rounded-lg bg-[#8d33ff] px-4 py-3 font-medium text-white hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-[#8d33ff] focus:ring-offset-2 focus:ring-offset-[#030014] disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Updating...' : 'Update Password'}
          </Button>
        </form>
      </Form>
    </div>
  )
}

