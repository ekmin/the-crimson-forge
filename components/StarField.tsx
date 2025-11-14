"use client"

import { motion } from 'framer-motion'

const Starfiled = () => {
  return (
    <motion.div
        className="absolute top-0 left-0 w-[200%] h-[200%] opacity-100"
        style={{
          backgroundImage: `
            radial-gradient(2px 2px at 20px 30px, #eee, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 60px 70px, #fff, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 50px 50px, #fff, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 130px 80px, #fff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 90px 10px, #fff, rgba(0,0,0,0))
          `,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
        }}
        animate={{
          y: ['0%', '-200px'],
        }}
        transition={{
          duration: 120,
          ease: 'linear',
          repeat: Infinity,
        }}
      />
  )
}

export default Starfiled