const newToast = new bootstrap.Toast('.toast');

setTimeout(() =>{
    try{
        newToast.show();
    }
    catch (ex){}
    
})