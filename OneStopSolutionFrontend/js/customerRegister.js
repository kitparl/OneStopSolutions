console.log(12);
document.querySelector("#registerCustomer").addEventListener("submit", async (ev)=> {
    ev.preventDefault();
     let registerData = {
         firstName : document.getElementById("firstName").value,
         lastName : document.getElementById("lastName").value,
         email : document.getElementById("email").value,
         username : document.getElementById("username").value,
         password : document.getElementById("password").value,
         city : document.getElementById("city").value,
         mobile : document.getElementById("mobile").value
     }
 
    //  console.log(registerData)
 
         let res = await fetch("http://localhost:8880/customer/register", {
             method: 'POST',
             body: JSON.stringify(registerData),
             headers: {
                 'Content-Type': 'application/json',
             },
         })
     
         let data = await res.json();  
         console.log('data:', data)
         responseData(data);
     })
 
     let responseData = (data) => {
            
        
             visiblePOP();
             popText.innerHTML=`<br>
             <img id="wrong_psd_gif" src="https://i.gifer.com/7efs.gif" alt="">
             <p style="display: block;">${data.message}</p>
             <br>`


        

 
 
     }