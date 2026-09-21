const WSZYSTKIE_KATEGORIE = ["gory", "morze", "miasto"];
const KLUCZ_LOCALSTORAGE = "galeria-filtruj";

function zapiszFiltr(zbior) {
    localStorage.setItem(KLUCZ_LOCALSTORAGE, JSON.stringify([...zbior]));
}

function wczytajFiltr() {
    const zapisane = localStorage.getItem(KLUCZ_LOCALSTORAGE);
    if (!zapisane) return new Set(WSZYSTKIE_KATEGORIE);

    try {
        const tablica = JSON.parse(zapisane);
        const poprawne = tablica.filter(k => WSZYSTKIE_KATEGORIE.includes(k));
        return poprawne.length ? new Set(poprawne) : new Set(WSZYSTKIE_KATEGORIE);
    } catch {
        return new Set(WSZYSTKIE_KATEGORIE);
    }
}

let aktywneKategorie = wczytajFiltr();

const pasekKategorii = document.querySelector("#kategorie");
const panelFiltrow = document.querySelector("#panelFiltrow");
const galeria = document.querySelector("#galeria");
const brakwynikow = document.querySelector("#brakwynikow");
const formularz = document.querySelector("#formDodajZdjecie");

const CHECKBOX_KATEGORIA = {
    filtrGory: "gory",
    filtrMorze: "morze",
    filtrMiasto: "miasto",
};

const POLA_FORMULARZA = [
    {
        id: "tytul",
        sprawdz: pole => pole.value.trim().length >= 3,
    },
    {
        id: "kategoria",
        sprawdz: pole => pole.value !== "",
    },
    {
        id: "zgoda",
        sprawdz: pole => pole.checked,
    },
];

let sortRosnaco = true;
const sortujBtn = document.querySelector("#sortujBtn");

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
    zapiszFiltr(aktywneKategorie);
    odswiez();
}

function sortujAlfabetycznie(rosnaco = true) {
    const karty = Array.from(galeria.querySelectorAll(":scope > [data-kategoria]"));

    karty.sort((a, b) => {
        const tytulA = a.querySelector(".card-title").textContent.trim();
        const tytulB = b.querySelector(".card-title").textContent.trim();
        return rosnaco
            ? tytulA.localeCompare(tytulB, "pl")
            : tytulB.localeCompare(tytulA, "pl");
    });

    karty.forEach(karta => galeria.append(karta));
}

function pokazStanPola(pole, poprawne) {
    pole.classList.toggle("is-invalid", !poprawne);
}

function sprawdzWszystkie() {
    let wszystkoPoprawne = true;
    let pierwszeBledne = null;

    for (const opis of POLA_FORMULARZA) {
        const pole = document.querySelector(`#${opis.id}`);
        const poprawne = opis.sprawdz(pole);
        pokazStanPola(pole, poprawne);

        if (!poprawne) {
            wszystkoPoprawne = false;
            if (!pierwszeBledne) pierwszeBledne = pole;
        }
    }

    return { wszystkoPoprawne, pierwszeBledne };
}

pasekKategorii.addEventListener("click", event => {
    const przycisk = event.target.closest("button");
    if (!przycisk) return;

    const kat = przycisk.dataset.kategoria;
    ustawFiltr(kat === "wszystkie" ? new Set(WSZYSTKIE_KATEGORIE) : new Set([kat]));
});

panelFiltrow.addEventListener("change", event => {
    if (!event.target.matches('input[type="checkbox"]')) return;

    const kategoria = CHECKBOX_KATEGORIA[event.target.id];
    if (!kategoria) return;

    const nowyZbior = new Set(aktywneKategorie);
    if (event.target.checked) {
        nowyZbior.add(kategoria);
    } else {
        nowyZbior.delete(kategoria);
    }
    ustawFiltr(nowyZbior);
});

sortujBtn.addEventListener("click", () => {
    sortujAlfabetycznie(sortRosnaco);
    sortRosnaco = !sortRosnaco;
    sortujBtn.textContent = sortRosnaco ? "Sortuj A→Z" : "Sortuj Z→A";
});

formularz.addEventListener("submit", event => {
    event.preventDefault();

    const { wszystkoPoprawne, pierwszeBledne } = sprawdzWszystkie();

    if (!wszystkoPoprawne) {
        pierwszeBledne.focus();
        return;
    }

    const dane = {
        tytul: document.querySelector("#tytul").value.trim(),
        kategoria: document.querySelector("#kategoria").value,
        zgoda: document.querySelector("#zgoda").checked,
    };

    console.log("Dane z formularza:", dane);

    document.querySelector("#dodajZdjecieSukces").hidden = false;

    setTimeout(() => {
        const modal = bootstrap.Modal.getOrCreateInstance(document.querySelector("#dodajZdjecie"));
        modal.hide();
    }, 900);
});

document.querySelector("#dodajZdjecie").addEventListener("hidden.bs.modal", () => {
    formularz.reset();
    document.querySelector("#dodajZdjecieSukces").hidden = true;
    POLA_FORMULARZA.forEach(opis => {
        document.querySelector(`#${opis.id}`).classList.remove("is-invalid");
    });
});

POLA_FORMULARZA.forEach(opis => {
    const pole = document.querySelector(`#${opis.id}`);
    const zdarzenie = pole.type === "checkbox" || pole.tagName === "SELECT" ? "change" : "input";

    pole.addEventListener(zdarzenie, () => {
        if (pole.classList.contains("is-invalid")) {
            pokazStanPola(pole, opis.sprawdz(pole));
        }
    });
});

odswiez();