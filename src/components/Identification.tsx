import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { isValid } from "date-fns";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

type Props = {
  onMunicipalityChange: (municipality: string) => void;
  onDateChange: (date: Date | null) => void;
  onFullIdChange: (fullId: string) => void;
  onError: (error: string | null) => void;
  value: string | null;
};

export default function Identification({
  onMunicipalityChange,
  onDateChange,
  onFullIdChange,
  onError,
  value,
}: Props) {
  const formatDateOfBirth = (dateString: string): Date | null => {
    if (dateString.length !== 6) return null;

    const day = parseInt(dateString.slice(0, 2), 10);
    const month = parseInt(dateString.slice(2, 4), 10) - 1;
    const year = parseInt(dateString.slice(4), 10);

    if (month < 0 || month > 11 || day < 1 || day > 31) return null;

    const cutoffYear = 30;
    const fullYear = year >= cutoffYear ? year + 1900 : year + 2000;
    const date = new Date(fullYear, month, day);

    return isValid(date) ? date : null;
  };

  const handleChange = (value: string) => {
    onFullIdChange(value);
    const arrayValue = value.split("");

    if (arrayValue.length >= 3) {
      const newMunicipality = arrayValue.slice(0, 3).join("");
      onMunicipalityChange(newMunicipality);
    }

    if (arrayValue.length >= 9) {
      const newDate = arrayValue.slice(3, 9).join("");
      const formattedDate = formatDateOfBirth(newDate);

      if (formattedDate) {
        onDateChange(formattedDate);
        onError(null);
      } else {
        onError("Fecha de nacimiento inválida.");
      }
    }

    if (arrayValue.length < 14) {
      onError("Cédula incompleta.");
    }
  };

  return (
    <InputOTP
      pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
      maxLength={14}
      inputMode="text"
      value={value ?? ""}
      onChange={handleChange}
    >
      <InputOTPGroup>
        {/* Municipality Code */}
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>

      <InputOTPGroup>
        {/* Date of Birth */}
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
        <InputOTPSlot index={6} />
        <InputOTPSlot index={7} />
        <InputOTPSlot index={8} />
      </InputOTPGroup>

      <InputOTPGroup>
        {/* Alphanumeric ID */}
        <InputOTPSlot index={9} />
        <InputOTPSlot index={10} />
        <InputOTPSlot index={11} />
        <InputOTPSlot index={12} />
        <InputOTPSlot index={13} />
      </InputOTPGroup>
    </InputOTP>
  );
}
