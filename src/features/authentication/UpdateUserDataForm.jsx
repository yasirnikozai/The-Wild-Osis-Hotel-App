import { useState } from "react";
import { useUser } from "../authentication/getUser"; // Custom hook to get the current user
import { useUpdateUser } from "../../features/authentication/useUpdateUser"; // Import the custom hook for updating user
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/FileInput"; // Correct input for text fields
import toast from "react-hot-toast"; // Optional but useful
import { useNavigate } from "react-router-dom"; // For navigation after success

function UpdateUserDataForm() {
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName, avatar: currentAvatar },
    },
  } = useUser(); // Get the current user
  const navigate = useNavigate(); // For navigating to the dashboard after success
  const { updateUser, isLoading } = useUpdateUser(); // Use the custom hook

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!fullName) return; // If no fullName, do not submit

    updateUser({ fullName, avatar, password }); // Use the custom hook to update the user data
    toast.success("Account updated successfully");

    setAvatar(null);
    setPassword("");

    // Navigate to the dashboard after successful update
    navigate("/dashboard");
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address" id="email">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name" id="fullName">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
        />
      </FormRow>
      <FormRow label="Avatar image" id="avatar">
        <FileInput
          type="file"
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
        />
        {avatar && (
          <img
            src={URL.createObjectURL(avatar)}
            alt="New avatar preview"
            className="w-24 h-24 mt-2 rounded-full"
          />
        )}
        {!avatar && currentAvatar && (
          <img src={currentAvatar} alt="Current avatar" />
        )}
      </FormRow>
      <FormRow label="New password" id="password">
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
        />
      </FormRow>
      <FormRow>
        <Button type="reset" variation="secondary">
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update account"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
