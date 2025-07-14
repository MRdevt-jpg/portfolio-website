$(document).ready(function () {

    /*Bild laden*/
    let bild = localStorage.getItem("spielerbild");
    if (bild) {
        $("img#spieler").attr("src", bild);
    } else {
        localStorage.setItem("spielerbild", "Spielerschiff.png");
        $("img#spieler").attr("src", "Spielerschiff.png");
    }
    



    /*Punkte abfrage und Schiffswechsel*/
    $("#button3").click(function () {
        const punkte = parseInt(localStorage.getItem("punkteZaehler")) || 0;

        if (punkte >= 100) {
            $("img#spieler").attr("src", "erweiterungspielerschiff.png");
            localStorage.setItem("spielerbild", "erweiterungspielerschiff.png");
            punkteZaehler = punkte - 100;
            localStorage.setItem("punkteZaehler", punkteZaehler);
            updatePunkteAnzeige();
        }
        else {
            alert("Du brauchst mindestens 100 Punkte für dieses Schiff!");
        }
    });
    

    $("#button5").click(function () {
        const punkte = parseInt(localStorage.getItem("punkteZaehler")) || 0;

        if (punkte >= 200) {
            $("img#spieler").attr("src", "3schiff.png");
            localStorage.setItem("spielerbild", "3schiff.png");
            punkteZaehler = punkte - 200;
            localStorage.setItem("punkteZaehler", punkteZaehler);
            updatePunkteAnzeige();
        }
        else {
            alert("Du brauchst mindestens 200 Punkte für dieses Schiff!");
        }
    });


    /*Punkteanzeige*/
    const punkte = localStorage.getItem("punkteZaehler") || 0;
    document.getElementById("punkteAnzeige").innerText = "Punkte: " + punkte;
    
});

/*Reset*/
function resetImg() {
    localStorage.removeItem("spielerbild");
    localStorage.setItem("spielerbild", "Spielerschiff.png");
    $("img#spieler").attr("src", "Spielerschiff.png");
}

$("#button1").click(function(){

    

})



/*⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠢⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
  ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡄⠀⠀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
  ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣷⡀⠀⠀⠑⢄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
  ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣧⠀⠀⠀⠀⠑⢄⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⡠⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
  ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣿⣿⣇⠀⠀⠀⠀⠀⠑⢄⣰⠉⠢⣀⠐⡀⢀⣀⠤⠐⠂⠉⠀⡼⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
  ⠀⠀⢠⣀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣆⠀⠀⠀⠀⠀⠀⠙⠀⠀⠈⠀⠈⠁⠀⠀⠀⠀⠀⣼⠁⠀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
  ⢴⣶⣾⣿⡟⠲⢤⣀⠀⠀⠀⣿⣿⣿⣿⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢨⣟⣁⣀⣀⣀⣀⣀⣀⣀⣀⡀⠀⠀⠀⠀⠀⢀⠀
  ⠀⣨⣿⣿⣷⣄⠀⠈⠑⠢⠄⠛⠛⠿⠧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣤⠞⠁
  ⠈⠉⠻⣿⣿⣿⣷⣄⠀⣤⣤⣤⣶⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣶⣿⡷⠂⠀⠀⠀⠀⢀⣀⣤⣶⣿⡿⠟⠁⠀⠀
  ⠀⠀⠀⠈⢿⣿⣿⣿⣧⣿⣿⣿⡟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣴⣿⣿⣿⣿⠞⠁⣀⣤⣴⣾⣿⣿⣿⡿⠋⠀⠀⠀⠀⠀
  ⠀⠀⠀⠀⠘⣿⣿⣿⣿⣿⣿⣿⣿⣷⣶⠆⢃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣴⣿⣿⣿⣿⣿⣿⣷⣾⣿⣿⣿⣿⣿⣿⠟⠉⠀⠀⠀⠀⠀⠀⠀
  ⠀⠀⠀⠀⠀⠘⣿⣿⣿⣿⣿⣿⣿⣿⡏⠀⠀⢆⠀⠀⢀⠀⠀⠀⠀⠀⠀⣨⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀
  ⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⡀⠀⠀⢈⣶⣶⣾⣿⣦⣤⠄⠀⠀⢠⣿⣿⣿⡿⠟⢻⣿⣿⣿⣿⣿⣿⣿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
  ⠀⠀⠀⠀⠀⣸⣿⣿⣿⣿⣿⡿⣿⣿⣷⣄⠀⠀⠘⣿⣿⣿⣿⣿⣿⣁⣴⣿⡿⠟⠉⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⠒⠒⠒⠤⠤⠤⠀⢀⣀⡀⠀⠀⠀
  ⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⡇⠈⢻⣿⣿⣿⣶⣶⣿⣿⣿⣿⣿⣿⡿⠛⠙⠃⠀⠀⠀⢠⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠷⣀⠀⠀
  ⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⡇⠀⡸⠉⠻⢿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣤⣄⣀⣀⣠⣴⣿⣿⣿⣿⣿⣿⣿⣥⣤⣀⠀⠀⠀⠀⠀⠀⠀⣀⡌⠁⠀⠀
  ⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣷⡀⡇⠀⠀⠀⡸⠙⠻⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣟⠋⠁⠀⣀⣠⡤⠖⠚⠉⠉⠁⠀⠀⠀
  ⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣦⡀⠀⢀⠃⠀⠀⠀⠀⠀⢩⠉⠉⠉⠉⢻⠉⠉⣩⣿⣿⣿⣿⣿⣿⣿⣿⡷⠾⠛⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀
  ⠀⠀⠀⠀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣜⡀⠀⠀⠀⠀⠀⡘⠀⠀⠀⠀⣼⣠⣾⣿⣿⣿⣿⣿⣿⣿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
  ⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣦⣤⣤⣇⣀⣀⣤⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
  ⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
  ⠀⠀⠀⠈⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
  ⠀⠀⠀⠀⠀⠙⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
  ⠀⠀⠀⠀⠀⠀⠀⠸⣿⣿⣿⣿⠉⠙⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
  ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠃⠀⠀⠀⠀⠀⠉⠻⣿⣿⣿⣿⠿⠿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
  ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣿⠏⠀⠀⠈⢿⣿⣿⣿⣿⣿⣿⣿⣿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
  ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢿⣿⣿⣿⣿⣿⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
  ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⠿⠟⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀*/