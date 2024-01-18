
// Logout Admin
function logOutAdmin(){
    let sure = confirm("Are You Sure Want To Log Out?");

    if(sure){
        alert("Loging You Out");

//         visiblePOP();
// popText.innerHTML=`<br>
// <img id="wrong_psd_gif" src="https://i.gifer.com/7efs.gif" alt="">
// <p style="display: block;">${data.message}</p>
// <button>  </button>

// <br>`

        localStorage.removeItem("admin")
        window.location.href="../index.html";
    }
}

let adminObj = JSON.parse(localStorage.getItem("admin"));

// console.log(adminObj);


let tr1 = document.createElement("tr");
let fName = document.createElement("td");
fName.innerText="First Name:";
let firstName = document.createElement("td");
firstName.innerText = adminObj.firstName;
tr1.append(fName,firstName);

let tr2 = document.createElement("tr");
let lName = document.createElement("td");
lName.innerText = "Last Name:"
let lastName = document.createElement("td");
lastName.innerText = adminObj.lastName;
tr2.append(lName,lastName);


let tr3 = document.createElement("tr");
let uname = document.createElement("td");
uname.innerText="Username:"
let username = document.createElement("td");
username.innerText = adminObj.username;
tr3.append(uname,username);

let tr4 = document.createElement("tr");
let e = document.createElement("td");
e.innerText="Email:"
let email = document.createElement("td");
email.innerText = adminObj.email;

tr4.append(e,email);


let tr5 = document.createElement("tr");
let aId = document.createElement("td");
aId.innerText="Admin Id:"
let adminId = document.createElement("td");
adminId.innerText = adminObj.adminId;
tr5.append(aId,adminId);

let tr6 = document.createElement("tr");
let t = document.createElement("td");
t.innerText="Type:"
let type = document.createElement("td");
type.innerText = adminObj.type;
tr6.append(t,type);

document.getElementById("profile").append(tr1,tr2,tr3,tr4,tr5,tr6);
document.getElementById("profile").style.color="white";


// create department

document.querySelector("#deptForm").addEventListener("submit",async(e)=>{
    e.preventDefault();

   let deptObj = {departmentName: document.getElementById("deptName").value}

   let res = await fetch("http://localhost:8880/admin/department", {
    method: 'POST',
    body: JSON.stringify(deptObj),
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

document.getElementById("deptForm").reset();

})

//get all dept

document.querySelector("#getAllDept").addEventListener("click",async(e)=>{

let url = "http://localhost:8880/admin/departments";
fetch(url).then((res)=>{
    return (res.json());
}).then((data)=>{
    // console.log(data);
    getAllDeptResponse(data)
}).catch(function(err){
    console.log(err)
})
})

let getAllDeptResponse = (data) => {
    visiblePOP();
    popText.innerHTML=`<br>
    <h2 style="display: block;"><u> All Departments </u></h2>
    <br>`

    
    let cont = document.getElementById("popAlert");


    let table = document.createElement("table");


    let thead = document.createElement("thead");

    
    let tr1 = document.createElement("tr");
    tr1.setAttribute("class","col")
    tr1.setAttribute("id", "thead-d")
    
    let th1 = document.createElement('th')
    th1.innerText = "Department Id ";
    
    let th2 = document.createElement('th')
    th2.innerText = "Department Name";
    
    tr1.append(th1,th2);


    thead.append(tr1);

    table.append(thead);
    
    let tbody = document.createElement("tbody");

    tbody.innerHTML="";

    data.forEach(({departmentId,departmentName}, i) => {


let row = document.createElement("tr");
row.setAttribute("class","col")

let col1 = document.createElement("td");
col1.innerText = departmentId;
let col2 = document.createElement("td");
col2.innerText=departmentName;

row.append(col1,col2);

tbody.append(row);
table.append(tbody);
cont.append(table)
});
}





//delete department by id


document.querySelector("#deleteDepart").addEventListener("submit",async(e)=>{

e.preventDefault();

    let id = document.getElementById('dId').value;

    // console.log(id);

    let res = await fetch(`http://localhost:8880/admin/departments/${id}`, {

        method: 'DELETE',

        headers: {
            'Content-Type': "application/json",
        }
    })

    let data = await res.json();
     console.log('data:', data)

     if(data.message == "Delete Successfully"){
         visiblePOP();
         popText.innerHTML=`<br>
         <img id="wrong_psd_gif" src="https://i.gifer.com/7efs.gif" alt="">
         <p style="display: block;">${data.message}</p>
         
         <br>`

     }else{

        visiblePOP();
        popText.innerHTML=`<br>
        <img id="wrong_psd_gif" src="https://media.tenor.com/B1ySTFIj8fcAAAAi/error.gif" alt="">
        <p style="display: block;">${data.message}</p>
        
        <br>`

     }

     document.getElementById("deleteDepart").reset();


})


//update departmentname by id

document.querySelector("#updateDept").addEventListener("submit",async(e)=>{

    e.preventDefault();

    let id = document.getElementById("updateDeptId").value;
    let name = document.getElementById("updateDeptName").value;



    let res = await fetch(`http://localhost:8880/admin/departments/${id}?name=${name}`, {
        method: 'PATCH',
        // body: JSON.stringify(send_data),
        headers: {
            'Content-Type': "application/json",
        }
    })

    let data = await res.json();

    console.log(data);

    if(data.message=="Updated Successfully"){
        visiblePOP();
        popText.innerHTML=`<br>
        <img id="wrong_psd_gif" src="https://i.gifer.com/7efs.gif" alt="">
        <p style="display: block;">${data.message}</p>
        
        <br>`
    }else{
        visiblePOP();
        popText.innerHTML=`<br>
        <img id="wrong_psd_gif" src="https://media.tenor.com/B1ySTFIj8fcAAAAi/error.gif" alt="">
        <p style="display: block;">${data.message}</p>
        
        <br>`
    }

document.getElementById("updateDept").reset();

})


// get department by id


document.querySelector("#getDeptById").addEventListener("submit",async(e)=>{

    e.preventDefault();

    let id = document.getElementById("getDeptByIdId").value;



    let res = await fetch(`http://localhost:8880/admin/departments/${id}`, {
        method: 'Get',
        headers: {
            'Content-Type': "application/json",
        }
    })

    let data = await res.json();
    console.log(data);

    if(data.departmentId == undefined){

        visiblePOP();
        popText.innerHTML=`<br>
        <img id="wrong_psd_gif" src="https://media.tenor.com/B1ySTFIj8fcAAAAi/error.gif" alt="">
        <p style="display: block;"><h3>${data.message}</p>
        
        
        <br>`

    }else{

        visiblePOP();
        popText.innerHTML=`<br>
        <img id="wrong_psd_gif" src="https://i.gifer.com/7efs.gif" alt="">
        <p style="display: block;"><h3>Department Id : </h3><i>${data.departmentId}</i></p>
        <p style="display: block;"><h3>Department Name : </h3><i>${data.departmentName}</i></p>
        
        <br>`
    }


document.getElementById("getDeptById").reset();


})



// add operator

document.querySelector("#createOperator").addEventListener("submit",async(e)=>{
    e.preventDefault();

   let operatorObj = {operatorFirstName : document.getElementById("firstName").value,
operatorLastName: document.getElementById("lastName").value,
operatorEmail: document.getElementById("email").value,
operatorMobile: document.getElementById("mobile").value,
operatorType:  document.getElementById("type").value,
departmentId: document.getElementById("oprDeptId").value,
username : document.getElementById("username").value,
password : document.getElementById("password").value


}
// console.log(operatorObj);

   let res = await fetch("http://localhost:8880/admin/operator", {
    method: 'POST',
    body: JSON.stringify(operatorObj),
    headers: {
        'Content-Type': 'application/json',
    },
})

let data = await res.json();  
console.log(data);

if(data.message == "Operator Added Successfully"){

    visiblePOP();
    popText.innerHTML=`<br>
    <img id="wrong_psd_gif" src="https://i.gifer.com/7efs.gif" alt="">
    <p style="display: block;">${data.message}</p>
    
    <br>`
}else{

    visiblePOP();
    popText.innerHTML=`<br>
    <img id="wrong_psd_gif" src="https://media.tenor.com/B1ySTFIj8fcAAAAi/error.gif" alt="">
    <p style="display: block;">${data.message}</p>
    
    <br>`

}

document.getElementById("createOperator").reset();
})


// get operator by id


document.querySelector("#getOperatorById").addEventListener("submit",async(e)=>{

    e.preventDefault();

    let id = document.getElementById("getOperatorByIdId").value;

    let res = await fetch(`http://localhost:8880/admin/operators/${id}`, {
        method: 'Get',
        headers: {
            'Content-Type': "application/json",
        }
    })

    let data = await res.json();
    console.log(data);

    if(data.operatorId==null){
        visiblePOP();
        popText.innerHTML=`<br>
        <img id="wrong_psd_gif" src="https://media.tenor.com/B1ySTFIj8fcAAAAi/error.gif" alt="">
        <p style="display: block;">${data.message}</p>
        
        <br>`


    }else{

        
        visiblePOP();
        popText.innerHTML=`<br>
        <img id="wrong_psd_gif" src="https://i.gifer.com/7efs.gif" alt="">
        <p style="display: block;"><h3> ${data.login.type} </h3></p>
        <p style="display: block;">${data.operatorFirstName} ${data.operatorLastName}</p>
        <p style="display: block;">Email: ${data.operatorEmail}</p>
        <p style="display: block;">Mobile Number: ${data.operatorMobile}</p>
        <p style="display: block;">Operator Id: ${data.operatorId}</p>
        <p style="display: block;">Operator Type:  ${data.operatorType}</p>
        <p style="display: block;">Mobile Number: ${data.operatorMobile}</p>
        <p style="display: block;">Username:  ${data.login.username}</p>
        <br>`
        
        
    }
    document.getElementById("getOperatorById").reset();
})









//update

// const updatePost = async () => {

//     let id = document.getElementById('update_id').value;
//     let new_title = document.getElementById('update_title').value
//     console.log('new_title:', new_title)

//     let send_data = {
//         title: new_title,
//     }
//     console.log('send_data:', send_data)

//     let res = await fetch(`http://localhost:3000/posts/${id}`, {
//         method: 'PATCH',
//         body: JSON.stringify(send_data),
//         headers: {
//             'Content-Type': "application/json",
//         }
//     })

//     let data = await res.json();
//     //  console.log('data:', data)
// }

// // replace 

// const replacePost = async () => {
//     let id = document.getElementById('replace_id').value;
//     let new_title = document.getElementById('replace_title').value

//     let send_data = {
//         title: new_title,
//     }

//     let res = await fetch(`http://localhost:3000/posts/${id}`, {
//         method: 'PUT',

//         body: JSON.stringify(send_data),

//         headers: {
//             'Content-Type': "application/json",
//         }
//     })

//     let data = await res.json();
//     //  console.log('data:', data)

// }
// get all operator

document.querySelector("#getAllOperator").addEventListener("click",async(e)=>{

    let url = "http://localhost:8880/admin/operators";
    fetch(url).then((res)=>{
        return (res.json());
    }).then((data)=>{
        // console.log(data);
        getAllOperatorResponse(data)
    }).catch(function(err){
        console.log(err)
    })
    
    let getAllOperatorResponse = (data) => {
        visiblePOP();
        popText.innerHTML=`<br>
        <h2 style="display: block;"><u> All Operators </u></h2>
        <br>`


        let cont = document.getElementById("popAlert");


            let tbody = document.createElement("tbody");

             tbody.innerHTML="";
        
        data.forEach(({operatorId,operatorFirstName,operatorLastName, login:{username},operatorType,operatorEmail}, i) => {

            let p = document.createElement("p");
            p.innerText = `Operator Id: ${operatorId},  Name: ${operatorFirstName} ${operatorLastName},  Username: ${username},  Email: ${operatorEmail}`;
            let br = document.createElement("br");
    
            
            
            cont.append(p,br);
});
    }
    
})