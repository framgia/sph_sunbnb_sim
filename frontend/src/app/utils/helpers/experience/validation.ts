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
    data.minimum_days != null &&
    data.maximum_days != null &&
    data.minimum_days > data.maximum_days
  ) {
    return {
      hasError: true,
      message: "Maximum days cannot be lower than minimum days."
    };
  }

  if (data.inclusions.length === 0) {
    return {
      hasError: true,
      message: "At least one amenity must be provided."
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
