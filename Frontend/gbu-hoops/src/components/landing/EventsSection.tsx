'use client'

import React from 'react'

const events = [
  { id: 1, type: 'ongoing', title: 'Inter-College Championship', time: 'Today, 4:00 PM', img: '/event_character.png' },
  { id: 2, type: 'upcoming', title: 'GBU Annual Sports Meet', time: 'Tomorrow, 9:00 AM', img: '/event_character.png' },
  { id: 3, type: 'past', title: 'Freshers Basketball League', time: 'Last Week', img: '/event_character.png' },
]

export default function EventsSection() {
  return (
    <section 
      style={{
        minHeight: '130vh', 
        background: 'linear-gradient(to bottom, #0f172a, #020617)',
        position: 'relative',
        paddingTop: '100px',
        overflow: 'hidden'
      }}
    >
      {/* The Top Lamp Effect */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          height: '600px',
          background: 'radial-gradient(circle at top, rgba(249, 115, 22, 0.4), transparent 60%)',
          pointerEvents: 'none'
        }}
      />
      
      {/* Court Floor Reflection */}
      <div 
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '30vh',
          background: 'linear-gradient(to top, rgba(249, 115, 22, 0.1), transparent)',
          pointerEvents: 'none'
        }}
      />

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center" style={{ position: 'relative', zIndex: 10 }}>
        
        {/* Left Side: Illustrative Event Character */}
        <div style={{ position: 'relative' }}>
          <img 
            src="/event_character.png" 
            alt="Event Illustration" 
            style={{ width: '100%', maxWidth: '400px', filter: 'drop-shadow(0px 10px 20px rgba(0,0,0,0.5))' }}
          />
        </div>

        {/* Right Side: Timeline Cards with Liquid Glass */}
        <div className="flex flex-col gap-8 relative border-l-2 border-[rgba(249,115,22,0.3)] pl-8">
          {events.map((ev, i) => (
            <div key={ev.id} className="relative group cursor-pointer">
              {/* Timeline dot */}
              <div 
                className="absolute -left-[37px] top-4 rounded-full bg-orange-500 shadow-[0_0_10px_2px_rgba(249,115,22,0.5)]"
                style={{ width: 10, height: 10 }}
              />
              
              <div className="liquid-glass-dark p-6 transition-transform group-hover:scale-105">
                <span 
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: ev.type === 'ongoing' ? '#22c55e' : (ev.type === 'upcoming' ? '#f97316' : '#94a3b8') }}
                >
                  {ev.type}
                </span>
                <h3 className="text-xl font-bold mt-2 mb-1">{ev.title}</h3>
                <p className="text-gray-400 text-sm whitespace-nowrap">{ev.time}</p>
                <div className="mt-4 text-orange-400 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  View Gallery →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
