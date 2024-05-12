'use client'

import { motion } from "framer-motion";

export default function AlbumPop({children}) {

    return (
        <motion.div
            whileHover={{scale: 1.1}}
        >
            {children}
        </motion.div>
    )
}