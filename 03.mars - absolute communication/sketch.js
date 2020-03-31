// var ch = {
//     mainColor : 0,
// };

// function setup(){
//     createCanvas(windowWidth, windowHeight);
//     ch.mainColor = color(255, 204, 0);
//     noFill();
// }

// function draw(){
//     background(ch.mainColor);
// }

/**
 * pixel mapping. each pixel is translated into a new element (letter)
 *
 * KEYS
 * 1                 : toogle font size mode (dynamic/static)
 * 2                 : toogle font color mode (color/b&w)
 * arrow up/down     : maximal fontsize +/-
 * arrow right/left  : minimal fontsize +/-
 * s                 : save png
 */
'use strict';

var inputText = "Cher parent,Vous êtes la seule famille que j’ai eu.Je parle au passé non pas car cela est révolu mais parceque c’est le quotidien que nous avions qui me vient à l’esprit. C’est cette vie au quotidien: nos proches avec lesquels on partage des moments qu’ils soient bons ou mauvais qui font le lien que nous avons avec une personne à instant T.Parfois c’est chouette, parfois c’est chiant, d’autres fois simplement neutre. Mais c’est toujours rempli d’amour. Un amour qu’il est souvent compliqué d’exprimer. De témoigner. De partager. En même temps comment prendre le temps de dire les choses importantes quand on se voit tous les jours ? Comment prendre le temps de dire les choses quand on ne sait même pas ce qu’on veut dire ? Comment prendre le temps d’exprimer ce que les mots ne suffisent pas à décrire ? Comment accepter la difficulté de nos relations causées par nos blessures respectives?Comment accepter l’autre et tenter de le comprendre ? Comment simplement accepter que cet échange soit impossible et que son existence est inutile pour que le lien reste entier ?J’ai un amour pour vous qui est tellement absolu et fondamental dans ma tête que je ne saurais le décrire.Il est ancré en moi comme une base inaccessible qui me construit et me définit.Ce serait comme demander à un bonhome dessiné de concevoir le bord de la feuille sur laquelle il est dessiné.Parfois j’étais seul quelques heures à la maison et j’étais content.Content de pouvoir faire ce que je voulais pendant quelques précieuses heures. Content de mettre de la musique comme je voulais, regarder la télé tout seul dans le salon, manger n’importe quoi n’importe comment à n’importe quelle heure. Des trucs d’enfant qui se retrouve face à lui même, dans une position de liberté totale. Un besoin de liberté, de détachement face à certaines contraintes, de certaines normes, de codes à respecter. Ces codes, c’est ce que vous m’avez inculqué.Aujourd’hui mon quotidien est rempli de ce détachement et c’est de de partager des moments avec vous qui est devenu ma liberté.Durant tous ces moments passés ensemble c’est le fond de ma personnalité qui se construisait. Ca n’a pas été facile tous les jours, mais l’amour était présent. Je parle d’une situation qui elle est révolue bien que les liens qui nous unissent soient toujours présents et inebranlables.Je parle d’une époque rempli d’habitudes que nous avons tous perdu et dont nous n’avons plus que de lointains souvenirs, certains plus flous que d’autres.Des regrets, des incompréhensions, des frustrations, des joies, de la fierté, de la mélancolie, du bonheur.Vous avez chacun reconstruit une nouvelle vie et je construit la mienne en parallèle.Je regarde derrière moi et je vois une époque, qui m’a construit et qui me définit aujourd’hui , qui s’est rendu soluble dans le temps. La Famille avec un grand F ? je ne sais pas ce que c’est et ne le saurai jamais vraiment. Vous n’y pouvez pas grand chose car je suis arrivé dans une période de rupture avec votre propre famille. Je n’ai connu que des fragments de famille éclatés de part et d’autre d’un pays dans lequel j’ai grandi. On me parle de valeurs, de traditions, de culture. Ma culture à moi, ma famille c’est vous. A l’heure de Noël, on me parle de féerie des fêtes, de joie, de rassemblement, de proximité mais je n’y vois qu’un léger prétexte pour se réunir et une fête commerciale complètement détachée de ses motivations humanistes faussement revendiquées. Il n’empêche que ce prétexte nous réunit presque chaque année. Il faut croire que ça marche pas si mal.J’ai longtemps souhaité recomposer les personnes faisant parti de ce que je considérais comme ma famille. Les oncles/tantes, les cousin.e.s, les frêres/soeurs, les parents tout ce qui est sensé composer une famille normale. Un tout hétérogène composé de différentes personnes qui ne se voit pas souvent mais qui s’apprécient. Je voulais faire un noël avec toutes ces personnes, réunir au moins une fois dans ma vie toutes ces personnes qui composent ce qu’on m’avait vendu comme mon sang, ma tribu, mon groupe, ma communauté. Mais qui aurait été présent ? Qui se souci du petit marc charton “fils du cousin du fils de l’oncle patrick” et de son envie de reconnexion avec ses pairs ? Qui au final aurait, comme moi, ce souhait de réunir autant de monde ? Et puis au final pourquoi faire ? Découvrir des gens que je ne pourrai plus fantasmer ? Mettre un caractère, une personnalité sur une personne qui ne représentait jusqu’alors qu’un statut familial dénué de défaut ? Relancer de vieilles rencoeurs, des echanges à problèmes, des disputes dénuées de sens ? Après tout je crois que je préfère rester dans mon fantasme de famille distante qui se réunit tous les 10 ans pour célébrer dans la joie et le respect mutuel. Dans la fibre du fantasme familial nous avons le frêre ou la soeur. Je crois que j’aurais préféré avoir une soeur. Une petite soeur dont je me serais occupé :D Je me serais bien vu en grand frêre. Peut être parceque j’aime bien prendre soin des gens. Et puis au fond, je l’aurais peut être detesté car elle aurait été pourrie gatée. J’aurais eu moins d’attention de la part de mes parents. La petite dernière à qui on ne dit jamais rien. Pauvre petite. Voilà ça y est je la déteste déjà ^^. Après tout c’est comme ça, ça n’a pas exister pour de multiple raisons et c’est très bien commme ça.Enfin de compte en reflechissant à ça je me dis que la vie est comme elle est et que rien ne sert de désirer la changer. La seule chose qui compte est ce qui existe dans le présent. Et ce qui existe dans ce présent c’est vous. Pourquoi tant de mots pour ne pas dire grand chose au final ? Je ne sais pas, je crois que j’ai tellement de choses à vous dire que j’ai préféré m’en tenir à ce message d’amour simple qui définit bien la base de ce que je ressens pour mes parents. Je vous aime. Je t’aime. Je suis fier de vous, que vous soyez ce que vous êtes. Votre fils, marc. <3";
var fontSizeMax = 15;
var fontSizeMin = 5;
var spacing = 9; // line height
var kerning = 0.2; // between letters

var fontSizeStatic = false;
var blackAndWhite = false;

var img;

function preload() {
  img = loadImage('data/image 669x861.jpg');
}

function setup() {
  createCanvas(669,861);
  textFont('Times');
  textSize(10);
  textAlign(LEFT, CENTER);
  print(img.width + ' • ' + img.height);
}

function draw() {
  background(250);

  var x = 0;
  var y = 10;
  var counter = 0;

  while (y < height) {
    // translate position (display) to position (image)
    img.loadPixels();
    // get current color
    var imgX = round(map(x, 0, width, 0, img.width));
    var imgY = round(map(y, 0, height, 0, img.height));
    var c = color(img.get(imgX, imgY));
    var greyscale = round(red(c) * 0.222 + green(c) * 0.707 + blue(c) * 0.071);

    push();
    translate(x, y);

    if (fontSizeStatic) {
      textSize(fontSizeMax);
      if (blackAndWhite) {
        fill(greyscale);
      } else {
        fill(c);
      }
    } else {
      // greyscale to fontsize
      var fontSize = map(greyscale, 0, 255, fontSizeMax, fontSizeMin);
      fontSize = max(fontSize, 1);
      textSize(fontSize);
      if (blackAndWhite) {
        fill(0);
      } else {
        fill(c);
      }
    }

    var letter = inputText.charAt(counter);
    text(letter, 0, 0);
    var letterWidth = textWidth(letter) + kerning;
    // for the next letter ... x + letter width
    x += letterWidth;

    pop();

    // linebreaks
    if (x + letterWidth >= width) {
      x = 0;
      y += spacing;
    }

    counter++;
    if (counter >= inputText.length) {
      counter = 0;
    }
  }
  noLoop();
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  // change render mode
  if (key == '1') fontSizeStatic = !fontSizeStatic;
  // change color style
  if (key == '2') blackAndWhite = !blackAndWhite;
  print('fontSizeMin: ' + fontSizeMin + ', fontSizeMax: ' + fontSizeMax + ', fontSizeStatic: ' + fontSizeStatic + ', blackAndWhite: ' + blackAndWhite);
  loop();
}

function keyPressed() {
  // change fontSizeMax with arrow keys up/down
  if (keyCode == UP_ARROW) fontSizeMax += 2;
  if (keyCode == DOWN_ARROW) fontSizeMax -= 2;
  // change fontSizeMin with arrow keys left/right
  if (keyCode == RIGHT_ARROW) fontSizeMin += 2;
  if (keyCode == LEFT_ARROW) fontSizeMin -= 2;
  loop();
}
