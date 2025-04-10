import { motion } from "framer-motion";
import React from "react";


export function SlideIn({ children }: { children: React.ReactNode }) {

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  )
}