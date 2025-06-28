export function objectToBase64(object: unknown): string {
    return btoa(JSON.stringify(object));
}

export function base64ToObject(base64: string): unknown | null {
    try {
        const obj = JSON.parse(atob(base64));
        return obj;
    }
    catch (error) {
        console.error('Error parsing base64 string:', error);
        return null;
    }
}