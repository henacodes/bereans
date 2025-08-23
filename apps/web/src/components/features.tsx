import {
  Code,
  Terminal,
  Paintbrush,
  Rocket,
  Book,
  PlusCircle,
  Users,
  Search,
  MessageSquare,
  Layers,
} from "lucide-react";
const features = [
  {
    icon: <Book className="h-6 w-6" />,
    title: "Critical Study",
    desc: "Engage with the Bible through historical, linguistic, and cultural perspectives.",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Community Learning",
    desc: "Connect with others who share an interest in serious, thoughtful exploration of scripture.",
  },
  {
    icon: <Search className="h-6 w-6" />,
    title: "Scholarly Resources",
    desc: "Access curated academic materials, references, and tools for deeper study.",
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: "Open Discussion",
    desc: "Ask questions, share insights, and engage in respectful dialogue.",
  },
  {
    icon: <Layers className="h-6 w-6" />,
    title: "Structured Learning",
    desc: "Follow guided themes and topics each month to broaden your understanding.",
  },
  {
    icon: <PlusCircle className="h-6 w-6" />,
    title: "Contribute Content",
    desc: "Add study notes, essays, or resources and help grow the Bereans knowledge base.",
  },
];

export default function Features() {
  return (
    <section className="relative py-14">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="relative mx-auto max-w-2xl sm:text-center">
          <div className="relative z-10">
            <h3 className="font-geist mt-4 text-3xl font-normal tracking-tighter sm:text-4xl md:text-5xl">
              Cultivating Discourse
            </h3>
            <p className="font-geist text-foreground/60 mt-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              congue, nisl eget molestie varius, enim ex faucibus purus.
            </p>
          </div>
          <div
            className="absolute inset-0 mx-auto h-44 max-w-xs blur-[118px]"
            style={{
              background:
                "linear-gradient(152.92deg, rgba(143, 183, 143, 0.2) 4.54%, rgba(143, 183, 143, 0.26) 34.2%, rgba(143, 183, 143, 0.1) 77.55%)",
            }}
          ></div>
        </div>
        <hr className="bg-foreground/30 mx-auto mt-5 h-px w-1/2" />
        <div className="relative mt-12">
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((item, idx) => (
              <li
                key={idx}
                className="transform-gpu space-y-3 rounded-xl border bg-transparent p-4 [box-shadow:0_-20px_80px_-20px_#8fb78f2f_inset]"
              >
                <div className="text-primary w-fit transform-gpu rounded-full border p-4 [box-shadow:0_-20px_80px_-20px_#8fb78f3f_inset] dark:[box-shadow:0_-20px_80px_-20px_#8fb78f0f_inset]">
                  {item.icon}
                </div>
                <h4 className="font-geist text-lg font-bold tracking-tighter">
                  {item.title}
                </h4>
                <p className="text-gray-500">{item.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
