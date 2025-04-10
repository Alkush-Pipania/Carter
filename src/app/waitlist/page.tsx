import { Waitlist } from "@/components/waitlist"

export default function WaitlistPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0e0525] px-4 py-12">
      <div className="w-full max-w-md">
        <h1 className="mb-8 text-center text-3xl font-bold text-white md:text-4xl">
          Join the <span className="text-purple-400">Carter</span> Waitlist
        </h1>
        <p className="mb-8 text-center text-gray-300">
          Be among the first to organize, share, and manage your links with ease.
        </p>
        <Waitlist />
      </div>
    </div>
  )
}
