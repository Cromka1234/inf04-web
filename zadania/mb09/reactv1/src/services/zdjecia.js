
let zdjecia = null

export async function pobierzZdjecia() {
    if (zdjecia !== null) return zdjecia

    const odpowiedz = await fetch('/photos.json')

    if (!odpowiedz.ok) {
        throw new Error('Błąd serwera: ' + odpowiedz.status)
    }

    zdjecia = await odpowiedz.json()

    return zdjecia
}

export async function pobierzZdjecie(id) {
    const lista = await pobierzZdjecia()

    return lista.find(z => z.id === Number(id)) ?? null
}

export function usunZdjecie(id) {
    if (zdjecia === null) return []

    zdjecia = zdjecia.filter(z => z.id !== id)

    return zdjecia
}

export function przełączUlubione(id) {
    if (zdjecia === null) return []

    zdjecia = zdjecia.map(z =>
        z.id === id
            ? { ...z, favorite: !z.favorite }
            : z
    )

    return zdjecia
}

export function dodajZdjecie(nowe) {
    if (zdjecia === null) zdjecia = []

    const noweId = zdjecia.length > 0
        ? Math.max(...zdjecia.map(z => z.id)) + 1
        : 1

    zdjecia = [
        ...zdjecia,
        { ...nowe, id: noweId, favorite: false }
    ]

    return zdjecia
}
