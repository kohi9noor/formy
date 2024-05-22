import { Button } from "@/components/ui/button";
import Image from "next/image";

const Header = () => {
  return (
    <div className=" p-5 border shadow-sm justify-between flex items-center">
      <div className=" flex items-center text-2xl font-semibold">
        <Image src={"/logo.svg"} width={50} height={50} alt="logo" />
        <h1 className="">formy</h1>
      </div>
      <Button className=" bg-blue-500">Get Started</Button>
    </div>
  );
};

export default Header;
