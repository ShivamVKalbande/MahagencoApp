const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function getPo(plant: string) {
    // console.log("Full GET PO URL:",`${API_URL}/getmaterialpo?plant=${plant}`)
    const res = await fetch(`${API_URL}/getmaterialpo?plant=${plant}`,
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
    //  console.log(res);
    const data = await res.json();
    if (!res.ok) {
        // console.log(data);
        throw new Error(data?.message || "Failed to Po Data");
    }
    return data;
}

export async function getPr(plant: string) {
    // console.log("Full GET PO URL:",`${API_URL}/getmaterialpo?plant=${plant}`)
    const res = await fetch(`${API_URL}/getmaterialpr?plant=${plant}`,
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
    //  console.log(res);
    const data = await res.json();
    if (!res.ok) {
        // console.log(data);
        throw new Error(data?.message || "Failed to Po Data");
    }
    return data;
}

export async function getPoDocType() {
    const res = await fetch(`${API_URL}/Doc_type_polist`,
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }
    );
    const data = await res.json();
    if (!res.ok) {
        // console.log(data);
        throw new Error(data?.message || "Failed to Doc Type");
    }
    return data;
}

export async function getPrDocType() {
    const res = await fetch(`${API_URL}/Doc_type_prlist`,
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }
    );
    const data = await res.json();
    if (!res.ok) {
        // console.log(data);
        throw new Error(data?.message || "Failed to Doc Type");
    }
    return data;
}

export async function postMaterialvenderList(plant: string) {
    try {
        const res = await fetch(`${API_URL}/listofvenders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ plant }),
        });

        if (!res.ok) {
            throw new Error(`Error fetching data: ${res.status}`);
        }

        const data = await res.json();

        if (!res.ok) {
            // console.log(data);
            throw new Error(data?.message || "Failed to post vendor data");
        }
        return data;
    }
    catch (error) {
        console.error('Error:', error);
        return {};
    }
}

export async function postMaterialprNumber(plant: string) {
    try {
        const res = await fetch(`${API_URL}//listofprnumber`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ plant }),
        });

        if (!res.ok) {
            throw new Error(`Error fetching data: ${res.status}`);
        }

        const data = await res.json();

        if (!res.ok) {
            // console.log(data);
            throw new Error(data?.message || "Failed to post pr number data");
        }
        return data;
    }
    catch (error) {
        console.error('Error:', error);
        return {};
    }
}

export async function postPoMaterials(plant: string, status: string, DocType: string, vendername: string, FromDate:string, ToDate:string) {
    try {
        const res = await fetch(`${API_URL}/listmaterialpo`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ plant, status, DocType, vendername, FromDate, ToDate }),
        });

        if (!res.ok) {
            throw new Error(`Error fetching data: ${res.status}`);
        }

        const data = await res.json();

        if (!res.ok) {
            // console.log(data);
            throw new Error(data?.message || "Failed to post po data");
        }
        return data;
    }
    catch (error) {
        console.error('Error:', error);
        return {};
    }
}

export async function postPrMaterials(Plant: string, status: string, DocType: string, prnumber:string, fromDate:string, toDate:string) {
    try {
        const res = await fetch(`${API_URL}/listmaterialpr`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Plant, status, DocType, prnumber, fromDate, toDate }),
        });

        if (!res.ok) {
            throw new Error(`Error fetching data: ${res.status}`);
        }

        const data = await res.json();

        if (!res.ok) {
            // console.log(data);
            throw new Error(data?.message || "Failed to post pr data");
        }
        return data;
    }
    catch (error) {
        console.error('Error:', error);
        return {};
    }
}