
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

class dyn{
    constructor(element){
        this.element = element
    }
    follow(){
        let click = false
        this.element.addEventListener("click",()=>{
            if (click == false){
                click = true
                this.element.style.zIndex = "10"
                this.element.classList.add("active")
            }
            else{
                click = false
                this.element.style.zIndex = "3"
                this.element.classList.remove("active")
            }
        })
        window.addEventListener("mousemove",(e)=>{
            if (click){
                this.element.style.top = `${e.pageY-25}px`
                this.element.style.left = `${e.pageX-25}px`
            }
        });
    }
    follow_click(){
        let click = false
        this.element.addEventListener("click",()=>{
            if (click == false){
                click = true
                this.element.style.zIndex = "10"
                this.element.classList.add("active")
            }
            else{
                click = false
                this.element.style.zIndex = "3"
                this.element.classList.remove("active")
            }
        })
        window.addEventListener("click",(e)=>{
            if (click){
                this.element.style.top = `${e.pageY-25}px`
                this.element.style.left = `${e.pageX-25}px`
            }
        });
    }
}

// ---------------------------------------------------
const textfollowers = document.getElementById("text1")
const textCF = document.getElementById("text2")
const followerPlus = document.getElementById("plusFollower")
const followerMinus = document.getElementById("minusFollower")
const CFplus = document.getElementById("plusCF")
const CFminus = document.getElementById("minusCF")

let followers = 0

let allFollowers = []
let allCF = []

followerPlus.addEventListener("click",()=>{
    followers += 1
    textfollowers.innerText = followers

    let element = document.createElement("div")
    element.classList.add("ball")

    document.body.appendChild(element)

    allFollowers.push(element)

    let ball = new dyn(element)
    ball.follow()
})
followerMinus.addEventListener("click",()=>{
    if (followers > 0){
        followers -= 1
        textfollowers.innerText = Cfollowers
        document.body.removeChild(allFollowers[0])
        allFollowers.shift()
    }
})

let Cfollowers = 0

CFplus.addEventListener("click",()=>{
    Cfollowers += 1
    textCF.innerText = Cfollowers

    let element = document.createElement("div")
    element.classList.add("square")

    document.body.appendChild(element)

    allCF.push(element)
    let square = new dyn(element)
    square.follow_click()
})
CFminus.addEventListener("click",()=>{
    if (Cfollowers > 0){
        Cfollowers -= 1
        textCF.innerText = Cfollowers
        document.body.removeChild(allCF[0])
        allCF.shift()
    }
})

// ---------------------------------------------

function starSpawn(){
    let star = document.createElement("div")
    star.classList.add("star")

    star.style.top = `${Math.random()*innerHeight}px`
    star.style.left = `${Math.random()*innerWidth}px`

    let tam = Math.random()*20

    star.style.height = `${tam}px`
    star.style.width = `${tam}px`

    document.body.appendChild(star)
    setTimeout(()=>{
        document.body.removeChild(star)
    },2000)
}

setInterval(starSpawn, 300)