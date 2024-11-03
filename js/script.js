
const description=document.querySelector("#desc");
const amount=document.querySelector("#amount");

const exp_amt=document.querySelector("#exp-amt");

const form=document.querySelector("#form");


// const dummyData=[

//     {id :1,description:"flower",amount:-393},
//     {id :2,description:"car",amount:-100000},
//     {id :3,description:"salary",amount:500000},
//     {id :4,description:"food",amount:-500},
//     {id :5,description:"book",amount:200}
// ];

// let transaction=dummyData;


const localStorageTrans=JSON.parse(localStorage.getItem("trans"))

let transaction=localStorage.getItem("trans")!==null?localStorageTrans:[];
function loadTransaction(transaction){
    // console.log(transaction)
    const sign=transaction.amount<0 ?"-":"+";
    const item=document.createElement("li");
    item.classList.add(transaction.amount<0 ?"exp":"inc");
    item.innerHTML=`
    ${transaction.description} 
    <span> ${sign}   ${Math.abs(transaction.amount)}</span>
    <button class="btn-del" onclick="removeTrans(${transaction.id})">x</button>`
    trans.appendChild(item)
   
    
}
function removeTrans(id){
    // console.log(id)
    if (confirm("Are you sure want to delete Transaction?"))
        {
        transaction=transaction.filter((transactions)=>id!=transactions.id);
        config();
        updateLocalStorage()

    }
    else {
        return;
    }

}
function updateAmount(){
    const balance=document.querySelector("#balance");
 const amounts=transaction.map((transaction)=>transaction.amount)
 console.log(amounts)
const total=amounts.reduce((acc, item)=>(acc+=item)).toFixed(2)
// console.log(total)
balance.innerHTML=`₹ ${total}`

const inc_amt=document.querySelector("#inc-amt");
const income=amounts.filter((items)=>(items>0)).reduce((acc,items)=>acc+=items).toFixed(2)
// console.log(income)
inc_amt.innerHTML=` ₹  ${income}`

const exp_amt=document.querySelector("#exp-amt");
const expenes=amounts.filter((items)=>(items<0)).reduce((acc,items)=>(acc+=items),0).toFixed(2)
// console.log(expenes)
exp_amt.innerHTML=` ₹  ${expenes}`
}
function config(){
    const trans=document.querySelector("#trans");
    trans.innerHTML="";
    transaction.forEach(loadTransaction);

    updateAmount();

}

function addTransaction(e){

    e.preventDefault();
    if(description.value.trim()==""||amount.value.trim()==""){
        alert("Please enter the description ans amount!");
    }
    else{
        const newTransaction={
            id:uniqueId(),
            description:description.value,
            amount: +amount.value,
          
        }
    //  console.log(newTransaction)   
     transaction.push(newTransaction)
     loadTransaction(newTransaction)
     clear()
     updateAmount()
     updateLocalStorage()
    }
}
function uniqueId()
{
    return Math.floor(Math.random()*100000)
}
function clear(){
    description.value="";
     amount.value=""
    
    
}
form.addEventListener("submit",addTransaction);
window.addEventListener("load",function(){
    config();
})

function updateLocalStorage(){
    localStorage.setItem("trans",JSON.stringify(transaction))
}