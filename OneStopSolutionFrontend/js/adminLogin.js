 document.querySelector("form").addEventListener("submit", async (ev)=> {
   ev.preventDefault();
    let loginData = {
        username : document.getElementById("adminUsername").value,
        password : document.getElementById("adminPassword").value
    }

    console.log(loginData)

        let res = await fetch("http://localhost:8880/admin/login", {
            method: 'POST',
            body: JSON.stringify(loginData),
            headers: {
                'Content-Type': 'application/json',
            },
        })
    
        let data = await res.json();  
        console.log('data:', data)
        fetchData(data);
    })

    let fetchData = (data) => {
        if(data.adminId == undefined){
            // alert("wrong credential...")
            visiblePOP();
            popText.innerHTML=`<br>
            <img id="wrong_psd_gif" src="https://media.tenor.com/B1ySTFIj8fcAAAAi/error.gif" alt="">
            <p style="display: block;">Wrong Password</p>
            <br>`
        }
        else{
            window.location.href="../subpages/admin.html";
            
        }
        let adminId = data.adminId;
        let firstName = data.firstName;
        let lastName = data.lastName;
        let username = data.login.username;
        let email = data.email;
        let type = data.login.type;

        let adminObj = {adminId,firstName,lastName,username,email,type}

        // console.log("adfasdf");
        // console.log(adminObj);

        localStorage.setItem("admin",JSON.stringify(adminObj));
    }




    // visiblePOP();
    // popText.innerHTML=`<br>
    // <p style="display: block;">Register Successfully</p>
    // <br>
    // <button onclick="goToLogin()" id="goToLogin">Go to Login</button>`