const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function getCard() {
    const res = await fetch(`${API_URL}/GetcardData`,
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
    //  console.log(res);
    const data = await res.json();
    if (!res.ok) {
        // console.log(data);
        throw new Error(data?.message || "Failed to Card Data");
    }
    return data;
}