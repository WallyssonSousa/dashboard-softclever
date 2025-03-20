const btnTopo = document.getElementById("btnTopo");

window.onscroll = function () {
    if (document.documentElement.scrollTop > 300) {
        btnTopo.style.display = "block";
    } else {
        btnTopo.style.display = "none";
    }
};

function voltarAoTopo() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}