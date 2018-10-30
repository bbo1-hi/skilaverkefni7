/**
 * Verkefni 7 – Reikniæfingarforrit
 *
 * Forrit sem æfir hraða í að reikna einföld dæmi
 */

// fasti sem segir til um hve marga leiki eigi að spila
const GAMES_TO_PLAY = 2;
var rettsvor = 0;
var GAMES_Played = 0
var startTime, endTime;
var gameON = true;

function startclock() {
  startTime = new Date();
}

function stopclock() {
  endTime = new Date();
  var timeDiff = endTime - startTime; //in ms
  // Breyta úr ms í sek.
  timeDiff /= 1000;

  // Rúna sekundur með tveimur aukastöfum.
   var seconds = Math.round(timeDiff*100) / 100;
   return seconds;
}

/**
 * Birtir upplýsingar um leik og eftir að notandi samþykkir, 
 * spilar þá fyrsta leik með kalli í play().
 * Eftir leik er notanda boðið að spila annan leik, ef ekki hættir forrit.
 */
function start() {
  // Útskýring á leikreglum.
  alert('Markmiðið er að svara eins mörgum af 10 dæmum rétt eins hratt og mögulegt er.');
 
    play();
	
}
/**
 * Spilar einn leik. Heldur utan um hvenær leikur byrjaði, hvenær endar og
 * fjölda réttra svara. Eftir leik eru birtar upplýsingar um niðurstöðu:
 *   Þú svaraðir X af 10 dæmum rétt á Y sekúndum
 *   Meðalrétt svör á sekúndu eru Z
 * Þar sem Y og Z hafa tvo aukastafi.
 *
 * Ef notandi ýtir á "Cancel" í leik eru skilaboðin "Hætt í leik." birt og engar
 * upplsýingar um niðurstöður.
 *
 */
// ********************	
  function play() {
    startclock();
//	var gameON = true;
	while (GAMES_Played < GAMES_TO_PLAY && gameON) {
		GAMES_Played = GAMES_Played + 1;
		gameON = ask();
		
	}
	var timi = stopclock();
    if (GAMES_Played === GAMES_TO_PLAY)
		alert('Þú svaraðir ' + rettsvor + ' af ' + GAMES_Played + ' dæmum rétt á ' + timi + ' sekúndum' + '\nMeðalrétt svör á sekúndu er ' + Math.round(rettsvor/timi*100)/100);
	
	var playAgain = confirm('Viltu spila annan leik?');
	if (playAgain === true)
	{
		GAMES_Played = 0;
		rettsvor = 0;
		play();
	}
 
 }
// ********************	
 
/**
 * Spyr einnar spurningar og skilar upplýsingum um svar (mögulega með því að
 * nota true, false og null ef notandi hættir). Birtir notanda prompt til að
 * svara í og túlkar svarið yfir í tölu.
 *
 * Mögulegar spurningar eru:
 * - `+` dæmi þar sem báðar tölur geta verið á bilinu `[1, 100]`
 * - `-` dæmi þar sem báðar tölur geta verið á bilinu `[1, 100]`
 * - `*` dæmi þar sem báðar tölur geta verið á bilinu `[1, 10]`
 * - `/` dæmi þar sem fyrri tala er á bilinu `[2, 10]` og seinni talan er fyrri
 *   talan sinnum tala á bilinu `[2, 10]` þ.a. svarið verði alltaf heiltala
 *
 * Sniðugt væri að færa það að búa til spurningu í nýtt fall sem ask() kallar í.
 */
function ask() {
	
	let tala1 = randomNumber(1, 100);
	let tala2 = randomNumber(1, 100);
	var daeminuna = daemi();
	if (daeminuna === " * ") 
	{
		tala1 = randomNumber(1, 10);
		tala2 = randomNumber(1, 10);
	}
	if (daeminuna === " / ") 
	{
		tala2 = randomNumber(2, 10);
		tala1 = tala2 * randomNumber(2, 10);
	}
	var ersvar = prompt('Hvað er ' + tala1 + daeminuna + tala2 + "?");
	var svar = Number(ersvar);
	
	
	switch (daeminuna) {
	  case ' + ':
	    if (svar == tala1 + tala2) rettsvor = rettsvor + 1;
	  case ' - ':
	    if (svar == tala1 - tala2) rettsvor = rettsvor + 1;
	  case ' * ':
	    if (svar == tala1 * tala2) rettsvor = rettsvor + 1;
	  case ' / ':
	    if (svar == tala1 / tala2) rettsvor = rettsvor + 1; 
	  if (ersvar === null) {
		  alert('Hætt í leik');
		  gameON = false;
		  return false;
	  }
	  return true;
	}
}

function daemi() {
	let daemi = randomNumber(1, 4);
	if (daemi == 1) return " + ";
	if (daemi == 2) return " - ";
	if (daemi == 3) return " * ";
	if (daemi == 4) return " / ";
}


// *******************************	
//
// Skilar tölu af handahófi á bilinu [min, max]
//
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
//  ******************************	



// Byrjar leik
start();

