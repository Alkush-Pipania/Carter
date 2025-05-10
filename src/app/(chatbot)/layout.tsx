

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="h-screen bg-gradient-to-b from-slate-50 to-white dark:bg-gradient-to-b dark:from-brand-bg dark:via-[#1C1C1C] dark:to-[#1C1C1C]  dark:text-white">
    {children}</div>
} 