import { stripe } from "@/lib/stripe";
import { ProductType } from "@/types/ProductType";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma"; // Problema potencial de importação

const calculateOrderAmount = (items: ProductType[]) => {
  console.log('Calculating order amount for items:', items);
  const totalPrice = items.reduce((total, item) => {
    const calc = total + item.price! * item.quantity!;
    return calc;
  }, 0);
  return totalPrice;
};

export async function POST(req: Request) {
  console.log('Request received:', req);

  const { userId } = await auth(); // Possível problema de chamada de função
  const { items, paymentIntentId } = await req.json(); // Possível problema de chamada de função

  if (!userId) {
    console.log('Unauthorized request');
    return new Response('Não autorizado', { status: 401 });
  }

  const customerIdTep = 'cus_Q6Ev00pYUHufIx'; // Corrigi a variável customerIdTemp
  const total = calculateOrderAmount(items); // Corrigi a chamada da função calculateOrderAmount

  const orderData = {
    user: { connect: { id: 1 } },
    amount: total,
    currency: 'brl',
    paymentIntentId,
    products: {
      create: items.map((item: ProductType) => ({
        name: item.name,
        description: item.description,
        price: item.price,
        image: item.image,
        quantity: item.quantity
      }))
    }
  };

  if (paymentIntentId) {
    const current_intent = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (current_intent) {
      const update_intent = await stripe.paymentIntents.update(paymentIntentId, {
        amount: total
      });
      const [existing_order, updated_order] = await Promise.all([
        prisma.order.findFirst({ // Corrigi a posição da vírgula
          where: { paymentIntentID: paymentIntentId },
          include: { products: true }
        }),
        prisma.order.update({
          where: { paymentIntentID: paymentIntentId },
          data: {
            amount: total,
            products: {
              deleteMany: {},
              create: items.map((item: ProductType) => ({
                name: item.name,
                description: item.description,
                quantity: item.quantity,
                price: item.price,
                image: item.image,
              }))
            }
          }
        })
      ]);
      if (!existing_order) {
        return new Response("Order not found", { status: 200 });
      }

      return Response.json({ order: update_intent }, { status: 200 });
    } else {
      console.log('Creating paymentIntent');
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items), // Corrigi a chamada da função calculateOrderAmount
        currency: 'brl',
        automatic_payment_methods: { enabled: true },
      });

      orderData.paymentIntentId = paymentIntent.id;

      const newOrder = await prisma.order.create({
        data: orderData
      });
      return Response.json({ paymentIntent }, { status: 200 });
    }
  }
}
