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
    title: "Saveurs de Corée",
    description:
      "Découvrez nos délicieuses pâtisseries et boissons artisanales, toutes préparées avec amour dans notre cuisine. Un large choix de spécialités coréennes authentiques.",
  },
  {
    variant: "landscape",
    mediaType: "video",
    media: "/videos/V5.mov",
    title: "Espace Créatif",
    description:
      "Un espace unique où se mêlent travail et détente, offrant un cadre inspirant pour se ressourcer et laisser libre cours à sa créativité.",
  },
  {
    variant: "portrait",
    mediaType: "video",
    media: "/videos/v3.mp4",
    title: "Boissons Artisanales",
    description:
      "Vous pouvez commander nos boissons artisanales directement au comptoir pendant que vous travaillez dans notre espace.",
  },
  {
    variant: "landscape",
    mediaType: "image",
    media: landscape,
    title: "Geurimi Café",
    description:
      "Rendez-vous au 11 rue des Écouffes, Paris 75004, pour découvrir l'univers unique de Geurimi.",
  },
];

export default function Home() {
  return (
    <>
      <Content className="lg:span-gap-x-1-wider lg:gap-y-64 lg-max:gap-40 mb-64 text-12 leading-near">
        <Showcase i1="/videos/human.mp4" i2={showcase2} i3={showcase3} />
        <div className="flex text-12 w-full flex-col gap-12">
          <h2>LE CONCEPT</h2>
          <p className="text-12 lg:span-w-3 opacity-80">
            Geurimi est un café coréen qui offre un espace unique pour les
            artistes et créatifs. C'est l'endroit idéal pour travailler dans une
            ambiance chaleureuse tout en dégustant nos délicieuses pâtisseries
            coréennes et boissons artisanales. Un lieu où la créativité et la
            convivialité se rencontrent autour d'un encas.
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
