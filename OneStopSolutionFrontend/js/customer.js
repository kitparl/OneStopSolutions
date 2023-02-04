let customerObj = JSON.parse(localStorage.getItem("customer"));
// Logout customer 
function logOutCustomer(){
    let sure = confirm("Are You Sure Want To Log Out?");

    if(sure){
        alert("Loging You Out");
        localStorage.removeItem("customer");
        window.location.href="../index.html";
    }
}

// Delete customer Account
function deleteCustomer(){
    let sure = confirm("Are You Sure Want To Delete Account?");



    if(sure){
        // alert("Deleting Your Account!");
        // window.location.href="index.html"



            let deleteCx = async() =>{            
                let res = await fetch(`http://localhost:8880/customer/${customerObj.customerId}`, {
            
                    method: 'DELETE',
            
                    headers: {
                        'Content-Type': "application/json",
                    }
                })
            
                let data = await res.json();
                //  console.log('data:', data)
            
                 visiblePOP();
                 popText.innerHTML=`<br>
                 <img id="wrong_psd_gif" src="https://i.gifer.com/7efs.gif" alt="">
                 <p style="display: block;">${data.message}</p>
                 
                 <br>`

    }
        
        localStorage.removeItem("customer");
        window.location.href="../index.html";
        deleteCx();

}

}

// fetch data  from local storage

console.log(customerObj);


let tr1 = document.createElement("tr");
let fName = document.createElement("td");
fName.innerText="First Name:";
let firstName = document.createElement("td");
firstName.innerText = customerObj.firstName;
tr1.append(fName,firstName);

let tr2 = document.createElement("tr");
let lName = document.createElement("td");
lName.innerText = "Last Name:"
let lastName = document.createElement("td");
lastName.innerText = customerObj.lastName;
tr2.append(lName,lastName);


let tr3 = document.createElement("tr");
let uname = document.createElement("td");
uname.innerText="Username:"
let username = document.createElement("td");
username.innerText = customerObj.username;
tr3.append(uname,username);

let tr4 = document.createElement("tr");
let e = document.createElement("td");
e.innerText="Email:"
let email = document.createElement("td");
email.innerText = customerObj.email;

tr4.append(e,email);


let tr5 = document.createElement("tr");
let aId = document.createElement("td");
aId.innerText="Customer Id:"
let cId = document.createElement("td");
cId.innerText = customerObj.customerId;
tr5.append(aId,cId);


let tr6 = document.createElement("tr");
let t = document.createElement("td");
t.innerText="City:"
let city = document.createElement("td");
city.innerText = customerObj.city;
tr6.append(t,city);

let tr7 = document.createElement("tr");
let c = document.createElement("td");
c.innerText="Mobile No:"
let mob = document.createElement("td");
mob.innerText = customerObj.mobile;
tr7.append(c,mob);

document.getElementById("profile").append(tr1,tr2,tr3,tr4,tr5,tr6,tr7);
document.getElementById("profile").style.color="white";



//////////////////////////////////////////////////////////
//   view customer issues 
////////////////////////////////////////////////////////////

let viewCustomerIssue = () => {


    let url = `http://localhost:8880/customer/issues/${customerObj.customerId}`;
    fetch(url).then((res)=>{
        return (res.json());
    }).then((data)=>{
        console.log(data);
        getAllDeptResponse(data)
    }).catch(function(err){
        console.log(err)
    })

}
    
    let getAllDeptResponse = (data) => {
        
        let cont = document.getElementById("popAlert");

        if(data.length != 0){

            visiblePOP();
popText.innerHTML=`<br>
<h2 style="display: block;"><u> All Issues: </u></h2>
<br>`
            data.forEach(({issueId,issueType,issueDescription}, i) => {
                
                let p = document.createElement("p");
                p.innerText = ` No: ${i},  IssueId: ${issueId},  Issue Type: ${issueType},  Description: ${issueDescription}`;
                let br = document.createElement("br");
                
                cont.append(p,br);
                
            });
            
            
        }else{
            visiblePOP();
            popText.innerHTML=`<br>
            <img id="wrong_psd_gif" src="https://i.gifer.com/7efs.gif" alt="">
            <p> ${data.message} </p>
            <br>`
            
        }

}


// ////////////////////////////////////////////
// // create issues

document.querySelector("#createIssueById").addEventListener("submit",async(e)=>{
    e.preventDefault();


   let issueObj = {
       issueType: document.getElementById("issueType").value,
    issueDescription : document.getElementById("issueDesc").value
}
console.log(issueObj);

   let res = await fetch(`http://localhost:8880/customer/issue/${customerObj.customerId}`, {
    method: 'POST',
    body: JSON.stringify(issueObj),
    headers: {
        'Content-Type': 'application/json',
    },
})

let data = await res.json();  



visiblePOP();
popText.innerHTML=`<br>
<img id="wrong_psd_gif" src="https://i.gifer.com/7efs.gif" alt="">
<p style="display: block;">${data.message}</p>

<br>`

document.getElementById("createIssueById").reset();

})



// ////////////////////////////////////////////
// // update password

document.querySelector("#updatePsdById").addEventListener("submit",async(e)=>{

    e.preventDefault();

    let passwordDetails = {
        oldPassword: document.getElementById("oldPsd").value,
        newPassword: document.getElementById("newPsd").value
    }

    let res = await fetch(`http://localhost:8880/customer/customers/${customerObj.customerId}
    `, {
        method: 'PUT',
        body: JSON.stringify(passwordDetails),
        headers: {
            'Content-Type': "application/json",
        }
    })

    let data = await res.json();

    console.log(data);

    if(data.issueId == undefined){
        visiblePOP();
        popText.innerHTML=`<br>
        <img id="wrong_psd_gif" src="https://media.tenor.com/B1ySTFIj8fcAAAAi/error.gif" alt="">
        <p style="display: block;">${data.message}</p>
        <br>`
    }
    else{

        visiblePOP();
        popText.innerHTML=`<br>
        <img id="wrong_psd_gif" src="https://i.gifer.com/7efs.gif" alt="">
        <p style="display: block;"><h3> ${data.message} </h3></p>


        <br>`
        
    }
})


// ////////////////////////////////////////////
// // get issue by id

document.querySelector("#getIssueById").addEventListener("submit",async(e)=>{

    e.preventDefault();

    let issueId = document.getElementById("getByIssueId").value;



    let res = await fetch(`http://localhost:8880/customer/issue/one/${issueId}`, {
        method: 'Get',
        headers: {
            'Content-Type': "application/json",
        }
    })

    let data = await res.json();

   visibleOut(data);
})

    let visibleOut = (data) => {
        
        if(data.issueId != undefined){
            visiblePOP();
            popText.innerHTML=`<br>
            <h2 style="display: block;"><u>Issue</u></h2>
            <br>`
        
            
            let cont = document.getElementById("popAlert");
            let p = document.createElement("p");
            p.innerText = ` IssueId: ${data.issueId},  Issue Type: ${data.issueType},  Description: ${data.issueDescription}`;
            let br = document.createElement("br");
            
            cont.append(p,br);
        }else{
            visiblePOP();
            popText.innerHTML=`<br>
            <img id="wrong_psd_gif" src="https://media.tenor.com/B1ySTFIj8fcAAAAi/error.gif" alt="">
            <p style="display: block;">${data.message}</p>
            
            <br>`    
        }
    
    }

    //////////////////////////// reopen issue

    // 

    document.querySelector("#reOpenIssueById").addEventListener("submit",async(e)=>{

        e.preventDefault();
    
        let issueId = document.getElementById("reopenIssueId").value;
    
        let res = await fetch(`http://localhost:8880/customer/issue/${issueId}
        `, {
            method: 'PUT',
            headers: {
                'Content-Type': "application/json",
            }
        })
    
        let data = await res.json();
    
        console.log(data);
    
        if(data.issueId == undefined){
            visiblePOP();
            popText.innerHTML=`<br>
            <img id="wrong_psd_gif" src="https://media.tenor.com/B1ySTFIj8fcAAAAi/error.gif" alt="">
            <p style="display: block;">${data.message}</p>
            <br>`
        }
        else{
    
            visiblePOP();
            popText.innerHTML=`<br>
            <img id="wrong_psd_gif" src="https://i.gifer.com/7efs.gif" alt="">
            <p style="display: block;"><h3> ${data.message} </h3></p>
    
    
            <br>`
            
        }
    })



    //modify issue
    

    document.querySelector("#modifyByIssueId").addEventListener("submit",async(e)=>{

        e.preventDefault();

        let issueId = document.getElementById("issueIdForModify").value;
        let updateDesc = document.getElementById("modifyDesc").value;
    
        let res = await fetch(`http://localhost:8880/customer/issues/${issueId}/${updateDesc}
        `, {
            method: 'PUT',
            headers: {
                'Content-Type': "application/json",
            }
        })
    
        let data = await res.json();
    
        console.log(data);
    
        if(data.issueId == undefined){
            visiblePOP();
            popText.innerHTML=`<br>
            <img id="wrong_psd_gif" src="https://media.tenor.com/B1ySTFIj8fcAAAAi/error.gif" alt="">
            <p style="display: block;">${data.message}</p>
            <br>`
        }
        else{
    
            visiblePOP();
            popText.innerHTML=`<br>
            <img id="wrong_psd_gif" src="https://i.gifer.com/7efs.gif" alt="">
            <p style="display: block;"><h3> ${data.message} </h3></p>
    
    
            <br>`
            
        }
    })
