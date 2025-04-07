import styled from "styled-components";

import FileInput from "../../ui/FileInput"; // ✅ Correct Input for text and numbers
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Input from "../../ui/FileInput"; // ✅ FileInput only for file upload
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import useEditCabin from "./updateCabin";
import useCreateCabin from "./createCabin";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;
  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm({ cabinToEdit = {}, onClose, onCloseModel }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;
  const queryClient = useQueryClient();
  const { isCreatingCabin, isCreating } = useCreateCabin();
  const { isUpdatingCabin, isUpdating } = useEditCabin();
  const isWorking = isCreating || isUpdating;
  function onSubmit(data) {
    // Safely extract image (File object or existing URL)
    const image =
      typeof data.image === "string" ? data.image : data.image?.[0] || null; // fallback if no file selected

    const cabinPayload = { ...data, image };

    if (isEditSession) {
      isUpdatingCabin(
        { newCabindata: cabinPayload, id: editId },
        {
          onSuccess: () => {
            toast.success("Cabin updated successfully!");
            reset();
            onClose(); // Close form after successful update
          },
        }
      );
    } else {
      isCreatingCabin(cabinPayload, {
        onSuccess: () => {
          toast.success("Cabin added successfully!");
          reset();
          onCloseModel?.();
        },
      });
    }
  }
  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModel ? "modal" : "regular"}
    >
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "This field is required" })}
        />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          id="description"
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin Photo</Label>
        <FileInput
          id="image"
          type="file"
          accept="image/*"
          {...register("image")}
        />
        {errors.image && <Error>{errors.image.message}</Error>}
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModel?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit Cabin" : "Add new Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
