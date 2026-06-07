import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react'

export default function ImageGallery({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Safety check if images array is empty or undefined
  if (!images || images.length === 0) {
    return <div className="h-[400px] bg-surface-variant rounded-2xl flex items-center justify-center">No images available</div>
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image Viewport */}
      <div className="relative w-full md:max-w-xl aspect-[4/3] md:aspect-square mx-auto rounded-2xl overflow-hidden ambient-shadow group bg-neutral-950 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Gallery image ${currentIndex + 1}`}
            className="w-full h-full object-contain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                nextImage();
              } else if (swipe > swipeConfidenceThreshold) {
                prevImage();
              }
            }}
          />
        </AnimatePresence>

        {/* Controls - Show on hover for desktop, always on for mobile */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/60 transition-luxury md:opacity-0 group-hover:opacity-100 z-10"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/60 transition-luxury md:opacity-0 group-hover:opacity-100 z-10"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>

            {/* Counter Badge */}
            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full font-label-caps text-[10px] z-10">
              {currentIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails Navigation */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 justify-start md:justify-center max-w-xl mx-auto hide-scrollbar w-full">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden transition-all duration-300 ${idx === currentIndex ? 'ring-2 ring-mud-brick ring-offset-2 ring-offset-background opacity-100' : 'opacity-60 hover:opacity-100'
                }`}
            >
              <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// Swipe configuration for framer motion
const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};
