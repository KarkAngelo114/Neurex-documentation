import { globals } from "./globals"

export const sendCapture = async (image_input) => {
    try {
        const response = await fetch(`${globals.url}/api/neurex/detect`, {
            method:'POST',
            body: image_input,
            credentials:"include"
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                StatusCode: response.status,
                message: data.message,
                data:null
            }
        }

        return {
            StatusCode: 200,
            message: data.message,
            data: data
        }
    }
    catch (error) {
        console.log(error);
        return {
            StatusCode: 500,
            message:'An error occurred',
            data: null
        }
    }
}

export const sendDrawnImage = async (image_input) => {
    try {
        const response = await fetch(`${globals.url}/api/neurex/predict-number`, {
            method:'POST',
            body: image_input,
            credentials:"include"
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                StatusCode: response.status,
                message: data.message,
                data:null
            }
        }

        return {
            StatusCode: 200,
            message: data.message,
            data: data
        }
    }
    catch (error) {
        console.log(error);
        return {
            StatusCode: 500,
            message:'An error occurred',
            data: null
        }
    }
}