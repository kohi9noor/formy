"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { Edit, Share } from "lucide-react";
const FormlistItem = ({ form }: any) => {
  console.log(form);

  return (
    <div className=" border shadow-sm rounded-lg p-4">
      <h2 className="text-lg">{form.title || form.formTitle}</h2>
      <h2 className="text-sm text-gray-500">
        {form.formSubheading || form.subheading}
      </h2>
      <hr className=" my-4" />
      <div className="flex justify-between items-center flex-wrap gap-y-4">
        <Button variant={"outline"} size={"sm"} className="flex gap-2">
          <Share className="h-5 w-5" />
          Share
        </Button>
        <Button className="gap-2 flex bg-blue-700">
          <Edit className=" w-5 h-5" />
          Edit
        </Button>
      </div>
    </div>
  );
};

export default FormlistItem;
