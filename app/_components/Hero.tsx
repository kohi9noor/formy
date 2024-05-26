import Link from "next/link";

const Hero = () => {
  return (
    <div>
      <section className="text-black">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen items-center">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className=" text-gray-700 text-3xl font-extrabold sm:text-5xl">
              Create your form with the help of ai
              <span className="sm:block text-blue-400">
                {" "}
                In seconds not Hours
              </span>
            </h1>

            <p className=" text-gray-700 mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
              illo tenetur fuga ducimus numquam ea!
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                className="block w-full hover:text-black border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                href="/dashboard"
              >
                + Create Ai form
              </Link>

              <a
                className="block w-full border border-blue-600 px-12 py-3 text-sm font-medium text-black hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
                href="#"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
