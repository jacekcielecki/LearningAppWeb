
class Http {
    async getList<T>(url: string): Promise<T[]> {
        try {
            let accessToken = localStorage.getItem("token");
            const response = await fetch(url,  {
            method: 'GET',
            headers: {'Authorization': `Bearer ${accessToken}`}
            });
            if (!response.ok) {
                throw new Error(`Error to GET data from ${url} with statusCode ${response.status}`);
            }
            const data: T[] = await response.json();
            return data;
        } catch (error : any) {
            console.error(error);
            throw error;
        }
    }

    async post<T>(url: string, body: T): Promise<boolean> {
        try {
            let accessToken = localStorage.getItem("token");
            const response = await fetch(url,  {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
              },
              body: JSON.stringify(body),
            });
            if (!response.ok) {
                throw new Error(`Error to POST data from ${url} with statusCode ${response.status}`);
            }
            return true;
          } catch (error : any) {
            console.error(error);
            throw error;
          }
    }

    async postAndGet<T, Y>(url: string, body: T): Promise<Y> {
        try {
            let accessToken = localStorage.getItem("token");
            const response = await fetch(url,  {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
              },
              body: JSON.stringify(body),
            });
            if (!response.ok) {
                throw new Error(`Error to POST data from ${url} with statusCode ${response.status}`);
            }
            const data: Y = await response.json();
            return data;
          } catch (error : any) {
            console.error(error);
            throw error;
          }
    }

    async delete(url: string): Promise<boolean> {
        try {
            let accessToken = localStorage.getItem("token");
            const response = await fetch(url,  {
              method: 'DELETE',
              headers: {
                'Authorization': `Bearer ${accessToken}`
              }
            });
            if (!response.ok) {
                throw new Error(`Error to DELETE data from ${url} with statusCode ${response.status}`);
            }
            return true;
          } catch (error : any) {
            console.error(error);
            throw error;
          }
    }

}

export default Http;