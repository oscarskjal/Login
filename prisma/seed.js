const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Clear existing data
  await prisma.user.deleteMany({});
  console.log("🗑️ Cleared existing users");

  // Hash passwords för test users
  const saltRounds = 12;
  const password1 = await bcrypt.hash("password123", saltRounds);
  const password2 = await bcrypt.hash("password456", saltRounds);

  // gör test users with username and hashed passwords
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
