import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/FileInput";
import useSettings from "./useSettings";
import Spinner from "../../ui/Spinner";
import useEditSetting from "./useEditSettings";
import { updateSetting } from "../../services/apiSettings";
function UpdateSettingsForm() {
  const {
    isLoading,
    err,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxBookingsPerGuests,
      breakFastPrice,
    } = {},
  } = useSettings();
  const { isUpdating, isUpdatingSetting } = useEditSetting();
  if (isLoading) return <Spinner />;
  function handleUpdate(e, field) {
    const { value } = e.target;
    console.log(value);
    if (!value) return;
    isUpdatingSetting({ [field]: value });
  }
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          disabled={isUpdating}
          id="min-nights"
          defaultValue={minBookingLength}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          disabled={isUpdating}
          defaultValue={maxBookingsPerGuests}
          onBlur={(e) => handleUpdate(e, "maxBookingsPerGuests")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakFastPrice}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "breakFastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
