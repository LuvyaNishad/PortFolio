import { useState } from "react";

import Background from "./components/layout/Background";
import CustomCursor from "./components/layout/CustomCursor";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";

import Loader from "./components/loader/Loader";

import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
// (we’ll add others in next phases)

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <Loader onDone={() => setLoaded(true)} />}

      <Background />
      <CustomCursor />
      <Nav />

      <Hero />
      <About />

      <Footer />
    </>
  );
}