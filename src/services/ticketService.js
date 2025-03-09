import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/tickets"; // Laravel API URL

export default {
    async createTicket(ticketData) {
        try {
            const response = await axios.post(API_URL, ticketData);
            return response.data; // return the actual response data, not the entire response object
        } catch (error) {
            console.error("Error creating ticket:", error);
            throw error; // rethrow the error to be handled by the caller
        }
    },

    async getTickets() {
        try {
            const response = await axios.get(API_URL);
            return response.data; // ensure this is a plain array of ticket objects
        } catch (error) {
            console.error("Error fetching tickets:", error);
            throw error; // rethrow the error
        }
    }
};
