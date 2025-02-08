export const loginAPI = async (data) => {
    try {
        // const response = await fetch('http://localhost:4000/api/auth/login', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(data)
        // });
        // const result = await response.json();
        // return result;

        // como lo haremos con localStorage, tenemos que simular la respuesta, asi que siempre retornaremos un objeto con un token
            // dormir 2 segundos

        await new Promise((resolve) => setTimeout(resolve, 2000));

        return {
            error: false,
            message: 'User logged in',
            data: {
                user: {
                    id: 1,
                    username: data.username,
                    email: 'usuario@gmail.com',
                    role: 'admin',
                    status: 1
                },
                token: '1234567890'
            }
        }

    } catch (error) {
        return {
            error: true,
            message: 'Unexpected error occurred',
            data: null
        }
    }
}
