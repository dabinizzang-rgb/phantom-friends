import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen gradient-soft flex items-center justify-center p-6 pb-28">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="text-8xl mb-6"
        >
          👻
        </motion.div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Page Not Found
        </h1>
        <p className="text-muted-foreground mb-6">
          Even ghost friends can't find this page...
        </p>
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="gradient-warm text-primary-foreground font-semibold px-6 py-3 rounded-2xl shadow-soft flex items-center gap-2 mx-auto"
          >
            <Home size={20} />
            Go Home
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
