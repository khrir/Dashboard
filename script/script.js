const url_categoria_economica = '../database/Despesas_CE.csv';
const url_favorecido = '../database/DESPESAS_PF.CSV';
const url_municipio = '../database/REPASSES_M.CSV';

async function test(url){
    fetch(url).then(function(response){return response.text();
    }).then(function(data){ 
        var table = document.getElementById('content-local');
        convert(data, table);
    });

    function convert(csv, element) {
        var rows = csv.trim().split(/\r?\n|\r/); // Regex to split/separate the CSV rows
        var table = '';
        var table_rows = '';
        var table_header = '';
    
        rows.forEach(function(row, row_index) {
            let table_col = '';
            let columns = row.split(','); // split/separate the columns in a row

            columns.forEach(column => {
                table_col += row_index == 0 ? '<th>' + column + '</th>' : '<td>' + column + '</td>';
            });
            if (row_index == 0) {
                table_header += '<tr>' + table_col + '</tr>';
            } else {
                table_rows += '<tr>' + table_col + '</tr>';
            }
        });
    
        table += '<table>';
            table += '<thead>';
                table += table_header;
            table += '</thead>';
            table += '<tbody>';
                table += table_rows;
            table += '</tbody>';
        table += '</table>';
    
        element.innerHTML += table;
    }
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



