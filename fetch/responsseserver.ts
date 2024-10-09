export const BASE_URL = "https://darkdes-django-t3b02.tw1.ru/api/v1/";
import { updateToken } from "@/app/action";

/* авторизация */
export const fetchAuthorization = async (
    username: string,
    password: string
) => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    try {
        const response = await fetch(`${BASE_URL}token/`, {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        if (data.access && data.refresh) {
            updateToken({ refresh: data.refresh });
            return { message: "вы авторизованы" };
        }

        if (data.detail) return { message: "неверный логин или пароль" };
    } catch (error) {
        return { message: "Ошибка запроса" };
    }
};

/* обновление токена */

export const fetchUpdateToken = async (refresh: { refresh: string }) => {
    try {
        const response = await fetch(
            `
       ${BASE_URL}refresh/`,
            {
                method: "POST",
                body: JSON.stringify(refresh),
            }
        );
        const data = await response.json();
        if (data.access) {
            return { message: "Токен обновлен" };
        }
    } catch (error) {
        return { message: "обновление токена не удалось" };
    }
};

/* регистрация */

export const fetcnRegistration = async (dataReg: {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    username: string;
}) => {
    const formData = new FormData();
    formData.append("email", dataReg.email);
    formData.append("first_name", dataReg.first_name);
    formData.append("last_name", dataReg.last_name);
    formData.append("username", dataReg.username);
    formData.append("password", dataReg.password);

    try {
        const response = await fetch(`${BASE_URL}registration/`, {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        if (data.username[0] === "A user with that username already exists.") {
            return { message: "логин занят" };
        }
        if (data.email[0] === "Enter a valid email address.") {
            return { message: "email занят" };
        }
        return data;
    } catch (error) {
        return { message: "произошла ошибка" };
    }
};

/* получение всех статей */
export const fetchArticles = async () => {
    try {
        const response = await fetch(`${BASE_URL}articles/`);
        const data = await response.json();
        return data;
    } catch (error) {
        return { message: "произошла ошибка" };
    }
};


/* получение одной статьи */

export const fetchOneArticle = async (id: string) => {
    try {
        const response = await fetch(`${BASE_URL}articles/${id}`)
        const data = await response.json();
        return data;
    } catch (error) {
        return {message: 'произошла ошибка'}
    }
}