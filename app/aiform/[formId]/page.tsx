"use client";
import FormUI from "@/app/dashboard/_components/FormUI";
import { db } from "@/config";
import { forms } from "@/config/schema";
import { eq } from "drizzle-orm";
import { useEffect, useState } from "react";

const page = ({ params }: any) => {
  const [record, setRecord] = useState<any | undefined>();
  console.log(record);
  useEffect(() => {
    params && getFormData();
  }, []);
  const getFormData = async () => {
    const result = await db
      .select()
      .from(forms)
      .where(eq(forms.id, params?.formId));
    setRecord(result[0]);
  };

  return (
    <>
      <div>
        <FormUI jsonForm={record} />
      </div>
    </>
  );
};

export default page;
