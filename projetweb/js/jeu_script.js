let xmlhttp = new XMLHttpRequest();
let tabQuestion=[];//Tableau contenant toutes les questions
let QuizCourantID=0//Index de la question courante
let IsquizAsw=false // Pour voir si la question est repondu et savoir si on peut passer a la question suivante
let userSelectedAnswer // Pour recuperer le numero de la reponse choisi par l'utilisateur

let tabScore=[];
let tabInstantJeu=[];
let score=0;
function loadXMLDoc() {
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            UpdateSet();
            displayJeu();

        }
    };
    xmlhttp.open("GET", "data/bdd.xml", true);
    xmlhttp.send();
}


function displayJeu(){
    let urlParams = new
    URLSearchParams(window.location.search);
    let catId=urlParams.get("cat");
    let catlot=urlParams.get("lot");

    let i;
    let xmlDoc = xmlhttp.responseXML;
    let x = xmlDoc.getElementsByTagName("question");
    
     tabQuestion=[];//Tableau contenant toutes les questions
    // utilisation d'un set pour sotcker les index aleatoires tirées
    let indexSelected=new Set();
    if(catId=="start"){
        /*declaration des constantes pour le nombres totales de questions
        et egalement le minimum entre 10 et le nombre totale
        */
       let totalQuestion=x.length
       let max=10;

       while(tabQuestion.length<max){
        /* Declaration de randomI pour choisir un index aleatoire : Math.random
        choisi un nombre aleatoire a virgule entre 0 et 1 qu'on multiplie par le nombre totale de question 
        puis on transforme en entier avec Math.floor*/
        let randomI=Math.floor(Math.random()*totalQuestion)
        // Math.floor arrondit par defaut
        if(!indexSelected.has(randomI)){
            /*on verifie si l'index est dans le set dnas le cas contraire on l'ajoute au tableau */

            indexSelected.add(randomI);
            tabQuestion.push(x[randomI])
        }
       }

    }else{
        for(i=0;i<x.length;i++){
            if(x[i].getElementsByTagName("categorie")[0].textContent==catId){
                tabQuestion.push(x[i])
            }
        }

    }
    for(i=0;i<x.length;i++){
        if(x[i].getElementsByTagName("point")[0].textContent==catlot){
            tabQuestion.push(x[i]);
        }

    }
   
  document.getElementById("answer-buttons").addEventListener('click',selectAnswer)
  // On excetute la fonction selectAnswer() au moment au l'utilisateur va cliquer sur le boutton
  // on lie la fonction selectAnswer a l evenement click
  // on affiche la premiere question
  
    renderQuestion();
  
}

/**Utiliser pour afficher la question actuelle */
function renderQuestion(){
    IsquizAsw=false
    let q =tabQuestion[QuizCourantID];
    document.getElementById("question-image").src=q.getElementsByTagName("image_large")[0].textContent;
    document.getElementById("question-text").textContent=q.getElementsByTagName("contenu")[0].textContent;

    let answerContainer=document.getElementById("answer-buttons");
    answerContainer.innerHTML=""
    let reponse=[
        q.getElementsByTagName("response1")[0].textContent,
        q.getElementsByTagName("response2")[0].textContent,
        q.getElementsByTagName("response3")[0].textContent,
        q.getElementsByTagName("response4")[0].textContent,
    ];
    for(let i=0;i<reponse.length;i++){
        answerContainer.innerHTML+=" <button type='button' class='list-group-item list-group-item-action' value= ' "+
        (i+1)+" '>"+(i+1)+"."+reponse[i]+"</button>";
    }
    let validateBtn= document.getElementById('validate-btn');
    validateBtn.textContent="Valider"// Notre boutton est a l'etape de validation
    validateBtn.disabled=true;// c'est mis pour griser le boutton valider car l'utilisateur n'a pas encore selectionner la question

}
/** Fonction utiliser lorque l'utilisateur clique sur le boutton valider */
function selectAnswer(event){
    
    if (IsquizAsw){
        return 0
        /** Si la reponse est valider on sort de la fonction sinon apres avoir   valider je peux encore selectionner */
    }
    
    let clickedButton = event.target;//On recupere le boutton selectionner
    /** On recupere tous les bouttons puis on supprime la classe active de bootsrap par exemple si on click sur 
     rep 1 , on peut changer d'avis et cliquer sur rep2
     * 
     */
    let container = document.getElementById('answer-buttons');
    let allButtons = container.getElementsByTagName('button');
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove('active');
    }
    // on active le boutton selectionner 
    clickedButton.className+=" active";
    userSelectedAnswer=clickedButton.value// on stocke la valeur
    // c'est a dire l'identifiant de la reponse selectionner
    document.getElementById('validate-btn').disabled = false;
    // on active le boutton valider qu'on avait griser

    }
    /** Function qui gere le boutton si il doit etre valider ou suivant */

    function handleValidateOrNext(){
        if(IsquizAsw){
            loadNextQuestion(); // on peut passer a la question suivante si une est repondu
        }else{
            validateCurrentAnswer();// on est en mode valider
        }
    }
    function validateCurrentAnswer(){
        // ON le met ici pour qu'il n'ait pas la possiblilete de passer a la question suivante sans valider la courante
        
        IsquizAsw=true //Permet que au niveau de la fonction selectanswer si il a deja une reponse cliquer elle soit prise
        //en compte on peut pas avoir 2 reponse cliquer des qu'il a valider
        let repCorrect=tabQuestion[QuizCourantID].getElementsByTagName("bonne_reponse")[0].textContent
        if (userSelectedAnswer==parseInt(repCorrect)){
            score=score+parseInt(tabQuestion[QuizCourantID].getElementsByTagName("point")[0].textContent)
        }
        
        colorANS(repCorrect);
        document.getElementById('validate-btn').textContent = "Suivant";
        // On change le boutton valider en suivant

    }

    function loadNextQuestion(){
        QuizCourantID++;
        if(QuizCourantID<tabQuestion.length){
            renderQuestion() // Pour afficher les questions suivante dans la limite du tableau
        }else{
            Terminer();
        }
    }

    function colorANS(repCorrect){
    repCorrect=parseInt(repCorrect)
    let container = document.getElementById('answer-buttons');
    let allButtons = container.getElementsByTagName('button');
    for(let i=0;i<allButtons.length;i++){    
        Btn=allButtons[i];
        if(Btn.value==repCorrect){
            Btn.classList.add("bg-success","text-white")
        }else if(Btn.value==userSelectedAnswer){
            // on met en rouge seulement ce que l'utilisateur a choisi
            Btn.classList.add("bg-danger", "text-white")

        }
        
    }
    }

    function Terminer(){

        
        document.getElementById("quiz-card").style.display="none";
        let MessageFin=document.getElementById("quiz-end-message");
        MessageFin.style.display="block";
        document.getElementById("score").innerHTML="Votre score final est <strong>"+
        score+"<\strong>";

        tabScore.push(score);
        let StrScore=tabScore.join(',');
        // je converti  le tableau en chaine de caractre avec chaque score separer une virgule
        localStorage.setItem("TotalScore",StrScore);

        let ChaineDate=getTemps();
        tabInstantJeu.push(ChaineDate);
        localStorage.setItem("Instant",tabInstantJeu.join(','));//chaine.9*
    }
    function UpdateSet(){
        if(localStorage.getItem("TotalScore")!=null){
            let tabStorage=localStorage.getItem("TotalScore").split(',');
            for(let i=0;i<tabStorage.length;i++){
                tabScore.push(parseInt(tabStorage[i]));
            }
        }

        if(localStorage.getItem("Instant")!=null){
            let tabTempInstant=localStorage.getItem("Instant").split(',');
            for(let i=0;i<tabTempInstant.length;i++){
                tabInstantJeu.push(tabTempInstant[i]);
            }
        }
    }
    
    function getTemps(){
        let date=new Date();
        TabDate=date.toString().split(' ');
        heure=TabDate[4];// pour recuperer l'heure au format h:m:s
        //alert(heure)
        let jour=date.getDate();
        let mois=date.getMonth()+1;
        let anne=date.getFullYear();
        return jour+"/"+mois+"/"+anne+"\n"+heure

    }
   


