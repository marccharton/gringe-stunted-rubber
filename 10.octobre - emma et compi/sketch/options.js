const options = {

    multiplier: 12,
    
    parsingMode: ParsingMode.horizontal,

    gridX: 30,
    gridY: 40,

    darkBackground: false, 

    colorPalette: [
        '#009',
        '#FFFF00',
    ],
    colorDefinition : 100,

    pixelConfig: [
        {
            mode: Mode.color,
            pixelShape: PixelShape.rectangle,
            text: "Toooom & Amééééé Reuuuuns & Ritaaaaaaa Antooooo & Chachaaaaaa Jeannoooooooot Angeeeeel Alejaaaaandro Giooooooooooo Floreeeeeeeeeent Maaaaaaaaarc Jeeeeeeeess Madiooooooooou Anne-Laaaaaaaaure Daviiiiiiiiiiid Aurééééééééééé Chiiiiiiiiiips & Damieeeeeeeeen Cocoooooooooo & Jeaaaaaaaaaanne DescoooooooursDomidooooooooooo Duchaaaaaaaaaaamps Hoëëëëëëël & Mariiiiiiiie Ikboooooooooo Loooooooou & Beeeeeeen Madooooooou Mariiiiiiiie & BryanOBryaaaaaaaaan Maxooooouuuuu Mèèèèèèèèèl Nicooooooooooo Pieeeeeeeeerre & Coliiiiiiiiine Saumeeeeeeeeet Suuuuuuuuz & LouiiiiiiiiisTépèèèèèèèèw Tintiiiiiiiiiiiin Tthiaaaaaaaas & Aaaaaaade Wakiiiiiiiiiii Yaaaaaaaaaann Pieeeeeeerre Mathieeeeeeeeeeu Brunoooooooo Régiiiiiiiiis Smaeeeeeeeeel Lydiiiiiiiiie Linaaaaaaaa Cariiiiiiiiiine Giiiiiiiilles Tevaaaaaaaaa Biiiiiiiiin Eliiiiiiiiiiie Léaaaaaaaa Noémiiiiiiiie Raymooooooonde Aaaaaaaaaaaanne Améééééééééé Boooooooooot Boooooooooule Capuuuuuuuuuu Carlitooooooooooo Carooooooo Floooooo & Camiiiiille GomaaaaaaarGuiiiiiiiiii GuitooooooooouManaaaaaaaaaa Martinaaaaaaaaaaach NiiiiiiiiiiiibzObéééééé & Kalaaaaaaach Oloooooooou PadiiiiiiiiiPierrooooo Piooooootr Poloooooooo Rèèèèèèm & Chrichriiiiiiiiiiii Ritoooooooooon Roroooooo & Loooooou Saïmooooon & Rion-maaaaaaa Semaaaaaa & Coraliiiiiiiiie Tiiiiiiiiph Viaaaaaaaan Christooooooophe Mariiiiiiie Stéphaaaaaane Zazaaaaaaa Tanguyyyyyyy Hervééééééé Xavieeeeeeer Théooooooo ",
            fontSize: 50,
            kerning: 0.2,
            staticGrid: {
                x: true,
                y: false,
            },
            // tilt: {
            //     mode: TiltMode.translate.further,
            //     depth: 100,
            // },
            negativeMode: false,
            paletteBorders: [],
        },
    ],
  
};

optionsSchema.validate(options);