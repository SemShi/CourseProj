console.log('start');
let data;
document.getElementById('form').onsubmit = function () {
    var input = document.getElementById("file");
    var file = input.files[0];
    var gender = document.getElementById("gender");
    var genderValue = gender.value;
    var param = document.getElementById("param");
    var paramValue = param.value;
    var formData = new FormData();

    formData.append("file", file);
    formData.append("gender", genderValue);
    formData.append("param", paramValue);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/Dashboard/GetData');
    xhr.send(formData);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            data = JSON.parse(xhr.responseText)
            console.log(data)
            drawChart(data.finalObjectsList)
            if (data.NabludZnach > 43.8) drawOtchet(data.KriteriyPirsona, data.NabludZnach, data.Otclon, data.ViborSred, vivod = "�����������")
            else drawOtchet(data.KriteriyPirsona, data.NabludZnach, data.Otclon, data.ViborSred, vivod = "������������")
            tableFromJson(data.finalObjectsList)
        }
    }
    return false;
}

const ctx = document.getElementById('myChart');

function drawChart(arr) {
    let intervalArr = [];
    for (let elem of arr) {
        intervalArr.push(elem.Interval);
    }
    let teorFreq = [];
    for (let elem of arr) {
        teorFreq.push(elem.TeorChastota);
    }
    let dataArr = [];
    for (let elem of arr) {
        dataArr.push(elem.Count);
    }
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: intervalArr,
            datasets: [
                {
                    label: "Количество",
                    data: dataArr,
                    borderWidth: 1
                },
                {
                    label: "Теоретическая частота",
                    data: teorFreq,
                    borderWidth: 1
                }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                }
            }
        }
    });
}

function tableFromJson(object) {
    let col = [];
    for (let i = 0; i < object.length; i++) {
        for (let key in object[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    // Create table.
    const table = document.createElement("table");

    // Create table header row using the extracted headers above.
    let tr = table.insertRow(-1);                   // table row.

    for (let i = 0; i < col.length; i++) {
        let th = document.createElement("th");      // table header.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    // add json data to the table as rows.
    for (let i = 0; i < object.length; i++) {

        tr = table.insertRow(-1);

        for (let j = 0; j < col.length; j++) {
            let tabCell = tr.insertCell(-1);
            tabCell.innerHTML = object[i][col[j]];
        }
    }

    // Now, add the newly created table with json data, to a container.
    const divShowData = document.getElementById('showData');
    divShowData.innerHTML = "";
    divShowData.appendChild(table);
}

function drawOtchet(kriteriyPirsona, nabludZnach, otclon, viborSred, vivod) {
    var div = document.getElementById('showOtchet');
    div.innerHTML += `KriteriyPirsona ${kriteriyPirsona} <br>  
    Nablud znch: ${nabludZnach} <br>  
    Otclon: ${otclon} <br>  
    Viborochnaya sred: ${viborSred}  <br>  
    Viviod: ${vivod} `;
}