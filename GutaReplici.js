const { gigoloText, helpText, orar10B } = require("./StringuriLungi");
const { Play, iesi, Skip, Dedicatie } = require("./GutaActiuni");
//command este mesajul argument este argumentul
const AlegeriReplici = (message,command,argument) =>{
    //obiectul care contine mesajul si proprietatile comenzii
    const actiune = {
        mesaj:"Ba ce drecu vrei",
        properties:1,
    };
    //replicile in sine
    switch(command){     
        case "sunttare":
            actiune.mesaj="si nimeni nu poate sa ma doboare";
            console.log("si nimeni nu poate sa ma doboare");
            break;
        case "finally":
            actiune.mesaj="O facut si fraerul asta ceva in 3 zile";
            console.log("O facut si asta ceva");
            break;
        case "test":
            console.log("Guta este testat");
            actiune.mesaj='Atentiune natiune, Guta este in actiune';
            break;
        case "craciun":
            actiune.mesaj="Nu e Mos Craciun, e Genove Nebunu";
            console.log("A venit craciunu");
            break;
        case "help":
            actiune.mesaj=helpText;
            console.log("haha asta nu stie sa foloseasca botu");
            break;
        case "mario":
            actiune.mesaj="Nu este ziua lui Mario";
            console.log("Mario se distreaza");
            break;
        case "romania":
            actiune.mesaj="De la Nistru pan' la Tisa";
            console.log("patriot");
            break;
        case "gigolo":
            actiune.mesaj=gigoloText;
            console.log("sunt gigolo");
            break;
        case "top":
            actiune.mesaj='luati de aci \nhttps://open.spotify.com/artist/1WgCdu3YOI6rVp6Hr4NSc2?si=skn-9b7iTD6h58iu_cr3jQ';
            console.log("spotify");
            break;
        case "amogus":
            actiune.mesaj='https://www.youtube.com/playlist?list=PLMPOa59k3iMqV8ZgT2TqrGlM-Ee8e4TlL';
            console.log('sus');
            break;
        case "dedicatie":
            //daca nu se mentioneaza un argument, se returneaza un mesaj diferit
            Dedicatie(argument, actiune);
            break;
        case "arde-i":
            actiune.mesaj="V-am ars";
            actiune.properties=actiune.properties*3;
            console.log("Nuked");
            break;
        case "play":
            Play(message, actiune, argument);
        break;
        case "iesi":
            iesi(message, actiune, argument);
            break;
        case "skip":
            Skip(message, actiune);
            break;
        case "queue":
            actiune.mesaj="Ia asta e queue-ul\n";
            actiune.properties=8;
            break;
        case "orar":
            actiune.mesaj=orar10B;
            console.log("Asta nu stie orele");
            break;
        default:
            actiune.mesaj="Ba ce drecu vrei";
            console.log("uite un idiot");
            break;
    }
    //returneaza obiectul
    return actiune;
}
//Exporteaza replicile
exports.AlegeriReplici = AlegeriReplici;



