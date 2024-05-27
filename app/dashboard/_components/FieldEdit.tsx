import { Delete, Edit, Trash } from "lucide-react";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const FieldEdit = ({ defaultValue, onUpdate }: any) => {
  const [label, setlabel] = useState<string | undefined>(defaultValue?.label);
  const [placeholder, setPlaceHodler] = useState<string | undefined>(
    defaultValue?.placeholder
  );

  const data = {
    label,
    placeholder,
  };

  return (
    <div className=" flex gap-2 items-center">
      <Popover>
        <PopoverTrigger>
          <Edit className=" h-5 w-5 text-gray-500" />
        </PopoverTrigger>
        <PopoverContent className=" bg-slate-500 text-white">
          <h2>Edit ields</h2>

          <div>
            <label className=" text-xs">Label Name</label>
            <Input
              type="text"
              defaultValue={defaultValue.label}
              onChange={(e) => setlabel(e.target.value)}
            ></Input>
          </div>

          <div>
            <label className=" text-xs">placeholder Name</label>
            <Input
              type="text"
              defaultValue={defaultValue.placeholder}
              onChange={(e) => setPlaceHodler(e.target.value)}
            ></Input>
          </div>
          <Button
            className=" bg-blue-300 mt-3"
            size={"sm"}
            onClick={() => onUpdate(data)}
          >
            Update
          </Button>
        </PopoverContent>
      </Popover>
      <Trash color="red" className="w-5 h-5" />
    </div>
  );
};

export default FieldEdit;
