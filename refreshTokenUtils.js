const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Generera refresh token
const generateRefreshToken = () => {
  return crypto.randomBytes(64).toString("hex");
};

// Generera access token med kort giltighetstid
const generateAccessToken = (user) => {
  return jwt.sign(
    {
      userId: user.id,
      username: user.username,
      id: user.id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "15m" } // 15 minuter
  );
};

// Spara refresh token i databas
const saveRefreshToken = async (userId, refreshToken) => {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // 7 dagar

  return await prisma.refreshToken.create({
    data: {
      userId,
      token: refreshToken,
      expiresAt,
    },
  });
};

// Validera refresh token
const validateRefreshToken = async (token) => {
  try {
    const refreshToken = await prisma.refreshToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!refreshToken) {
      return null;
    }

    if (new Date() > refreshToken.expiresAt) {
      // Token har gått ut, ta bort det
      await prisma.refreshToken.delete({
        where: { id: refreshToken.id },
      });
      return null;
    }

    return refreshToken;
  } catch (error) {
    console.error("Validate refresh token error:", error);
    return null;
  }
};

// Ta bort refresh token (logout)
const revokeRefreshToken = async (token) => {
  try {
    await prisma.refreshToken.delete({
      where: { token },
    });
  } catch (error) {
    console.error("Revoke refresh token error:", error);
  }
};

// Rensa gamla tokens
const cleanupExpiredTokens = async () => {
  try {
    const result = await prisma.refreshToken.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });
    console.log(`Cleaned up ${result.count} expired refresh tokens`);
  } catch (error) {
    console.error("Cleanup expired tokens error:", error);
  }
};

module.exports = {
  generateRefreshToken,
  generateAccessToken,
  saveRefreshToken,
  validateRefreshToken,
  revokeRefreshToken,
  cleanupExpiredTokens,
};
