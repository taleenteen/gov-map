"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  isVisible: boolean; // ควบคุมการเปิดปิดจากตรงนี้
  className?: string;
}

export const FadeIn = ({ children, isVisible, className }: FadeInProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={className}
          initial={{ opacity: 0, y: 0, scale: 1 }} // เริ่ม: จาง, ต่ำลงนิดนึง, เล็กหน่อย
          animate={{ opacity: 1, y: 0, scale: 1 }} // จบ: ชัด, เข้าที่, ขนาดปกติ
          exit={{ opacity: 0, y: 0, scale: 1 }} // ออก: จาง, ต่ำลง, เล็กหน่อย
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
