// Animation variants for the dropdown container
export const containerVariants = {
    hidden: {
        height: 0,
        opacity: 0,
        transition: {
            height: { duration: 0.12, ease: [0.4, 0, 0.2, 1] },
            opacity: { duration: 0.08 }
        }
    },
    visible: {
        height: "auto",
        opacity: 1,
        transition: {
            height: { duration: 0.15, ease: [0.4, 0, 0.2, 1] },
            opacity: { duration: 0.1 }
        }
    }
}

// Animation variants for content swap
export const contentVariants = {
    hidden: {
        opacity: 0,
        y: 6,
        transition: { duration: 0.08 }
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.1,
            staggerChildren: 0.02,
            delayChildren: 0.02
        }
    },
    exit: {
        opacity: 0,
        y: -6,
        transition: { duration: 0.08 }
    }
}

// Animation variants for individual menu items
export const itemVariants = {
    hidden: {
        opacity: 0,
        y: 8,
        scale: 0.98
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 600,
            damping: 30
        }
    },
    exit: {
        opacity: 0,
        y: -6,
        transition: { duration: 0.06 }
    }
}

// Mobile menu variants
export const mobileMenuVariants = {
    hidden: {
        opacity: 0,
        height: 0,
        transition: { duration: 0.1 }
    },
    visible: {
        opacity: 1,
        height: "auto",
        transition: {
            duration: 0.15,
            staggerChildren: 0.03,
            delayChildren: 0.02
        }
    }
}

export const mobileItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { type: "spring", stiffness: 600, damping: 30 }
    }
}

// Chevron rotation spring config
export const chevronSpring = {
    type: "spring" as const,
    stiffness: 400,
    damping: 25
}
