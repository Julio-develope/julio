let isTableVisible = false;

function toggleView() {
    const button = document.querySelector('button');
    const chartContainer = document.getElementById('chartContainer');
    const tableContainer = document.getElementById('tableContainer');

    if (isTableVisible) {
        chartContainer.style.display = 'block';
        tableContainer.style.display = 'none';
        button.textContent = 'Alternar para Tabela';
        calculateAndDrawChart(); // Recalcula e exibe o gráfico
    } else {
        chartContainer.style.display = 'none';
        tableContainer.style.display = 'block';
        button.textContent = 'Alternar para Gráfico';
        calculateAndDrawTable(); // Recalcula e exibe a tabela
    }
    isTableVisible = !isTableVisible;
}
function calculateAndDrawChart() {
    const valorInicial = parseFloat(document.getElementById('valor-inicial').value) || 0;
    const valorMensal = parseFloat(document.getElementById('valor-mensal').value) || 0;
    const taxaJuros = parseFloat(document.getElementById('taxa-juros').value) / 100;
    const tipoJuros = document.getElementById('tipo-juros').value;
    const periodo = parseInt(document.getElementById('periodo').value) || 1;
    const tipoPeriodo = document.getElementById('tipo-periodo').value;

    let meses = tipoPeriodo === 'anos' ? periodo * 12 : periodo;
    let taxaMensal = tipoJuros === 'anual' ? Math.pow(1 + taxaJuros, 1 / 12) - 1 : taxaJuros;

    let valores = [];
    let saldo = valorInicial;

    for (let i = 0; i < meses; i++) {
        saldo = saldo * (1 + taxaMensal) + valorMensal;
        valores.push(saldo);
    }

    drawChart(valores);
}

function drawChart(valores) {
    const ctx = document.getElementById('investmentChart').getContext('2d');

    if (window.investmentChartInstance) {
        window.investmentChartInstance.destroy();
    }

    window.investmentChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Array.from({ length: valores.length }, (_, i) => `Mês ${i + 1}`),
            datasets: [{
                label: 'Valor Acumulado (R$)', 
                data: valores,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // Permite ajuste ao contêiner
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Valor Acumulado (R$)',
                        font: {
                            size: 30,
                            family: 'Arial'
                        
                        }
                    },
                    ticks: {
                        font: {
                            size: 30,
                            family: 'Arial'
                        }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Mês',
                        font: {
                            size: 30,
                            family: 'Arial'
                        }
                    },
                    ticks: {
                        font: {
                            size: 30,
                            family: 'Arial'
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        font: {
                            size: 40,
                            family: 'Arial'
                        }
                    }
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    titleFont: {
                        size: 46,
                        family: 'Arial'
                    },
                    bodyFont: {
                        size: 44,
                        family: 'Arial'
                    },
                    padding: 10,
                    caretSize: 15,
                    cornerRadius: 4,
                }
            }
        }
    });
}

function limparCampos() {
    document.getElementById('valor-inicial').value = '';
    document.getElementById('valor-mensal').value = '';
    document.getElementById('taxa-juros').value = '';
    document.getElementById('periodo').value = '';

    if (window.investmentChartInstance) {
        window.investmentChartInstance.destroy();
    }
}

function calculateAndDrawTable() {
    const valorInicial = parseFloat(document.getElementById('valor-inicial').value) || 0;
    const valorMensal = parseFloat(document.getElementById('valor-mensal').value) || 0;
    const taxaJuros = parseFloat(document.getElementById('taxa-juros').value) / 100;
    const tipoJuros = document.getElementById('tipo-juros').value;
    const periodo = parseInt(document.getElementById('periodo').value) || 1;
    const tipoPeriodo = document.getElementById('tipo-periodo').value;

    let meses = tipoPeriodo === 'anos' ? periodo * 12 : periodo;
    let taxaMensal = tipoJuros === 'anual' ? Math.pow(1 + taxaJuros, 1 / 12) - 1 : taxaJuros;

    let valores = [];
    let saldo = valorInicial;

    for (let i = 0; i < meses; i++) {
        saldo = saldo * (1 + taxaMensal) + valorMensal;
        valores.push({ mes: i + 1, valor: saldo });
    }

    drawTable(valores);
}

function drawTable(valores) {
    const tableContainer = document.getElementById('tableContainer');

    // Limpar conteúdo anterior
    tableContainer.innerHTML = '';

    // Criar a estrutura da tabela
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // Cabeçalho da tabela
    const headerRow = document.createElement('tr');
    const headerMes = document.createElement('th');
    headerMes.textContent = 'Mês';
    const headerValor = document.createElement('th');
    headerValor.textContent = 'Valor Acumulado (R$)';
    headerRow.appendChild(headerMes);
    headerRow.appendChild(headerValor);
    thead.appendChild(headerRow);

    // Linhas de dados
    valores.forEach(item => {
        const row = document.createElement('tr');
        const cellMes = document.createElement('td');
        cellMes.textContent = `Mês ${item.mes}`;
        const cellValor = document.createElement('td');
        cellValor.textContent = item.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        row.appendChild(cellMes);
        row.appendChild(cellValor);
        tbody.appendChild(row);
    });

    // Montar a tabela
    table.appendChild(thead);
    table.appendChild(tbody);
    tableContainer.appendChild(table);
}

function limparCampos() {
    document.getElementById('valor-inicial').value = '';
    document.getElementById('valor-mensal').value = '';
    document.getElementById('taxa-juros').value = '';
    document.getElementById('periodo').value = '';
    document.getElementById('tableContainer').innerHTML = ''; // Limpa a tabela
    if (window.investmentChartInstance) {
        window.investmentChartInstance.destroy();
    }
}
