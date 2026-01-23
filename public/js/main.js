document.addEventListener("DOMContentLoaded",()=>{
    let titleInput=document.getElementById("title");
    let categoryInput=document.getElementById("category");
    let authorInput=document.getElementById("author");
    let dateInput=document.getElementById("date-input");
    let bodyInput=document.getElementById("blog-body");
    let publishBtn=document.getElementById("publish-btn");
    let composeForm=document.getElementById("compose-form");
    let signupForm=document.getElementById("signup-form");
    let firstName=document.getElementById("first-name");
    let lastName=document.getElementById("last-name");
    let email=document.getElementById("email");
    let password=document.getElementById("password");

    if(composeForm){
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
            //take input from user for composing blog
            const data={
                title:titleInput.value,
                category:categoryInput.value,
                author:authorInput.value,
                blog_date:dateInput.value,
                body:bodyInput.value
            }
            try{
            //send post request to backend route "/blogs"
            const response=await fetch("/blogs",{
                //specify HTTP request as POST (Used for creating new data on server)
                method:"POST",
                //Tell the server that the data body will be JSON
                headers:{"Content-Type":"application/json"},
                //convert the Javascript object into a JSON string and include it in the request body
                body: JSON.stringify(data)
            });

            //Storing response as a JSON object in the result variable
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
}

    //alert logic for signup page
    if(signupForm){
        signupForm.addEventListener("submit",async(e)=>{
        e.preventDefault();
        
        //client side validation
        if(firstName.value===""||lastName.value===""||email.value===""||password.value===""){
            displayAlerts("All fields are required","error");
            return;
        }



        const userData={
            first_name:firstName.value,
            last_name:lastName.value,
            email:email.value,
            password:password.value
        }
        try{
            const response=await fetch("/auth/signup",{
                method:"POST",
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(userData)
            })
            
            const result=await response.json();
            
            if(response.ok){
                displayAlerts(result.message,"success");
                signupForm.reset();
            }else{
                displayAlerts(result.error||"Failed to Register User","error");
            }
        }catch(err){
            console.error(err);
            displayAlerts("Something went wrong","error")
        }
    })
}
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