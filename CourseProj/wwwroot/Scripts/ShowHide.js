﻿document.forms['formpost'].addEventListener('submit', function(event) {
    // Do something with the form's data here
    this.style['display'] = 'none';
    event.preventDefault();
});

function ShowInput(){
    let input = document.forms['formpost'];
    if(input.style['display'] === 'none'){
        input.style['display'] = '';
    }
    else{
        input.style['display'] = 'none';
    }
}

function ShowSelectedFile(Visible = true, FileName = null, FilePath = null){
    if(Visible){
        $('#hiddenSelected').show(500);
        document.getElementById("fileUpload").style['display'] = 'none';
        document.getElementById("file").removeAttribute("required");
        document.getElementById("hiddenSelected").setAttribute('data-value', FilePath);
        document.getElementById("hiddenLabel").innerHTML = 'Выбран файл: ' + '<b>'+FileName+'</b>';
    }
    else{
        $('#fileUpload').show(500);
        document.getElementById("hiddenSelected").style['display'] = 'none';
        document.getElementById("file").setAttribute("required", "required");
        document.getElementById("hiddenSelected").removeAttribute('value');
        document.getElementById("hiddenLabel").innerHTML = '';
    }
}

function downloadReport() {
    
    var element = document.getElementById('downloadableReport');
    var opt = {
        margin: 1,
        filename: 'report_'+ GetCurrentDateTime() +'.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2, logging: true, dpi: 1200, letterRendering: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'l' }
    };

    // New Promise-based usage:
    html2pdf().set(opt).from(element).save();

    // Old monolithic-style usage:
    html2pdf(element, opt);
}

function ActivateButtons(){
    $('#groupBtn1').removeAttr("disabled");
    $('#groupBtn2').removeAttr("disabled");
    $('#showInputBtn').removeAttr("disabled");
    $('#downloadBtn').removeAttr("disabled");
}

function ChangeChartToLine(){
    Chart.helpers.each(Chart.instances, function(chart){
        chart.config.type = 'line';
        chart.update();
    })
}

function ChangeChartToBar(){
    Chart.helpers.each(Chart.instances, function(chart){
        chart.config.type = 'bar';
        chart.update();
    })
}

function GetCurrentDateTime(){
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    let hh = String(today.getHours());
    let ss = String(today.getSeconds());
    return mm + dd + yyyy + '_' + hh + ss;
}


