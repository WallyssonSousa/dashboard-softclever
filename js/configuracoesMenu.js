document.getElementById('configuracoes').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('configuracoesFlutuante').style.right = '0';
});

document.getElementById('fecharConfiguracoes').addEventListener('click', function () {
    document.getElementById('configuracoesFlutuante').style.right = '-100%';
});



