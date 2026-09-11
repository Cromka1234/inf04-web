// Zadanie 2 – ten sam kod po przepisaniu na ES6.
// Wyniki muszą być IDENTYCZNE jak w es5.js – sprawdza to index.html.
// 
// Każdą rzecz eksportujemy OD RAZU przy deklaracji. Strona porównująca
// wczytuje ten plik jako moduł i pokazuje tylko to, co jest już gotowe,
// więc możesz dopisywać funkcje po jednej i po każdej odświeżać stronę.
// 
// Dlaczego moduł, a nie zwykły skrypt? Bo oba pliki deklarują `kursy`, `opis`
// i resztę nazw. Wczytane jako zwykłe skrypty dałyby błąd:
// SyntaxError: Identifier 'kursy' has already been declared.

// var -> const. Tablica jest stała jako przypisanie,
// ale jej zawartość dałoby się zmienić (const tego nie blokuje).
export const kursy = [
    { nazwa: "React", godziny: 30, aktywny: true },
    { nazwa: "Node.js", godziny: 20, aktywny: false },
    { nazwa: "MySQL", godziny: 15, aktywny: true },
    { nazwa: "Bootstrap", godziny: 10, aktywny: true },
];

// Pętla for + if + push -> filter (wybór) + map (przekształcenie).
// Czyta się jak zdanie: „weź aktywne, z każdego zostaw nazwę”.
export const nazwyAktywnych = tablica =>
    tablica.filter(kurs => kurs.aktywny).map(kurs => kurs.nazwa);

// Ręczne sumowanie w pętli -> reduce.
// Drugi argument (0) to wartość początkowa – bez niej pusta tablica
// rzuci błąd.
export const sumaGodzin = tablica =>
    tablica.reduce((suma, kurs) => suma + kurs.godziny, 0);

// Destrukturyzacja parametru: zamiast kurs.nazwa i kurs.godziny
// wyciągamy oba pola już w nagłówku funkcji.
// Sklejanie przez + -> szablon w odwrotnych apostrofach.
export const opis = ({ nazwa, godziny }) => `Kurs ${nazwa} trwa ${godziny} godzin`;

// Nowa funkcja: zwraca NOWY obiekt, oryginału nie rusza.
// { ...kurs } kopiuje wszystkie pola, godziny podmieniamy na nową
// wartość.
// Kolejność ma znaczenie – pole po spreadzie nadpisuje to
// skopiowane.
export const dodajGodziny = (kurs, ile) => ({ ...kurs, godziny: kurs.godziny + ile });

// Pięć rzeczy, pięć export. es5.js obok ma dokładnie te same nazwy i daje
// dokładnie te same wyniki — tylko dwa razy dłużej i w starym stylu.