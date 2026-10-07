"use client";
import { faqs } from "@/constants/data/faqs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import DesignAsset from "./DesignAsset";

export default function Faq() {
  return (
    <section className="faq-section" id="faqs" aria-labelledby="faq-title">
      <h2 id="faq-title">Frequently Asked Questions (FAQs)</h2>
      <Accordion>
        {faqs.map((f, i) => (
          <AccordionItem className="border-0" key={f.q} value={`q${i}`}>
            <AccordionTrigger className="faq-trigger">
              {f.q}
              <span className="faq-chevron">
                <DesignAsset name="imgSvg3" />
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-5 leading-7 text-sp-gray">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <a className="faq-more" href="https://sharepal.in/faq">
        View more FAQ’s
      </a>
    </section>
  );
}
