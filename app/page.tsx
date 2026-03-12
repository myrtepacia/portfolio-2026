import Header from "@/components/Header";
import BentoGrid from "@/components/BentoGrid";
import Footer from "@/sections/Footer";
import BubbleChat from "@/components/BubbleChat";

export default function Home() {
  return (
   <div className="pt-10  ">  

      <div className=" fixed bottom-5 right-0 z-5 padding-x w-full sm:w-[50%] lg:w-[40%] xl:w-[30%]">
        <BubbleChat/>
      </div>

      <Header/>
      <BentoGrid/>
      <Footer/>

    
   </div>
  );
}
