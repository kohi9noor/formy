"use client";

import { db } from "@/config";
import { forms } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import { useEffect, useState } from "react";
import FormlistItem from "./FormlistItem";

const FormList = () => {
  const { user } = useUser();
  const [formList, setFormList] = useState<any>();

  const getFormList = async () => {
    const result = await db
      .select()
      .from(forms)
      .where(eq(forms.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(forms.id));
    // console.log(result);
    setFormList(result);

    console.log(formList);
  };

  useEffect(() => {
    user && getFormList();
  }, [user]);

  return (
    <div className=" mt-5 grid grid-cols-2 md:grid-cols-3 gap-5">
      {formList &&
        formList.map((form: any, index: number) => {
          return (
            <div key={index}>
              <FormlistItem
                id={form?.id}
                form={JSON.parse(form?.jsonform)}
                refreshData={getFormList}
              />
            </div>
          );
        })}
    </div>
  );
};

export default FormList;
