import fs from 'node:fs/promises';

const putanja_datoteke = 'zadaci.json';

export async function ucitaj_zadatke() {
  try {
    const podaci = await fs.readFile(putanja_datoteke, 'utf-8');

    if (!podaci.trim()) {
      return [];
    }

    return JSON.parse(podaci);
  } catch (greska) {

    if (greska.code === 'ENOENT') {
      return [];
    }

    console.error('Greška:Datoteka zadaci.json je oštećena ili neispravna. Iskače prazan popis.');
    return [];

  }


}



export async function spremi_zadatke(zadaci) {
  try {
    await fs.writeFile(putanja_datoteke, JSON.stringify(zadaci, null, 2), 'utf-8');
  } catch (greska) {
    console.error('Greška: Nije uspjelo spremanje zadatka.');
  }
}