import { Delete, Edit, Trash } from "lucide-react";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const FieldEdit = ({ defaultValue, onUpdate, deleteFiled }: any) => {
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
      <AlertDialog>
        <AlertDialogTrigger>
          <Trash color="red" className="w-5 h-5" />
        </AlertDialogTrigger>
        <AlertDialogContent className=" bg-red-500 text-black">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              form and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteFiled()}
              className="hover:bg-blue-400"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default FieldEdit;
