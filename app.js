
let data = new Date().getFullYear()

class activities
{
    constructor()
    {
        
    }
    book_maker(dic)
    {
        let book = dic;
        book.name = book.name.toUpperCase();

        book.info = `O ano de lançamento foi ${book.year} o no atual é ${data} e desde seu lançamento já se fazem ${(book.year-data)*-1} anos.`;

        let credits = `${book.name} por ${book.autor}`;
        book.credits = credits;

        return book
    }
}

let act = new activities();

let Sr = act.book_maker({
    name:"O Senhor dos Aneis",
    year:1954,
    autor:"J. R.R. Tolkien",
    credits:""
})

let harry = act.book_maker({
    name:"Harry Potter",
    year:1997,
    autor:"J. K. Rowling",
    credits:"",
    info:""
})

console.log(harry)

// ---------------------------------------------------

class interation{
    constructor(div){
        this.div = div
    }
    move(){
        let pressed = false
        let div_clicked = false
        
        this.div.addEventListener("click",()=>{
        
            if (div_clicked == true){
                div_clicked = false
                this.div.style.backgroundColor = "blue"
            }
            else{
                div_clicked = true;
                this.div.style.backgroundColor = "red"
            }
        
        })
        
        window.addEventListener("mousedown",(e)=>{
            pressed = true
        })
        window.addEventListener("mouseup",(e)=>{
            pressed = false
        
        })
        
        window.addEventListener("mousemove",(e)=>{
            if (pressed == true && div_clicked == true){
                this.div.style.top = `${e.pageY-this.div.clientHeight/2}px`;
                this.div.style.left = `${e.pageX-this.div.clientHeight/2}px`;
            }
        })
    }    
    move_to(){
        let div_clicked = false
        
        this.div.addEventListener("click",()=>{
        
            if (div_clicked == true){
                div_clicked = false
                this.div.style.backgroundColor = "blue"
            }
            else{
                div_clicked = true;
                this.div.style.backgroundColor = "red"
            }
        })
        
        window.addEventListener("mousedown",(e)=>{
            if (div_clicked == true)
            {
                this.div.style.top = `${e.pageY-this.div.clientHeight/2}px`;
                this.div.style.left = `${e.pageX-this.div.clientHeight/2}px`;
            }
        })
    }
}

let circle = new interation(document.getElementById("circle"))
circle.move();

let square = new interation(document.getElementById("square"))
square.move_to();