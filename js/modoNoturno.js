document.addEventListener("DOMContentLoaded", function(){
    const toggleModoNoturnoButton = document.getElementById("toggleDarkMode");
    const root = document.documentElement;

    if(localStorage.getItem("theme") === "dark"){
        ativarModoNoturno();
    }

    toggleModoNoturnoButton.addEventListener("click", function(){
        if(root.classList.contains("modo-noturno")){
            desativarModoNoturno();
        } else {
            ativarModoNoturno();
        }
    });

    function ativarModoNoturno(){
        root.classList.add("modo-noturno");
        localStorage.setItem("theme", "dark");
    }

    function desativarModoNoturno(){
        root.classList.remove("modo-noturno");
        localStorage.setItem("theme", "light");
    }
})