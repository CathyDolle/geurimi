import { Content } from "@/ui/components";
import { Showcase } from "@/ui/components/showcase/Showcase";
import showcase2 from "@/assets/images/cafe/i10.jpg";
import showcase3 from "@/assets/images/cafe/i9.jpg";

export default function Contact() {
  return (
    <Content className="lg:span-gap-1-wider gap-40 mb-64 text-12 leading-near">
      <Showcase i1="/videos/v2.mp4" i2={showcase2} i3={showcase3} />
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
