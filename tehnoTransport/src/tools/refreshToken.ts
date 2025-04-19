const REFRESHURL = "https://tehno-transport-b.onrender.com/user/refresh-auth";

export default async function refreshAuthToken() {
  try {
    const response = await fetch(REFRESHURL, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    const data = await response.json();
    console.log("Token refreshed successfully:", data);

    document.cookie = `authToken=${data.idToken}; path=/; Secure; HttpOnly`;

    return data;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return null;
  }
}
