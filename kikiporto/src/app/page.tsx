import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import MyProjects from "@/components/MyProjects"; // Import the new component
import GetToKnowMe from "@/components/GetToKnowMe";
import PreviewMyCV from "@/components/PreviewMyCV";

export default function Home() {
  return (
    <div>
      {/* <Navbar /> */}
      <Hero />
      <MyProjects /> {/* Add the MyProjects component here */}
      <GetToKnowMe />
      <PreviewMyCV />
    </div>
  );
}
