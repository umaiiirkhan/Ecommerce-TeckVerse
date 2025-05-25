import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, ChevronUp, ChevronDown } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

const AudioPlayer = () => {
  const { isPlaying, toggleAudio, volume, setVolume } = useAudio();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <motion.div
        className="bg-gray-900/80 backdrop-blur-lg rounded-full p-3 shadow-lg flex items-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <button
          onClick={toggleAudio}
          className="rounded-full p-2 bg-primary-500 text-white hover:bg-primary-600 transition-colors"
          aria-label={isPlaying ? 'Mute background music' : 'Play background music'}
        >
          {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 'auto', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="ml-2 flex items-center overflow-hidden"
            >
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-20 accent-primary-500"
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="ml-2 text-white hover:text-primary-500 transition-colors"
          aria-label={isExpanded ? 'Hide volume control' : 'Show volume control'}
        >
          {isExpanded ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
        </button>
      </motion.div>
    </div>
  );
};

export default AudioPlayer;