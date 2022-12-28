document.getElementById('waitersForm').addEventListener('submit', addBill);


window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/0e1d70bf15284ddfbf6a11b7baa212f0/orders")
         .then((response)=>{
            for(let i=0;i<response.data.length;i++){
                showOrders(response.data[i])
            }
          })
         .catch((err)=>{
            console.log(err)
          })
       
})

function showOrders(ord){
    const parentNode = document.getElementById('Orders');
    const childHTML = `<li id=${ord._id}> ${ord.type} ${ord.name} - ${ord.amount}
                            <button onclick="deleteOrder('${ord._id}')"> Delete </button>
                            
                        </li>`

    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}
function addBill(e){
    e.preventDefault();

    // get type, name, date, and amount
    let type = document.getElementById('type').value;
    let name = document.getElementById('name').value;
    let amount = document.getElementById('amount').value;

    if(type != 'chooseOne' 
        && name.length > 0 
        && amount > 0){
        const order = {
            type, 
            name, 
            amount
            
        }

        axios.post("https://crudcrud.com/api/0e1d70bf15284ddfbf6a11b7baa212f0/orders",order)
             .then((response)=>{
                showOrders(order)
                console.log(response)
                })
             .catch((err)=>{
                 document.body.innerHTML=document.body.innerHTML+"<h4>Something went wrong</h4>"
                 console.log(err)
                });
        console.log(order);
        
        
    }

    
    
}



function deleteOrder(orderId){

    axios.delete(`https://crudcrud.com/api/0e1d70bf15284ddfbf6a11b7baa212f0/orders"/${orderId}`)
         .then((response)=>{
             console.log("order deleted");
             removeOrder(orderId)
             })
         .catch((err)=>{
             console.log(err)
             })
           
}

function removeExpense(expenseId){
    const parentNode = document.getElementById('Orders');
    const childNodeToBeDeleted = document.getElementById(orderId);

    parentNode.removeChild(childNodeToBeDeleted)
}    