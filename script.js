
class Library{
    constructor(){
        this.books = [];
        this.table = new Table(this);

        let mobyDick = new Book(["moby dick", "herman melville", 123, true]);
        this.addBook(mobyDick);

        let treasureIsland = new Book(["treasure island", "r.l. stevenson", 124, true]);
        this.addBook(treasureIsland);

        this.table.displayBooks();
    }

    addBook(newBook) {
        this.books.push(newBook);
    }

    removeBook(index){
        console.log(index);
        if (index !== -1){
           this.books.splice(index, 1); 
        }
    }

    setBookIds(){
        for(let i=0; i < this.books.length; i++){
            this.books[i].id = i+1;
        }
    }
}

class Table{
    //link to the html table
    constructor(library){
        this.library = library;
        this.html = document.getElementById('table-body');
        this.bookInputPanel = new InputPanel(this);
    }

    displayBooks(){
        this.library.setBookIds();
        this.html.innerHTML = "";

        var books = this.library.books;
        for(let i=0; i<books.length; i++){
            var book = books[i];
            var bookArray = [];
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
        var button = document.createElement('button');
        button.classList.add("delButton");
        button.setAttribute("row", rowArray[0] - 1);

        button.addEventListener("click", function(button){
            var index = button.target.getAttribute('row');
            this.library.removeBook(index);
            this.displayBooks();
        }.bind(this));

        newRow.append(button);
    }
}

class InputPanel{
    constructor(table){
        this.table = table;
        this.html = document.getElementById('input-panel');
        this.form = document.getElementsByTagName('form')[0];
        this.addButton = document.getElementById("add-book-button");
        this.submitButton = document.getElementById("book-submit");
        
        this.addButton.addEventListener("click", function(){
            this.makeVisible();
        }.bind(this));

        this.submitButton.addEventListener("click", function(e){
            e.preventDefault();
            var bookArr = this.getFormArray();
            var book = new Book(bookArr);
            table.library.addBook(book);
            table.displayBooks();
            this.makeInvsible();
        }.bind(this));
    }  
    
    getFormArray(){
        var form = this.form;
        var parameters = [];
        for(let i=0; i<form.elements.length-2; i++){
            parameters.push(form.elements[i].value);
        }
        parameters.push(form.elements[form.elements.length-2].checked);
        return parameters;
    }

    makeVisible(){
        this.html.style.display = "grid";
    }

    makeInvsible(){
        this.html.style.display = "none";
    }
}



class Book{
    constructor(arr){
        this.id = -1;
        this.title = arr[0];
        this.author = arr[1];
        this.numPages = arr[2];
        this.haveRead = arr[3];
    }
}

var myLib = new Library();