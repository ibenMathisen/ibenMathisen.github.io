
let quiz = document.getElementById("quiz")

let sporsmal = [
    {
        bilde: "hoyreregel.jpg",
        sporsmal: "hva betyr dette skiltet?",
        alternativer: ["jeg har vikepllikt for biler som kommer fra høyre", "jeg har vikeplikt for biler som kommer fra venstre", "jeg har vikeplikt for biler som kommer fra begge sider", "andre biler har vikeplikt for meg"],
        riktig: 2
    },{
        bilde: "trafikklys.jpg",
        sporsmal:"Hva betyr grønn pil i et trafikklys?",
        alternativer: ["det betyr at jeg kan kjøre og at fotgjengere har rød mann", "det er ingen forskjell på grønt lys og grønn pil", "det betyr at jeg kan kjøre, men at jeg må være obs fordi fotgjengere kan ha grønn mann", "det betyr at jeg må vente med å kjøre"],
        riktig: 0
    }
];

const lengde = 2; //antall spørsmål i quizen
let valgteSporsmal = []
//generer en tilfeldig rekkefølge spørsmål
for(let i = 0; i < lengde; ++i){

    let valg = Math.floor(Math.random()*sporsmal.length)

    while(valgteSporsmal.includes(valg)) valg = Math.floor(Math.random()*lengde)
    // hindrer at det samme spørsmålet kommer igjen
    valgteSporsmal.push(valg)
}
console.log(valgteSporsmal)



let riktig = 0
let antallRette = 0
let radioKnapper = [
    document.getElementById("alt1b"),
    document.getElementById("alt2b"),
    document.getElementById("alt3b"),
    document.getElementById("alt4b")
]

function sjekkSvar() {
    let huket = 0
    for(let i = 0; i < 4; i++){
        if(radioKnapper[i].checked) huket = i
        radioKnapper[i].disabled = true
        //ser hvilken knapp som er huket av, sjekker svar og fjerner muligheten til å klikke på de andre knappene
    }

    if(huket == riktig){
        quiz.querySelector("#sporsmal").style.color = "green"
        antallRette++;
        //sjekker om huket av er riktig og øker anntall rette om riktig
    } 
    else quiz.querySelector("#sporsmal").style.color = "red"

    if(valgteSporsmal.length == 0){ 
        //når vi er på siste sprsmål så viser quizen resultatet, 
        document.getElementById("quizFerdig").style.display = "flex"
        /*gjør quizferdig synlig, ved å endre display fra none til flex*/
        document.getElementById("quizFerdigTekst").innerText = `Du fikk ${antallRette} av ${lengde}`
    }


    console.log("sjekket svar")
}



function lastNesteSporsmal(){
    quiz.querySelector("#sporsmal").style.color = "black"
    let detteSporsmal = sporsmal[valgteSporsmal[0]] //henter alltid det første spørsmålet
    console.log("dette spørsmål: ", detteSporsmal)  
    //henter første spørsmål i den tilfeldige rekkefølgen
    riktig = detteSporsmal.riktig   
    //setter riktig til spørsmålets verdi for riktig
    quiz.querySelector("#sporsmal").innerText = detteSporsmal.sporsmal
    quiz.querySelector("#quizBilde").src = "./bilder/quiz/"+detteSporsmal.bilde

    let alternativer = quiz.getElementsByClassName("alternativ")
    console.log(alternativer)
    if(detteSporsmal.alternativer.length == 4){
        for(let i = 0; i < 4; i++){
            alternativer[i].querySelector("label").innerText = detteSporsmal.alternativer[i]
            //viser at alternativene har rikig tekst til seg
            radioKnapper[i].disabled = false
        }    
        //knappene kan brukes igjen!
    }
    else {
        console.log("ugyldig mengde alternativer")
    } //kode for debugge
    valgteSporsmal.shift() // fjerner det første spørsmålet igjen
    //console.log(valgteSporsmal)

    
    if(valgteSporsmal.length == 0){ //ingen flere spørsmål fra liste igjen
        quiz.querySelector("#nesteSporsmal").style.display = "none"
    }// sjuler spørsmålet
}

let sjekkSvarBtn = document.getElementById("sjekkSvar")
let nesteSporsmalBtn = document.getElementById("nesteSporsmal")
sjekkSvarBtn.addEventListener("click", sjekkSvar)
nesteSporsmalBtn.addEventListener("click", lastNesteSporsmal)


lastNesteSporsmal();

console.log(valgteSporsmal)
