const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function financeCard() {
    const res = await fetch(`${API_URL}/finance`,
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
    const data = await res.json();
    if (!res.ok) {
        // console.log(data);
        throw new Error(data?.message || "Failed to finance card Data");
    }
    return data;
}

export async function financePlant() {
    const res = await fetch(`${API_URL}/financeplants`,
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
    const data = await res.json();
    if (!res.ok) {
        // console.log(data);
        throw new Error(data?.message || "Failed to finance plant Data");
    }
    return data;
}

export async function fundTableData(Plants: string, fundcenter:string) {
    try {
        const res = await fetch(`${API_URL}/filterfinance`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Plants, fundcenter}),
        });
    const data = await res.json();
    if (!res.ok) {
        // console.log(data);
        throw new Error(`Error fetching data: ${res.status}`);
    }
    return data;
}
catch (error) {
    console.error('Error:', error);
    return {};
}
}