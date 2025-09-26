const axios = require("axios");

async function testCreateUserAndJWT() {
  const username = "jwt_test_" + Date.now();
  const password = "testpassword123";

  try {
    console.log("🧪 Testing complete JWT flow...");
    console.log("Username:", username);

    // Step 1: Create user
    console.log("\n1️⃣ Creating user...");
    const createResponse = await axios.post("http://localhost:3000/api/users", {
      username,
      password,
    });

    console.log("✅ User creation successful!");
    console.log("Response:", createResponse.data);

    // Step 2: Login to get JWT token
    console.log("\n2️⃣ Logging in to get JWT token...");
    const loginResponse = await axios.post(
      "http://localhost:3000/api/auth/login",
      {
        username,
        password,
      }
    );

    console.log("✅ Login successful!");
    console.log("JWT Token received:", loginResponse.data.token ? "YES" : "NO");

    const token = loginResponse.data.token;

    // Step 3: Test protected route with JWT token
    console.log("\n3️⃣ Testing protected profile route...");
    const profileResponse = await axios.get(
      "http://localhost:3000/api/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("✅ Protected route access successful!");
    console.log("Profile data:", profileResponse.data);

    // Step 4: Test protected users route
    console.log("\n4️⃣ Testing protected users route...");
    const usersResponse = await axios.get("http://localhost:3000/api/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("✅ Protected users route access successful!");
    console.log("Users count:", usersResponse.data.length);

    console.log("\n🎉 All JWT tests passed!");
  } catch (error) {
    console.log("❌ Test failed!");
    console.log("Error:", error.response?.data || error.message);
    if (error.response) {
      console.log("Status:", error.response.status);
    }
  }
}

testCreateUserAndJWT();
