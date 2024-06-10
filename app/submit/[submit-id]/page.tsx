import Image from "next/image";

const ResponseSubmitedPage = ({ params }: any) => {
  return (
    <div className="p-10 flex flex-col justify-center items-center w-full min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <div className="mb-6 flex  items-center justify-center gap-x-5">
          <Image
            src="/confirmation.jpg" // Replace with a suitable confirmation icon
            alt="Confirmation"
            width={100}
            height={100}
          />
        </div>
        <h1 className="text-2xl font-bold mb-4">Thank You!</h1>
        <p className="text-lg text-gray-700 mb-6">
          Your response has been successfully submitted.
        </p>
      </div>
    </div>
  );
};

export default ResponseSubmitedPage;
