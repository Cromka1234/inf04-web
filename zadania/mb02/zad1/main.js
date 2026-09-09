const formularz = document.querySelector("#formularz");
const podziekowanie = document.querySelector("#podziekowanie");
const podziekowanieTresc = document.querySelector("#podziekowanie-tresc");

const POLA = [
    {
        id: "imie",
        pusteKomunikat: "Podaj imię i nazwisko.",
        sprawdz: wartosc => 
            wartosc.length < 3 ? "Imię i nazwisko musi mieć co najmniej 3 znaki." : "",
    },
    {
        id: "email",
        pusteKomunikat: "Podaj adres e-mail.",
        sprawdz: wartosc => 
            !wartosc.includes("@") || !wartosc.includes(".") 
                ? "To nie wygląda na poprawny adres e-mail." 
                : "",
    },
    {
        id: "temat",
        pusteKomunikat: "Wybierz temat wiadomości.",
    },
    {
        id: "wiadomosc",
        pusteKomunikat: "Napisz wiadomość.",
        sprawdz: wartosc => 
            wartosc.length < 10 ? "Wiadomość musi mieć co najmniej 10 znaków." : "",
    },
];

function pokazBlad(id, komunikat) {
    const pole = document.querySelector(`#${id}`);
    const miejsceNaBlad = document.querySelector(`#blad-${id}`);

    miejsceNaBlad.textContent = komunikat;
    pole.closest(".pole").classList.toggle("pole--blad", komunikat !== "");
}

function sprawdzPole(opis) {
    const wartosc = document.querySelector(`#${opis.id}`).value.trim();

    let komunikat = "";
    if (wartosc === "") {
        komunikat = opis.pusteKomunikat;
    } else if (opis.sprawdz) {
        komunikat = opis.sprawdz(wartosc);
    }

    pokazBlad(opis.id, komunikat);
    return komunikat === "";
}

POLA.forEach(opis => {
    const pole = document.querySelector(`#${opis.id}`);
    pole.addEventListener("input", () => {
        if (pole.closest(".pole").classList.contains("pole--blad")) {
            sprawdzPole(opis);
        }
    });
});

formularz.addEventListener("submit", event => {
    // Bez tego przeglądarka przeładuje stronę i wszystko zniknie.
    event.preventDefault();

    const wyniki = POLA.map(sprawdzPole);
    const wszystkoPoprawne = wyniki.every(ok => ok);

    if (!wszystkoPoprawne) {
        // Ustawiamy kursor w pierwszym błędnym polu.
        const pierwszyBlad = POLA[wyniki.indexOf(false)];
        document.querySelector(`#${pierwszyBlad.id}`).focus();
        return;
    }

    const imie = document.querySelector("#imie").value.trim();
    const temat = document.querySelector("#temat");
    const wybranyTemat = 
        temat.options[temat.selectedIndex].textContent;

    podziekowanieTresc.textContent = 
        `${imie}, Twoja wiadomość w sprawie „${wybranyTemat}” została wysłana. ` +
        `Odpowiem najszybciej, jak to możliwe.`;

    // Formularz znika, na jego miejscu pojawia się podziękowanie.
    formularz.hidden = true;
    podziekowanie.hidden = false;
});