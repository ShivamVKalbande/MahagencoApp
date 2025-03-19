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

export async function getFuel( Plant: string, Unit: string, Tariff: string) {
    try {
        const res = await fetch(`${API_URL}/cost?Plant=${Plant}&Unit=${Unit}&Tariff=${Tariff}`,{
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) {
            throw new Error(`Error fetching data: ${res.status}`);
        }

        const data = await res.json();

        if (!data || typeof data !== "object") {
            throw new Error(`Invalid API response: ${JSON.stringify(data)}`);
        }
        
        return data; 
    } catch (error) {
        console.error('Error:', error);
        return {};
    }
}

export async function getFuelSimulation( Gross_Generation_MU: number, APC_MU: number, LDO_KL: number, LDO_Kcal_Kg: number, FO_Kcal_Kg: number, FO_KL: number, Domestic_MT: number, Domestic_Kcal_Kg: number, Wash_Coal_MT: number, Import_MT: number, Domestic_Rs_MT: number, Wash_Coal_Rs_MT: number, Import_Rs_MT: number, LDO_Rs_KL: number, FO_Rs_KL: number, Unit: string, Plant: string, Other_Charges_Adjustment_Rs: number, SOC_KL: number, Import_Kcal_Kg: number, Wash_Coal_Kcal_Kg: number) {
    try {
        const res = await fetch(`${API_URL}/simulate?Gross_Generation_MU=${Gross_Generation_MU}&APC_MU=${APC_MU}&LDO_KL=${LDO_KL}&LDO_Kcal_Kg=${LDO_Kcal_Kg}&FO_Kcal_Kg=${FO_Kcal_Kg}&FO_KL=${FO_KL}&Domestic_MT=${Domestic_MT}&Domestic_Kcal_Kg=${Domestic_Kcal_Kg}&Wash_Coal_MT=${Wash_Coal_MT}&Import_MT=${Import_MT}&Domestic_Rs_MT=${Domestic_Rs_MT}&Wash_Coal_Rs_MT=${Wash_Coal_Rs_MT}&Import_Rs_MT=${Import_Rs_MT}&LDO_Rs_KL=${LDO_Rs_KL}&FO_Rs_KL=${FO_Rs_KL}&Unit=${Unit}&Plant=${Plant}&Other_Charges_Adjustment_Rs=${Other_Charges_Adjustment_Rs}&SOC_KL=${SOC_KL}&Import_Kcal_Kg=${Import_Kcal_Kg}&Wash_Coal_Kcal_Kg=${Wash_Coal_Kcal_Kg}`,{
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) {
            throw new Error(`Error fetching fuel simulation data: ${res.status}`);
        }

        const data = await res.json();

        if (!data || typeof data !== "object") {
            throw new Error(`Invalid API response: ${JSON.stringify(data)}`);
        }
        
        return data; 
    } catch (error) {
        console.error('Error:', error);
        return {};
    }
}