import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getDatabase,
          ref,
          push, 
          onValue,
          remove } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js"

const firebaseConfig = {
  databaseURL : "https://leads-tracker-app-e2fc5-default-rtdb.europe-west1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const referenceInDB = ref(database, "leads");


//let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn")

//const tabBtn = document.getElementById("tab-btn");

//const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

// if (leadsFromLocalStorage){
//   myLeads = leadsFromLocalStorage;
//   render(myLeads)

// }

// tabBtn.addEventListener("click", function(){
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
//     myLeads.push(tabs[0].url);
//     localStorage.setItem("myLeads", JSON.stringify(myLeads))
    
//     render(myLeads)
//   })
  
// })


function render(leads){
  let listItems = "";

  for(let i = 0; i < leads.length; i++){
  //listItems += "<li><a target='_blank' href='" + myLeads[i] + "'>" + myLeads[i] + "</a></li>";
  listItems += `
      <li>
           <a target='_blank' href='${leads[i]}'> 
              ${leads[i]} 
           </a>     
       </li>`;

  console.log(listItems)
  }
  
  ulEl.innerHTML = listItems;

}

onValue(referenceInDB, function(snapshot) {
  const snapshotDoesExist = snapshot.exists()
  if(snapshotDoesExist){
     const snapshotValues = snapshot.val()   //{}
     const leads = Object.values(snapshotValues)
    render(leads)
  }
  
})

deleteBtn.addEventListener("click", function(){
  remove(referenceInDB)
  ulEl.innerHTML = ""

 //localStorage.clear();
  // myLeads = [];
  // render(myLeads)
})


inputBtn.addEventListener("click", function(){
  console.log(inputEl.value);
  push(referenceInDB, inputEl.value)

  inputEl.value = "";
  //localStorage.setItem("myLeads", JSON.stringify(myLeads))
  
 // render(myLeads)

  
})







