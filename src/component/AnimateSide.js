'use client'

import { motion } from "framer-motion";

export default function AnimateSide({children}) {

    return (
        <motion.div
            initial={{opacity: 0, x: '-100%'}}
            animate={{opacity: 1, x: '0%'}}
            viewport={{once: false}}
            transition={{ duration: 1}}
        >
            {children}
        </motion.div>
    )
}