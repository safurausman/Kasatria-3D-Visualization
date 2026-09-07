import {
    SHEET_ID,
    SHEET_RANGE
} from "../config.js";

export async function loadGoogleSheetData(accessToken) {
    const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(SHEET_RANGE)}`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    );

    if (!response.ok) {
        throw new Error("Failed to load Google Sheet data.");
    }

    const result = await response.json();

    const rows = result.values || [];

    return rows.slice(1).map((row, index) => ({
        id: index + 1,
        name: row[0] || "",
        photo: row[1] || "",
        age: Number(row[2]) || 0,
        country: row[3] || "",
        interest: row[4] || "",
        netWorth: Number(
            String(row[5] || "0").replace(/[$,]/g, "")
        ) || 0
    }));
}