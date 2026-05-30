import { globals } from "./globals";

/**
 * 
 * @param {String} endpoint - endpoint path (ex: /api/v1/endpoint). No need to include the URL.
 * @returns 
 */
export const useGet = async (endpoint) => {
    try {
        const response = await fetch(`${globals.url}${endpoint}`, {
            method:'GET',
            credentials:'include'
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                StatusCode: response.status,
                data: null,
                message:  data.message || "Failed to fetch" 
            }
        }

        return {
            StatusCode: response.status,
            data: data
        }
    }
    catch (error) {
        console.error(error);
    }
}

/**
 * 
 * @param {String} endpoint - endpoint path (ex: /api/v1/endpoint). No need to include the URL. 
 * @param {Object} payload - set the payload to be stringified
 * @returns 
 */
export const usePost = async (endpoint, payload) => {
    try {
        const response = await fetch(`${globals.url}${endpoint}`, {
            method:'POST',
            headers: {
                'Content-Type':"application/json",
            },
            credentials:'include',
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                StatusCode: response.status,
                data: null,
                message: data.message || "Failed to fetch" 
            }
        }

        return {
            StatusCode: response.status,
            data: data,
            message: data.message || "No message"
        }
    }
    catch (error) {
        console.error(error);
    }
}

/**
 * 
 * @param {String} endpoint - endpoint path (ex: /api/v1/endpoint). No need to include the URL. 
 * @param {Object} formData - form data
 * @returns 
 */
export const usePostForm = async (endpoint, formData) => {
    try {
        const response = await fetch(`${globals.url}${endpoint}`, {
            method:'POST',
            credentials:'include',
            body: formData
        })

        const data = await response.json();

        if (!response.ok) {
            return {
                StatusCode: response.status,
                data: null,
                message:  data.message || "Failed to fetch"  
            }
        }

        return {
            StatusCode: response.status,
            data: data,
            message: data.message || "No message"
        }
    }
    catch (error) {
        console.error(error);
    }
}

/**
 * @param {String} endpoint - endpoint path (ex: /api/v1/logout)
 * @param {Object} [payload=null] - (optional) if there's a payload to be sent
 */
export const useDelete = async (endpoint, payload = null) => {
    try {
        const options = {
            method: 'DELETE',
            credentials: 'include'
        };

        // add the stringfied payload and the Content-Type header
        if (payload) {
            options.headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(payload);
        }

        const response = await fetch(`${globals.url}${endpoint}`, options);

        const data = response.status !== 204 ? await response.json() : {};

        if (!response.ok) {
            return {
                StatusCode: response.status,
                data: null,
                message: data.message || "Delete failed"
            }
        }

        return {
            StatusCode: response.status,
            data: data
        }
    }
    catch (error) {
        console.error(error);
    }
}


export const usePut = async (endpoint, payload = null) => {
    try {
        const options = {
            method: 'PUT',
            credentials: 'include'
        }

        if (payload) {
            options.headers['Content-Type'] = "application/json";
            options.body = JSON.stringify(payload);
        }

        const response = await fetch(`${globals.url}${endpoint}`, options);

        const data = await response.json();

        if (!response.ok) {
            return {
                StatusCode: response.status,
                data:null,
                message:data.message || "Failed to perform PUT"
            }
        };

        return {
            StatusCode: response.status,
            data: data || null,
            message: data.messaage || "Success"
        }
    }
    catch (error) {
        console.error(error);
    }
}