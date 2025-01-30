import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";


export function SlideIn({children}){

  return(
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