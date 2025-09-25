const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Create test users
  const user1 = await prisma.user.create({
    data: {
      name: "Alice Andersson",
      email: "alice@example.com",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Bob Bengtsson",
      email: "bob@example.com",
    },
  });

  // Create test posts
  await prisma.post.create({
    data: {
      title: "Mitt första inlägg",
      content: "Det här är mitt första inlägg med Prisma och Neon!",
      published: true,
      authorId: user1.id,
    },
  });

  await prisma.post.create({
    data: {
      title: "Prisma är fantastiskt",
      content:
        "Jag älskar hur enkelt det är att arbeta med databaser med Prisma.",
      published: true,
      authorId: user2.id,
    },
  });

  await prisma.post.create({
    data: {
      title: "Draft inlägg",
      content: "Det här inlägget är inte publicerat än.",
      published: false,
      authorId: user1.id,
    },
  });

  console.log("✅ Seed data created successfully!");
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
