import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking } from "../../services/apiBookings";

export default function useDeleteBookings() {
    const queryClient = useQueryClient();

    const { isLoading: isDeleting, mutate: deleteBookingMutate } = useMutation({
        mutationFn: deleteBooking,
        onSuccess: () => {
            toast.success("Booking successfully deleted");
            queryClient.invalidateQueries({ queryKey: ["bookings"] });
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });
    return { isDeleting, deleteBookingMutate };
}