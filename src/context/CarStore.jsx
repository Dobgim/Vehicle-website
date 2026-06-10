/**
 * CarStore — shared Supabase-backed car inventory.
 * Admin writes here → Shop page reads from here in real time.
 */
import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

const CarStoreContext = createContext(null)

// Helper to map DB snake_case columns to camelCase JS properties
function mapCar(c) {
  if (!c) return null
  return {
    id: c.id,
    name: c.name,
    brand: c.brand,
    year: c.year,
    price: Number(c.price),
    mileage: c.mileage,
    status: c.status,
    category: c.category,
    fuel: c.fuel,
    color: c.color,
    description: c.description,
    power: c.power,
    speed: c.speed,
    acceleration: c.acceleration,
    badge: c.badge,
    badgeColor: c.badge_color,
    type: c.type,
    image: c.image,
    rating: Number(c.rating),
    reviews: c.reviews,
    adminAdded: c.admin_added,
  }
}

// Helper to map JS properties back to DB snake_case columns
function mapToDb(car) {
  return {
    name: car.name,
    brand: car.brand,
    year: Number(car.year),
    price: Number(car.price),
    mileage: car.mileage,
    status: car.status,
    category: car.category || car.type || 'Luxury Sedan',
    fuel: car.fuel,
    color: car.color,
    description: car.description,
    power: car.power,
    speed: car.speed,
    acceleration: car.acceleration,
    badge: car.badge,
    badge_color: car.badgeColor || '#e50914',
    type: car.type,
    image: car.image,
    rating: Number(car.rating || 4.5),
    reviews: Number(car.reviews || 0),
    admin_added: car.adminAdded !== undefined ? car.adminAdded : true,
  }
}

export function CarStoreProvider({ children }) {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch cars on mount
  useEffect(() => {
    async function fetchCars() {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('cars')
          .select('*')
          .order('id', { ascending: false })
        
        if (error) throw error
        if (data) {
          setCars(data.map(mapCar))
        }
      } catch (err) {
        console.error('Error fetching cars from Supabase:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchCars()
  }, [])

  const addCar = async (car) => {
    try {
      const dbCar = mapToDb(car)
      const { data, error } = await supabase
        .from('cars')
        .insert([dbCar])
        .select()

      if (error) throw error
      if (data && data[0]) {
        const mapped = mapCar(data[0])
        setCars(prev => [mapped, ...prev])
        return mapped
      }
    } catch (err) {
      console.error('Error adding car to Supabase:', err)
      alert('Failed to add car to database. Please check console.')
      throw err
    }
  }

  const updateCar = async (id, updates) => {
    try {
      // Map updates to DB format. If it's a partial update, we map dynamically.
      const dbUpdates = {}
      if ('name' in updates) dbUpdates.name = updates.name
      if ('brand' in updates) dbUpdates.brand = updates.brand
      if ('year' in updates) dbUpdates.year = Number(updates.year)
      if ('price' in updates) dbUpdates.price = Number(updates.price)
      if ('mileage' in updates) dbUpdates.mileage = updates.mileage
      if ('status' in updates) dbUpdates.status = updates.status
      if ('category' in updates) dbUpdates.category = updates.category
      if ('fuel' in updates) dbUpdates.fuel = updates.fuel
      if ('color' in updates) dbUpdates.color = updates.color
      if ('description' in updates) dbUpdates.description = updates.description
      if ('power' in updates) dbUpdates.power = updates.power
      if ('speed' in updates) dbUpdates.speed = updates.speed
      if ('acceleration' in updates) dbUpdates.acceleration = updates.acceleration
      if ('badge' in updates) dbUpdates.badge = updates.badge
      if ('badgeColor' in updates) dbUpdates.badge_color = updates.badgeColor
      if ('type' in updates) dbUpdates.type = updates.type
      if ('image' in updates) dbUpdates.image = updates.image
      if ('rating' in updates) dbUpdates.rating = Number(updates.rating)
      if ('reviews' in updates) dbUpdates.reviews = Number(updates.reviews)
      if ('adminAdded' in updates) dbUpdates.admin_added = updates.adminAdded

      const { data, error } = await supabase
        .from('cars')
        .update(dbUpdates)
        .eq('id', id)
        .select()

      if (error) throw error
      if (data && data[0]) {
        const mapped = mapCar(data[0])
        setCars(prev => prev.map(c => c.id === id ? mapped : c))
      }
    } catch (err) {
      console.error('Error updating car in Supabase:', err)
      alert('Failed to update car. Please check console.')
      throw err
    }
  }

  const deleteCar = async (id) => {
    try {
      const { error } = await supabase
        .from('cars')
        .delete()
        .eq('id', id)

      if (error) throw error
      setCars(prev => prev.filter(c => c.id !== id))
    } catch (err) {
      console.error('Error deleting car from Supabase:', err)
      alert('Failed to delete car. Please check console.')
      throw err
    }
  }

  const resetToDefaults = async () => {
    // For safety, clear custom items or just delete all and seed
    if (window.confirm('This will delete all cars in the database and re-seed defaults. Proceed?')) {
      try {
        setLoading(true)
        
        // 1. Delete all current cars
        const { error: delError } = await supabase
          .from('cars')
          .delete()
          .gt('id', 0) // Delete all
        
        if (delError) throw delError

        // 2. Insert standard default cars
        const defaults = [
          {
            name: '2023 Lamborghini Aventador SVJ',
            brand: 'Lamborghini',
            year: 2023,
            price: 395000,
            mileage: '1,200 mi',
            status: 'Available',
            category: 'Supercar',
            fuel: 'Petrol',
            color: 'Mantis Green',
            description: 'The Aventador SVJ is the absolute pinnacle of naturally aspirated V12 performance, combining extreme aerodynamics with jaw-dropping exhaust notes.',
            power: '770 HP',
            speed: '350 km/h',
            acceleration: '2.8s',
            badge: 'Featured',
            badge_color: '#e50914',
            type: 'Supercar',
            image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80',
            rating: 4.9,
            reviews: 18,
            admin_added: true
          },
          {
            name: '2024 Porsche 911 GT3 RS',
            brand: 'Porsche',
            year: 2024,
            price: 245000,
            mileage: '500 mi',
            status: 'Available',
            category: 'Sports Car',
            fuel: 'Petrol',
            color: 'Shark Blue',
            description: 'Motorsport DNA engineered for the streets. Features carbon fiber composite panels and an active rear wing producing 860kg of downforce.',
            power: '518 HP',
            speed: '296 km/h',
            acceleration: '3.2s',
            badge: 'New Arrival',
            badge_color: '#f5c518',
            type: 'Sports Car',
            image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80',
            rating: 4.8,
            reviews: 12,
            admin_added: true
          },
          {
            name: '2022 BMW M5 CS Limited',
            brand: 'BMW',
            year: 2022,
            price: 140000,
            mileage: '4,500 mi',
            status: 'Available',
            category: 'Luxury Sedan',
            fuel: 'Petrol',
            color: 'Frozen Deep Green',
            description: 'The quickest and most powerful road-legal BMW ever built. A true collector item combining V8 twin-turbo performance with lightweight carbon race buckets.',
            power: '627 HP',
            speed: '305 km/h',
            acceleration: '3.0s',
            badge: 'Limited',
            badge_color: '#00b894',
            type: 'Sedan',
            image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80',
            rating: 4.7,
            reviews: 9,
            admin_added: true
          },
          {
            name: '2021 Mercedes-AMG GT Black Series',
            brand: 'Mercedes',
            year: 2021,
            price: 320000,
            mileage: '1,800 mi',
            status: 'Available',
            category: 'Supercar',
            fuel: 'Petrol',
            color: 'Magma Beam Orange',
            description: 'Direct track-to-road experience. A flat-plane twin-turbo V8, hand-adjustable carbon aero, and Nürburgring pedigree in an exclusive limited production run.',
            power: '720 HP',
            speed: '325 km/h',
            acceleration: '3.2s',
            badge: 'Exclusive',
            badge_color: '#1e50ff',
            type: 'Supercar',
            image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=800&q=80',
            rating: 4.9,
            reviews: 14,
            admin_added: true
          }
        ]

        const { data, error: insError } = await supabase
          .from('cars')
          .insert(defaults)
          .select()

        if (insError) throw insError
        if (data) {
          setCars(data.map(mapCar))
        }
      } catch (err) {
        console.error('Error resetting inventory:', err)
        alert('Failed to reset. Please check console.')
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <CarStoreContext.Provider value={{ cars, loading, addCar, updateCar, deleteCar, resetToDefaults }}>
      {children}
    </CarStoreContext.Provider>
  )
}

export const useCarStore = () => {
  const ctx = useContext(CarStoreContext)
  if (!ctx) throw new Error('useCarStore must be used within CarStoreProvider')
  return ctx
}
