document.forms['formpost'].addEventListener('submit', function(event) {
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
        document.getElementById("fileUpload").style['display'] = 'none';
        document.getElementById("hiddenSelected").style['display'] = '';
        document.getElementById("hiddenSelected").setAttribute('data-value', FilePath);
        document.getElementById("hiddenLabel").innerHTML = 'Выбран файл: ' + '<b>'+FileName+'</b>';
    }
    else{
        document.getElementById("fileUpload").style['display'] = '';
        document.getElementById("hiddenSelected").style['display'] = 'none';
        document.getElementById("hiddenSelected").removeAttribute('value');
        document.getElementById("hiddenLabel").innerHTML = '';
    }
    
}