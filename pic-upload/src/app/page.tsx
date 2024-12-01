import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Body from "../components/Body";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <Body />
      <Footer />
    </main>
  );
}
