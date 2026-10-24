let xmlhttp = new XMLHttpRequest();
function loadXMLDocAnddisplayDetails() {
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            displayDetails();

        }
    };
    xmlhttp.open("GET", "data/bdd.xml", true);
    xmlhttp.send();
}
function displayDetails(){
    let urlParams = new
    URLSearchParams(window.location.search);

    let idquiz=urlParams.get("ID")
    let xmlDoc = xmlhttp.responseXML;  
    let x=xmlDoc.getElementsByTagName("question");

    for (let i=0 ;i<x.length;i++){
        if(x[i].getElementsByTagName("id")[0].textContent==idquiz){
            let imgUrl = x[i].getElementsByTagName("image_large")[0].textContent;
            document.getElementById("img-detail").src = imgUrl;

            let categorie = x[i].getElementsByTagName("categorie")[0].textContent;
            document.getElementById("categorie-detail").textContent = "Catégorie : " + categorie;

            let contenu = x[i].getElementsByTagName("contenu")[0].textContent;
            document.getElementById("contenu-detail").textContent = contenu;

            document.getElementById("rep1-detail").textContent = "1. " + x[i].getElementsByTagName("response1")[0].textContent;
            document.getElementById("rep2-detail").textContent = "2. " + x[i].getElementsByTagName("response2")[0].textContent;
            document.getElementById("rep3-detail").textContent = "3. " + x[i].getElementsByTagName("response3")[0].textContent;
            document.getElementById("rep4-detail").textContent = "4. " + x[i].getElementsByTagName("response4")[0].textContent;

            let bonneRepNum = x[i].getElementsByTagName("bonne_reponse")[0].textContent;
            let points = x[i].getElementsByTagName("point")[0].textContent;
             document.getElementById("bonne-rep-detail").textContent = "Bonne réponse : N°" + bonneRepNum;
            document.getElementById("points-detail").textContent = "Points : " + points;
            /**
             Ici on prend l'elemnt qui represente la bonne reponse c'est a dire par exemple
             a l'id rep3-detail et puis on verifie s'il n'est pas Null puis on ajoute du gars puis 
             une subbrillance
             */
            ColorItem(bonneRepNum)
            
            
            
        }


    }

}

function ColorItem(answ){
    for(let j=1;j<=4;j++){
        let repID="rep"+j+"-detail";
        let repElm=document.getElementById(repID);
        if(repElm!=null){
            if(j==answ){
                repElm.classList.add("p-3","mb-2","bg-success","text-white");
            }
            else{
                repElm.classList.add("p-3","mb-2","bg-danger","text-white","bg-opacity-85")
            }

        }
    }
}