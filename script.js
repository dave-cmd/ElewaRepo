let parent = document.querySelector(".form")

//Unique item id
let index = 1;

//Array of objects
let arr = []

//Add button
const addButton = document.querySelector(".add-btn")


//Delete button
const deleteButton = document.querySelector(".delete-btn")

//Append child to parent
addButton.addEventListener('click', ()=>{
        const child  = `
            <div class="form-item">
                <input type="text" placeholder="Enter item name" name="desc" id=${index} class="inp">
                <input type="number"  value="0" name="cost" id=${index} class="inp">
                <input type="number" value="0" name="qty" id=${index} class="inp">
                <input type="number"  value= 0 name="vat" id=${index} class="inp">
                <p class="total" id=${index}>Ksh 0</p>
                <p class="delete-btn" id=${index}>...</p>
            </div>
    `
    index = index+1;
    parent.insertAdjacentHTML("beforeend", child)
})

//Delete child from DOM
parent.addEventListener("click", (event)=>{
    if(!event.target.classList.contains('delete-btn')){
        return;
    }

    //Delete from DOM
    const btn  = event.target;
    btn.closest('div').remove()

    //Remove entry from array
    arr = arr.filter(item=>item.id !== event.target.id)
})

//Capture data on key up
parent.addEventListener('change', (event)=>{
    if(!event.target.classList.contains("inp")){
        return
    }
    const id = event.target.id
    let name  = event.target.name
    let value = event.target.value


    //Check of arr contains id
    const present  = arr.find(item=>{
        if(item.id ===  id){
            return true
        }
        return false
    })
    
    if(present === undefined){
        arr.push({id:id, [name]:value})
    }
    else {
        arr.find(item=> item.id === id)[name] = value
    }

    //Calculate total for each row
    const elementsEL = document.querySelectorAll(".total")
    for(let i=0; i<elementsEL.length; i++){
        if (elementsEL[i].id === id){
            // console.log(elementsEL[i])
            const result = arr.find(item=> item.id === id)["cost"] * arr.find(item=> item.id === id)["qty"]
            // console.log(JSON.stringify(result))
            elementsEL[i].innerHTML = "Ksh " + JSON.stringify(result)
        }
    }


    //Calculate main totals
    let subTotal = 0
    let VAT = 0
    let Total = 0

    arr.forEach(item =>{
        subTotal += item['cost'] * item['qty'] 
        VAT +=  subTotal * item['vat'] / 100
        Total += subTotal + VAT
    })

    console.log(subTotal, VAT, Total)

    //Set UI totals
    const subTotalEL = document.querySelector(".subtotal-value")
    subTotalEL.innerHTML = "Ksh " + JSON.stringify(subTotal || 0)

    const subVATEL = document.querySelector(".vat-value")
    subVATEL.innerHTML = "Ksh " + JSON.stringify(VAT || 0)

    const TotalEL = document.querySelector(".total-value-final")
    TotalEL.innerHTML = "Ksh " + JSON.stringify(Total || 0)
    

})











