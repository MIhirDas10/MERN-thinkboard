import React from 'react'
import Navbar from '../components/Navbar'
import RateLimitedUI from './RateLimitedUI'
import {useState, useEffect} from "react"

import api from "../lib/axios"
import toast from "react-hot-toast"
import NoteCard from '../components/NoteCard'
import NotesNotFound from '../components/NotesNotFound'

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  // fetching data
  useEffect(() => {
    const fetchNotes = async() => {
      try {
        // traditional way --------------------------------------
        // const res = await fetch("https://localhost:5001/api/notes")
        // const data = await res.json()
        // ------------------------------------------------------

        // using axios ------------------------------------------
        const res = await api.get("/notes")
        // ------------------------------------------------------
        console.log(res.data)
        setNotes(res.data)
        setIsRateLimited(false)
      } catch (error) {
        console.log("Error fetching notes", error)
        console.log(error)
        if(error.response?.status === 429) {
          setIsRateLimited(true)
        }
        else {
          toast.error("Failed to load notes")
        }
      } finally {
        setLoading(false)
      }
    }
    fetchNotes()
  }, [])
  

  return (
    <div className='min-h-screen'>
      <Navbar />

      {/* loading state while it's loading */}
      {isRateLimited && <RateLimitedUI />}
      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading && <div className='text-center text-primary py-10'>Loading notes...</div>}

        
        {/* if there are no notes */}
        {notes.length === 0 && !isRateLimited && <NotesNotFound />}


        {/* showing all the notes in the homepage */}
        {notes.length>0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              // here note is a prop
              // notecard is a component
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage