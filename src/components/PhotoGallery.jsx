import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function PhotoGallery({ photos = [] }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  if (photos.length === 0) {
    return (
      <div className="w-full bg-soft-off-white rounded-lg flex items-center justify-center py-12">
        <p className="text-text-dark-gray">Photo gallery not configured.</p>
      </div>
    );
  }

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {photos.map((photo, index) => (
          <motion.div
            key={index}
            className="cursor-pointer overflow-hidden rounded-lg shadow-md"
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedIndex(index)}
          >
            <img
              src={photo.src}
              alt={photo.alt || `Photo ${index + 1}`}
              className="w-full h-64 object-cover"
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedIndex(null)}
        >
          <motion.div
            className="max-w-4xl w-full"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photos[selectedIndex].src}
              alt={photos[selectedIndex].alt || `Photo ${selectedIndex + 1}`}
              className="w-full rounded-lg shadow-xl"
            />
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setSelectedIndex((selectedIndex - 1 + photos.length) % photos.length)}
                className="px-4 py-2 bg-light-gray bg-opacity-20 hover:bg-opacity-30 rounded-lg text-warm-white transition-colors"
              >
                ← Previous
              </button>
              <button
                onClick={() => setSelectedIndex((selectedIndex + 1) % photos.length)}
                className="px-4 py-2 bg-light-gray bg-opacity-20 hover:bg-opacity-30 rounded-lg text-warm-white transition-colors"
              >
                Next →
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
