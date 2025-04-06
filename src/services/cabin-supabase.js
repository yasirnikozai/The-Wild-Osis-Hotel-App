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
    // 1. Check if it's an existing image (editing case)
    const hasImagePath =
        typeof newCabin.image === "string" &&
        newCabin.image.startsWith(supabaseUrl);

    let imagePath = newCabin.image;

    // 2. If it's a new image, generate path and upload
    if (!hasImagePath) {
        // Generate unique image name
        const imageName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}-${newCabin.image?.name || "image"}`.replaceAll("/", "");

        imagePath = `${supabaseUrl}/storage/v1/object/public/cabins-image/${imageName}`;

        // Upload the new image to Supabase storage
        if (hasImagePath) return data;
        const { error: storageError } = await supabase.storage
            .from("cabins-image")
            .upload(imageName, newCabin.image);

        if (storageError) {
            console.error("Storage error:", storageError.message);
            throw new Error("Cabin image upload failed.");
        }
    }

    // 3. Insert or update the cabin in the database
    let query = supabase.from("cabins");

    if (!id) {
        query = query.insert([{...newCabin, image: imagePath }]);
    } else {
        query = query.update({...newCabin, image: imagePath }).eq("id", id);
    }

    const { data, error } = await query.select().maybeSingle();

    if (error) {
        console.error("Database error:", error.message);
        throw new Error("Cabin could not be created/updated.");
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