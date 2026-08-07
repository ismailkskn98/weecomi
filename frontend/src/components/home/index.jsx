import HeroType from "@/components/home/hero/heroType";
import Stats from "@/components/home/stats";
import Manifesto from "@/components/home/manifesto";
import Benefits from "@/components/home/benefits";
import Ecosystem from "@/components/home/ecosystem";
import ProductShowcase from "@/components/home/productShowcase";
import Solutions from "@/components/home/solutions";
import Faq from "@/components/home/faq";
import News from "@/components/home/news";

export default function HomeContent() {
  return (
    <>
      <HeroType />
      <Stats />
      <Manifesto />
      <Ecosystem />
      <Benefits />
      <ProductShowcase />
      <Solutions />
      <News />
      <Faq />
    </>
  );
}
