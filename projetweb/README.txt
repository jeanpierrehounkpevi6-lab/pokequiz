Les attribut  de la question 1 de mon jeu:
<id>	1	L'identifiant unique de la question.
<image>	L'url menant vers l'image.
<image_large> l'url de l'image mais l'image est plus grande et meilleure qualité
<contenu>		Le texte de la question.
<response1>		Option de réponse numéro 1 .
<response2>		Option de réponse numéro 2.
<response3>		Option de réponse numéro 3.
<response4>		Option de réponse numéro 4.
<bonne_reponse>		L'indice de la réponse correcte .
<reponsetext> texte de la bonne  reponse
<point>		Le nombre de points attribués pour cette question.



MANUEL D'Utilisation INTERFACE APPRENDRE
let xmlhttp = new XMLHttpRequest();
    Declaration de la varible xmlhttp en lui assignant une istance de l'ojbet XMLHttpRequest(); qui permet
    de faire des requetes http asynchrone .Cequi permet de charger le contenu du serveur sans que la page web entire ne soit recharger

function loadXMLDoc() { ... }
    La requete est encapsuler dans cette fonction

xmlhttp.onreadystatechange = function () { ... };
    Excecution de cette fonction a chaque fois que l'etat de la requete change

if (xmlhttp.readyState == 4 && xmlhttp.status == 200) { ... }
    La condition de succes ==4 verification de la reception de la reponse
    ==20 reussite de la requete au niveau de http
    On attend que la totalite des donne envoye par le serveur a ete telecharge avec succes
    fechdata() est appele en cas de succes

xmlhttp.open(....)
LE GET specifie la lecture de donnes avec https puis on a le lien vers la bdd sur le serveur
true definit la requete comme asynchrone (le code continue de s'executer sans attendre la reponse)
xmlhttp.send()
    envoie la requete au serveur 

function ResetPage(){
    nbPage = 0;//nbr page nbr de bouttons
     pageSize = 5;// le nbr d'element par page
     startIndex = 0;le numero de page du debut
     endIndex = 0;celui de fin
     page = 1;page courante
}
    permet de reinitialliser les valeurs __
     capavenir capavenir
     L2_Logique_S2_2025_26

function fetchData()
    let xmlDoc = xmlhttp.responseXML; recupere la reponse de la requete 
    ON efface tout le contenu du tableau puis on y met chaque question 

function displayData()
    Elle permet la definition des page apres que le contenu soit mit dans le tableau fetchData
    elle utilise dans un tableau deja rempli avec les element

function loadPage(pageNumber)
    Permet d'afficher les element correspondant de la page courante grace a l'appel des fonction displayData et showpagelink

function showPageLinks()
    ELLe prend la div puis injecte les boutton creer dynamiquement puis elle rajoute un peu de style

function filtrerData() ET function rechercherData()
    ELLES permettent le filtrage en prenant la valeur d'une balise selected 
    et de faire la recherche.Dans ces fonctions on rappelle dans un premier temps ResetPAge pour reinitialliser les valeur de pagination
    puis showPageLinks() et displayData(); pour afficher la bonne pagination 

function sortData()
    ell permet de trier le tableau deja existant selon 2 critere de tri avec les fonction compareQuestionsDiff
    et compareQuestionsLexi .Puis displayData() permet de parcourir le tableau

EXEMPLE p-3 
0 0
1 $spacer * 0.25
2 $spacer * 0.5
3 $spacer * 1
4 $spacer * 1.5
5 $spacer * 3
auto auto
$spacer 1rem
1rem=16px

 La propriété on[évèment] et la méthode addEventListener()
permettent d'attacher une function à appeler chaque fois que
l'évènement spécifié est envoyé à la cible

 keyup : une touche est relachée

