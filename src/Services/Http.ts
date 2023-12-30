
export default class Http {
    async getList<T>(url: string): Promise<T[]> 
    {
        try {
            let accessToken = localStorage.getItem("token");
            const response = await fetch(url,  {
            method: 'GET',
            headers: {'Authorization': `Bearer ${accessToken}`}
            });
            if (!response.ok) {
            throw new Error(`Error to Fetch data from ${url} with statusCode ${response.status} and message {reason}`);
            }
            const data: T[] = await response.json();
            return data;
        } catch (error : any) {
            console.error(error);
            throw error;
        }
    }
}
