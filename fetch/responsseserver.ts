

export const fetchAuthorization = async (username: string, password: string) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    try {
        const response = await fetch('https://darkdes-django-t3b02.tw1.ru/api/v1/token/', {
            method: 'POST',
            body: formData
        })
        if (!response.ok) return { mesasge: 'Ошибка запроса' }
        const data = await response.json();
        if (data.access && data.refresh) {
            return { mesasge: 'вы авторизованы' };
        }
        if (data.detail) return { message: 'неверный логин или пароль' }

    } catch (error) {
        return { mesasge: 'Ошибка запроса' }
    }
}

