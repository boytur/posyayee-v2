
const userToken = sessionStorage.getItem("userToken");
const config = {
    headers: {
        'Authorization': userToken ? `Bearer ${userToken.replace(/"/g, '')}` : ''
    },
};

export { config };
