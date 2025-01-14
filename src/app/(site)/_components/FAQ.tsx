import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQ() {
  return (
    <section className="py-14">
      <h2 className="text-3xl font-bold text-center mb-12">
        Frequently Asked Questions
      </h2>
      <Accordion
        type="single"
        collapsible
        className="max-w-xl gap-y-2 flex flex-col text-base mx-auto"
      >
        <AccordionItem className="bg-primary-purple/primary-purple-700 px-3 py-2 border-none rounded-xl"  value="item-1">
          <AccordionTrigger className="text-lg  font-semibold">
          What is Carter, and how can it help me?
          </AccordionTrigger>
          <AccordionContent>
          Carter is a smart, serverless link management tool designed to help you organize, store, and retrieve your important links effortlessly. It offers features like link categorization, AI-driven link suggestions, and real-time access, allowing you to stay productive and focus on what matters most.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem className="bg-zinc-800 px-3 py-2 border-none rounded-xl" value="item-2">
          <AccordionTrigger className="text-lg font-semibold">
          How does the Carter Extension enhance my browsing experience?
          </AccordionTrigger>
          <AccordionContent>
          The Carter Extension lets you save links directly from your browser to your Carter account with just one click. Organize your links into folders or save them globally without leaving your current tab. The extension also provides quick access to your saved links, making it easier than ever to manage and retrieve important resources while browsing.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem className="bg-primary-purple/primary-purple-700 px-3 py-2 border-none rounded-xl" value="item-3">
          <AccordionTrigger className="text-lg font-semibold">
          Is my data secure with Carter?
          </AccordionTrigger>
          <AccordionContent>
          Yes, security is a top priority for Carter. We use robust encryption and user-specific private keys to ensure your data remains safe. Sensitive link detection, personalized access controls, and a focus on privacy-first design ensure that only you have control over your information.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}