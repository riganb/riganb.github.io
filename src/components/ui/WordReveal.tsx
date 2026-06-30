'use client'

import { motion } from 'framer-motion'

interface WordRevealProps {
  text: string
}

export default function WordReveal({ text }: WordRevealProps) {
  const words = text.split(' ')

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.08,
          },
        },
      }}
      className="flex flex-wrap"
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: {
              color: '#6B7280', // muted
            },
            visible: {
              color: '#FFFFFF',
              transition: {
                duration: 0.4,
                ease: 'easeOut',
              },
            },
          }}
          className="mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}