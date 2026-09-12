const ADRES = "https://jsonplaceholder.typicode.com/users";

const wynik = document.querySelector("#wynik");
const filtr = document.querySelector("#filtr");
const licznik = document.querySelector("#licznik");

// Wszyscy pobrani użytkownicy – pobierani RAZ.
let użytkownicy = [];

// Krok 4 — pobranie danych
async function pobierzUzytkownikow() {
    try {
        const odpowiedz = await fetch(ADRES);

        if (!odpowiedz.ok) {
            throw new Error(`Błąd HTTP: ${odpowiedz.status} ${odpowiedz.statusText}`);
        }

        return await odpowiedz.json();
    } catch (blad) {
        console.error("Nie udało się pobrać danych:", blad);
        throw blad;
    }
}

// Krok 5 — bezpieczne wstawianie tekstu (ochrona przed XSS)
function bezpieczny(tekst) {
    return String(tekst)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");
}

// Krok 6 — jedna karta
function kartaHtml(uzytkownik) {
    const { name, email, address, company } = uzytkownik;

    return `
    <li class="karta">
        <h2>${bezpieczny(name)}</h2>
        <dl>
            <dt>E-mail</dt>
            <dd><a href="mailto:${bezpieczny(email)}">${bezpieczny(email)}</a></dd>
            <dt>Miasto</dt>
            <dd>${bezpieczny(address.city)}</dd>
            <dt>Firma</dt>
            <dd>${bezpieczny(company.name)}</dd>
        </dl>
    </li>`;
}

// Krok 7 — wyświetlenie listy
function pokazListe(lista) {
    if (lista.length === 0) {
        wynik.innerHTML = `<p class="stan">Brak wyników</p>`;
        licznik.textContent = "Widocznych: 0 z " + użytkownicy.length;
        return;
    }

    wynik.innerHTML = `<ul class="lista">${lista.map(kartaHtml).join("")}</ul>`;
    licznik.textContent = `Widocznych: ${lista.length} z ${użytkownicy.length}`;
}

// Inicjalizacja aplikacji
async function start() {
    try {
        użytkownicy = await pobierzUzytkownikow();
        pokazListe(użytkownicy);
    } catch (blad) {
        wynik.innerHTML = `<p class="stan błąd">Wystąpił błąd podczas ładowania danych.</p>`;
    }
}

// Nasłuchiwanie wpisywania w pole filtru (działające w trakcie pisania)
filtr.addEventListener("input", (e) => {
    const szukanaFraza = e.target.value.toLowerCase();
    const przefiltrowani = użytkownicy.filter(u => 
        u.name.toLowerCase().includes(szukanaFraza)
    );
    pokazListe(przefiltrowani);
});

// Uruchomienie skryptu
start();