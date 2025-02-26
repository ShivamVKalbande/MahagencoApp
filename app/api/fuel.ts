const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function fuelCombination(DomesticMT: string, Rate:string, GCV:string) {
    try {
        const res = await fetch(`${API_URL}/combinationfuel`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ DomesticMT, Rate, GCV}),
        });
    const data = await res.json();
    if (!res.ok) {
        // console.log(data);
        throw new Error(`Error fetching fuel combination data: ${res.status}`);
    }
    return data;
}
catch (error) {
    console.error('Error:', error);
    return {};
}
}