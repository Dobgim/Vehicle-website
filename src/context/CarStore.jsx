/**
 * CarStore — shared localStorage-backed car inventory.
 * Admin writes here → Shop page reads from here in real time.
 */
import { createContext, useContext, useState, useEffect } from 'react'
import { cars as DEFAULT_CARS } from '../data/cars'

const STORAGE_KEY = 'fas_inventory'

function loadInventory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return null
}

function saveInventory(cars) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cars))
}

const CarStoreContext = createContext(null)

export function CarStoreProvider({ children }) {
  const [cars, setCars] = useState(() => {
    const stored = loadInventory()
    if (stored && stored.length > 0) {
      // Filter out any default cars from previous sessions, keeping only admin-added ones
      return stored.filter(c => c.adminAdded)
    }
    return DEFAULT_CARS
  })

  // Persist every change
  useEffect(() => {
    saveInventory(cars)
  }, [cars])

  const addCar = (car) => {
    const newCar = {
      ...car,
      id: Date.now(),
      rating: car.rating || 4.5,
      reviews: car.reviews || 0,
      badge: car.badge || 'New',
      badgeColor: car.badgeColor || '#e50914',
      adminAdded: true,
    }
    setCars(prev => [newCar, ...prev])
    return newCar
  }

  const updateCar = (id, updates) => {
    setCars(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c))
  }

  const deleteCar = (id) => {
    setCars(prev => prev.filter(c => c.id !== id))
  }

  const resetToDefaults = () => {
    const reset = DEFAULT_CARS
    setCars(reset)
    saveInventory(reset)
  }

  return (
    <CarStoreContext.Provider value={{ cars, addCar, updateCar, deleteCar, resetToDefaults }}>
      {children}
    </CarStoreContext.Provider>
  )
}

export const useCarStore = () => {
  const ctx = useContext(CarStoreContext)
  if (!ctx) throw new Error('useCarStore must be used within CarStoreProvider')
  return ctx
}
