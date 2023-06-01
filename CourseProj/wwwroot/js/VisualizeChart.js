import drawChart from '../Scripts/drawChart.js'
import { tableFromJson, widthTable, heightTable } from "../Scripts/drawTable.js"

let data;
let ctx;

document.getElementById('form').onsubmit = function (){
try
{
    document.getElementById("myChart").remove();
    document.getElementById("calcResult").innerHTML = '';
    document.getElementById("showOtchet").innerHTML = '';
    document.getElementById("showTable").innerHTML = '';
}
catch (ex){}
    document.getElementById("firstCard").style['display'] = '';
    document.getElementById("secondCard").style['display'] = '';
    let canvas = document.createElement('canvas');
    canvas.setAttribute("class", "my-4 w-100")
    canvas.setAttribute('id', 'myChart');
    canvas.setAttribute('width', '900');
    canvas.setAttribute('height', '380');
    let canvasContainer = document.createElement('div');
    canvasContainer.appendChild(canvas);
    document.getElementById("charts").appendChild(canvasContainer);
    ctx = new Chart(document.getElementById('myChart'));
    var file;
    var source;
    var filePath;
    if(document.getElementById('hiddenSelected').getAttribute('data-value') === null){
        var input = document.getElementById("file");
        file = input.files[0];
        source = 'client';
    }
    else{
        filePath = document.getElementById('hiddenSelected').getAttribute('data-value');
        source = 'server';
    }

    var gender = document.getElementById("gender");
    var genderValue = gender.value;
    var param = document.getElementById("param");
    var paramValue = param.value;
    var formData = new FormData();

    formData.append("file", file);
    formData.append("gender", genderValue);
    formData.append("param", paramValue);
    formData.append("source", source);
    formData.append("filepath", filePath);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/Dashboard/GetData');
    xhr.send(formData);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            data = JSON.parse(xhr.responseText)
            console.log(data)
            tableFromJson(data.finalObjectsList)
            drawChart(data.finalObjectsList, ctx)
            if (data.NabludZnach > 43.8) drawOtchet(data, "опровергаем")
            else drawOtchet(data, "подтверждаем")
            document.getElementById("toast").appendChild(CreateToast('Файл загружен.', 'Успешно!'));
            const newToast = new bootstrap.Toast('.toast');
            setTimeout(() =>{
                newToast.show();
            })
        }
    }
}; 



function drawOtchet(data, vivod) {
    var param = document.getElementById("param");
    var paramValue = param.value;
    var div = document.getElementById('showOtchet');
    var resultMsg;
    if (vivod == "опровергаем") 
        resultMsg = 'Следовательно, мы не можем полностью пологаться на эти данные. Распределение мощностей на выпускаемую продукцию компании не обосновывается данной выборкой.';
    else {
        resultMsg = 'На основе данных построена таблица с процентным соотношением выпускаемой продукции:';
        if (paramValue == "Height") heightTable(data.finalObjectsList)
        else widthTable(data.finalObjectsList)
    }
    div.innerHTML +=
        `    <h4 class="card-subtitle mb-1 text-muted">Анализ</h4>` +
        `    <p class="card-text jstfy">При анализе данных была получена выборочная средняя всех интервалов, которая равна <b>${data.ViborSred}</b>. На ее основе  вычислено стандартное отклонение, равное <b>${data.Otclon}</b>.</p>` +
        `    <p class="card-text jstfy mb-2">Эти данные необходимы для нахождения теоритической частоты по функции Гаусса.</p>` +
        `    <h4 class="card-subtitle mb-1 text-muted border-top">Критерий пирсона</h4>` +
        `    <p class="card-text jstfy">Так как Критерий пирсона равен <b>${data.KriteriyPirsona}</b>, то при уровне значимости alpha = <b>0.05</b> по таблице "Критической точки распределения" значение <b>H<sub>i</sub><sup>2</sup></b> наблюдаемого должно быть меньше <b>H<sub>i</sub><sup>2</sup></b> критической, равной <b>42.8</b>.</p>` +
        `    <p class="card-text jstfy mb-2">В нашем случае <b>H<sub>i</sub><sup>2</sup></b> наблюдаемое равно: <b>${data.NabludZnach.toFixed(2)}</b>, значит гипотезу о нормальном распределении <b>${vivod}</b>.</p>` +
        `    <h4 class="card-subtitle mb-1 text-muted border-top">Итог</h4>` +
        `    <p class="card-text jstfy">${resultMsg}</p>`;
}