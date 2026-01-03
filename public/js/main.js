document.addEventListener("DOMContentLoaded",()=>{
    let titleInput=document.getElementById("title");
    let categoryInput=document.getElementById("category");
    let authorInput=document.getElementById("author");
    let dateInput=document.getElementById("date-input");
    let bodyInput=document.getElementById("blog-body");
    let publishBtn=document.getElementById("publish-btn");
    
    function checkForm(){
        if(titleInput.value===""||categoryInput.value==="Select a category"||authorInput.value===""||dateInput.value===""||bodyInput.value===""){
            publishBtn.disabled=true;
        }else{
            publishBtn.disabled=false;
        }
    }

    checkForm();

    titleInput.addEventListener("input",checkForm);
    categoryInput.addEventListener("change",checkForm)
    authorInput.addEventListener("input",checkForm)
    dateInput.addEventListener("change",checkForm)
    bodyInput.addEventListener("input",checkForm)
})