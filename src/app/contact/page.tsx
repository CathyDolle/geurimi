import { Content } from "@/ui/components";
import { Storytelling } from "@/ui/components/storytelling/Storytelling";

import coffee from "@/assets/images/coffee.jpg";
import landscape from "@/assets/images/content/i3.jpeg";
interface StorytellingItem {
  variant: "portrait" | "landscape";
  mediaType: "image" | "video";
  media: any;
  title: string;
  description: string | React.ReactNode;
}

const storytellingItems: StorytellingItem[] = [
  {
    variant: "landscape",
    mediaType: "video",
    media: "/videos/v1.MOV",
    title: "Contact us",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi temporibus blanditiis nam repellendus enim iure ducimus. Itaque quae",
  },
];

export default function Contact() {
  return (
    <Content className="lg:span-gap-1-wider gap-40 mb-64 text-12 leading-near">
      {storytellingItems.map((item, index) => (
        <Storytelling
          key={index}
          variant={item.variant}
          mediaType={item.mediaType}
          media={item.media}
          title={item.title}
          description={item.description}
        />
      ))}
      {/* Formulaire */}
      <section className=" flex justify-between lg-max:flex-col w-full items-end">
        <form className="flex flex-col w-full lg:span-w-3 gap-8">
          <h2 className="text-12 uppercase mb-8">Contact-us</h2>
          <input
            type="text"
            placeholder="Name"
            className="p-8 focus:outline-black"
          />
          <input
            type="email"
            placeholder="Email"
            className="p-8 focus:outline-black"
          />
          <textarea
            placeholder="Message"
            className="focus:outline-black h-120 p-8"
          />
          <button className="bg-black text-white p-8 uppercase" type="submit">
            Send
          </button>
        </form>
        <p className="lg:span-w-2 lg-max:hidden text-10 uppercase">
          Lorem ipsum dolor sit amet consectetur, adipi
        </p>
      </section>
    </Content>
  );
}
