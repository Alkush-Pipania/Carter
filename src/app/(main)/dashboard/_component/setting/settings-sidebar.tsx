import Link from 'next/link'
import { cn } from "@/lib/utils"

const sidebarItems = [
  { name: 'My account', href: '#account', active: true },
  // { name: 'My settings', href: '#settings' },
  // { name: 'My notifications', href: '#notifications' },
  // { name: 'My connections', href: '#connections' },
  // { name: 'Language & region', href: '#language' },
]

export function SettingsSidebar({ activeItem, setActiveItem }: { activeItem: string, setActiveItem: (item: string) => void }) {
  return (
    <nav className="flex flex-col space-y-1">
      {sidebarItems.map((item) => (
        <div
          key={item.name}
          // href={item.href}
          className={cn(
            "px-4 py-2 text-sm cursor-pointer hover:bg-zinc-600  font-medium rounded-md",
            activeItem === item.href
              ? " bg-zinc-500 text-primary-foreground"
              : "text-white"
          )}
          // onClick={() => setActiveItem(item.href)}
        >
          {item.name}
        </div>
      ))}
    </nav>
  )
}

