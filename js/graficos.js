let barData = {};
let lineData = {};
let pieData = {};

let barChart = null;
let lineChart = null;
let pieChart = null;


async function carregarDados() {
    try {
        const response = await fetch('dados.txt');

        if (!response.ok) {
            console.error('Erro ao carregar o arquivo de dados.');
            return;
        }

        const text = await response.text();
        const linhas = text.split('\n').map(linha => linha.trim()).filter(linha => linha.length > 0);

        console.log('Linhas lidas do arquivo:', linhas);

        const dados = {
            vendas: [],
            marketing: [],
            financeiro: { labels: [], valores: [] },
            vendedoresQueMaisVenderam: { labels: [], valores: [] },
            vendedoresQueMaisVenderamMensal: {labels: [], valores: []},
            vendedoresQueMaisVenderamAnual: {labels: [], valores: []},
            vendedoresQueMenosVenderam: { labels: [], valores: [] },
            produtosMaisVendidos: { labels: [], valores: [] },
            produtosMenosVendidos: { labels: [], valores: [] },
            clientesQueMaisCompraram: { labels: [], valores: [] }
        };

        let tipo = '';

        linhas.forEach(linha => {
            console.log('Processando linha:', linha);

            if (['vendas', 'marketing', 'financeiro', 'vendedoresquemaisvenderam', 
                'vendedoresquemaisvenderammensal', 'vendedoresquemaisvenderamanual',
                'vendedoresquemenosvenderam', 'produtosquemaisvenderam', 'produtosquemenosvenderam', 
                'clientesquemaiscompraram'].includes(linha.toLowerCase())) {
                tipo = linha.toLowerCase();
                console.log(`Tipo atualizado para: ${tipo}`);
            } else {

                const partes = linha.split(';').map(item => item.trim()).filter(item => item.length > 0);

                if (partes.length < 2) {
                    console.log('Ignorando linha inválida (menos de 2 partes):', linha);
                    return;
                }

                console.log(`Processando dados para o tipo: ${tipo}`);
                console.log('Partes:', partes);

                // Processar os dados conforme o tipo
                if (tipo === 'financeiro') {
                    for (let i = 0; i < partes.length; i += 2) {
                        dados.financeiro.labels.push(partes[i]);
                        dados.financeiro.valores.push(parseFloat(partes[i + 1]));
                    }
                } else if (tipo === 'vendedoresquemaisvenderam') {
                    for (let i = 0; i < partes.length; i += 2) {
                        dados.vendedoresQueMaisVenderam.labels.push(partes[i]);
                        dados.vendedoresQueMaisVenderam.valores.push(parseFloat(partes[i + 1]));
                    }
                } else if (tipo === 'vendedoresquemaisvenderammensal'){
                    for (let i = 0; i < partes.length; i += 2){
                        dados.vendedoresQueMaisVenderamMensal.labels.push(partes[i]);
                        dados.vendedoresQueMaisVenderamMensal.valores.push(parseFloat(partes[i + 1]));
                    }
                } else if (tipo === 'vendedoresquemaisvenderamanual'){
                    for(let i = 0; i < partes.length; i += 2){
                        dados.vendedoresQueMaisVenderamAnual.labels.push(partes[i]);
                        dados.vendedoresQueMaisVenderamAnual.valores.push(parseFloat(partes[i + 1]));
                    }
                }        
                else if (tipo === 'vendedoresquemenosvenderam') {
                    for (let i = 0; i < partes.length; i += 2) {
                        dados.vendedoresQueMenosVenderam.labels.push(partes[i]);
                        dados.vendedoresQueMenosVenderam.valores.push(parseFloat(partes[i + 1]));
                    }
                } else if (tipo === 'produtosquemaisvenderam') {
                    for (let i = 0; i < partes.length; i += 2) {
                        dados.produtosMaisVendidos.labels.push(partes[i]);
                        dados.produtosMaisVendidos.valores.push(parseFloat(partes[i + 1]));
                    }
                } else if (tipo === 'produtosquemenosvenderam') { // Ajustado para plural
                    for (let i = 0; i < partes.length; i += 2) {
                        dados.produtosMenosVendidos.labels.push(partes[i]);
                        dados.produtosMenosVendidos.valores.push(parseFloat(partes[i + 1]));
                    }
                } else if (tipo === 'clientesquemaiscompraram') {
                    for (let i = 0; i < partes.length; i += 2) {
                        dados.clientesQueMaisCompraram.labels.push(partes[i]);
                        dados.clientesQueMaisCompraram.valores.push(parseFloat(partes[i + 1]));
                    }
                } else if (tipo === 'vendas') {
                    dados.vendas = partes.map(num => parseFloat(num));
                } else if (tipo === 'marketing') {
                    dados.marketing = partes.map(num => parseFloat(num));
                }
            }
        });

        console.log('Dados processados:', dados);

        Object.keys(dados).forEach(key => {
            if (Array.isArray(dados[key])) {
                console.log(`${key}:`, dados[key]);
            } else {
                console.log(`${key} -> labels:`, dados[key].labels, `valores:`, dados[key].valores);
            }
        });

        atualizarGraficos(dados);

    } catch (error) {
        console.error('Erro ao carregar o arquivo de dados:', error);
    }
}


let vendedoresQueMaisVenderam = [];
let vendedoresQueMaisVenderamMensal = [];
let vendedoresQueMaisVenderamAnual = []; 
let vendedoresQueMenosVenderam = [];
let produtosMaisVendidos = [];
let produtosMenosVendidos = [];
let clientesQueMaisCompraram = [];
let vendas = [];
let marketing = [];
let financeiro = [];

function atualizarGraficos(dados) {
    if (dados.vendas.length > 0) {
        barData = {
            labels: ['27/06/2024', '28/06/2024', '29/06/2024', '01/07/2024', '02/07/2024', '03/07/2024'],
            datasets: [{
                label: 'Últimos 7 Dias',
                data: dados.vendas,
                backgroundColor: '#004767',
                borderColor: '#03bfcb',
                borderWidth: 1
            }]
        };
    }

    if (dados.marketing.length > 0) {
        lineData = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            datasets: [{
                label: 'Movimentações de Marketing',
                data: dados.marketing,
                fill: false,
                borderColor: 'rgb(3, 191, 203)',
                tension: 0.1
            }]
        };
    }

    if (dados.financeiro.labels.length > 0) {
        pieData = {
            labels: dados.financeiro.labels,
            datasets: [{
                data: dados.financeiro.valores,
                backgroundColor: ['#004767', '#03bfcb', '#2c3e50']
            }]
        };
    }

    if (dados.vendedoresQueMaisVenderam.labels.length > 0) {
        barDataVendedoresQueMaisVenderam = {
            labels: dados.vendedoresQueMaisVenderam.labels,
            datasets: [{
                label: 'Vendedores que Mais Venderam',
                data: dados.vendedoresQueMaisVenderam.valores,
                backgroundColor: 'rgb(0, 71, 103)',
                borderColor: 'rgb(3, 191, 203)',
                borderWidth: 1
            }]
        };
    }

    if (dados.vendedoresQueMaisVenderamMensal.labels.length > 0) {
        barDataVendedoresQueMaisVenderamMensal = {
            labels: dados.vendedoresQueMaisVenderamMensal.labels,
            datasets: [{
                label: 'Vendedores que Mais Venderam',
                data: dados.vendedoresQueMaisVenderamMensal.valores,
                backgroundColor: 'rgb(0, 71, 103)',
                borderColor: 'rgb(3, 191, 203)',
                borderWidth: 1
            }]
        };
    }

    if (dados.vendedoresQueMaisVenderamAnual.labels.length > 0) {
        barDataVendedoresQueMaisVenderamAnual = {
            labels: dados.vendedoresQueMaisVenderamAnual.labels,
            datasets: [{
                label: 'Vendedores que Mais Venderam',
                data: dados.vendedoresQueMaisVenderamAnual.valores,
                backgroundColor: 'rgb(0, 71, 103)',
                borderColor: 'rgb(3, 191, 203)',
                borderWidth: 1
            }]
        };
    }

    if (dados.vendedoresQueMenosVenderam.labels.length > 0) {
        barDataVendedoresQueMenosVenderam = {
            labels: dados.vendedoresQueMenosVenderam.labels,
            datasets: [{
                label: 'Vendedores que Menos Venderam',
                data: dados.vendedoresQueMenosVenderam.valores,
                backgroundColor: 'rgb(0, 71, 103)',
                borderColor: 'rgb(3, 191, 203)',
                borderWidth: 1
            }]
        };
    }

    if (dados.produtosMaisVendidos.labels.length > 0) {
        mixedDataProdutosMaisVendidos = {
            labels: dados.produtosMaisVendidos.labels,
            datasets: [
                {
                    label: 'Produtos que Mais Venderam',
                    data: dados.produtosMaisVendidos.valores,
                    backgroundColor: 'rgb(0, 71, 103)',
                    borderColor: 'rgb(3, 191, 203)',
                    borderWidth: 1,
                    type: 'bar' // Tipo de gráfico para este dataset
                },
            ]
        };
    }

    if (dados.produtosMenosVendidos.labels.length > 0) {
        mixedDataProdutosMenosVendidos = {
            labels: dados.produtosMenosVendidos.labels,
            datasets: [
                {
                    label: 'Produtos que Mais Vendaram',
                    data: dados.produtosMenosVendidos.valores,
                    backgroundColor: 'rgb(0, 71, 103)',
                    borderColor: 'rgb(3, 191, 203)',
                    borderWidth: 1,
                    type: 'bar' // Tipo de gráfico para este dataset
                },
            ]
        };
    }



    if (dados.clientesQueMaisCompraram.labels.length > 0) {
        barDataClientesQueMaisCompraram = {
            labels: dados.clientesQueMaisCompraram.labels,
            datasets: [{
                label: 'Clientes que Mais Compraram',
                data: dados.clientesQueMaisCompraram.valores,
                backgroundColor: 'rgb(0, 71, 103)',
                borderColor: 'rgb(3, 191, 203)',
                borderWidth: 1
            }]
        };
    }

    updateGraphData(barData, barConfig, 'barChart', 'bar');
    updateGraphData(lineData, lineConfig, 'lineChart', 'line');
    updateGraphData(pieData, pieConfig, 'pieChart', 'pie');
    updateGraphData(barDataVendedoresQueMaisVenderam, barConfig, 'barDataVendedoresQueMaisVenderam', 'bar');
    updateGraphData(barDataVendedoresQueMaisVenderamMensal, barConfig, 'barDataVendedoresQueMaisVenderamMensal', 'bar');
    updateGraphData(barDataVendedoresQueMaisVenderamAnual, barConfig, 'barDataVendedoresQueMaisVenderamAnual', 'bar');
    updateGraphData(barDataVendedoresQueMenosVenderam, barConfig, 'barDataVendedoresQueMenosVenderam', 'bar');
    updateGraphData(mixedDataProdutosMaisVendidos, mixedConfig, 'mixedDataProdutosMaisVendidos', 'mixed');
    updateGraphData(mixedDataProdutosMenosVendidos, mixedConfig, 'mixedDataProdutosMenosVendidos', 'mixed');
    updateGraphData(barDataClientesQueMaisCompraram, barConfig, 'barDataClientesQueMaisCompraram', 'bar');


    if (dados.vendedoresQueMaisVenderam.labels.length > 0) {
        vendedoresQueMaisVenderamDados = dados.vendedoresQueMaisVenderam.labels.map((label, index) => [label, dados.vendedoresQueMaisVenderam.valores[index]]);
    }
    if (dados.vendedoresQueMaisVenderamMensal.labels.length > 0) {
        vendedoresQueMaisVenderamMensalDados = dados.vendedoresQueMaisVenderamMensal.labels.map((label, index) => [label, dados.vendedoresQueMaisVenderam.valores[index]]);
    }
    if (dados.vendedoresQueMaisVenderamAnual.labels.length > 0) {
        vendedoresQueMaisVenderamAnualDados = dados.vendedoresQueMaisVenderamAnual.labels.map((label, index) => [label, dados.vendedoresQueMaisVenderam.valores[index]]);
    }
    if (dados.vendedoresQueMenosVenderam.labels.length > 0) {
        vendedoresQueMenosVenderam = dados.vendedoresQueMenosVenderam.labels.map((label, index) => [label, dados.vendedoresQueMenosVenderam.valores[index]]);
    }
    if (dados.produtosMaisVendidos.labels.length > 0) {
        produtosMaisVendidos = dados.produtosMaisVendidos.labels.map((label, index) => [label, dados.produtosMaisVendidos.valores[index]]);
    }
    if (dados.produtosMenosVendidos.labels.length > 0) {
        produtosMenosVendidos = dados.produtosMenosVendidos.labels.map((label, index) => [label, dados.produtosMenosVendidos.valores[index]]);
    }
    if (dados.clientesQueMaisCompraram.labels.length > 0) {
        clientesQueMaisCompraram = dados.clientesQueMaisCompraram.labels.map((label, index) => [label, dados.clientesQueMaisCompraram.valores[index]]);
    }
    if (dados.vendas.labels && dados.vendas.valores && dados.vendas.labels.length > 0) {
        vendas = dados.vendas.labels.map((label, index) => [label, dados.vendas.valores[index]]);
    }


}

function exportarParaCSV(dados, nomeArquivo) {
    const cvsContent = "data:text/csv;charset=utf-8," + dados.map(e => e.join(", ")).join("\n");
    const encodedUri = encodeURI(cvsContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", nomeArquivo);
    document.body.appendChild(link)

    link.click();
}


function exportarParaPDF(dados, nomeArquivo) {

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text("Dados do Gráfico", 10, 10);

    let y = 20;
    dados.forEach((linha) => {
        doc.text(linha.join(" "), 10, y);
        y += 10;
    });

    doc.save(nomeArquivo);
}



/* ---------------------------------------------------- ======== -------------------------------------------------------- */

const charts = {};

function updateGraphData(data, config, chartId, chartType) {
    const chartElement = document.getElementById(chartId);

    if (!chartElement) {
        console.log(`Elemento ${chartId} não encontrado.`);
        return;
    }

    if (charts[chartId]) {
        charts[chartId].destroy();
    }

    setTimeout(() => {
        charts[chartId] = new Chart(chartElement, {
            type: chartType,
            data: data,
            options: config.options
        })
    })
}

const barConfig = {
    type: 'bar',
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value) {
                        return new Intl.NumberFormat('pt-BR', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        }).format(value);
                    }
                }
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        let value = tooltipItem.raw;
                        return new Intl.NumberFormat('pt-BR', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        }).format(value);
                    }
                }
            }
        }
    }
};

const lineConfig = {
    type: 'line',
    options: {
        responsive: true
    }
};

const pieConfig = {
    type: 'pie',
    options: {
        responsive: true
    }
};

const mixedConfig = {
    type: 'mixed', // Tipo misto
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value) {
                        return new Intl.NumberFormat('pt-BR', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        }).format(value);
                    }
                }
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        let value = tooltipItem.raw;
                        return new Intl.NumberFormat('pt-BR', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        }).format(value);
                    }
                }
            }
        }
    }
};



function getBarDataConfig(chartType, data) {
    return {
        labels: data.labels,
        datasets: [{
            label: chartType, // Aqui podemos customizar o label de cada gráfico
            data: data.valores,
            backgroundColor: chartType === 'Produtos que Mais Venderam' ? 'rgb(0, 71, 103)' : 'rgb(3, 191, 203)',
            borderColor: 'rgb(3, 191, 203)',
            borderWidth: 1
        }]
    };
}


window.onload = carregarDados;