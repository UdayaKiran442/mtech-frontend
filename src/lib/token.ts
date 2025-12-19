"use client"
import { getCookie } from 'cookies-next'

export async function getToken(): Promise<string> {
    return await getCookie('token') as string
}