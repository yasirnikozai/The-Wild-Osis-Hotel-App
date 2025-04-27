import supabase, { supabaseUrl } from "./supabase";

//sign up
export async function SignUp({ fullName, email, password }) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                fullName,
                avatar: "",
            },
        },
    });
    console.log("🧠 Supabase SignUp Response:", data);

    if (error) {
        return error.message;
    }
    return data;
}

export async function login({ email, password }) {
    try {
        // Call Supabase Auth API to sign in with email and password
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            // If error occurs, throw an error with the message
            throw new Error(error.message);
        }

        return data; // This can be session info or user info depending on what you need
    } catch (err) {
        console.error("Login failed:", err.message);
        // Handle any additional errors that may occur
        throw err; // Rethrow the error to be handled by the calling function
    }
}

export async function getCurrentUser() {
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (error) throw new Error(error.message);
    if (!user) return null;

    return user;
}
//logout
export async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error("Logout failed: " + error.message);
}

export async function updateCurrentUser({ fullName, avatar, password }) {
    let updateData;
    if (fullName) updateData = { data: { fullName } };
    if (password) updateData = { password };
    const { data, error } = supabase.auth.updateUser(updateData);
    if (error) throw new Error(error.message);
    if (!avatar) return data;
    const fileName = `avatar/${Date.now()}`;
    const { error: storageError } = await supabase.storage
        .from("avatars")
        .upload(fileName, avatar);
    if (storageError) throw new Error(storageError.message);
    const { data: updateUser, error: error2 } = await supabase.auth.updateUser({
        data: {
            avatar: `${supabaseUrl}/storage/v1/object/public/avatars//${fileName}`,
        },
    });
    if (error2) throw new Error(error2.message);
    return updateData;
}