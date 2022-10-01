
class Library{
    constructor(){
        this.books = [];
    }

    addBook(newBook) {
        this.books.push(newBook);
    }

    removeBook(oldBook){
        var index = this.books.indexOf(oldBook);
        if (index !== -1){
           this.books.splice(index, 1); 
        }
    }
}

class Table{
    //link to the html table
    constructor(){
        this.html = document.getElementsByTagName('table')[0];
        this.bookInputPanel = new InputPanel();
    }

    displayBooks(library){
        for(let i=0; i<library.length; i++){
            var book = library[i];
            var bookArray = [];
            bookArray.push(i+1);
            for(let prop in book){
                bookArray.push(book[prop]);
            }
            this.addRow(bookArray);
        }
    }

    addRow(rowArray){
        var newRow = this.html.insertRow();
        for(let i=0; i<rowArray.length; i++){
            var newCell = newRow.insertCell();
            newCell.innerHTML = rowArray[i];
        }
    }
}

class InputPanel{
    constructor(){
        this.html = document.getElementById('input-panel');
        this.form = document.getElementsByTagName('form')[0];
        this.form = document.getElementsByTagName('form')[0];
        this.addButton = document.getElementById("add-book-button");
        this.submitButton = document.getElementById("book-submit");
        
        this.addButton.addEventListener("click", function(){
            this.makeVisible();
        }.bind(this));

        this.submitButton.addEventListener("click", function(){
            this.makeInvsible();
        }.bind(this));
    }  
    
    formValuesArray(){

    }

    makeVisible(){
        this.html.style.display = "grid";
    }

    makeInvsible(){
        this.html.style.display = "none";
    }
}



function Book(title, author, numPages, haveRead){
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.haveRead = haveRead;
}

var myLib = new Library();
var table = new Table();

let mobyDick = new Book("moby dick", "herman melville", 123, true);
myLib.addBook(mobyDick);

let treasureIsland = new Book("treasure island", "r.l. stevenson", 124, true);
myLib.addBook(treasureIsland);

let edgelord = new Book("suck a dick", "me", 69, true);
myLib.addBook(edgelord);

myLib.removeBook(edgelord);

table.displayBooks(myLib.books);