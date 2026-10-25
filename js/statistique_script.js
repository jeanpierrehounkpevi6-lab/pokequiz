const canvas = document.getElementById('histogrammeScores');
const ctx = canvas.getContext("2d");
function drawHistogram(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let ScoresString=localStorage.getItem("TotalScore");
    let InstantString=localStorage.getItem("Instant");

    if(ScoresString!=null&&InstantString!=null){
        let tabScore=ScoresString.split(',');
        let tabInstant=InstantString.split(',');
        if(tabScore.length!=tabInstant.length){
            alert("Erreur");// pcr j'itulise 2 tab different
        }else{
            let largBar=30; // largeur de chaque rectangle
            let gap =35; // espace entre chaque barre
            let startX=40 //marge a gauche
            let echelle =15
            let y=450 //ordonne de reference

            let ActuX=startX;
            for(let i=0;i<tabScore.length;i++){
                let score=parseInt(tabScore[i]);
                let h=score*echelle +10;
                ctx.fillStyle='red';
                ctx.fillRect(ActuX,y-h,largBar,h)

                ctx.fillStyle='black'
                ctx.font=' bold 12px Arial'//police d'ecriture
                ctx.textAlign = 'center';
                //on centre le texte au milieu de la barre le pssition du x+la largeur du rectangle/2
                //et au dessus decale de 10 px
                ctx.fillText(score,ActuX+largBar/2,y-h-10)

                let temps=tabInstant[i].split('\n'); // je decoupe la chaine de caractere qui est dans tabinstant[i]par rapport a \n
                

                // j'ecrit 20 px apres la barre
                ctx.fillText(temps[0],ActuX+largBar/2,y+20);

                ctx.fillText(temps[1],ActuX+largBar/2,y+40);

                ActuX+=largBar+gap;


            }
        }


    }else{
        alert('objet null')
    }

}