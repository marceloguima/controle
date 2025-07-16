
const nomeDoUsuario = document.getElementById("nome-user")
const botaoEntrar = document.getElementById("btn")
const form = document.querySelector(".form-nome")




function salvaDados(){
const nameUser = nomeDoUsuario.value.trim()
localStorage.setItem("nome", nameUser)

}

form.addEventListener("click", (evento) =>{
evento.preventDefault()
verificaCampoVazio()
salvaDados()

})


function verificaCampoVazio(){
    const nome = nomeDoUsuario.value.trim()
    if(nome === ""){
        nomeDoUsuario.classList.add("active")
        setTimeout(()=>{
             nomeDoUsuario.classList.remove("active")
        },1500)
    }

   
}


