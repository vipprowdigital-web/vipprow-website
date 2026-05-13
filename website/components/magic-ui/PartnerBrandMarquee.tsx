import { cn } from "@/lib/utils";
import { Marquee } from "../ui/marquee";
import Image from "next/image";

const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "/assets/images/logo/products/Cro.png",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "/assets/images/logo/products/In.png",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "/assets/images/logo/products/Web-Builder.png",
  },
  {
    name: "Jane",
    username: "@jane",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "/assets/images/logo/products/Vexa.png",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "/assets/images/logo/products/CRM.png",
  },
  
];


const firstRow = reviews.slice(0, reviews.length);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-40 cursor-pointer overflow-hidden bg-transparent shrink-0",
        // light styles
        "border-black/[.1] bg-black/[.01] hover:bg-black/[.05]",
        // dark styles
        "dark:border-black/[.1] dark:bg-black/[.10] dark:hover:bg-black/[.15]"
      )}
    >
     <div className="w-32 h-32 flex items-center justify-center rounded-xl shadow-sm p-0 gap-6">
  <Image
    src={img}
    alt={name}
    width={128}
    height={128}
    className="object-contain "
  />
</div>





{/* 
       <Image
          src={img}
          alt="Brand Name"
          height={100}
          width={100}
          style={{backgroundPosition:"cover"}}
        /> */}
    </figure>
  );
};

export default function PartnerBrandMarquee() {
  return (
    <div className="relative flex w-full max-w-7xl flex-col items-center justify-center overflow-hidden mx-auto h-32">
      <Marquee pauseOnHover className="[--duration:40s] ">
        {firstRow.map((review, idx) => (
          <ReviewCard key={`${review.username}-${idx}`} {...review} />
        ))}
      </Marquee>
      <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-black-to-r"></div>
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-black-to-l"></div>
    </div>
  );
}
