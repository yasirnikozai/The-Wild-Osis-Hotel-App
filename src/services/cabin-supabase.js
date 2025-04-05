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
    typeof newCabin.image === "string" &&
    newCabin.image.startsWith(supabaseUrl);

  // ✅ If image is a new File, validate its type
  if (
    !hasImage &&
    (!newCabin.image || !newCabin.image.type?.startsWith("image/"))
  ) {
    throw new Error("Invalid image file. Please upload a valid image.");
  }

  let imageUrl = newCabin.image; // Use existing URL if it's already uploaded

  // 🖼️ Upload to Supabase Storage if it's a new image file
  if (!hasImage) {
    const imageName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}-${newCabin.image.name}`;
    const imagePath = `cabins-image/${imageName}`;

    const { error: storageError } = await supabase.storage
      .from("cabins-image")
      .upload(imagePath, newCabin.image);

    if (storageError) {
      console.error("Storage Upload Error:", storageError);
      throw new Error("Failed to upload image to storage.");
    }

    // 🔗 Get the public URL after successful upload
    const { publicUrl } = supabase.storage
      .from("cabins-image")
      .getPublicUrl(imagePath);

    imageUrl = publicUrl;
  }

  // 📥 Insert or Update Cabin
  let query = supabase.from("cabins");

  if (id) {
    // ✏️ Update existing cabin
    query = query.update({ ...newCabin, image: imageUrl }).eq("id", id);
  } else {
    // ➕ Insert new cabin
    query = query.insert([{ ...newCabin, image: imageUrl }]);
  }

  // 🧾 Execute and fetch the inserted/updated record
  const { data, error } = await query.select().maybeSingle();

  if (error) {
    console.error("Supabase Error:", error.message);
    console.error("Details:", error.details);
    console.error("Hint:", error.hint);
    throw new Error("Failed to save cabin data.");
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
