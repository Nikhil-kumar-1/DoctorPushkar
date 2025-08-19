import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function HeroVideo() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoContainerRef = useRef(null);

  // Array of YouTube video IDs
  const youtubeVideos = [
    "h7oIoKll7Y", // Video 1
    "ZP9Zheo7CGY", // Video 2
    "qMyX1RxWPEk", // Video 3
    "GyXtEkaFrc0", // Video 4
    "eEVDuo_TH3I", // Video 5
  ];

  // Handle video toggle
  const toggleVideo = (direction) => {
    if (direction === 'next') {
      setCurrentVideoIndex((prev) => (prev + 1) % youtubeVideos.length);
    } else {
      setCurrentVideoIndex((prev) => 
        prev === 0 ? youtubeVideos.length - 1 : prev - 1
      );
    }
  };

  // Handle scroll to next section
  const handleScrollDown = () => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth"
    });
  };

  // Auto-advance videos every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      toggleVideo('next');
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[800px] max-h-[1000px] overflow-hidden">
      {/* Video Background Container */}
      <div 
        ref={videoContainerRef}
        className="absolute inset-0 w-full h-full"
      >
        {/* Video with rounded corners and overflow hidden */}
        <div className="absolute inset-0 rounded-[4rem] overflow-hidden mx-8 my-16 shadow-2xl">
          <iframe
            className="w-full h-full object-cover"
            src={`https://www.youtube.com/embed/${youtubeVideos[currentVideoIndex]}?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=${youtubeVideos[currentVideoIndex]}&controls=0&disablekb=1&modestbranding=1&rel=0`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={`Background Video ${currentVideoIndex + 1}`}
          ></iframe>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F1C] to-transparent opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1F1C] to-transparent opacity-50" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white text-center max-w-3xl"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Surgical <span className="text-[#6CCF5F]">Excellence</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Advanced laparoscopic and laser procedures with 20+ years of expertise
          </p>
        </motion.div>
      </div>

      {/* Video Controls */}
      <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 flex items-center space-x-8 z-20">
        {/* Previous Video Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => toggleVideo('prev')}
          className="bg-black bg-opacity-20 backdrop-blur-sm p-3 rounded-full hover:bg-opacity-30 transition"
          aria-label="Previous video"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
            <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clipRule="evenodd" />
          </svg>
        </motion.button>

        {/* Video Indicator Dots */}
        <div className="flex space-x-2">
          {youtubeVideos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentVideoIndex(index)}
              className={`w-3 h-3 rounded-full transition ${currentVideoIndex === index ? 'bg-[#6CCF5F] w-6' : 'bg-white bg-opacity-50'}`}
              aria-label={`Go to video ${index + 1}`}
            />
          ))}
        </div>

        {/* Next Video Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => toggleVideo('next')}
          className="bg-black bg-opacity-20 backdrop-blur-sm p-3 rounded-full hover:bg-opacity-30 transition"
          aria-label="Next video"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
            <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
          </svg>
        </motion.button>
      </div>

      {/* Sound Toggle Button */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="absolute bottom-8 right-8 bg-black bg-opacity-20 backdrop-blur-sm p-3 rounded-full hover:bg-opacity-30 transition z-20"
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
            <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z" />
            <path d="M15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
            <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM17.78 9.22a.75.75 0 10-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 001.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 101.06-1.06L20.56 12l1.72-1.72a.75.75 0 00-1.06-1.06l-1.72 1.72-1.72-1.72z" />
          </svg>
        )}
      </button>

      {/* Scrolling Indicator */}
      <motion.button
        onClick={handleScrollDown}
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 focus:outline-none z-20"
        aria-label="Scroll down"
      >
        <div className="flex flex-col items-center">
          <p className="text-white text-sm mb-2">Scroll Down</p>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 10L12 15L17 10"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </motion.button>
    </section>
  );
}