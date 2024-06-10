"use client";
import FormUI from "@/app/dashboard/_components/FormUI";
import { db } from "@/config";
import { forms } from "@/config/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const page = ({ params }: any) => {
  const [record, setRecord] = useState<any | undefined>();

  const [jsonForm, setJsonForm] = useState();

  useEffect(() => {
    params && getFormData();
  }, []);

  const getFormData = async () => {
    const result = await db
      .select()
      .from(forms)
      .where(eq(forms.id, params?.formId));
    const jsonFormData = JSON.parse(result[0]?.jsonform);

    setRecord(result[0]);

    setJsonForm(jsonFormData);
  };

  return (
    <>
      <div
        className=" p-10 flex justify-center items-center w-full max-h-max"
        style={{
          backgroundImage: record?.background,
        }}
      >
        {jsonForm && record && (
          <FormUI
            jsonForm={jsonForm}
            selectedTheme={record.theme}
            onFieldUpdate={() => console.log("update huehuhe")}
            deleteFiled={() => console.log("huehueh")}
            editable={false}
            Id={record?.id}
          />
        )}
        <Link href={"http://localhost:3000/"}>
          <div className=" flex gap-2 items-center cursor-pointer bg-black text-white px-3 py-1 rounded-full fixed bottom-5 left-5">
            <Image
              alt="logo"
              src={"/logo.jpg"}
              width={26}
              height={26}
              className="rounded-full"
            />
            Build your own ai form with formy
          </div>
        </Link>
      </div>

      {/* <div>huehuehu</div> */}
    </>
  );
};

export default page;
