//things that the app needs ALWAYS ex: user data
export default {
    username: sessionStorage.getItem("username") || null,
    userToken: sessionStorage.getItem("userToken") || null,
    isAdmin: sessionStorage.getItem("isAdmin") || null,
}