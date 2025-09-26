const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Hash passwords for test users
  const saltRounds = 12;
  const password1 = await bcrypt.hash("password123", saltRounds);
  const password2 = await bcrypt.hash("password456", saltRounds);

  // Create test users with username and hashed passwords
  const user1 = await prisma.user.create({
    data: {
      username: "alice_andersson",
      password: password1,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: "bob_bengtsson",
      password: password2,
    },
  });

  console.log(`✅ Created users: ${user1.username}, ${user2.username}`);

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
