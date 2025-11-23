const BASE_URL = "http://localhost:3000/v1"

export async function registerUserAPI(payload: { name: string, email: string, password: string, role: string }) {
    try {
        const registerAPI = await fetch(`${BASE_URL}/user/register`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        })
        return await registerAPI.json()
    } catch (error) {

    }
}