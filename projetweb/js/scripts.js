let xmlhttp = new XMLHttpRequest();
let data=[]

let nbPage = 0;
let pageSize = 5;
let startIndex = 0;
let endIndex = 0;
let page = 1;


function ResetPage(){
    nbPage = 0;
     pageSize = 5;
     startIndex = 0;
     endIndex = 0;
     page = 1;
}

function loadXMLDoc() {
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            fetchData();
            showPageLinks();
            

        }
    };
    xmlhttp.open("GET", "data/bdd.xml", true);
    xmlhttp.send();
}


function fetchData(){
    ResetPage()
    let i;
    let xmlDoc = xmlhttp.responseXML;
    let x = xmlDoc.getElementsByTagName("question");

    nbPage=Math.ceil(x.length/pageSize)
    /*on calcule le nombre totale de page (de boutton) ici Math.ceil arrondit par excés le resultat
   de la division entre le nombre totale de question et le nombre de question par page
    */

    data = [];
    for (i = 0; i < x.length; i++) {
        data.push(x[i]);
    }
    console.log(data);
    displayData();

}

function displayData(){
    let table = "<tr class='table-dark'><th>Numeroquestion</th> <th>Thematique</th> <th>Image</th>   <th>Question</th>  <th>Bonne reponse</th> <th>Points</th> <th>Detail</th>   </tr>";
    startIndex=(page-1)*pageSize;
    endIndex=startIndex+pageSize;
    /* ici startIndex est calculer avec le numero de la page courante dimunié de1
    mulpiplier par le nombre de question (on soustrait 1 car les indice commence par 0 et page par 1) */
       if (endIndex > data.length) {
        endIndex = data.length;
    }
    /* La condionnelle est mis dans le cas ou dans la derniére page on demande un affichage d'elment qui n'existe pas
    c'est dans le cas ou pageSize ne divise pas x.length  */

    for(i=startIndex;i < endIndex; i++){
        table += "<tr><td>" +

        
        data[i].getElementsByTagName("id")[0].textContent +
        "</td><td>" + 

        data[i].getElementsByTagName("categorie")[0].textContent +
        "</td><td>" +

        "<img src='" + data[i].getElementsByTagName("image")[0].textContent + "' style='max-width: 500px; height: auto;' alt='Pokémon' />" +
        "</td><td>" + 

        data[i].getElementsByTagName("contenu")[0].textContent +
        "</td><td>" + 


        data[i].getElementsByTagName("reponsetext")[0].textContent +
        "</td><td>" + 

        data[i].getElementsByTagName("point")[0].textContent +  
        "</td>" + 
        "<td>"+
        "<a href='detail.html?ID="+data[i].getElementsByTagName("id")[0].textContent+
        " 'class='btn btn-primary' >Details</a>"+
        "</td>" + 

        "</tr>";
    }
    document.getElementById("data").innerHTML = table;

}



/* Cette fonction permet de mettre a jour page avec le numero de la page courante
puis on rappelle la fonction displayData pour l'affichage des elments correspondants */

function loadPage(pageNumber){
    page=pageNumber;
    displayData();
    showPageLinks();

}

/* Fonction appeler juste apres le premier appel de fetchData pour creer le nombre
de page (nmbr de boutton) avec l'attribut onclick qui va appeler loadPage */

function showPageLinks() {
    pageLinks=" "
    let divpl = document.getElementById("pageLinks");
    for (i = 1; i <= nbPage; i++) {
        let BtnClass="btn btn-info";
        if(i==page){
            BtnClass="btn btn-primary active";
        }
        pageLinks += "<input class='"+BtnClass+"' type='button' onclick='loadPage(" + i
        +")' value='"+i+"'></input>";
        }
    divpl.innerHTML = pageLinks;
    divpl.className = "d-flex gap-2 justify-content-center mt-3 "
    divpl.style.display = "block";
    
   
}

function filtrerData(){

    ResetPage()
    let i;
    let xmlDoc = xmlhttp.responseXML;
    let x = xmlDoc.getElementsByTagName("question");

    let slThematique = document.getElementById("thematique");
    let theme = slThematique.value;
    data=[];


    for(i=0;i<x.length;i++){
        if((theme==x[i].getElementsByTagName("categorie")[0].textContent )||theme=="Total"){
            data.push(x[i]);

        }
    }

    nbPage=Math.ceil(data.length/pageSize)
    /*on calcule le nombre totale de page (de boutton) ici Math.ceil arrondit par excés le resultat
   de la division entre le nombre totale de question et le nombre de question par page
    */
    showPageLinks()
    displayData(); 
    
    
    }

function compareQuestionsDiff(a,b){
    let nameA=a.getElementsByTagName("point")[0].textContent
    let nameB=b.getElementsByTagName("point")[0].textContent

    if(nameA<nameB){
        return -1;

    }
    if(nameA>nameB){
        return 1;
    }
    return 0;
       
}

function compareQuestionsLexi(a,b){
    let nameA=a.getElementsByTagName("contenu")[0].textContent
    let nameB=b.getElementsByTagName("contenu")[0].textContent

    if(nameA<nameB){
        return -1;

    }
    if(nameA>nameB){
        return 1;
    }
    return 0;
       
}
/*jE tri le tableau data courant j'applique mon tri au question qui sont dans data*/
function sortData(){
    //ResetPage();
    crit=document.getElementById("CritTRI").value;
    if(crit=="dif"){
        data.sort(compareQuestionsDiff);
    }else if(crit=="lexi"){
        data.sort(compareQuestionsLexi);
    }
    
    //nbPage=Math.ceil(data.length/pageSize);
    /*on calcule le nombre totale de page (de boutton) ici Math.ceil arrondit par excés le resultat
   de la division entre le nombre totale de question et le nombre de question par page
    */
   //showPageLinks();
    displayData();
}

function rechercherData(){
    ResetPage();
    let rech=document.getElementById("search-input").value.toLowerCase();
    let i;
    let xmlDoc = xmlhttp.responseXML;
    let x = xmlDoc.getElementsByTagName("question");
    data=[];
    for(i=0;i<x.length;i++){
        let Categorie=x[i].getElementsByTagName("categorie")[0].textContent.toLowerCase();
        let contenu=x[i].getElementsByTagName("contenu")[0].textContent.toLowerCase();
        let Id=x[i].getElementsByTagName("id")[0].textContent;
        if(Id==rech){
            data.push(x[i]);
            break;// sortir de la boucle des que je trouve le numero excate de la question

        }
        else if(Categorie.includes(rech)){
            data.push(x[i]);

        } else if(contenu.includes(rech)){
            data.push(x[i]);

        }
    }
    nbPage=Math.ceil(data.length/pageSize);
    showPageLinks();
    displayData();


}

tab1=[2,101,3,89,2,200]
tab=["G","o","p","k","k","f"]
console.log(tab)
//tab.sort()
console.log(tab)
console.log(tab.join('-'))
console.log(tab)
console.log(tab.join('*'))
monSet= new Set()
for(let i=0;i<tab.length;i++){
    monSet.add(tab[i]);
}
console.log(monSet)
//monSet.sort()

