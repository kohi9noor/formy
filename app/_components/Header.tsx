"use client";
import { Button } from "@/components/ui/button";
import { SignIn, SignUpButton } from "@clerk/clerk-react";
import { UserButton, useUser } from "@clerk/nextjs";
import { Link } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
const Header = () => {
  const { user, isSignedIn } = useUser();
  const router = useRouter();
  return (
    <div className=" p-5 border shadow-sm justify-between flex items-center">
      <div className=" flex items-center text-2xl font-semibold">
        <Image src={"/logo.svg"} width={50} height={50} alt="logo" />
        <h1 className="">formy</h1>
      </div>
      {isSignedIn ? (
        <div className=" flex items-center gap-5">
          <Button
            className=" cursor-pointer"
            onClick={() => router.push("/dashboard")}
            variant={"outline"}
          >
            Dashboard
          </Button>
          <UserButton />
        </div>
      ) : (
        <SignUpButton>
          <Button>Get started</Button>
        </SignUpButton>
      )}
    </div>
  );
};

export default Header;
