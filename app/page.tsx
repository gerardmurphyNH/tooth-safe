import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Discovery from "@/components/Discovery";
import HowItWorks from "@/components/HowItWorks";
import WhyItMatters from "@/components/WhyItMatters";
import StoryBridge from "@/components/StoryBridge";
import FAQ from "@/components/FAQ";
import FilmStills from "@/components/FilmStills";
import Prototype from "@/components/Prototype";
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
        {/* Film sits right after the story it belongs to, while attention is
            still high — driving views is a primary goal, not an afterthought. */}
        <VideoBlock />
        {/* Stills sit under the player: proof the object is real, and the
            argument for pressing play. */}
        <FilmStills />
        <HowItWorks />
        {/* Mechanism explained, then the real object — this is the CTA's
            evidence, so it sits on the way down to the form. */}
        <Prototype />
        <WhyItMatters />
        <FAQ />
        {/* CTA sits before the workshop link so the signup ask comes
            before the only invitation to leave the site. */}
        <CTASection />
        <StoryBridge />
      </main>
      <Footer />
    </>
  );
}
