import { PrismaClient } from "@prisma/client";
import { hashPassword } from "./password";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding...");

  try {
    // Create a demo user
    const hashedPassword = await hashPassword("demo123");

    const demoUser = await prisma.user.upsert({
      where: { email: "demo@enzi.coffee" },
      update: {},
      create: {
        email: "demo@enzi.coffee",
        password: hashedPassword,
        name: "Demo Barista",
      },
    });

    console.log("✅ Demo user created:", {
      id: demoUser.id,
      email: demoUser.email,
      name: demoUser.name,
    });

    // Create some sample orders for demonstration
    const sampleOrders = [
      {
        items: [
          { id: 1, name: "Espresso", price: 2500, quantity: 2 },
          { id: 2, name: "Latte", price: 3500, quantity: 1 },
        ],
        totalAmount: 8500,
        itemCount: 3,
      },
      {
        items: [
          { id: 3, name: "Cappuccino", price: 3000, quantity: 1 },
          { id: 4, name: "Mocha", price: 4000, quantity: 1 },
        ],
        totalAmount: 7000,
        itemCount: 2,
      },
      {
        items: [{ id: 2, name: "Latte", price: 3500, quantity: 3 }],
        totalAmount: 10500,
        itemCount: 3,
      },
    ];

    for (const orderData of sampleOrders) {
      await prisma.order.create({
        data: {
          userId: demoUser.id,
          totalAmount: orderData.totalAmount,
          itemCount: orderData.itemCount,
          items: orderData.items,
        },
      });
    }

    console.log("✅ Sample orders created");
    console.log("🎉 Database seeding completed successfully!");

    console.log("\n📝 Demo credentials:");
    console.log("Email: demo@enzi.coffee");
    console.log("Password: demo123");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    throw error;
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
