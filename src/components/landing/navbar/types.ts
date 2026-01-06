import { LucideIcon } from "lucide-react"

export interface NavMenuItem {
    icon: LucideIcon
    title: string
    description: string
    color: string
}

export interface DropdownContentProps {
    content: NavMenuItem[]
    contentKey: string
}

export interface MobileMenuProps {
    isOpen: boolean
    expandedMenu: string | null
    setExpandedMenu: (menu: string | null) => void
    featuresContent: NavMenuItem[]
    whyContent: NavMenuItem[]
}

export interface DesktopNavLinksProps {
    expandedMenu: string | null
    setExpandedMenu: (menu: string | null) => void
}

export interface DesktopDropdownProps {
    expandedMenu: string | null
    mobileMenuOpen: boolean
    featuresContent: NavMenuItem[]
    whyContent: NavMenuItem[]
}

export interface MobileMenuButtonProps {
    isOpen: boolean
    onClick: () => void
}
