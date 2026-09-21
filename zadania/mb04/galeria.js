const WSZYSTKIE_KATEGORIE = ["gory", "morze", "miasto"];

let aktywneKategorie = new Set(WSZYSTKIE_KATEGORIE);

const pasekKategorii = document.querySelector("#kategorie");
const panelFiltrow = document.querySelector("#panelFiltrow");
const galeria = document.querySelector("#galeria");
const brakwynikow = document.querySelector("#brakwynikow");

const CHECKBOX_KATEGORIA = {
    filtrGory: "gory",
    filtrMorze: "morze",
    filtrMiasto: "miasto",
};

function odswiez() {
    const karty = galeria.querySelectorAll(":scope > [data-kategoria]");
    let widoczne = 0;

    karty.forEach(karta => {
        const pasuje = aktywneKategorie.has(karta.dataset.kategoria);
        karta.hidden = !pasuje;
        if (pasuje) widoczne++;
    });

    brakwynikow.hidden = widoczne > 0;
    synchronizujKontrolki();
}

function synchronizujKontrolki() {
    pasekKategorii.querySelectorAll("button").forEach(przycisk => {
        const kat = przycisk.dataset.kategoria;
        const powinienBycAktywny =
            kat === "wszystkie"
                ? aktywneKategorie.size === WSZYSTKIE_KATEGORIE.length
                : aktywneKategorie.size === 1 && aktywneKategorie.has(kat);

        przycisk.classList.toggle("active", powinienBycAktywny);
        przycisk.setAttribute("aria-pressed", String(powinienBycAktywny));
    });

    for (const [id, kategoria] of Object.entries(CHECKBOX_KATEGORIA)) {
        document.querySelector(`#${id}`).checked = aktywneKategorie.has(kategoria);
    }
}

function ustawFiltr(nowyZbior) {
    aktywneKategorie = nowyZbior;
    odswiez();
}

odswiez();