import { Button } from "@/components/ui/button";
import { db } from "@/config";
import { userResponse } from "@/config/schema";
import { eq } from "drizzle-orm";
import { Loader } from "lucide-react";
import { useState } from "react";
import * as XLSX from "xlsx";
const ListItem = ({ jsonForm, formRecord }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  let jsonData: any = [];

  const exportData = async () => {
    setLoading(true);
    const result = await db
      .select()
      .from(userResponse)
      .where(eq(userResponse.formRef, formRecord.id));
    if (result) {
      result.forEach((item) => {
        const jsonItem = JSON.parse(item?.jsonResponse);
        jsonData.push(jsonItem);
      });

      setLoading(false);
      exportToExcel(jsonData);
    }
  };

  // Convert json to excel and then download it
  const exportToExcel = (jsonData: any) => {
    const worksheet = XLSX.utils.json_to_sheet(jsonData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    XLSX.writeFile(workbook, "DataSheet.xlsx");
  };

  return (
    <div className=" border shadow-sm roundlg p-4">
      <h2 className=" text-lg text-black">
        {jsonForm?.formTitle || jsonForm?.title}
      </h2>
      <h2 className=" text-sm text-gray-500">
        {jsonForm?.formHeading || jsonForm?.subHeading}
      </h2>
      <hr className="my-4" />

      <div className=" flex items-center gap-5">
        <Button
          className=" bg-blue-600 text-white hover:text-black"
          size={"sm"}
          onClick={() => exportData()}
          disabled={loading}
        >
          {loading ? <Loader className=" animate-spin" /> : "Export"}
        </Button>
        <h2> Response</h2>
      </div>
    </div>
  );
};

export default ListItem;
