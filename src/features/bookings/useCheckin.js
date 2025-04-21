// hooks/useCheckin.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkinBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: checkIn, isLoading: isCheckingIn } = useMutation({
        mutationFn: (bookingId) =>
            checkinBooking(bookingId, {
                status: "checked-in", // make sure your backend expects this exact value
                isPaid: true,
            }),
        onSuccess: (data) => {
            toast.success(`Booking ${data.id} successfully checked in`);
            queryClient.invalidateQueries({ active: true });
            navigate("/");
        },
        onError: () => {
            toast.error("There was an error while checking in");
        },
    });

    return { checkIn, isCheckingIn };
}