const url_categoria_economica = 'https://raw.githubusercontent.com/khrir/Dashboard/main/database/Despesas_CE.csv';
const url_favorecido = 'https://raw.githubusercontent.com/khrir/Dashboard/main/database/DESPESAS_PF.CSV';
const url_municipio = 'https://raw.githubusercontent.com/khrir/Dashboard/main/database/REPASSES_M.CSV';

async function chartIt(url){
    await getDados(url);

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
    })
}


const xlabel = [];
const ylabel = [];

async function getDados(url){
    let response = await fetch(url);
    let data = await response.text();

    let table = data.split('\n').slice(1);
    table.forEach(row => {
        let columns = row.split(',');
        let custeio = columns[0];
        let secretaria = columns[1];
        xlabel.push(secretaria);
        ylabel.push(parseFloat(custeio));
        console.log(custeio, secretaria);
    });
}

var content = document.getElementById('content');

function arrayToTable(tableData) {
    var table = $('<table></table>');
    $(tableData).each(function (i, rowData) {
        var row = $('<tr></tr>');
        $(rowData).each(function (j, cellData) {
            row.append($('<td>'+cellData+'</td>'));
        });
        table.append(row);
    });
    return table;
}

function test(url){
    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {
            $(content).append(arrayToTable(Papa.parse(data).data));
        }
    });
}
