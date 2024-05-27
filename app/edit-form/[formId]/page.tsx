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
  const [updateTrigger, setUpdateTrigger] = useState<any | undefined>();
  const [record, setRecord] = useState<any | undefined>([]);

  useEffect(() => {
    if (updateTrigger) {
      setJsonForm(jsonForm);
      // updateJsonFormInDb();
      checking();
    }
  }, [updateTrigger]);

  const checking = async () => {
    const form = await db
      .update(forms)
      .set({ jsonform: JSON.stringify({ key: "new value" }) })
      .where(
        and(
          eq(jsonForm.data.user, user?.primaryEmailAddress?.emailAddress),
          eq(jsonForm.data.id, record.id)
        )
      );
    console.log(form);
  };

  const updateJsonFormInDb = async () => {
    if (!jsonForm) return;

    try {
      const result = await db

        .update(jsonForm)
        .set({
          jsonForm: JSON.stringify(jsonForm.fields),
        })
        .where(
          and(
            eq(jsonForm.data.id, record.id),
            eq(jsonForm.data.createdBy, user?.primaryEmailAddress?.emailAddress)
          )
        );
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

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
        const data = {
          user: result[0].createdBy,
          id: result[0].id,
        };
        console.log(data);
        const jsonString = result[0].jsonform;
        const jsonStringStart = jsonString.indexOf("{");
        const jsonStringEnd = jsonString.lastIndexOf("}") + 1;
        const extractedJsonString = jsonString.substring(
          jsonStringStart,
          jsonStringEnd
        );
        const parsedJson = JSON.parse(extractedJsonString);
        parsedJson.data = data;
        setRecord(result[0]);
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

  const onfiledUpdate = (value: any, index: any) => {
    jsonForm.fields[index].label = value.label;
    jsonForm.fields[index].placeholder = value.placeholder;
    setUpdateTrigger(Date.now());
  };

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
        <div className="p-5 border rounded-lg shadow-md"></div>
        <div className="md:col-span-2 flex items-center justify-center border rounded-lg h-screen p-4">
          {loading ? (
            <div>Loading...</div>
          ) : jsonForm ? (
            <FormUI jsonForm={jsonForm} onFiledUpdate={onfiledUpdate} />
          ) : (
            <div>No form data available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditForm;
