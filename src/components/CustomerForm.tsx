import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Indentification from "./Identification";
import { customer, customerSchema } from "../lib/schemas";
import { Input } from "@/components/ui/input";
import { allMunicipalities } from "@/lib/locations";
import { useState } from "react";
import { Button } from "./ui/button";
import { format } from "date-fns";

export default function CustomerForm() {
  const [Identification, setIdentification] = useState<string | null>(null);
  const form = useForm<customer>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      department: "Matagalpa",
      municipality: "Matagalpa",
      name: "",
      date: undefined,
    },
  });

  const handleMunicipalityChange = (code: string) => {
    for (const department of allMunicipalities) {
      const foundMunicipality = department.municipalities.find(
        (municipality) => municipality.code === code
      );

      if (foundMunicipality) {
        form.setValue("department", department.deparmentName);
        form.setValue("municipality", foundMunicipality.name);
      }
    }
  };
  const handleDateChange = (date: Date | null) => {
    if (date === null) return;
    form.setValue("date", date);
  };
  const handleFullIdChange = (fullId: string) => {
    setIdentification(fullId);
    const upperCaseLastChar = fullId.slice(-1).toUpperCase();
    const formattedFullId = fullId.slice(0, -1) + upperCaseLastChar;
    const formattedWithHyphens = `${formattedFullId.slice(
      0,
      3
    )}-${formattedFullId.slice(3, 9)}-${formattedFullId.slice(9)}`;
    form.setValue("identification", formattedWithHyphens);
  };
  const handleErrorChange = (error: string | null) => {
    if (error) {
      form.setError("identification", { type: "custom", message: error });
    } else {
      form.clearErrors("identification");
    }
  };

  const onSubmit = (data: customer) => {
    alert(JSON.stringify(data));
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-4 mx-3 sm:mx-5 border p-4 sm:p-5  rounded-lg"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="my-1 sm:my1 col-span-1">
                  <FormLabel>Nombres y Apellidos</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      value={field.value}
                      placeholder="Name"
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem className="my-1 sm:my1 col-span-1">
                  <FormLabel>Department</FormLabel>
                  <FormControl>
                    <Input readOnly value={field.value} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="municipality"
              render={({ field }) => (
                <FormItem className="my-1 sm:my1 col-span-1">
                  <FormLabel>Municipality</FormLabel>
                  <Input readOnly value={field.value} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="my-1 sm:my1 col-span-1">
                  <FormLabel>Date of birdth</FormLabel>
                  <FormControl>
                    <Input
                      readOnly
                      value={
                        field.value ? format(field.value, "dd/MM/yyyy") : ""
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="identification"
              render={() => (
                <FormItem className="col-span-3">
                  <FormLabel>Indentification</FormLabel>
                  <FormDescription>
                    write your ID for example: 441-121299-1001F or 001-101087,
                    this identification must be in Nicaraguan format
                  </FormDescription>
                  <FormControl>
                    <Indentification
                      value={Identification ?? ""}
                      onMunicipalityChange={handleMunicipalityChange}
                      onDateChange={handleDateChange}
                      onFullIdChange={handleFullIdChange}
                      onError={handleErrorChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button className="mt-2" type="submit">
            Save
          </Button>
        </form>
      </Form>
    </>
  );
}
