"use client"

import { motion } from "framer-motion"
import { NavMenuItem } from "./types"
import { contentVariants, itemVariants } from "./animations"

interface DropdownContentProps {
    content: NavMenuItem[]
    contentKey: string
}

export function DropdownContent({ content, contentKey }: DropdownContentProps) {
    return (
        <motion.div
            key={contentKey}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 pb-5"
        >
            {content.map((item) => (
                <motion.div
                    key={item.title}
                    variants={itemVariants}
                    whileHover={{
                        scale: 1.02,
                        transition: { type: "spring", stiffness: 400, damping: 25 }
                    }}
                    className={`p-4 md:p-5 rounded-2xl ${item.color} bg-opacity-20 cursor-pointer
                        hover:bg-opacity-30 transition-colors duration-200`}
                >
                    <div className="flex items-center gap-3 md:gap-4">
                        <motion.div
                            className={`p-2 md:p-3 rounded-xl ${item.color}`}
                            whileHover={{ rotate: [0, -8, 8, 0] }}
                            transition={{ duration: 0.35 }}
                        >
                            <item.icon size={20} className="md:w-6 md:h-6 text-white" />
                        </motion.div>
                        <div>
                            <h4 className="font-semibold text-white text-sm md:text-base">{item.title}</h4>
                            <p className="text-xs text-gray-300">{item.description}</p>
                        </div>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    )
}
