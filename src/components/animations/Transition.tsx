import { motion } from "framer-motion";

interface TransitionProps {
  children: React.ReactNode;
}

export const Transition = ({ children }: TransitionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5}}
    >
      {children}
    </motion.div>
  );
};
