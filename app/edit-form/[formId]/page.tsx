"use client";
import FormUI from "@/app/dashboard/_components/FormUI";
import { db } from "@/config";
import { forms } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const EditForm = () => {
  const params = useParams();
  const { user } = useUser();
  const [jsonForm, setJsonForm] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const GetFormData = async () => {
    try {
      setLoading(true);
      const result = await db
        .select()
        .from(forms)
        .where(
          and(
            eq(forms.id, params.formId),
            eq(forms.createdBy, user?.primaryEmailAddress?.emailAddress)
          )
        );

      if (result.length > 0) {
        const jsonString = result[0].jsonform;
        const jsonStringStart = jsonString.indexOf("{");
        const jsonStringEnd = jsonString.lastIndexOf("}") + 1;
        const extractedJsonString = jsonString.substring(
          jsonStringStart,
          jsonStringEnd
        );
        const parsedJson = JSON.parse(extractedJsonString);
        setJsonForm(parsedJson);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching or parsing form data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && params.formId) {
      GetFormData();
    }
  }, [user, params.formId]);

  return (
    <div className="p-10">
      <h2
        onClick={() => router.back()}
        className="flex gap-2 items-center my-5 cursor-pointer hover:font-bold transition-all"
      >
        <ArrowLeft /> back
      </h2>
      {/* controller */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 border rounded-lg shadow-md">Controller</div>
        <div className="md:col-span-2 flex items-center justify-center border rounded-lg h-screen p-4">
          {loading ? (
            <div>Loading...</div>
          ) : jsonForm ? (
            <FormUI jsonForm={jsonForm} />
          ) : (
            <div>No form data available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditForm;
