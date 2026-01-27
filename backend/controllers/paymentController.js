import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();
// initialize stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// create a stripe checkout session
export const createCheckoutSession = async (req, res) => {
    try {
        const { items, orderId } = req.body;
        const line_items = items.map((cartItem) => ({
            price_data: {
                currency: "pln",
                product_data: { name: cartItem.name },
                unit_amount: Math.round(cartItem.price * 100),
            },
            quantity: cartItem.quantity,
        }));
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: line_items,
            mode: "payment",
            success_url: `https://miska-pho-frontend.vercel.app/verify?success=true&orderId=${orderId}&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `https://miska-pho-frontend.vercel.app/verify?success=false&orderId=${orderId}`,
        });
        res.json({ success: true, session_url: session.url });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};