"use client";
import { Button } from "@/components/ui/button";
import { SignIn, SignUpButton } from "@clerk/clerk-react";
import { UserButton, useUser } from "@clerk/nextjs";
import { Link } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
const Header = () => {
  const { user, isSignedIn } = useUser();
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {}, []);

  return (
    !path.includes("aiform") && (
      <div className=" p-5 border shadow-sm justify-between flex items-center">
        <div
          onClick={() => router.push("/")}
          className=" cursor-pointer flex items-center text-2xl font-semibold"
        >
          <Image src={"/logo.svg"} width={50} height={50} alt="logo" />
          <h1 className="">form-prompt</h1>
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
    )
  );
};

export default Header;
