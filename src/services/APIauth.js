import supabase from "./supabase";

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

    console.log("Login successful:", data);

    // Return user data or session data
    return data; // This can be session info or user info depending on what you need
  } catch (err) {
    console.error("Login failed:", err.message);
    // Handle any additional errors that may occur
    throw err; // Rethrow the error to be handled by the calling function
  }
}

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  // If there's no user data
  if (!data?.user) return null;

  return data.user;
}
//logout
export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error("Logout failed: " + error.message);
}
