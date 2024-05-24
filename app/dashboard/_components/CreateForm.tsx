"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/config";
import { AIchatSession } from "@/config/geminimodel";
import { forms } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import moment from "moment";
const PROMPT =
  "on the basis of decription,please give from in json format with form title of form subheading for form form having name, placehodler name, and form label filedType, filed required in Json Format";

const CreateForm = () => {
  const [openDia, setOpenDio] = useState(false);
  const [loading, setLoading] = useState<boolean | undefined>();
  const [userInput, setUserInput] = useState<string | undefined>();
  const { user } = useUser();

  const onCreateForm = async () => {
    console.log(userInput);
    setLoading(true);
    const result = await AIchatSession.sendMessage(
      "Description:" + userInput + PROMPT
    );
    if (result.response.text()) {
      {
        const response = await db
          .insert(forms)
          .values({
            jsonform: result.response.text(),
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format("DD/MM/yyyy"),
          })
          .returning({ id: forms.id });
        console.log(response[0].id);
        setLoading(false);
      }

      setLoading(false);
    }
  };

  return (
    <Dialog open={openDia}>
      <Button
        onClick={() => setOpenDio(true)}
        className=" text-white hover:text-black bg-blue-700"
      >
        + Create form
      </Button>
      <DialogContent className="bg-white text-black">
        <DialogHeader>
          <DialogTitle>Create new Form</DialogTitle>
          <DialogDescription>
            <Textarea
              onChange={(e) => setUserInput(e.target.value)}
              className="my-2"
              placeholder="Write description of your form"
            ></Textarea>
            <div className=" flex gap-2 my-3 justify-end">
              <Button
                className=" bg-red-600 text-white"
                variant={"destructive"}
                onClick={() => setOpenDio(false)}
              >
                Cancel
              </Button>
              <Button
                disabled={loading}
                className="bg-blue-600"
                onClick={() => onCreateForm()}
              >
                Create
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateForm;
