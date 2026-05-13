import PrimaryHeading from "../ui/heading/PrimaryHeading";

export default function WorkFlowSteps() {
  return (
    <>
      <section className="py-10 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <PrimaryHeading
              heading="Inside Vipprow: How Our SaaS Simplifies Your Business?"
              des=" Understand how Vipprow turns scattered tasks into organized workflows using automation and data-driven systems."
            />
          </div>

          <div className="relative mt-12 lg:mt-20">
            <div className="absolute inset-x-0 hidden xl:px-44 top-2 md:block md:px-20 lg:px-28">
              <img
                className="w-full"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg"
                alt=""
              />
            </div>

            <div className="relative grid grid-cols-1 text-center gap-y-12 md:grid-cols-3 gap-x-12">
              <div>
                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                  <span className="text-xl font-semibold text-gray-700">
                    {" "}
                    1{" "}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-semibold leading-tight text-white md:mt-10">
                  Onboard Your Business
                </h3>
                <p className="mt-4 text-base text-gray-100">
                 Set up your workspace in minutes with guided steps.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                  <span className="text-xl font-semibold text-gray-700">
                    {" "}
                    2{" "}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-semibold leading-tight text-white md:mt-10">
                  Automate Daily Operations
                </h3>
                <p className="mt-4 text-base text-gray-100">
                  Reduce manual work with connected workflows.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                  <span className="text-xl font-semibold text-gray-700">
                    {" "}
                    3{" "}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-semibold leading-tight text-white md:mt-10">
                  Scale with Insights
                </h3>
                <p className="mt-4 text-base text-gray-100">
                  Track performance and grow efficiently.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
