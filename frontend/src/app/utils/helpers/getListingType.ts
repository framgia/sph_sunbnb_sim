export function getListingType(
  listingType: string
): "accommodation" | "experience" {
  if (listingType.includes("Experience")) return "experience";
  else if (listingType.includes("Accommodation")) return "accommodation";
  else throw Error("Invalid Listing Type");
}
