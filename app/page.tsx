import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Discovery from "@/components/Discovery";
import HowItWorks from "@/components/HowItWorks";
import WhyItMatters from "@/components/WhyItMatters";
import StoryBridge from "@/components/StoryBridge";
import VideoBlock from "@/components/VideoBlock";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Discovery />
        <HowItWorks />
        <WhyItMatters />
        <StoryBridge />
        <VideoBlock />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
