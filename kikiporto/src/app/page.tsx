import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import MyProjects from "@/components/MyProjects"; // Import the new component
import GetToKnowMe from "@/components/GetToKnowMe";
import PreviewMyCV from "@/components/PreviewMyCV";
import Contact from "@/components/Contact"; // Import Contact

export default function Home() {
  return (
    <main className="relative z-10 w-full overflow-x-hidden">
      <div className="content-wrapper">
        <Hero />
        <MyProjects />
        <GetToKnowMe />
        <PreviewMyCV />
        <Contact /> 
      </div>
      <Navbar />
    </main>
  );
}
