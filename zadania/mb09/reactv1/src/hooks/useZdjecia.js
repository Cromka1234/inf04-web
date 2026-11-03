import { useState, useEffect } from 'react'
import { pobierzZdjecia } from '../services/zdjecia.js'

export function useZdjecia() {
    const [zdjecia, setZdjecia] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        pobierzZdjecia()
            .then(dane => setZdjecia(dane))
            .catch(err => setError(err.message))
            .finally(() => setIsLoading(false))
    }, [])

    return { zdjecia, setZdjecia, isLoading, error }
}