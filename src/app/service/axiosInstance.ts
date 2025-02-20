import axios from "axios";
import {setTokenToStorage} from "./helpers";
import {getCookie} from "cookies-next";
import {retrieveTokenFromServer} from "@/app/service/helpers.server";

// Створення екземпляра axios з базовим URL
const axiosInstance = axios.create({
    baseURL: "https://dummyjson.com/auth",
});

// Перехоплювач запитів для додавання токена в заголовки
axiosInstance.interceptors.request.use(
    async (config) => {
        let token: string | null;
        if (typeof window === "undefined") {
            token = await retrieveTokenFromServer("accessToken");
        } else {
            token = getCookie("accessToken") as string | null;
        }

        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Перехоплювач відповідей для обробки помилок
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Перевіряємо, чи є помилка авторизації (401)
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            let refreshToken: string | null;
            if (typeof window === "undefined") {
                refreshToken = await retrieveTokenFromServer("refreshToken");
            } else {
                refreshToken = getCookie("refreshToken") as string | null;
            }

            if (!refreshToken) {
                return Promise.reject(error);
            }

            try {
                const {data} = await axiosInstance.post("/refresh", {
                    refreshToken,
                });
                setTokenToStorage("accessToken", data.accessToken);
                setTokenToStorage("refreshToken", data.refreshToken);

                originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
                return axiosInstance(originalRequest);
            } catch (err) {
                console.error("Не вдалося оновити токен", err);
                setTokenToStorage("accessToken", "");
                setTokenToStorage("refreshToken", "");
                window.location.href = "/login";
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;