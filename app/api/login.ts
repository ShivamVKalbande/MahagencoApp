const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function login(name: string, password:string) {
    try {
        const res = await fetch(`${API_URL}/login`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, password}),
        });
    const data = await res.json();
    if (!res.ok) {
        // console.log(data);
        throw new Error(`Error fetching login data: ${res.status}`);
    }
    return data;
}
catch (error) {
    console.error('Error:', error);
    return {};
}
}