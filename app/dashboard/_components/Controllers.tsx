"use client";
import Gredientbg from "@/app/_data/Gredientbg";
import themes from "@/app/_data/Theme";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const Controller = ({ selectedTheme, setBackground }: any) => {
  const [showMore, setShowMore] = useState<number | undefined>(6);

  return (
    <div>
      {/* Theme controllers */}
      <h2 className="text-black">Themes</h2>

      <Select onValueChange={(value) => selectedTheme(value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          {themes.map((theme: any, index: number) => {
            // console.log(theme);

            return (
              <>
                <SelectItem key={index} value={theme.theme}>
                  <div className=" flex gap-3">
                    <div className="flex">
                      <div
                        className=" h-5 w-5"
                        style={{ backgroundColor: theme.primary }}
                      ></div>
                      <div
                        className=" h-5 w-5"
                        style={{ backgroundColor: theme.secondary }}
                      ></div>
                      <div
                        className=" h-5 w-5"
                        style={{ backgroundColor: theme.accent }}
                      ></div>
                      <div
                        className=" h-5 w-5"
                        style={{ backgroundColor: theme.neutral }}
                      ></div>
                    </div>

                    {theme.theme}
                  </div>
                </SelectItem>
              </>
            );
          })}
        </SelectContent>
      </Select>

      {/* background controller */}

      <h2 className=" text-black mt-8 my-1">Background</h2>

      <div className=" grid grid-cols-3 gap-5">
        {Gredientbg.map((item: any, index: number) => {
          if (index < showMore!) {
            return (
              <>
                <div
                  className=" w-full h-[70px] cursor-pointer hover:border-black hover:border"
                  style={{ background: item.gradient }}
                  onClick={() => setBackground(item.gradient)}
                >
                  {item == 0 && "NONE"}
                </div>
              </>
            );
          }
          if (showMore) {
            <>
              <div
                key={index}
                onClick={() => setBackground(item.gradient)}
                className=" w-full h-[70px] cursor-pointer hover:border-black hover:border"
                style={{ background: item.gradient }}
              ></div>
            </>;
          }
        })}
      </div>
      <Button
        onClick={() => {
          if (showMore == Gredientbg.length - 1) {
            return setShowMore(6);
          } else {
            return setShowMore(Gredientbg.length - 1);
          }
        }}
        variant={"ghost"}
        className=" w-full my-1"
        size={"sm"}
      >
        {showMore! > 6 ? "Show less" : "Show More"}
      </Button>
    </div>
  );
};

export default Controller;
