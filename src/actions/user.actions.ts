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

export async function loginUserAPI(payload: { email: string, password: string }) {

    const loginAPI = await fetch(`${BASE_URL}/user/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    return await loginAPI.json()

}

export async function getUserProfileAPI(token: string) {
    const userProfileAPI = await fetch(`${BASE_URL}/user/profile`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    return await userProfileAPI.json()
}