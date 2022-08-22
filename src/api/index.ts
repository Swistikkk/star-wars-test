const BASE_URL = "https://swapi.dev/api";

const getAllUsers = async (page: number) => {
    return await fetch(`${BASE_URL}/people/?page=${page}`)
        .then(response => response.json())
        .catch(e => console.log(e))
};

const getUserDetailsByName = async (name: string) => {
    return await fetch(`${BASE_URL}/people/?search=${name}`)
        .then(response => response.json())
        .catch(e => console.log(e))
}

export default {
    getAllUsers,
    getUserDetailsByName
};