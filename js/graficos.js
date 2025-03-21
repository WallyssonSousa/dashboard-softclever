let barData = {};
let pieData = {};

let barChart = null;
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
            vendas: { labels: [], valores: [] },
            vendasMensais: { labels: [], valores: [] },
            financeiro: { labels: [], valores: [] },
            financeiroMensal: { labels: [], valores: [] },
            financeiroAnual: { labels: [], valores: [] },
            vendedoresQueMaisVenderam: { labels: [], valores: [] },
            vendedoresQueMaisVenderamMensal: { labels: [], valores: [] },
            vendedoresQueMaisVenderamAnual: { labels: [], valores: [] },
            vendedoresQueMenosVenderam: { labels: [], valores: [] },
            vendedoresQueMenosVenderamMensal: { labels: [], valores: [] },
            vendedoresQueMenosVenderamAnual: { labels: [], valores: [] },
            produtosMaisVendidos: { labels: [], valores: [] },
            produtosMaisVendidosMensal: { labels: [], valores: [] },
            produtosMaisVendidosAnual: { labels: [], valores: [] },
            produtosMenosVendidos: { labels: [], valores: [] },
            produtosMenosVendidosMensal: { labels: [], valores: [] },
            produtosMenosVendidosAnual: { labels: [], valores: [] },
            clientesQueMaisCompraram: { labels: [], valores: [] },
            clientesQueMaisCompraramMensal: { labels: [], valores: [] },
            clientesQueMaisCompraramAnual: { labels: [], valores: [] },
        };

        let tipo = '';

        linhas.forEach(linha => {
            console.log('Processando linha:', linha);

            if (['vendas', 'vendasmensais', 'financeiro', 'financeiromensal', 'financeiroanual', 'vendedoresquemaisvenderam',
                'vendedoresquemaisvenderammensal', 'vendedoresquemaisvenderamanual',
                'vendedoresquemenosvenderam', 'vendedoresquemenosvenderammensal', 'vendedoresquemenosvenderamanual',
                'produtosquemaisvenderam', 'produtosquemaisvenderammensal', 'produtosquemaisvenderamanual',
                'produtosquemenosvenderam', 'produtosquemenosvenderammensal', 'produtosquemenosvenderamanual',
                'clientesquemaiscompraram', 'clientesquemaiscomprarammensal', 'clientesquemaiscompraramanual'
            ].includes(linha.toLowerCase())) {
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
                } else if (tipo === 'financeiromensal') {
                    for (let i = 0; i < partes.length; i += 2) {
                        dados.financeiroMensal.labels.push(partes[i]);
                        dados.financeiroMensal.valores.push(parseFloat(partes[i + 1]));
                    }
                } else if (tipo === 'financeiroanual') {
                    for (let i = 0; i < partes.length; i += 2) {
                        dados.financeiroAnual.labels.push(partes[i]);
                        dados.financeiroAnual.valores.push(parseFloat(partes[i + 1]));
                    }
                }
                else if (tipo === 'vendedoresquemaisvenderam') {
                    for (let i = 0; i < partes.length; i += 2) {
                        dados.vendedoresQueMaisVenderam.labels.push(partes[i]);
                        dados.vendedoresQueMaisVenderam.valores.push(parseFloat(partes[i + 1]));
                    }
                } else if (tipo === 'vendedoresquemaisvenderammensal') {
                    for (let i = 0; i < partes.length; i += 2) {
                        dados.vendedoresQueMaisVenderamMensal.labels.push(partes[i]);
                        dados.vendedoresQueMaisVenderamMensal.valores.push(parseFloat(partes[i + 1]));
                    }
                } else if (tipo === 'vendedoresquemaisvenderamanual') {
                    for (let i = 0; i < partes.length; i += 2) {
                        dados.vendedoresQueMaisVenderamAnual.labels.push(partes[i]);
                        dados.vendedoresQueMaisVenderamAnual.valores.push(parseFloat(partes[i + 1]));
                    }
                }
                else if (tipo === 'vendedoresquemenosvenderam') {
                    for (let i = 0; i < partes.length; i += 2) {
                        dados.vendedoresQueMenosVenderam.labels.push(partes[i]);
                        dados.vendedoresQueMenosVenderam.valores.push(parseFloat(partes[i + 1]));
                    }
                } else if (tipo === 'vendedoresquemenosvenderammensal') {
                    for (let i = 0; i < partes.length; i += 2) {
                        dados.vendedoresQueMenosVenderamMensal.labels.push(partes[i]);
                        dados.vendedoresQueMenosVenderamMensal.valores.push(parseFloat(partes[i + 1]));
                    }
                } else if (tipo === 'vendedoresquemenosvenderamanual') {
                    for (let i = 0; i < partes.length; i += 2) {
                        dados.vendedoresQueMenosVenderamAnual.labels.push(partes[i]);
                        dados.vendedoresQueMenosVenderamAnual.valores.push(parseFloat(partes[i + 1]));
                    }
                }
                else if (tipo === 'produtosquemaisvenderam') {
                    for (let i = 0; i < partes.length; i += 2) {
                        dados.produtosMaisVendidos.labels.push(partes[i]);
                        dados.produtosMaisVendidos.valores.push(parseFloat(partes[i + 1]));
                    }
                } else if (tipo === 'produtosquemaisvenderammensal') {
                    for (let i = 0; i < partes.length; i += 2) {
                        dados.produtosMaisVendidosMensal.labels.push(partes[i]);
                        dados.produtosMaisVendidosMensal.valores.push(parseFloat(partes[i + 1]));
                    }
                } else if (tipo === 'produtosquemaisvenderamanual') {
                    for (let i = 0; i < partes.length; i += 2) {
                        dados.produtosMaisVendidosAnual.labels.push(partes[i]);
                        dados.produtosMaisVendidosAnual.valores.push(parseFloat(partes[i + 1]));
                    }
                }
                else if (tipo === 'produtosquemenosvenderam') { // Ajustado para plural
                    for (let i = 0; i < partes.length; i += 2) {
                        dados.produtosMenosVendidos.labels.push(partes[i]);
                        dados.produtosMenosVendidos.valores.push(parseFloat(partes[i + 1]));
                    }
                } else if (tipo === 'produtosquemenosvenderammensal') {
                    for (let i = 0; i < partes.length; i += 2) {
                        dados.produtosMenosVendidosMensal.labels.push(partes[i]);
                        dados.produtosMenosVendidosMensal.valores.push(parseFloat(partes[i + 1]));
                    }
                } else if (tipo === 'produtosquemenosvenderamanual') {
                    for (let i = 0; i < partes.length; i += 2) {
                        dados.produtosMenosVendidosAnual.labels.push(partes[i]);
                        dados.produtosMenosVendidosAnual.valores.push(parseFloat(partes[i + 1]));
                    }
                }
                else if (tipo === 'clientesquemaiscompraram') {
                    for (let i = 0; i < partes.length; i += 2) {
                        dados.clientesQueMaisCompraram.labels.push(partes[i]);
                        dados.clientesQueMaisCompraram.valores.push(parseFloat(partes[i + 1]));
                    }
                } else if (tipo === 'clientesquemaiscomprarammensal') {
                    for (let i = 0; i < partes.length; i += 2) {
                        dados.clientesQueMaisCompraramMensal.labels.push(partes[i]);
                        dados.clientesQueMaisCompraramMensal.valores.push(parseFloat(partes[i + 1]));
                    }
                } else if (tipo === 'clientesquemaiscompraramanual') {
                    for (let i = 0; i < partes.length; i += 2) {
                        dados.clientesQueMaisCompraramAnual.labels.push(partes[i]);
                        dados.clientesQueMaisCompraramAnual.valores.push(parseFloat(partes[i + 1]));
                    }
                }
                else if (tipo === 'vendas') {
                    for (let i = 0; i < partes.length; i += 2) {
                        dados.vendas.labels.push(partes[i]);
                        dados.vendas.valores.push(parseFloat(partes[i + 1]));
                    }
                } else if (tipo === 'vendasmensais') {
                    for (let i = 0; i < partes.length; i += 2) {
                        dados.vendasMensais.labels.push(partes[i]);
                        dados.vendasMensais.valores.push(parseFloat(partes[i + 1]));
                    }
                }
            }
        });

        console.log('Dados processados:', dados);

        atualizarGraficos(dados);

    } catch (error) {
        console.error('Erro ao carregar o arquivo de dados:', error);
    }
}


let vendedoresQueMaisVenderam = [];
let vendedoresQueMaisVenderamMensal = [];
let vendedoresQueMaisVenderamAnual = [];
let vendedoresQueMenosVenderam = [];
let vendedoresQueMenosVenderamMensal = [];
let vendedoresQueMenosVenderamAnual = [];
let produtosMaisVendidos = [];
let produtosMaisVendidosMensal = [];
let produtosMaisVendidosAnual = [];
let produtosMenosVendidos = [];
let produtosMenosVendidosMensal = [];
let produtosMenosVendidosAnual = [];
let clientesQueMaisCompraram = [];
let clientesQueMaisCompraramMensal = [];
let clientesQueMaisCompraramAnual = [];
let vendas = [];
let vendasMensais = [];
let financeiro = [];
let financeiroMensal = [];
let financeiroAnual = [];

function atualizarGraficos(dados) {
    if (dados.vendas.labels.length > 0) {
        const labelsOriginais = dados.vendas.labels;
        const labelsReduzidos = labelsOriginais.map(label =>
            label.split(' ').slice(0, 3).join(' ')
        );
        vendas = {
            labels: labelsOriginais,
            datasets: [{
                label: 'Vendas da semana',
                data: dados.vendas.valores,
                backgroundColor: '#004767',
                borderColor: '#03bfcb',
                borderWidth: 1
            }]
        };
    }

    if (dados.vendasMensais.labels.length > 0) {
        const labelsOriginais = dados.vendasMensais.labels;
        const labelsReduzidos = labelsOriginais.map(label =>
            label.split(' ').slice(0, 3).join(' ')
        );
        vendasMensais = {
            labels: labelsOriginais,
            datasets: [{
                label: 'Vendas do mês',
                data: dados.vendasMensais.valores,
                backgroundColor: '#004767',
                borderColor: '#03bfcb',
                borderWidth: 1
            }]
        };
    }

    if (dados.financeiro.labels.length > 0) {
        const coresOriginais = ['#004767', '#03bfcb', '#2c3e50'];
        financeiro = {
            labels: dados.financeiro.labels,
            datasets: [{
                data: dados.financeiro.valores,
                backgroundColor: dados.financeiro.valores.map((valor, index) => valor < 0 ? '#FF0000' : coresOriginais[index % coresOriginais.length])
            }]
        };
    }

    if (dados.financeiroMensal.labels.length > 0) {
        const coresOriginais = ['#004767', '#03bfcb', '#2c3e50'];
        financeiroMensal = {
            labels: dados.financeiroMensal.labels,
            datasets: [{
                data: dados.financeiroMensal.valores,
                backgroundColor: dados.financeiroMensal.valores.map(
                    (valor, index) => valor < 0 ? '#FF0000' : coresOriginais[index % coresOriginais.length]
                )
            }]
        };
    }

    if (dados.financeiroAnual.labels.length > 0) {
        const coresOriginais = ['#004767', '#03bfcb', '#2c3e50'];
        financeiroAnual = {
            labels: dados.financeiroAnual.labels,
            datasets: [{
                data: dados.financeiroAnual.valores,
                backgroundColor: dados.financeiroAnual.valores.map((valor, index) => valor < 0 ? '#FF0000' : coresOriginais[index % coresOriginais.length])
            }]
        };
    }

    if (dados.vendedoresQueMaisVenderam.labels.length > 0) {
        const labelsOriginais = dados.vendedoresQueMaisVenderam.labels;
        const labelsReduzidos = labelsOriginais.map(label =>
            label.split(' ').slice(0, 3).join(' ')
        );
        barDataVendedoresQueMaisVenderam = {
            labels: labelsOriginais,
            datasets: [{
                label: 'Vendedores que mais venderam na semana',
                data: dados.vendedoresQueMaisVenderam.valores,
                backgroundColor: 'rgb(0, 71, 103)',
                borderColor: 'rgb(3, 191, 203)',
                borderWidth: 1
            }]
        };
    }

    if (dados.vendedoresQueMaisVenderamMensal.labels.length > 0) {
        const labelsOriginais = dados.vendedoresQueMaisVenderamMensal.labels;
        const labelsReduzidos = labelsOriginais.map(label =>
            label.split(' ').slice(0, 3).join(' ')
        );
        barDataVendedoresQueMaisVenderamMensal = {
            labels: labelsOriginais,
            datasets: [{
                label: 'Vendedores que mais venderam no mês',
                data: dados.vendedoresQueMaisVenderamMensal.valores,
                backgroundColor: 'rgb(0, 71, 103)',
                borderColor: 'rgb(3, 191, 203)',
                borderWidth: 1
            }]
        };
    }

    if (dados.vendedoresQueMaisVenderamAnual.labels.length > 0) {
        const labelsOriginais = dados.vendedoresQueMaisVenderamAnual.labels;
        const labelsReduzidos = labelsOriginais.map(label =>
            label.split(' ').slice(0, 3).join(' ')
        );
        barDataVendedoresQueMaisVenderamAnual = {
            labels: labelsOriginais,
            datasets: [{
                label: 'Vendedores que mais venderam no ano',
                data: dados.vendedoresQueMaisVenderamAnual.valores,
                backgroundColor: 'rgb(0, 71, 103)',
                borderColor: 'rgb(3, 191, 203)',
                borderWidth: 1
            }]
        };
    }

    if (dados.vendedoresQueMenosVenderam.labels.length > 0) {
        const labelsOriginais = dados.vendedoresQueMenosVenderam.labels;
        const labelsReduzidos = labelsOriginais.map(label =>
            label.split(' ').slice(0, 3).join(' ')
        );
        barDataVendedoresQueMenosVenderam = {
            labels: labelsOriginais,
            datasets: [{
                label: 'Vendedores que menos venderam na semana',
                data: dados.vendedoresQueMenosVenderam.valores,
                backgroundColor: 'rgb(0, 71, 103)',
                borderColor: 'rgb(3, 191, 203)',
                borderWidth: 1
            }]
        };
    }
    if (dados.vendedoresQueMenosVenderamMensal.labels.length > 0) {
        const labelsOriginais = dados.vendedoresQueMenosVenderamMensal.labels;
        const labelsReduzidos = labelsOriginais.map(label =>
            label.split(' ').slice(0, 3).join(' ')
        );
        barDataVendedoresQueMenosVenderamMensal = {
            labels: labelsOriginais,
            datasets: [{
                label: 'Vendedores que menos venderam no mês',
                data: dados.vendedoresQueMenosVenderamMensal.valores,
                backgroundColor: 'rgb(0, 71, 103)',
                borderColor: 'rgb(3, 191, 203)',
                borderWidth: 1
            }]
        };
    }
    if (dados.vendedoresQueMenosVenderamAnual.labels.length > 0) {
        const labelsOriginais = dados.vendedoresQueMenosVenderamAnual.labels;
        const labelsReduzidos = labelsOriginais.map(label =>
            label.split(' ').slice(0, 3).join(' ')
        );
        barDataVendedoresQueMenosVenderamAnual = {
            labels: labelsOriginais,
            datasets: [{
                label: 'Vendedores que menos venderam no ano',
                data: dados.vendedoresQueMenosVenderamAnual.valores,
                backgroundColor: 'rgb(0, 71, 103)',
                borderColor: 'rgb(3, 191, 203)',
                borderWidth: 1
            }]
        };
    }

    if (dados.produtosMaisVendidos.labels.length > 0) {
        const labelsOriginais = dados.produtosMaisVendidos.labels;
        const labelsReduzidos = labelsOriginais.map(label =>
            label.split(' ').slice(0, 1).join(' ')
        );
        mixedDataProdutosMaisVendidos = {
            labels: labelsOriginais,
            datasets: [
                {
                    label: 'Produtos que mais venderam na semana',
                    data: dados.produtosMaisVendidos.valores,
                    backgroundColor: 'rgb(0, 71, 103)',
                    borderColor: 'rgb(3, 191, 203)',
                    borderWidth: 1,
                    type: 'bar' // Tipo de gráfico para este dataset
                },
            ]
        };
    }


    const labelsOriginais = dados.produtosMaisVendidosMensal.labels;
    const labelsReduzidos = labelsOriginais.map(label =>
        label.split(' ').slice(0, 3).join(' ')
    );

    if (labelsOriginais.length > 0) {
        mixedDataProdutosMaisVendidosMensal = {
            labels: labelsOriginais,
            datasets: [
                {
                    label: 'Produtos que mais venderam no mês',
                    data: dados.produtosMaisVendidosMensal.valores,
                    backgroundColor: 'rgb(0, 71, 103)',
                    borderColor: 'rgb(3, 191, 203)',
                    borderWidth: 1,
                    type: 'bar'
                },
            ]
        };
    }

    if (dados.produtosMaisVendidosAnual.labels.length > 0) {
        const labelsOriginais = dados.produtosMaisVendidosAnual.labels;
        const labelsReduzidos = labelsOriginais.map(label =>
            label.split(' ').slice(0, 3).join(' ')
        );
        mixedDataProdutosMaisVendidosAnual = {
            labels: labelsOriginais,
            datasets: [
                {
                    label: 'Produtos que mais venderam na ano',
                    data: dados.produtosMaisVendidosAnual.valores,
                    backgroundColor: 'rgb(0, 71, 103)',
                    borderColor: 'rgb(3, 191, 203)',
                    borderWidth: 1,
                    type: 'bar' // Tipo de gráfico para este dataset
                },
            ]
        };
    }

    if (dados.produtosMenosVendidos.labels.length > 0) {
        const labelsOriginais = dados.produtosMenosVendidos.labels;
        const labelsReduzidos = labelsOriginais.map(label =>
            label.split(' ').slice(0, 3).join(' ')
        );
        mixedDataProdutosMenosVendidos = {
            labels: labelsOriginais,
            datasets: [
                {
                    label: 'Produtos que menos venderam na semana',
                    data: dados.produtosMenosVendidos.valores,
                    backgroundColor: 'rgb(0, 71, 103)',
                    borderColor: 'rgb(3, 191, 203)',
                    borderWidth: 1,
                    type: 'bar' // Tipo de gráfico para este dataset
                },
            ]
        };
    }
    if (dados.produtosMenosVendidosMensal.labels.length > 0) {
        const labelsOriginais = dados.produtosMaisVendidosMensal.labels;
        const labelsReduzidos = labelsOriginais.map(label =>
            label.split(' ').slice(0, 3).join(' ')
        );
        mixedDataProdutosMenosVendidosMensal = {
            labels: labelsOriginais,
            datasets: [
                {
                    label: 'Produtos que menos venderam no mês',
                    data: dados.produtosMenosVendidosMensal.valores,
                    backgroundColor: 'rgb(0, 71, 103)',
                    borderColor: 'rgb(3, 191, 203)',
                    borderWidth: 1,
                    type: 'bar' // Tipo de gráfico para este dataset
                },
            ]
        };
    }
    if (dados.produtosMenosVendidosAnual.labels.length > 0) {
        const labelsOriginais = dados.produtosMaisVendidosAnual.labels;
        const labelsReduzidos = labelsOriginais.map(label =>
            label.split(' ').slice(0, 3).join(' ')
        );
        mixedDataProdutosMenosVendidosAnual = {
            labels: labelsOriginais,
            datasets: [
                {
                    label: 'Produtos que menos venderam no ano',
                    data: dados.produtosMenosVendidosAnual.valores,
                    backgroundColor: 'rgb(0, 71, 103)',
                    borderColor: 'rgb(3, 191, 203)',
                    borderWidth: 1,
                    type: 'bar' // Tipo de gráfico para este dataset
                },
            ]
        };
    }

    if (dados.clientesQueMaisCompraram.labels.length > 0) {
        const labelsOriginais = dados.clientesQueMaisCompraram.labels;
        const labelsReduzidos = labelsOriginais.map(label =>
            label.split(' ').slice(0, 3).join(' ')
        );
        barDataClientesQueMaisCompraram = {
            labels: labelsOriginais,
            datasets: [{
                label: 'Clientes que mais compraram na semana',
                data: dados.clientesQueMaisCompraram.valores,
                backgroundColor: 'rgb(0, 71, 103)',
                borderColor: 'rgb(3, 191, 203)',
                borderWidth: 1
            }]
        };
    }

    if (dados.clientesQueMaisCompraramMensal.labels.length > 0) {
        const labelsOriginais = dados.clientesQueMaisCompraramMensal.labels;
        const labelsReduzidos = labelsOriginais.map(label =>
            label.split(' ').slice(0, 3).join(' ')
        );
        barDataClientesQueMaisCompraramMensal = {
            labels: labelsOriginais,
            datasets: [{
                label: 'Clientes que mais compraram no mês',
                data: dados.clientesQueMaisCompraramMensal.valores,
                backgroundColor: 'rgb(0, 71, 103)',
                borderColor: 'rgb(3, 191, 203)',
                borderWidth: 1
            }]
        };
    }

    if (dados.clientesQueMaisCompraramAnual.labels.length > 0) {
        const labelsOriginais = dados.clientesQueMaisCompraramAnual.labels;
        const labelsReduzidos = labelsOriginais.map(label =>
            label.split(' ').slice(0, 3).join(' ')
        );
        barDataClientesQueMaisCompraramAnual = {
            labels: labelsOriginais,
            datasets: [{
                label: 'Clientes que mais compraram no ano',
                data: dados.clientesQueMaisCompraramAnual.valores,
                backgroundColor: 'rgb(0, 71, 103)',
                borderColor: 'rgb(3, 191, 203)',
                borderWidth: 1
            }]
        };
    }

    updateGraphData(vendas, barConfig, 'vendas', 'bar');
    updateGraphData(vendasMensais, barConfig, 'vendasMensais', 'bar');
    updateGraphData(financeiro, pieConfig, 'financeiro', 'pie');
    updateGraphData(financeiroMensal, pieConfig, 'financeiroMensal', 'pie');
    updateGraphData(financeiroAnual, pieConfig, 'financeiroAnual', 'pie');
    updateGraphData(barDataVendedoresQueMaisVenderam, barConfig, 'barDataVendedoresQueMaisVenderam', 'bar');
    updateGraphData(barDataVendedoresQueMaisVenderamMensal, barConfig, 'barDataVendedoresQueMaisVenderamMensal', 'bar');
    updateGraphData(barDataVendedoresQueMaisVenderamAnual, barConfig, 'barDataVendedoresQueMaisVenderamAnual', 'bar');
    updateGraphData(barDataVendedoresQueMenosVenderam, barConfig, 'barDataVendedoresQueMenosVenderam', 'bar');
    updateGraphData(barDataVendedoresQueMenosVenderamMensal, barConfig, 'barDataVendedoresQueMenosVenderamMensal', 'bar');
    updateGraphData(barDataVendedoresQueMenosVenderamAnual, barConfig, 'barDataVendedoresQueMenosVenderamAnual', 'bar');
    updateGraphData(mixedDataProdutosMaisVendidos, mixedConfig, 'mixedDataProdutosMaisVendidos', 'mixed');
    updateGraphData(mixedDataProdutosMaisVendidosMensal, mixedConfig, 'mixedDataProdutosMaisVendidosMensal', 'mixed');
    updateGraphData(mixedDataProdutosMaisVendidosAnual, mixedConfig, 'mixedDataProdutosMaisVendidosAnual', 'mixed');
    updateGraphData(mixedDataProdutosMenosVendidos, mixedConfig, 'mixedDataProdutosMenosVendidos', 'mixed');
    updateGraphData(mixedDataProdutosMenosVendidosMensal, mixedConfig, 'mixedDataProdutosMenosVendidosMensal', 'mixed');
    updateGraphData(mixedDataProdutosMenosVendidosAnual, mixedConfig, 'mixedDataProdutosMenosVendidosAnual', 'mixed');
    updateGraphData(barDataClientesQueMaisCompraram, barConfig, 'barDataClientesQueMaisCompraram', 'bar');
    updateGraphData(barDataClientesQueMaisCompraramMensal, barConfig, 'barDataClientesQueMaisCompraramMensal', 'bar');
    updateGraphData(barDataClientesQueMaisCompraramAnual, barConfig, 'barDataClientesQueMaisCompraramAnual', 'bar');


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
    if (dados.vendedoresQueMenosVenderamMensal.labels.length > 0) {
        vendedoresQueMenosVenderamMensal = dados.vendedoresQueMenosVenderamMensal.labels.map((label, index) => [label, dados.vendedoresQueMenosVenderamMensal.valores[index]]);
    }
    if (dados.vendedoresQueMenosVenderamAnual.labels.length > 0) {
        vendedoresQueMenosVenderamAnual = dados.vendedoresQueMenosVenderamAnual.labels.map((label, index) => [label, dados.vendedoresQueMenosVenderamAnual.valores[index]]);
    }
    if (dados.produtosMaisVendidos.labels.length > 0) {
        produtosMaisVendidos = dados.produtosMaisVendidos.labels.map((label, index) => [label, dados.produtosMaisVendidos.valores[index]]);
    }
    if (dados.produtosMaisVendidosMensal.labels.length > 0) {
        produtosMaisVendidosMensal = dados.produtosMaisVendidosMensal.labels.map((label, index) => [label, dados.produtosMaisVendidosMensal.valores[index]]);
    }
    if (dados.produtosMaisVendidosAnual.labels.length > 0) {
        produtosMaisVendidosAnual = dados.produtosMaisVendidosAnual.labels.map((label, index) => [label, dados.produtosMaisVendidosAnual.valores[index]]);
    }
    if (dados.produtosMenosVendidos.labels.length > 0) {
        produtosMenosVendidos = dados.produtosMenosVendidos.labels.map((label, index) => [label, dados.produtosMenosVendidos.valores[index]]);
    }
    if (dados.produtosMenosVendidosMensal.labels.length > 0) {
        produtosMenosVendidosMensal = dados.produtosMenosVendidosMensal.labels.map((label, index) => [label, dados.produtosMenosVendidosMensal.valores[index]]);
    }
    if (dados.produtosMenosVendidosAnual.labels.length > 0) {
        produtosMenosVendidosAnual = dados.produtosMenosVendidosAnual.labels.map((label, index) => [label, dados.produtosMenosVendidosAnual.valores[index]]);
    }
    if (dados.clientesQueMaisCompraram.labels.length > 0) {
        clientesQueMaisCompraram = dados.clientesQueMaisCompraram.labels.map((label, index) => [label, dados.clientesQueMaisCompraram.valores[index]]);
    }
    if (dados.clientesQueMaisCompraramMensal.labels.length > 0) {
        clientesQueMaisCompraramMensal = dados.clientesQueMaisCompraramMensal.labels.map((label, index) => [label, dados.clientesQueMaisCompraramMensal.valores[index]]);
    }
    if (dados.clientesQueMaisCompraramAnual.labels.length > 0) {
        clientesQueMaisCompraramAnual = dados.clientesQueMaisCompraramAnual.labels.map((label, index) => [label, dados.clientesQueMaisCompraramAnual.valores[index]]);
    }
    if (dados.vendas.labels && dados.vendas.valores && dados.vendas.labels.length > 0) {
        vendas = dados.vendas.labels.map((label, index) => [label, dados.vendas.valores[index]]);
    }
    if (dados.vendasMensais.labels && dados.vendasMensais.valores && dados.vendasMensais.labels.length > 0) {
        vendasMensais = dados.vendasMensais.labels.map((label, index) => [label, dados.vendasMensais.valores[index]]);
    }
    if (dados.financeiro.labels && dados.financeiro.valores && dados.financeiro.labels.length > 0) {
        financeiro = dados.financeiro.labels.map((label, index) => [label, dados.financeiro.valores[index]]);
    }
    if (dados.financeiroMensal.labels && dados.financeiroMensal.valores && dados.financeiroMensal.labels.length > 0) {
        financeiroMensal = dados.financeiroMensal.labels.map((label, index) => [label, dados.financeiroMensal.valores[index]]);
    }
    if (dados.financeiroAnual.labels && dados.financeiroAnual.valores && dados.financeiroAnual.labels.length > 0) {
        financeiroAnual = dados.financeiroAnual.labels.map((label, index) => [label, dados.financeiroAnual.valores[index]]);
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
            },
            x: {
                ticks: {
                    autoSkip: false, 
                    minRotation: 0, 
                    maxRotation: 0,
                    callback: function(value, index, values) {
                        const label = this.getLabelForValue(value);
                        return label.length > 10 ? label.substring(0, 10) + "..." : label;
                    },
                    font: function(context) {
                        let size = Math.max(8, 14 - context.tick.label.length / 2);
                        return { size: size };
                    }
                }
            }
        },
        plugins: {
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: '#fff',
                borderWidth: 1,
                displayColors: false,
                callbacks: {
                    title: function(tooltipItem) {
                        return 'Nome: ' + tooltipItem.map(item => item.label).join(', ');
                    },
                    label: function(tooltipItem) {
                        let value = tooltipItem.raw;
                        return `R$ ${new Intl.NumberFormat('pt-BR', { 
                            minimumFractionDigits: 2, 
                            maximumFractionDigits: 2 
                        }).format(value)}`;
                    }
                }
            }
        }
    }
};


const pieConfig = {
    type: 'pie',
    options: {
        responsive: true
    }
};

const mixedConfig = {
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
            },
            x: {
                ticks: {
                    autoSkip: false, // Garante que os labels não sejam omitidos automaticamente
                    minRotation: 0, 
                    maxRotation: 0,
                    callback: function(value, index, values) {
                        const label = this.getLabelForValue(value);
                        return label.length > 10 ? label.substring(0, 10) + "..." : label;
                    },
                    font: function(context) {
                        let size = Math.max(8, 14 - context.tick.label.length / 2);
                        return { size: size };
                    }
                }
            }
        },
        plugins: {
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: '#fff',
                borderWidth: 1,
                displayColors: false,
                callbacks: {
                    title: function(tooltipItem) {
                        return 'Nome: ' + tooltipItem.map(item => item.label).join(', ');
                    },
                    label: function(tooltipItem) {
                        let value = tooltipItem.raw;
                        return `R$ ${new Intl.NumberFormat('pt-BR', { 
                            minimumFractionDigits: 2, 
                            maximumFractionDigits: 2 
                        }).format(value)}`;
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