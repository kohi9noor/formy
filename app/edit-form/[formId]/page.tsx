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
  const [jsonForm, setJsonForm] = useState<any | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [updateTrigger, setUpdateTrigger] = useState<any | undefined>();
  const [record, setRecord] = useState<any | undefined>();

  useEffect(() => {
    if (updateTrigger && jsonForm) {
      updateJsonFormInDb();
    }
  }, [updateTrigger]);

  const updateJsonFormInDb = async () => {
    if (!jsonForm || !record || !user) {
      console.warn("updateJsonFormInDb: Missing required data.", {
        jsonForm,
        record,
        user,
      });
      return;
    }
    console.log(record, jsonForm.data.id, jsonForm.fields);
    try {
      const result = await db
        .update(forms)
        .set({
          jsonform: JSON.stringify(jsonForm),
        })
        .where(
          and(
            eq(forms.id, record.id),
            eq(record.createdBy, user.primaryEmailAddress?.emailAddress)
          )
        );
      console.log("Update result: ", result);
    } catch (error) {
      console.error("Error updating JSON form in DB: ", error);
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
        const formRecord = result[0];
        const data = {
          user: formRecord.createdBy,
          id: formRecord.id,
        };

        try {
          const parsedJson = JSON.parse(formRecord.jsonform);
          parsedJson.data = data;

          setRecord(formRecord);
          setJsonForm(parsedJson);
          console.log("Parsed JSON Form: ", parsedJson);
        } catch (parseError) {
          console.error("Error parsing JSON string: ", parseError);
        }
      } else {
        console.log("No form found with the given ID.");
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

  const dleteFiled = async (indexItem: number) => {
    const result = jsonForm.fields.filter(
      (item: any, index: number) => indexItem != index
    );
    jsonForm.fields = result;
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 border rounded-lg shadow-md"></div>
        <div className="md:col-span-2 flex items-center justify-center border rounded-lg h-screen p-4">
          {loading ? (
            <div>Loading...</div>
          ) : jsonForm ? (
            <FormUI
              jsonForm={jsonForm}
              deleteFiled={(index: number) => dleteFiled(index)}
              onFieldUpdate={onfiledUpdate}
            />
          ) : (
            <div>No form data available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditForm;
