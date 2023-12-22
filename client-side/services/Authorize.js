export const auth = (response, next) => {
    if (window !== "undefined"){
        localStorage.setItem("token", JSON.stringify(response.data[0].userToken));
    }
    next();
};