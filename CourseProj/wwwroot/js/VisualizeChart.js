import drawChart from '../Scripts/drawChart.js'
import { tableFromJson, widthTable, heightTable } from "../Scripts/drawTable.js"

let data;
let ctx;

document.getElementById('form').onsubmit = function (){
try
{
    let oldctx = document.getElementById("myChart");
    oldctx.remove();
    let oldtable = document.getElementById("table");
    oldtable.innerHTML = '';
    let oldReport = document.getElementById("showOtchet");
    oldReport.innerHTML = '';
}
catch (ex){}
    
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
        }
    }
}; 



function drawOtchet(data, vivod) {
    var param = document.getElementById("param");
    var paramValue = param.value;
    var div = document.getElementById('showOtchet');
    div.innerHTML += `<p>При анализе данных была получена выборочная средняя всех интервалов, которая равна ${data.ViborSred}, на ее основе  посчитаем стандартное отклонение: ${data.Otclon}. <br>Эти данные необходимы для нахождения теоритической частоты по функции Гаусса</p>
    <p>Так как Критерий пирсона равен ${data.KriteriyPirsona}, то при уровне значимости alpha = 0.05 по таблице "Критической точки распределения" значение Hi^2 наблюдаемого должно быть меньше Hi^2 критической, равной 42.8.<br>  
    В нашем случае Hi^2 наблюдаемое равно: ${data.NabludZnach},значит гипотезу о нормальном распределении ${vivod}.`;
    if (vivod == "опровергаем") div.innerHTML += "<p>Следовательно мы не можем полностью пологаться на эти данные. Распределение мощностей на выпускаемую продукцию компании не обосновывается данной выборкой.</p>"
    else {
        div.innerHTML += "<p>На основе данных составим таблицу с процентным соотношением выпускаемой продукции.</p>"
        if (paramValue == "Height") heightTable(data.finalObjectsList)
        else widthTable(data.finalObjectsList)
    }
}