"use client"

import { useState, useEffect } from "react"
import { motion, useAnimationControls } from "framer-motion"

export default function InteractivePacManLogo() {
  const [isHovering, setIsHovering] = useState(false)
  const [pelletVisible, setPelletVisible] = useState(true)
  const pacmanControls = useAnimationControls()
  const pelletControls = useAnimationControls()

  // Handle hover animation
  useEffect(() => {
    if (isHovering) {
      // Animate Pac-Man moving toward and eating the pellet
      const sequence = async () => {
        // First move toward the pellet
        await pacmanControls.start({
          x: 15,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 40%, 60% 50%, 100% 60%, 100% 100%, 0% 100%)",
          transition: { duration: 0.4, ease: "easeInOut" },
        })

        // Then "eat" the pellet
        setPelletVisible(false)
        await pelletControls.start({
          scale: 0,
          opacity: 0,
          transition: { duration: 0.2 },
        })

        // Close mouth slightly after eating
        await pacmanControls.start({
          clipPath: "polygon(0% 0%, 100% 0%, 100% 45%, 70% 50%, 100% 55%, 100% 100%, 0% 100%)",
          transition: { duration: 0.2 },
        })
      }

      sequence()
    } else {
      // Reset to original state with animation
      const resetSequence = async () => {
        await pacmanControls.start({
          x: 0,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 25%, 75% 50%, 100% 75%, 100% 100%, 0% 100%)",
          transition: { duration: 0.4, ease: "easeInOut" },
        })

        setPelletVisible(true)
        pelletControls.start({
          scale: 1,
          opacity: 1,
          transition: { duration: 0.3, delay: 0.2 },
        })
      }

      resetSequence()
    }
  }, [isHovering, pacmanControls, pelletControls])

  return (
    <div
      className="relative w-[50px] h-[40px] cursor-pointer flex items-center"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Pac-Man body */}
      <motion.div
        animate={pacmanControls}
        initial={{
          x: 0,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 25%, 75% 50%, 100% 75%, 100% 100%, 0% 100%)",
        }}
        className="absolute top-[5px] left-[5px] w-[30px] h-[30px] bg-purple-600 rounded-full z-20"
      >
        {/* Dark blue outline */}
        <div
          className="absolute inset-0 border-[3px] border-blue-900 rounded-full"
          style={{
            clipPath: "inherit",
          }}
        />
      </motion.div>

      {/* Power pellet with animation */}
      {pelletVisible && (
        <motion.div
          animate={pelletControls}
          initial={{ scale: 1, opacity: 1 }}
          className="absolute top-[15px] left-[35px] w-[10px] h-[10px] rounded-full z-10 bg-purple-300"
        />
      )}
    </div>
  )
}
