import { motion } from "framer-motion";
import { Car } from "lucide-react";

const CarLoader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-transparent">
      <motion.div
        className="flex items-center"
        animate={{ x: [0, 100, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <Car className="text-blue-500 w-16 h-16" />
      </motion.div>
    </div>
  );
};

export default CarLoader;
