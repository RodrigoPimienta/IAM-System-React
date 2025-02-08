export const loginAPI = async (data) => {
    try {
        const response = await fetch('http://localhost:8000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json' // Important: Include Accept header
            },
            body: JSON.stringify(data) // Use the 'data' parameter, not jsonData
        });

        if (!response.ok) { // Check for HTTP errors FIRST
            const errorData = await response.json(); // Try to parse error for better message
            return {
                error: true,
                message: errorData.message || `HTTP error! status: ${response.status}`, // Include status code
                data: null
            };
        }

        const responseData = await response.json(); // Now it's safe to parse
        return {
            error: false,
            message: null,
            data: responseData // No need to destructure if you want the whole object
        };

    } catch (error) {
        return {
            error: true,
            message: error.message || 'Unexpected error occurred', // Include error message
            data: null
        };
    }
};

export const CheckPermission = async (token) => {
    try {

        // const response = await fetch('http://localhost:4000/api/auth/permissions', {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${token}`
        //     }
        // });

        // const result = await response.json();
        // return result;

        return {
            error: false,
            message: 'Permissions granted',
            data: [
                // aqui es un array de permisos por modulo
                {
                    key: 'users',
                    name: 'Users',
                    permissions: ['create', 'read', 'update', 'delete']
                },
                {
                    key: 'modules',
                    name: 'Modules',
                    permissions: ['create', 'read', 'update', 'delete']
                },
                {
                    key: 'profiles',
                    name: 'Profiles',
                    permissions: ['create', 'read', 'update', 'delete']
                }
            ]
        }

    } catch (error) {
        return {
            error: true,
            message: 'Unexpected error occurred',
            data: null
        }
    }
}

export const CheckToken = async (token) => {
    try {

        // const response = await fetch('http://localhost:4000/api/auth/check-token', {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${token}`
        //     }
        // });

        // const result = await response.json();
        // return result;

        return {
            error: false,
            message: 'Token is valid',
            data: null
        }

    } catch (error) {
        return {
            error: true,
            message: 'Unexpected error occurred',
            data: null
        }
    }
}


// async function test() {
//     const jsonData = { user: "test@example.com", password: "123456" };
//     try {
//         const response = await fetch('http://localhost:8000/api/auth/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json'
//             },
//             body: JSON.stringify(jsonData)
//         });

//         if (!response.ok) {
//             const errorData = await response.json(); // Try to parse error response
//             throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || 'Unknown error'}`);  // Improved error handling
//         }

//         const data = await response.json();
//         console.log(data);
//     } catch (error) {
//         console.error('Error:', error); // More robust error handling
//     }
// }

// test();