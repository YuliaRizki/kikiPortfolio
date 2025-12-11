import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import MyProjects from "@/components/MyProjects"; // Import the new component
import GetToKnowMe from "@/components/GetToKnowMe";
import Experience from "@/components/Experience";
import PreviewMyCV from "@/components/PreviewMyCV";
import Contact from "@/components/Contact"; // Import Contact
import KonamiCode from "@/components/KonamiCode";
import CyberCat from "@/components/CyberCat";
import CyberCursor from "@/components/CyberCursor";
import CyberGallery from "@/components/CyberGallery";

export default function Home() {
  return (
    <main className="relative z-10 w-full overflow-x-hidden">
      <KonamiCode />
      <CyberCat />
      <CyberCursor />
      <div className="content-wrapper">
        <Hero />
        <MyProjects />
        <GetToKnowMe />
        <Experience />
        <PreviewMyCV />
        <CyberGallery />
        <Contact />
      </div>
      <Navbar />
    </main>
  );
}
