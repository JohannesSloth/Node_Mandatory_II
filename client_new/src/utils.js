export const SERVER_URL = "http://localhost:5000"

export async function login(email, password) {
    const response = await fetch(`${SERVER_URL}/api/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
  
    return await response.json();
  }

  export async function getUser() {
    const response = await fetch(`${SERVER_URL}/api/auth/user`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (!response.ok) {
      return null;
    }
  
    const data = await response.json();
    return data.user;
  }

  export async function sendEmail(email) {
    const response = await fetch(`${SERVER_URL}/api/send-email`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
  
    return await response.json();
  }
  
  
  