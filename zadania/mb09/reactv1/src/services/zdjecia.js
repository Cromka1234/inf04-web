let zdjecia = null

export async function pobierzZdjecia() {
    if (zdjecia) return zdjecia
    const odpowiedz = await fetch('/photos.json')
    if (!odpowiedz.ok) throw new Error('Błąd serwera: ' + odpowiedz.status)
    zdjecia = await odpowiedz.json()
    return zdjecia
}

export async function pobierzZdjecie(id) {
    const lista = await pobierzZdjecia()
    return lista.find(z => z.id === Number(id)) ?? null
}

export function usunZdjecie(id) {
    zdjecia = zdjecia.filter(z => z.id !== id)
    return zdjecia
}

export function przełączUlubione(id) {
    zdjecia = zdjecia.map(z => (z.id === id ? { ...z, favorite: !z.favorite } : z))
    return zdjecia
}

export function dodajZdjecie(nowe) {
    const noweId = Math.max(...zdjecia.map(z => z.id)) + 1
    zdjecia = [...zdjecia, { ...nowe, id: noweId, favorite: false }]
    return zdjecia
}