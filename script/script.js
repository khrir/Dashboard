const url_categoria_economica = '../database/Despesas_CE.csv';
const url_f_completo = '../database/despesas_PF.csv';
const url_m_completo = 'https://raw.githubusercontent.com/khrir/Dashboard/main/database/Repasses_M.csv'

// Graph zone
const xlabel = [];
const ylabel = [];

async function chartIt(url) {
    await getDataGraph(url);
    var canvas = '<canvas id="myChart"></canvas>';
    $('#content').html(canvas);

    // Fazer uma verificação de existência da tag canvas
    // else{
    //      var canvas = '<canvas id="myChart"></canvas>'; $('#content').html(canvas)
    // }

    const ctx = document.getElementById('myChart');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: xlabel,
            datasets: [{
                label: 'Valor',
                data: ylabel,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rbga(255, 99, 132, 1',
                borderWidth: 1,
            }]
        },
        options: {
            responsive: true,
        }
    });
}

async function getDataGraph(url) {
    let response = await fetch(url);
    let data = await response.text();
    console.log(data)
    let table = data.split('\n').slice(1);
    table.forEach(row => {
        let columns = row.split(',');
        let custeio = columns[0];
        let secretaria = columns[1];
        xlabel.push(secretaria);
        ylabel.push(parseFloat(custeio));
    });
}


// Tables zone
function plot_Table(url) {
    let table = $('<table class="table">');
    let header = "<tr>";
    for (let k in url[0]) header += "<th>" + k + "</th>";
    header += "</tr>";

    $(header).appendTo(table);
    $.each(url, function (_, value) {
        let row = "<tr>";
        $.each(value, function (_, val) {
            row += "<td>" + val + "</td>";
        });
        row += "</tr>";
        $(table).append(row);
    });
    $('#content').html(table)
}

async function dataTable(url) {
    let response = await fetch(url);
    let data = await response.text();
    let temporario = [];
    let temp = {};
    let array = data.split('\n').slice(1);

    array.forEach(row => {
        let col = row.split(',');
        temp = { Cod: col[0], Valor: parseFloat(col[1]), Nome: col[2] }
        temporario.push(temp);
    });

    temporario.sort((a, b) => {
        return a.Valor < b.Valor;
    });

    tabela_url = temporario.slice(0, 10);
    plot_Table(tabela_url);
}