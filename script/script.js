const url_categoria_economica = 'https://raw.githubusercontent.com/khrir/Dashboard/main/database/Despesas_CE.csv';
const url_favorecido = 'https://raw.githubusercontent.com/khrir/Dashboard/main/database/DESPESAS_PF.CSV';
const url_municipio = 'https://raw.githubusercontent.com/khrir/Dashboard/main/database/REPASSES_M.CSV';

async function chartIt(url){
    await getDados(url);
    var canvas = '<canvas id="myChart"></canvas>';
    $('#content').html(canvas);

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
    });
}

function test(url){
    $.ajax({       
        url: url,
        dataType: "text",
        success: function(data){
            var intermedio = data.split(/\r?\n|\r/);
            var table_data = '<table class="table table-bordered table-striped">';
            for(let i = 0; i < intermedio.length; i++){
                var cell = intermedio[i].split(",");
                table_data += '<tr>';
                for(let j = 0; j < cell.length; j++){
                    if(i === 0){
                        table_data += '<th>'+cell[j]+'</th>';
                    }
                    else{
                        table_data += '<td>'+ cell[j] +'</td>';
                    }
                }
                table_data += '</tr>';
            }
            table_data += '</table>';
            $('#content').html(table_data)
        }
    });
}
