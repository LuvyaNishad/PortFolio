import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import GlassFilter from "./components/ui/GlassFilter";
import ScrollProgress from "./components/ui/ProgressBar";
import Loader from "./components/loader/Loader";

import Background from "./components/layout/Background";
import BottomViewportBlur from "./components/layout/BottomViewportBlur";
import CustomCursor from "./components/layout/CustomCursor";
import LightPageBackground from "./components/layout/LightPageBackground";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";

import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Tools from "./components/sections/Tools";
import Library from "./components/sections/Library";
import GitHubContributions from "./components/sections/GitHubContributions";
import Contact from "./components/sections/Contact";

import Thumbnails from "./components/sections/work/Thumbnails";
import VideoEdits from "./components/sections/work/VideoEdits";
import GraphicDesign from "./components/sections/work/GraphicDesign";
import CodeProjects from "./components/sections/work/CodeProjects";

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <GlassFilter />
      <ScrollProgress />
      <Loader onDone={() => setLoaded(true)} />

      <AnimatePresence>
        {loaded && (
          <motion.div
            key="portfolio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <CustomCursor />
            <Background />
            <BottomViewportBlur />

            <motion.div
              initial={{ y: -48, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Nav />
            </motion.div>

            <main aria-label="Portfolio content" style={{ position: "relative" }}>
              <div style={{ position: "relative" }}>
                <LightPageBackground />

                <motion.div
                  initial={{ opacity: 0, y: 32, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Hero />
                </motion.div>

                <About />
                <Tools />
                <Library />
                <Thumbnails />
                <VideoEdits />
                <GraphicDesign />
                <CodeProjects />
                <GitHubContributions />
              </div>

              <Contact />
            </main>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
