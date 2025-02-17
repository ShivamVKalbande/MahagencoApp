const API_URL = process.env.EXPO_PUBLIC_API_URL;
// console.log(API_URL);
// console.log("Full API URL:", `${API_URL}/getOperationDashboard`);

export async function getUnit (plant:string) {
    // console.log("Full GET UNIT URL:",`${API_URL}/master?level=unit&plant=${plant}`)
    const res = await fetch(`${API_URL}/master?level=unit&plant=${plant}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    if(!res.ok) {
        console.log(data);
        throw new Error(data?.message || "Failed to fetch unit");
      }
    return data;
}

export async function getPlant(){
    // console.log("Full GET PLANT URL:",`${API_URL}/master?level=mahagenco&plant=`)
    const res = await fetch (`${API_URL}/master?level=mahagenco&plant=`,{
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    if(!res.ok) {
        console.log(data);
        throw new Error(data?.message || "Failed to fetch plant");
    }
    return data;
}

export async function postOperation(level: string, duration: string, plant: string, tariff: string, unit: string) {
    try {
        // console.log("Full POST API URL:", `${API_URL}/getOperationDashboard`);
        const res = await fetch(`${API_URL}/getOperationDashboard`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ level, duration, plant, tariff, unit }),
        });

        if (!res.ok) {
            throw new Error(`Error fetching data: ${res.status}`);
        }

        const data = await res.json();
        // console.log("API Response:", data);

        if (!data || typeof data !== "object") {
            throw new Error(`Invalid API response: ${JSON.stringify(data)}`);
        }
        
        return data; // Ensure an empty object is returned instead of null
    } catch (error) {
        console.error('Error:', error);
        return {};
    }
}
