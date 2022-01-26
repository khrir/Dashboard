const url_categoria_economica = 'https://raw.githubusercontent.com/khrir/Dashboard/main/database/despesas_CE.csv';
const url_f_completo = 'https://raw.githubusercontent.com/khrir/Dashboard/main/database/despesas_PF.csv';
const url_m_completo = 'https://raw.githubusercontent.com/khrir/Dashboard/main/database/Repasses_M.csv'

// Graph zone
const xlabel = [];
const ylabel = [];

async function chartIt(url) {
    await dataGraph(url);
    let mod = [];

    let lab = [];
    for (let i = 0; i < 4; i++) {
        mod.push( (i+1) + " : " + xlabel[i]);
        lab.push(i+1);
    }

    let canvas = '<canvas id="myChart"></canvas>';
    $('#content').html(canvas);

    const ctx = document.getElementById('myChart');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: lab,
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
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                }
            },
            plugins: {
                tooltip: {
                    
                    callbacks: {
                        title: (item) => {
                            return "ID: " + (item[0].parsed.x + 1);
                        },
                
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += formatter.format(context.parsed.y);
                            }
                            return label;
                        },

                        footer: () => {
                            return mod;
                        },
                    }
                }
            },
            
        }
    });
}

window.addEventListener('beforeprint', () => {
    myChart.resize(600, 600);
});
window.addEventListener('afterprint', () => {
    myChart.resize();
});

async function dataGraph(url) {
    let response = await fetch(url);
    let data = await response.text();
    let temporario = [];
    let temp = {};

    let array = data.split('\n').slice(1);

    array.forEach(row => {
        let col = row.split(',');
        temp = { Custeio: parseFloat(col[0]), Nome: col[1] }
        temporario.push(temp);
    });

    let r_edu = temporario.map((obj) => findInObject(obj, 'EDUCAÇÃO'));
    let r_com = temporario.map((obj) => findInObject(obj, 'ESTADO DA COMUNICAÇÃO'));
    let r_sau = temporario.map((obj) => findInObject(obj, 'ESTADO DA SAÚDE'));
    let r_seg = temporario.map((obj) => findInObject(obj, 'ESTADO DA SEGURANÇA'));
    
    let s_edu = r_edu.map((obj, i) => Object.keys(obj).length ? temporario[i] : {}).filter((obj) => Object.keys(obj).length);
    let s_com = r_com.map((obj, i) => Object.keys(obj).length ? temporario[i] : {}).filter((obj) => Object.keys(obj).length);
    let s_sau = r_sau.map((obj, i) => Object.keys(obj).length ? temporario[i] : {}).filter((obj) => Object.keys(obj).length);
    let s_seg = r_seg.map((obj, i) => Object.keys(obj).length ? temporario[i] : {}).filter((obj) => Object.keys(obj).length);


    ylabel.push(s_edu[0].Custeio);
    xlabel.push(s_edu[0].Nome);
    ylabel.push(s_com[0].Custeio);
    xlabel.push(s_com[0].Nome);
    ylabel.push(s_sau[0].Custeio);
    xlabel.push(s_sau[0].Nome);
    ylabel.push(s_seg[0].Custeio);
    xlabel.push(s_seg[0].Nome);
}

function findInObject(obj, str) {
    let result = JSON.parse(JSON.stringify(obj));
    const re = new RegExp(str, "gi");

    Object.keys(result).map(function (key, _) {
        if (typeof (result[key]) === "string" && result[key].match(re)) {
            result[key] = true;
        }
        else if (result[key] != undefined && result[key] != null && typeof (result[key]) === "object" && Object.keys(result[key]).length != 0) {
            result[key] = findInObject(result[key], str);
            if (Object.keys(result[key]).length === 0 && obj.constructor === Object) {
                delete result[key];
            }
        }
        else {
            delete result[key];
        }
    });
    return result;
}

// Tables zone
function plot_Table(url) {
    let table = $('<table class="table">');
    let header = "<tr>";

    for (let k in url[0])header += "<th>" + k + "</th>";
    header += "</tr>";
    
    $(header).appendTo(table);

    $.each(url, function (_, value) {
        let row = "<tr>";
        $.each(value, function (key, val) {
            
            if(key === 'Cod'){
                row += '<td data-title="' + key + '">' + val + "</td>";
            }
            else if(key === 'Valor'){
                row += '<td data-title="' + key + '">' + formatter.format(val) + "</td>";
            }
            else{
                row += '<td data-title="' + key + '">' + val + "</td>";
            }
            
        });
        row += "</tr>";
        $(table).append(row);
    });
    $('#content').html(table)
}

const formatter = new Intl.NumberFormat('pt-BR',{
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
});

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
        return a.Valor < b.Valor ? 1 : a.Valor > b.Valor ? -1 : 0;
    });
    console.log(temporario);

    tabela_url = temporario.slice(0, 10);
    plot_Table(tabela_url);
}