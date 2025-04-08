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
    variant: "portrait",
    mediaType: "image",
    media: coffee,
    title: "커피",
    description: (
      <>
        11 rue des Écouffes,
        <br />
        Paris, France 75004
      </>
    ),
  },
  {
    variant: "landscape",
    mediaType: "video",
    media: "/videos/v1.MOV",
    title: "storytelling",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi temporibus blanditiis nam repellendus enim iure ducimus. Itaque quae",
  },
  {
    variant: "portrait",
    mediaType: "video",
    media: "/videos/v5.MOV",
    title: "Desc 2커피",
    description: (
      <>
        11 rue des Écouffes,
        <br />
        Paris, France 75004
      </>
    ),
  },
  {
    variant: "landscape",
    mediaType: "image",
    media: landscape,
    title: "storytelling",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi temporibus blanditiis nam repellendus enim iure ducimus. Itaque quae",
  },
];

export default function Home() {
  return (
    <>
      <Content className="lg:span-gap-1-wider lg-max:gap-40 mb-64 text-12 leading-near">
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
      </Content>
    </>
  );
}
