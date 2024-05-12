'use client'

import { motion } from "framer-motion";

export default function PopHeader({children}) {

    return (
        <motion.div
            whileHover={{scale: 1.5}}
        >
            {children}
        </motion.div>
    )
}