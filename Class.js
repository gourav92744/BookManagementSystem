class Book{
    constructor(title,author,isbn){
this.title= title;
this.author= author;
this.isbn= isbn;
    }
}
class UI{
    static displayBook(){  
        let Books = Store.getBook()
        Books.forEach((pustak) => UI.addBook(pustak))
    }
    static addBook(book){
        let list = document.querySelector("#book-list")
        let row= document.createElement('tr')
        row.innerHTML =`
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><button class="btn btn-danger btn-sm delete">Remove</td>`
        list.appendChild(row)
    }
    static showAlert(msg,className){
       let div1 = document.createElement("div")
       div1.className = `alert alert-${className}`
       div1.appendChild(document.createTextNode(msg))
       let container = document.querySelector(".container")
       let form = document.querySelector("#book-form")
       container.insertBefore(div1,form)
       setTimeout(function(){
            div1.remove()
       },3000)
    }
    static removeBook(f){
      if(f.target.classList.contains('delete')){
          alert("Are you Sure??")
          f.target.parentElement.parentElement.remove()
          UI.showAlert("Book Removed Successfully!!!","primary")
      }
    }
    static clearFields(){
        document.querySelector("#book-name").value= ''
        document.querySelector("#author").value= ''
        document.querySelector("#isbn").value= ''
    }
    static searchBook(g){
        let text= g.target.value.toLowerCase()
        let list = document.querySelector("#book-list")
        let arrayList= Array.from(list.children)
        arrayList.forEach(function (gl){
            let bookName=gl.firstElementChild.innerText.toLocaleLowerCase()
            if(bookName.indexOf(text)!= -1){
                gl.style.display="table-row"
            }else{
                gl.style.display="none"
            }
            
        })

    }
}
// Adding Book in Local Storage API provided by Browser
class Store{
    static setBook(book){
        let Books = Store.getBook()
        Books.push(book)
        localStorage.setItem("Books",JSON.stringify(Books))
    }
    static getBook(){
       let Books;
       if(localStorage.getItem("Books")== null){
           Books= [];
       }else{
           Books= JSON.parse(localStorage.getItem("Books"))
       }
       return Books
    }
    static deleteBook(isbn){
      let Books=Store.getBook()
      Books.forEach((kitab,idx)=>{
          if(kitab.isbn== isbn)
          Books.splice(idx,1)
      })
      localStorage.setItem("Books",JSON.stringify(Books))
    }
}
// DOM Events:
document.addEventListener("DOMContentLoaded",()=>{
    UI.displayBook();
})
let form = document.querySelector("#book-form")
form.addEventListener("submit",init)
let click = document.querySelector("#book-list")
click.addEventListener("click",UI.removeBook)
let Search = document.querySelector("#search")
Search.addEventListener("keyup",UI.searchBook)
document.querySelector("#book-list").addEventListener("click",(i)=>{
    Store.deleteBook(i.target.parentElement.previousElementSibling.innerText) 
})
// Initiation for Add Book:
function init(e){
    e.preventDefault()
    let title= document.querySelector("#book-name").value
    let author= document.querySelector("#author").value
    let isbn= document.querySelector("#isbn").value
    if(title==''|| author==''|| isbn==''){
        UI.showAlert("Please Fill all the Fields","danger")
    }else{
       let book = new Book(title,author,isbn)
       UI.addBook(book)
       Store.setBook(book)//Adding Book in Local Storage provided by Browser
       UI.clearFields()
       UI.showAlert("Book Added Successfully!!!","success")
        }
}