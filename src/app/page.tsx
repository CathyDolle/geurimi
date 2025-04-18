import { Content } from "@/ui/components";
import { Storytelling, Showcase } from "@/ui/components";
import coffee from "@/assets/images/cafe/i14.jpg";
import landscape from "@/assets/images/content/i3.jpeg";
import showcase2 from "@/assets/images/cafe/i5.jpg";
import showcase3 from "@/assets/images/cafe/i17.jpg";

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
    media: "/videos/V5.mov",
    title: "storytelling",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi temporibus blanditiis nam repellendus enim iure ducimus. Itaque quae",
  },
  {
    variant: "portrait",
    mediaType: "video",
    media: "/videos/v3.mp4",
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
      <Content className="lg:span-gap-x-1-wider lg:gap-y-64 lg-max:gap-40 mb-64 text-12 leading-near">
        <Showcase i1="/videos/human.mp4" i2={showcase2} i3={showcase3} />
        <div className="flex text-20 w-full flex-col gap-12">
          <h2>CAFE NAME</h2>
          <p className="text-12 lg:span-w-2 opacity-60">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam
            aspernatur expedita eaque dicta dolorem? Aliquam, nulla excepturi
            aliquid libero dolores maiores, architecto laudantium fugit
            recusandae et dicta hic sapiente atque!
          </p>
        </div>
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
