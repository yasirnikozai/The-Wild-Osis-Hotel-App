import supabase, { supabaseUrl } from "./supabase";

export async function getCabin() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log(error);
    throw new Error("Cabin is not found");
  }
  return data;
}

export async function addCabin(newCabin, id) {
  const hasImage =
    typeof newCabin?.image === "string" && newCabin.image.startsWith("https");
  console.log(hasImage);
  // Validate the image file (only if it's a new upload)
  if (!newCabin.image || !newCabin.image.type.startsWith("image/")) {
    throw new Error("Invalid image file");
  }

  let imageUrl = newCabin.image; // Default to existing image

  if (!hasImage) {
    const imageName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}-${newCabin.image.name}`;
    const imagePath = `cabins-image/${imageName}`;

    // Upload image to Supabase Storage
    const { error: storageError } = await supabase.storage
      .from("cabins-image")
      .upload(imagePath, newCabin.image);

    if (storageError) {
      console.log(storageError);
      throw new Error("Failed to upload image");
    }

    // Get the public URL from Supabase
    imageUrl = supabase.storage
      .from("cabins-image")
      .getPublicUrl(imagePath).publicUrl;
  }

  let query = supabase.from("cabins");

  if (id) {
    // Update existing cabin
    query = query.update({ ...newCabin, image: imageUrl }).eq("id", id);
  } else {
    // Insert new cabin
    query = query.insert([{ ...newCabin, image: imageUrl }]);
  }

  // Execute the query and get the result
  const { data, error } = await query.select().maybeSingle();

  if (error) {
    console.log("Supabase Error:", error.message);
    console.log("Supabase Details:", error.details);
    console.log("Supabase Hint:", error.hint);
    throw new Error("Failed to insert cabin data");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("Failed to delete cabin");
  }
  return data;
}
