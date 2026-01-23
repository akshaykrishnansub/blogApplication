document.addEventListener("DOMContentLoaded",()=>{
    let titleInput=document.getElementById("title");
    let categoryInput=document.getElementById("category");
    let authorInput=document.getElementById("author");
    let dateInput=document.getElementById("date-input");
    let bodyInput=document.getElementById("blog-body");
    let publishBtn=document.getElementById("publish-btn");
    let composeForm=document.getElementById('compose-form');
    
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

    //alert logic for compose Page
    composeForm.addEventListener('submit',async(e)=>{
        e.preventDefault(); //prevents default refresh

        const data={
            title:titleInput.value,
            category:categoryInput.value,
            author:authorInput.value,
            blog_date:dateInput.value,
            body:bodyInput.value
        }
        try{
            const response=await fetch("/blogs",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(data)
            });

            const result=await response.json();

            if(response.ok){
                displayAlerts(result.message,"success");
                composeForm.reset();
            }else{
                displayAlerts(result.error || "Failed to store blog","error")
            }

        }catch(err){
            console.error(err);
            displayAlerts("Something went wrong","error")
        }
    })
})

//Utility function to display alert message
function displayAlerts(message,type="success"){
    const alertBox=document.getElementById("alertBox"); //getting element by ID from EJS file
    const alert=document.createElement("div"); //creating an element dynamically to display alert
    alert.className="alert"; //setting class name to alert
    alert.textContent=message; // setting the alert message
    if(type==="error"){
        alert.style.backgroundColor="red";
    }else{
        alert.style.backgroundColor="green";
    }
    alertBox.appendChild(alert);
    setTimeout(()=>{
        alert.remove();
    },4000);
}