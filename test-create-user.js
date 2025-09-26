const axios = require("axios");

async function testCreateUser() {
  try {
    console.log("Testing create user endpoint...");

    const response = await axios.post("http://localhost:3000/api/users", {
      username: "testuser123",
      password: "testpassword456",
    });

    console.log("✅ User creation successful!");
    console.log("Response:", response.data);
  } catch (error) {
    console.log("❌ User creation failed!");
    console.log("Error:", error.response?.data || error.message);
  }
}

testCreateUser();