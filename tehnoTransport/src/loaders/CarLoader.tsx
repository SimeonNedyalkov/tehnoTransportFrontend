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
        <div className="absolute bottom-2 w-full h-1 bg-black rounded-full blur-sm"></div>
      </motion.div>
      {/* <div className="absolute bottom-60 w-full flex justify-center">
        <motion.div
          className="relative flex space-x-4 w-200 h-2 bg-gray-700 overflow-hidden"
          animate={{ x: [0, -50, 0] }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        ></motion.div>
      </div> */}
    </div>
  );
};

export default CarLoader;
