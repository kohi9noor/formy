"use client";
import { db } from "@/config";
import { forms } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { useEffect, useState } from "react";
import ListItem from "./_component/ListItem";

const Page = () => {
  const { user } = useUser();
  const [formlist, setFormList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getFormList = async () => {
    try {
      setLoading(true);
      setError(null);
      if (user?.primaryEmailAddress?.emailAddress) {
        const result = await db
          .select()
          .from(forms)
          .where(eq(forms.createdBy, user.primaryEmailAddress.emailAddress));

        setFormList(result);
        console.log(formlist);
      } else {
        throw new Error("User email address not found");
      }
    } catch (error) {
      setError("Failed to fetch forms. Please try again.");
      console.error("Error fetching forms:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      getFormList();
    }
  }, []);

  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl flex items-center justify-between">
        Responses
      </h2>
      {loading ? (
        <div className=" animate-spin w-5 p-5 text-blue-900 items-center flex justify-center"></div>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : formlist.length > 0 ? (
        <div className=" mt-10 grid grid-cols-2 lg:grid-cols-3 gap-5">
          {formlist.map((form: any, index: number) => (
            <ListItem
              formRecord={form}
              key={index}
              jsonForm={JSON.parse(form?.jsonform)}
            />
          ))}
        </div>
      ) : (
        <p>No forms found.</p>
      )}
    </div>
  );
};

export default Page;
