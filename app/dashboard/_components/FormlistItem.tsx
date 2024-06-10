"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
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
import { Edit, Share, Trash } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { db } from "@/config";
import { forms } from "@/config/schema";
import { and, eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import { RWebShare } from "react-web-share";

const FormlistItem = ({ id, form, refreshData }: any) => {
  console.log(id);

  const { user } = useUser();

  const deleteForm = async () => {
    try {
      const result = await db
        .delete(forms)
        .where(
          and(
            eq(forms.id, form.data?.id),
            eq(forms.createdBy, user?.primaryEmailAddress?.emailAddress)
          )
        );
      if (result) {
        console.log("form deleted", result);
        refreshData();
      }
    } catch (error) {
      console.error("Error deleting form:", error);
    }
  };

  const router = useRouter();

  const handleEditRoute = () => {
    console.log(id, "route hit");
    if (!id) {
      console.error("ID is undefined, cannot navigate");
      return;
    }
    router.push(`http://localhost:3000/edit-form/${id}`);
  };

  return (
    <div className="border shadow-sm rounded-lg p-4">
      <div className="flex justify-between">
        <h2></h2>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Trash className="w-5 h-5 text-red-600 cursor-pointer hover:scale-105 transition-all" />
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                form.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 text-white"
                onClick={deleteForm}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <h2 className="text-lg">{form.title || form.formTitle}</h2>
      <h2 className="text-sm text-gray-500">
        {form.formSubheading || form.subheading}
      </h2>
      <hr className="my-4" />
      <div className="flex justify-between items-center flex-wrap gap-y-4">
        <div>
          <RWebShare
            data={{
              text: `${
                form.formSubheading || form.subheading
              }, Build your form in seconds with formy`,
              url: `http://localhost:3000/aiform/${form?.data?.id}`,
              title: `${form?.title || form?.formTitle}`,
            }}
            onClick={() => console.log("shared successfully!")}
          >
            <Button variant={"outline"} size={"sm"} className="flex gap-2">
              <Share className="h-5 w-5" />
              Share
            </Button>
          </RWebShare>
        </div>
        <Button
          onClick={handleEditRoute}
          className="gap-2 flex bg-blue-700 text-white hover:text-black"
        >
          <Edit className="w-5 h-5" />
          Edit
        </Button>
      </div>
    </div>
  );
};

export default FormlistItem;
