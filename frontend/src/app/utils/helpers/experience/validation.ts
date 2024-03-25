import { Experience, MediaUpdate } from "@/app/interfaces/ExperienceData";

async function validateExperience(
  data: Experience,
  media: string[] | MediaUpdate,
  isUpdate = false
): Promise<Record<string, string | boolean>> {
  for (const [, value] of Object.entries(data)) {
    if (typeof value === "string" && value.trim() === "") {
      return {
        hasError: true,
        message: "All fields must be completed."
      };
    }
    if (typeof value === "number" && (isNaN(value) || value <= 0)) {
      return {
        hasError: true,
        message: "All fields containing numbers must be greater than 0."
      };
    }
  }

  if (
    data.start_time != null &&
    data.end_time != null &&
    data.start_time > data.end_time
  ) {
    return {
      hasError: true,
      message: " Start time must be before end time."
    };
  }

  if (data.inclusions.length === 0) {
    return {
      hasError: true,
      message: "At least one inclusion must be provided."
    };
  }
  if (!isUpdate && Array.isArray(media) && media.length === 0) {
    return {
      hasError: true,
      message: "At least one photo must be provided."
    };
  }

  if (isUpdate && typeof media === "object" && media !== null) {
    const mediaUpdate = media as MediaUpdate;
    if (mediaUpdate.prev.length === 0 && mediaUpdate.new.length === 0) {
      return {
        hasError: true,
        message: "At least one photo must be provided."
      };
    }
  }

  return { hasError: false, message: "Validation successful." };
}

export { validateExperience };
