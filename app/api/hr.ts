const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function hrTableData(type: string, Designation:string, month:string) {
    try {
        const res = await fetch(`${API_URL}/${type}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Designation, month}),
        });
    const data = await res.json();
    if (!res.ok) {
        // console.log(data);
        throw new Error(`Error fetching hr data: ${res.status}`);
    }
    return data;
}
catch (error) {
    console.error('Error:', error);
    return {};
}
}