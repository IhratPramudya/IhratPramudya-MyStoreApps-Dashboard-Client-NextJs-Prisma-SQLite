import { getCheckoutSession } from "@/actions/stripeActions";
import PaymentStatus from "@/screens/payment-status";

const PaymentStatusPage = async ({searchParams}) => {
    const {session_id} = searchParams;
    const session = await getCheckoutSession(session_id);
    return (
        <>
            <PaymentStatus session={session} />
        </>
    )
}

export default PaymentStatusPage;
