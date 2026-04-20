const BASE_URL = "http://localhost:3000/v1"

export async function fetchGithubAuthUrlAPI() {
    const response = await fetch(`${BASE_URL}/github`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await response.json();
    return data.url;
}