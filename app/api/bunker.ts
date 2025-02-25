const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function bunkerTableData(plant: string, unit:string, month:string) {
    try {
        const res = await fetch(`${API_URL}/bcoal`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ plant, unit, month}),
        });
    const data = await res.json();
    if (!res.ok) {
        // console.log(data);
        throw new Error(`Error fetching bunker data: ${res.status}`);
    }
    return data;
}
catch (error) {
    console.error('Error:', error);
    return {};
}
}