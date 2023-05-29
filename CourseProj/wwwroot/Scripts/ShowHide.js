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
