const mapUsers = (data) => {
    return data.map((user) => {
        return {
        id: user.id,
        name: user.name,
        email: user.email,
        idProfile: user.idProfile,
        profile: user.profile,
        status: user.status,
        };
    });
};

const getUsersAPI = async () => {

  // dormir por 2 segundos
  await new Promise((resolve) => setTimeout(resolve, 2000));

  try {
    const response = await fetch(`http://localhost:5173/src/mocks/users.json`);
    const data = await response.json();
    return mapUsers(data);
  } catch (e) {
    throw new Error("Error en paginateProducts");
  }
};

export { getUsersAPI };
