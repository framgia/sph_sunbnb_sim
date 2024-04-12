import { type ReportData } from "@/app/interfaces/types";
import { Reason } from "../../enums";

function validateReport(data: ReportData): Record<string, string | boolean> {
  const validReasons = Object.values(Reason);
  if (!validReasons.includes(data.reason)) {
    return {
      hasError: true,
      message: "Invalid reason selected."
    };
  }
  if (data.content.trim() === "") {
    return {
      hasError: true,
      message: "Report details cannot be empty."
    };
  }

  return {
    hasError: false,
    message: "Data is valid."
  };
}

export { validateReport };
