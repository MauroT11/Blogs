'use client'

import { motion } from "framer-motion";

export default function AnimateImg({children}) {

    return (
        <motion.div
            whileHover={{scale: 1.4}}
        >
            {children}
        </motion.div>
    )
}