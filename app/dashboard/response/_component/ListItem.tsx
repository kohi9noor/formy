import { Button } from "@/components/ui/button";
import { db } from "@/config";
import { userResponse } from "@/config/schema";
import { eq } from "drizzle-orm";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

const ListItem = ({ jsonForm, formRecord }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [responses, setResponses] = useState<any[]>([]);

  const fetchResponses = async () => {
    try {
      const result = await db
        .select()
        .from(userResponse)
        .where(eq(userResponse.formRef, formRecord.id));
      if (result) {
        const parsedResponses = result.map(({ jsonResponse }) =>
          JSON.parse(jsonResponse)
        );
        setResponses(parsedResponses);
      }
    } catch (err) {
      console.error("Error fetching responses:", err);
      setError("Failed to fetch responses. Please try again.");
    }
  };

  const exportData = async () => {
    setLoading(true);
    setError(null);
    try {
      await fetchResponses();
      exportToExcel(responses);
    } catch (err) {
      console.error("Error exporting data:", err);
      setError("Failed to export data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResponses();
  }, []);

  // Convert json to excel and then download it
  const exportToExcel = (jsonData: any) => {
    const worksheet = XLSX.utils.json_to_sheet(jsonData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    XLSX.writeFile(workbook, "DataSheet.xlsx");
  };

  return (
    <div className="border shadow-sm rounded-lg p-4">
      <h2 className="text-lg text-black">
        {jsonForm?.formTitle || jsonForm?.title}
      </h2>
      <h2 className="text-sm text-gray-500">
        {jsonForm?.formHeading || jsonForm?.subHeading}
      </h2>
      <hr className="my-4" />

      <div className="flex items-center gap-5">
        <Button
          className="bg-blue-600 text-white hover:text-black"
          size={"sm"}
          onClick={exportData}
          disabled={loading}
        >
          {loading ? <Loader className="animate-spin" /> : "Export"}
        </Button>
        <h2>
          {`${responses.length}`} Response{responses.length !== 1 ? "s" : ""}
        </h2>
      </div>
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
};

export default ListItem;
