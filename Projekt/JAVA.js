$(document).ready(function () {

  let spielerPosition = 350;
  const bewegungsSchritt = 10;
  const containerBreite = $("#container").width();
  const spielerBreite = $("#spieler").width();
  var laserSound = document.getElementById('laserSound');
  var explosion = document.getElementById('explosion');
  let storyIndex = 0;

  /*story*/
  const story = [
    { src: "bild1.png", text: "Die Stadt Eronis blüht in futuristischer Harmonie, hoch über der Erde schwebend - ein Symbol des Friedens." },
    { src: "bild2.png", text: "Plötzlich stürzt eine flotte der Gorgonen aus dem Himmel und verwandelt die Stadt in ein brennendes Inferno." },
    { src: "bild3.png", text: "Ein einzelner Pilot im Lichtfalke erhebt sich heldenhaft, um den Untergang zu verhindern." },
    { src: "bild4.png", text: "Mach dich bereit für den Kampf!" }
  ];

  function zeigeStory() {
    if (storyIndex < story.length) {
      const scene = story[storyIndex];
      $("#storyBild").attr("src", scene.src);
      $("#storyText").text(scene.text);
      storyIndex++;

      setTimeout(zeigeStory, 5000);
    } else {
      $("#storyOverlay").fadeOut(1000, function () {
        $("#container").fadeIn(500);
        $("#button4").click();
      });
    }
  }
  $("#button6").click(function () {
    $("#storyOverlay").fadeOut(1000, function () {
      $("#container").fadeIn(500);
      $("#button4").click();
    });
  });

  $("#container").hide();
  $("#storyContainer").show();
  zeigeStory();

  /*Leben-System hinzufügen*/
  let leben = 3;
  $("#container").append('<div id="lebenAnzeige">Leben: 3</div>');

  function updateLebenAnzeige() {
    $("#lebenAnzeige").text("Leben:" + leben);

    /*minus leben*/
    $("#lebenAnzeige").css("color", "red");
    setTimeout(function () {
      $("#lebenAnzeige").css("color", "white");
    }, 500);
  }

  /*Punkte*/
  let punkteZaehler = parseInt(localStorage.getItem("punkteZaehler")) || 0;
  $("#container").append('<div id="punkteAnzeige">Punkte: 0</div>');
  updatePunkteAnzeige();

  function updatePunkteAnzeige() {
    $("#punkteAnzeige").text("Punkte: " + punkteZaehler);
  }
  localStorage.setItem("punkteZaehler", punkteZaehler);


  /*Tastatur einbinden und für bewegung nutzen*/
  $(document).keydown(function (event) {
    event.preventDefault();
    /*a taste*/
    if (event.keyCode === 65) {
      spielerPosition = Math.max(0, spielerPosition - bewegungsSchritt);
      $("#spieler").css("left", spielerPosition + "px");
    }

    /*d taste*/
    if (event.keyCode === 68) {
      const maxPosition = containerBreite - spielerBreite;
      spielerPosition = Math.min(maxPosition, spielerPosition + bewegungsSchritt);
      $("#spieler").css("left", spielerPosition + "px");
    }

    /*leertaste*/
    if (event.keyCode === 32) {
      fireLaser();
      laserSound.currentTime = 0;
      laserSound.play();
    }
  });


  /*Laser*/
  function fireLaser() {
    const spielerElement = $("#spieler");
    const spielerLinks = parseInt(spielerElement.css("left")) || spielerPosition;
    const spielerBreite = spielerElement.width();
    const spielerMitte = spielerLinks + spielerBreite / 2;
    const aktuellesBild = localStorage.getItem("spielerbild");

    function erstelleLaser(startX) {
      const laser = $("<div class='laser'></div>");
      $("#container").append(laser);
      const laserBreite = laser.outerWidth();

      laser.css({
        "left": (startX - laserBreite) + "px",
        "bottom": "75px"
      });

      let laserInterval = setInterval(function () {
        const laserBottom = parseInt(laser.css("bottom")) + 10;
        laser.css("bottom", laserBottom + "px");
        const hit = checkHits(laser);

        if (laserBottom > $("#container").height() || hit) {
          clearInterval(laserInterval);
          laser.remove();
        }
      }, 30);
    }


    if (aktuellesBild === "erweiterungspielerschiff.png") {
      erstelleLaser(spielerMitte - 75);
      erstelleLaser(spielerMitte + 5);
    } else if (aktuellesBild === "3schiff.png") {
      erstelleLaser(spielerMitte - 75);
      erstelleLaser(spielerMitte);
      erstelleLaser(spielerMitte - 35);
    }
    else {
      erstelleLaser(spielerMitte - 32);
    }
  }

  /*getroffen*/
  function checkHits(laser) {
    const laserOffset = laser.offset();
    const laserRect = {
      left: laserOffset.left,
      top: laserOffset.top,
      width: laser.outerWidth(),
      height: laser.outerHeight()
    };

    let hit = false;

    $(".böse").each(function () {
      if (hit) return;

      const gegner = $(this);
      if (!gegner.is(":visible")) return;

      const gegnerOffset = gegner.offset();
      const gegnerRect = {
        left: gegnerOffset.left,
        top: gegnerOffset.top,
        width: gegner.outerWidth(),
        height: gegner.outerHeight()
      };

      if (!(laserRect.left + laserRect.width < gegnerRect.left ||
        laserRect.left > gegnerRect.left + gegnerRect.width ||
        laserRect.top + laserRect.height < gegnerRect.top ||
        laserRect.top > gegnerRect.top + gegnerRect.height)) {


        punkteZaehler += 10;
        localStorage.setItem("punkteZaehler", punkteZaehler);
        updatePunkteAnzeige();

        const treffer = $("<div class='treffer'>+10</div>");
        treffer.css({
          "left": gegnerOffset.left + gegnerRect.width / 2 - 10,
          "top": gegnerOffset.top
        });

        $("#container").append(treffer);
        treffer.animate({ top: "-=50", opacity: 0 }, 1000, function () {
          treffer.remove();
        });

        gegner.stop(true);
        gegner.fadeOut(5, function () {
          gegner.remove();
        });

        hit = true;

        if (hit) {
          console.log(true);
          explosion.currentTime = 0;
          explosion.play();
        }

      }
    });

    return hit;
  }

  function checkSpielerCollision() {
    const spielerElement = $("#spieler");
    const spielerOffset = spielerElement.offset();
    const spielerRect = {
      left: spielerOffset.left,
      top: spielerOffset.top,
      width: spielerElement.outerWidth(),
      height: spielerElement.outerHeight()
    };

    $(".böse").each(function () {
      const gegner = $(this);
      if (!gegner.is(":visible")) return;

      const gegnerOffset = gegner.offset();
      const gegnerRect = {
        left: gegnerOffset.left,
        top: gegnerOffset.top,
        width: gegner.outerWidth(),
        height: gegner.outerHeight()
      };

      if (!(spielerRect.left + spielerRect.width < gegnerRect.left ||
        spielerRect.left > gegnerRect.left + gegnerRect.width ||
        spielerRect.top + spielerRect.height < gegnerRect.top ||
        spielerRect.top > gegnerRect.top + gegnerRect.height)) {

        leben--;
        updateLebenAnzeige();

        $("#spieler").addClass("getroffen");
        setTimeout(function () {
          $("#spieler").removeClass("getroffen");
        }, 500)
        gegner.stop(true);
        gegner.remove();

        explosion.currentTime = 0;
        explosion.play();

        if (leben <= 0) {
          gameOver();
        }
      }
    });
  }
  /*gestorben*/
  function gameOver() {
    clearInterval(collisionCheckInterval);
    $(".böse").stop(true).remove();

    const gameOverMessage = $("<div id='gameOver'>Game Over!</div>");
    $("#container").append(gameOverMessage);


    setTimeout(function () {
      window.location.href = "file:///C:/Users/mr277/OneDrive/Desktop/SCRIPT/Jquery/Projekt/Startseite.html";
    }, 1000);
  }

  /*berührt unteren rand*/
  function gegnerVerpasst(gegner) {
    leben--;
    updateLebenAnzeige();

    gegner.remove();

    if (leben <= 0) {
      gameOver();
    }
  }


  /*gegner fallen runter*/
  let gegnerIntervalAktiv = false;
  let collisionCheckInterval;

  $("#button4").click(function () {
    if (gegnerIntervalAktiv) return;

    gegnerIntervalAktiv = true;
    hintergrundmusik.play();
    collisionCheckInterval = setInterval(checkSpielerCollision, 100);

    setInterval(function () {
      const gegner = $("<div class='böse'></div>");
      const zufallsLinks = Math.floor(Math.random() * ($("#container").width() - 50));

      gegner.css("left", zufallsLinks + "px");

      $("#container").append(gegner);

      gegner.animate(
        { top: "1000px" },
        5000,
        "linear",
        function () {
          gegnerVerpasst($(this));
        }
      );
    }, 2000);
  });
  //
});

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