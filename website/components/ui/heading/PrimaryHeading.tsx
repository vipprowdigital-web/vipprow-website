interface PrimaryHeadingProps {
  heading?: string;
  des?: string;
}

export default function PrimaryHeading({
    heading = "Heading",
  des = "Des",
}: PrimaryHeadingProps) {
  return (
    <>
      <div className="flex flex-col justify-center items-center px-2">
        <h1
          className="
          max-w-5xl font-heading
          text-3xl font-semibold leading-tight
          text-zinc-900 dark:text-white
          sm:text-4xl md:text-5xl text-center
          "
        >
          {heading}
        </h1>

        {/* Subtitle */}
        <p
          className="
          mt-6 max-w-xl
          text-sm leading-relaxed
          text-zinc-600 dark:text-zinc-400
          sm:text-md text-center
          "
        >
          {des}
        </p>
      </div>
    </>
  );
}
