import { ucitaj_zadatke, spremi_zadatke } from './pohrana.js';

const argumenti = process.argv.slice(2);
const naredba = argumenti[0];

async function izvrsiProgram() {
    const zadaci = await ucitaj_zadatke();

    switch (naredba) {
        case 'dodaj': {
            const naslov = argumenti[1];
            if (!naslov) {
                console.error('Greška: Nedostaje naslov zadatka.');
                return;
            }
            const noviId = zadaci.length > 0 ? zadaci[zadaci.length - 1].id + 1 : 1;

            const noviZadatak = { id: noviId, naslov: naslov, zavrsen: false };
            zadaci.push(noviZadatak);
            await spremi_zadatke(zadaci);
            console.log(`Zadatak "${naslov}" je dodan s ID-om ${noviId}.`);
            break;
        }

        case 'popis': {
            if (zadaci.length === 0) {
                console.log('Popis zadataka je prazan.');
            }
            zadaci.forEach((zadatak) => {
                const status = zadatak.zavrsen ? 'X' : '';
                console.log(`${zadatak.id}. ${zadatak.naslov} [${status}]`);

            });
            break;
        }


        case 'gotovo': {
            const idArg = argumenti[1];
            const id = Number(idArg);
            if (!idArg || isNaN(id)) {
                console.error('Greška: Nedostaje ili je neispravan ID zadatka.');
                process.exit(1);
            }



            const zadatak = zadaci.find(z => z.id === id);
            if (!zadatak) {
                console.error('Greška: Zadatak s tim ID-om nije pronađen.');
                process.exit(1);
            }


            zadatak.zavrsen = true;
            await spremi_zadatke(zadaci);
            console.log(`Zadatak "${zadatak.naslov}" je označen kao završen.`);
            break;
        }
        default: {
            console.error('Greška: Nepoznata naredba. Dostupne naredbe su: dodaj, popis, gotovo.');
            process.exit(1);
        }
    }
}
izvrsiProgram();