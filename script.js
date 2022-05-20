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
                <p class="total" id=${index}>0</p>
                <button class="delete-btn" id=${index}>Delete</button>
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


    //Set total
    // let totalEL = document.getElementById()

    // const result = arr.find(item=> item.id === id)["cost"] * arr.find(item=> item.id === id)["qty"]

    // console.log(JSON.stringify(result))

    // totalEL.innerHTML =  JSON.stringify(result)

    const elementsEL = document.querySelectorAll(".total")
    for(let i=0; i<elementsEL.length; i++){
        if (elementsEL[i].id === id){
            console.log(elementsEL[i])
            const result = arr.find(item=> item.id === id)["cost"] * arr.find(item=> item.id === id)["qty"]
            console.log(JSON.stringify(result))
            elementsEL[i].innerHTML =  JSON.stringify(result)
        }
    }
})











