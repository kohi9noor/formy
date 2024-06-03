import { Input } from "@/components/ui/input";
import React, { useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@radix-ui/react-checkbox";
import FieldEdit from "./FieldEdit";
import { db } from "@/config";
import { userResponse } from "@/config/schema";
import moment from "moment";
import { useToast } from "@/components/ui/use-toast";

const FormUI = ({
  jsonForm,
  selectedTheme,
  onFieldUpdate,
  deleteFiled,
  editable = true,
}: any) => {
  const { toast } = useToast();

  const [formData, setFormData] = useState<any | undefined>();

  let formRef = useRef();

  const onFormSubit = async (event: any) => {
    event.preventDefault();

    try {
      const result = await db.insert(userResponse).values({
        jsonResponse: formData,
        createdAt: moment().format("DD/MM/yyy"),
      });

      if (result) {
        toast({
          title: "your application submited",
        });
        formRef.current?.reset();
        setFormData({});
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "cannot submit your form",
      });
    }
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((preFormData: any) => ({
      ...preFormData,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: any, value: any) => {
    setFormData((preFormData: any) => ({
      ...preFormData,
      [name]: value,
    }));
  };

  const handleCheckBoxChange = (name: any, value: any, label: any) => {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [name]: {
        ...prevFormData[name],
        [label]: value,
      },
    }));
  };

  return (
    <form ref={formRef} onSubmit={(e) => onFormSubit(e)}>
      <div className="border p-5 mt-20 md:w-[600px]" data-theme={selectedTheme}>
        <h2 className="font-bold text-center text-2xl">
          {jsonForm?.formTitle || jsonForm?.title}
        </h2>
        <h2 className="text-sm text-gray-400 text-center">
          {jsonForm?.formSubheading || jsonForm?.subheading}
        </h2>
        {jsonForm?.fields.map((item: any, index: number) => (
          <div key={index} className="my-3 relative">
            {editable && (
              <div className=" flex justify-end absolute top-0 right-0 ">
                <FieldEdit
                  defaultValue={item}
                  onUpdate={(value: any) => onFieldUpdate(value, index)}
                  deleteFiled={() => deleteFiled(index)}
                />
              </div>
            )}
            {item.fieldType === "select" ? (
              <>
                <label className="text-xs text-grey-500">{item.label}</label>
                <Select
                  required={item?.required}
                  onValueChange={(v) =>
                    handleSelectChange(item.name || item.fieldName, v)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={item?.placeholder} />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 text-white">
                    {item.options.map((option: any, optIndex: number) => (
                      <SelectItem key={optIndex} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </>
            ) : item.fieldType === "radio" ? (
              <>
                <label className="text-xs items-center space-x-2">
                  {item?.label}
                </label>
                <RadioGroup defaultValue="option-one">
                  {item.options.map((option: any, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={option.label}
                        id={option.label}
                        onClick={() =>
                          handleSelectChange(
                            item?.name || item?.fieldName,
                            item.label
                          )
                        }
                      />
                      <Label htmlFor={option?.label}>{option?.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </>
            ) : item.fieldType === "checkbox" ? (
              <>
                <label className="text-xs items-center space-x-2">
                  {item?.label}
                </label>
                {item?.options?.map((option: any, optIndex: number) => (
                  <div key={optIndex} className="flex gap-2">
                    <Checkbox
                      id={option.label}
                      onCheckedChange={(v) =>
                        handleCheckBoxChange(
                          item?.name || item.fieldName,
                          v,
                          item?.label
                        )
                      }
                      required={item.required}
                    />
                    <Label htmlFor={option.label}>{option.label}</Label>
                  </div>
                ))}
              </>
            ) : (
              <>
                <label className="text-sm text-gray-500">{item?.label}</label>
                <Input
                  type={item?.fieldType}
                  onChange={(e: any) => handleInputChange(e)}
                  placeholder={item?.placeholder}
                  name={item?.name}
                  required={item?.required}
                />
              </>
            )}
          </div>
        ))}
        <div>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormUI;
