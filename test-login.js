const axios = require("axios");

async function testLogin() {
  try {
    console.log("Testing login endpoint...");

    const response = await axios.post("http://localhost:3000/api/auth/login", {
      username: "alice_andersson",
      password: "password123",
    });

    console.log("✅ Login successful!");
    console.log("Response:", response.data);
  } catch (error) {
    console.log("❌ Login failed!");
    console.log("Error:", error.response?.data || error.message);
  }
}

testLogin();
