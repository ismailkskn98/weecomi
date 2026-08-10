import Stats from "@/components/home/stats";
import Manifesto from "@/components/home/manifesto";
import Benefits from "@/components/home/benefits";
import Ecosystem from "@/components/home/ecosystem";
import ProductShowcase from "@/components/home/productShowcase";
import Testimonials from "@/components/home/testimonials";
import Faq from "@/components/home/faq";
import News from "@/components/home/news";
import Hero2 from "./hero2";

export default function HomeContent() {
  return (
    <>
      <Hero2 />
      <Stats />
      <Manifesto />
      <Ecosystem />
      <Benefits />
      <ProductShowcase />
      <Testimonials />
      <News />
      <Faq />
    </>
  );
}
