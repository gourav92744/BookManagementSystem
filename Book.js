// DOM Selectors
let form= document.querySelector("#book-form")
let list= document.querySelector("#book-list")
let message= document.querySelector("#message")
let search= document.querySelector("#search")
let title= document.querySelector("#book-name")
let author= document.querySelector("#author")
let isbn= document.querySelector("#isbn")

// AddBook
function addBook(e){
    e.preventDefault()
    if(title.value==''|| author.value==''|| isbn.value==''){
        alert("Please Fill all the Fields")
    }else{
        let row= document.createElement("tr")
        row.innerHTML =`
        <td>${title.value}</td>
        <td>${author.value}</td>
        <td>${isbn.value}</td>
        <td><button class="btn btn-danger btn-sm delete">Remove</td>`
        list.appendChild(row)
        message.innerHTML= "Book Added Successfully!!!"
          setTimeout(function(){
                message.remove()
          },3000)
        document.querySelector("#book-name").value= ''
        document.querySelector("#author").value= ''
        document.querySelector("#isbn").value= ''
    }
}
// RemoveBook
function removeBook(e){
    if(e.target.classList.contains("delete")){
    let element= e.target.parentElement.parentElement
    list.removeChild(element)
    alert("Are You Sure??")
}
}
// SearchBook
function searchBook(e){
    let text= e.target.value.toLowerCase()
    let arrayList= Array.from(list.children)
    arrayList.forEach(function(el){
        let bookName=el.firstElementChild.innerText.toLocaleLowerCase()
        if(bookName.indexOf(text)!= -1){
            el.style.display="table-row"
        }else{
            el.style.display="none"
        }
        
    })
}

// Events
form.addEventListener("submit",addBook)
list.addEventListener("click",removeBook)
search.addEventListener("keyup",searchBook)