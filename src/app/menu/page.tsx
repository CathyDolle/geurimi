import { Content } from "@/ui/components";
import { Storytelling } from "@/ui/components/storytelling/Storytelling";
import menu from "@/assets/images/menu.jpg";
import Image from "next/image";

interface StorytellingItem {
  variant: "portrait" | "landscape";
  mediaType: "image" | "video";
  media: any;
  title: string;
  description: string | React.ReactNode;
}


export default function Menu() {
  return (
    <Content className="lg:span-gap-1-wider gap-40 mb-64 text-12 leading-near">
      <Image className="w-full" src={menu} alt="menu" />
    </Content>
  );
}
