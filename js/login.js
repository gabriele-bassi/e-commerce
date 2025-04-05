const loadUsers = async () => {
    const users = await fetch("../data/users.json")
    return await users.json()
}




const authUser = (user, users) => {
    return users.some(element =>
        user.username === element.username && user.password === element.password && user.nome === element.nome && user.cognome === element.cognome
    );

}



const login = () => {
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    const nome = document.getElementById("nome").value
    const cognome = document.getElementById("cognome").value

    const user = { username, password, nome, cognome }

    loadUsers().then(users => {
        if (authUser(user, users)) {
            window.location.href = "/index.html"
            window.localStorage.setItem("user", JSON.stringify(user))

        } else {
            window.location.href = "/pages/login.html"
        }
    })



}