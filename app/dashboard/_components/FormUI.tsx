import { Input } from "@/components/ui/input";
import React from "react";
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

const FormUI = ({ jsonForm, onFieldUpdate, deleteFiled }: any) => {
  return (
    <div className="border p-5 md:w-[600px]">
      <h2 className="font-bold text-center text-2xl">
        {jsonForm?.formTitle || jsonForm?.title}
      </h2>
      <h2 className="text-sm text-gray-400 text-center">
        {jsonForm?.formSubheading || jsonForm?.subheading}
      </h2>
      {jsonForm?.fields.map((item: any, index: number) => (
        <div key={index} className="my-3 relative">
          <div className=" flex justify-end absolute top-0 right-0 ">
            <FieldEdit
              defaultValue={item}
              onUpdate={(value: any) => onFieldUpdate(value, index)}
              deleteFiled={() => deleteFiled(index)}
            />
          </div>
          {item.fieldType === "select" ? (
            <>
              <label className="text-xs text-grey-500">{item.label}</label>
              <Select>
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
                    <RadioGroupItem value={option.label} id={option.label} />
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
                  <Checkbox id={option.label} />
                  <Label htmlFor={option.label}>{option.label}</Label>
                </div>
              ))}
            </>
          ) : (
            <>
              <label className="text-sm text-gray-500">{item?.label}</label>
              <Input
                type={item?.fieldType}
                placeholder={item?.placeholder}
                name={item?.name}
              />
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default FormUI;
