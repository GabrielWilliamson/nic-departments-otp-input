import z from "zod";

export const customerSchema = z.object({
  name: z
    .string()
    .min(10, { message: "Write at least 10 characters" })
    .max(130, { message: "Name is too long" }),
  department: z.string(),
  municipality: z.string(),
  date: z.date().refine(
    (date) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const minimumDate = new Date(today);
      minimumDate.setFullYear(today.getFullYear() - 16);
      return date <= minimumDate;
    },
    {
      message: "must be over 16 years old",
    }
  ),
  identification: z
    .string()
    .length(16, "complete the identification")
    .refine((value) => /^[A-Za-z]$/.test(value[value.length - 1]), {
      message: "the las character must be a letter",
    })
    .optional()
    .nullable(),
});
export type customer = z.infer<typeof customerSchema>;
