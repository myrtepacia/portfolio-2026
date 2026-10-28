import BubbleChat from "@/components/BubbleChat";
import TopNav from "@/components/home/TopNav";
import Hero from "@/components/home/Hero";
import ProjectShowcase from "@/components/home/ProjectShowcase";
import Education from "@/components/home/Education";
import ConnectFooter from "@/components/home/ConnectFooter";
import ContactIntro from "@/components/home/ContactIntro";
import GithubContributions from "@/sections/GithubContributions";

export default function Home() {
  return (
    // overflow-x-clip: the fanned project cards may poke past the viewport edge; clip keeps the sticky header working
    <div className="min-h-screen overflow-x-clip">
      <TopNav />

      <main id="top" data-comment="Main content" className="mx-auto max-w-[880px] space-y-20 px-5 pb-20 sm:px-8">
        <Hero />
        <ProjectShowcase />
        <Education />
        <GithubContributions />

        <section id="contact" aria-labelledby="contact-title" data-comment="Contact" className="scroll-mt-20">
          <h2 id="contact-title" className="mb-8 text-[28px] font-bold tracking-[-0.03em] sm:text-[32px]">Get in Touch</h2>
          <ContactIntro />
          <ConnectFooter />
        </section>
      </main>

      <div
        role="complementary"
        aria-label="Chat assistant"
        data-comment="AI chat assistant"
        className="fixed bottom-5 right-0 z-30 padding-x w-full sm:w-[50%] lg:w-[40%] xl:w-[30%]"
      >
        <BubbleChat />
      </div>
    </div>
  );
}
