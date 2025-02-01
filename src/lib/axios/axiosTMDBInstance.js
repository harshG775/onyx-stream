import { constants } from "@/config";
import axios from "axios";
const { BASE_URL, API_KEY } = constants.TMDB;
export const axiosTMDBInstance = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: API_KEY,
    },
    timeout: 4000,
    headers: {
        "accept": "application/json",
        "content-type": "application/json",
    },
});
