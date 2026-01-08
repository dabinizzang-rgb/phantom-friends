import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface StatsCardProps {
  icon: ReactNode;
  value: string | number;
  label: string;
  delay?: number;
}

export const StatsCard = ({ icon, value, label, delay = 0 }: StatsCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ scale: 1.05, y: -2 }}
      className="gradient-warm rounded-2xl p-5 text-center shadow-soft cursor-default"
    >
      <motion.div 
        className="text-3xl mb-2"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        {icon}
      </motion.div>
      <div className="text-3xl font-extrabold text-primary-foreground">{value}</div>
      <div className="text-sm text-primary-foreground/80 mt-1">{label}</div>
    </motion.div>
  );
};
