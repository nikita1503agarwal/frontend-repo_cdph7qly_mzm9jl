import { useEffect, useState } from 'react'

function History() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [q, setQ] = useState('')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/api/issues${q ? `?q=${encodeURIComponent(q)}` : ''}`)
      const data = await res.json()
      setItems(data.items || [])
    } catch (e) {
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  return (
    <section id="history" className="relative">
      <div className="bg-slate-800/50 border border-blue-500/20 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
          <h2 className="text-xl font-semibold text-white">Issue history</h2>
          <div className="flex gap-2">
            <input
              placeholder="Search notes, symptom, location"
              className="bg-slate-900/60 border border-slate-700 rounded-lg p-2 text-white w-64"
              value={q}
              onChange={(e)=>setQ(e.target.value)}
            />
            <button onClick={load} className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors">Search</button>
          </div>
        </div>
        <div className="divide-y divide-slate-700">
          {loading ? (
            <div className="text-blue-200">Loading...</div>
          ) : items.length === 0 ? (
            <div className="text-blue-200">No issues found</div>
          ) : (
            items.map((it)=> (
              <div key={it.id} className="py-3 flex items-start justify-between gap-4">
                <div>
                  <div className="text-white font-medium">{it.location} • {it.equipment_type}</div>
                  <div className="text-blue-200/80 text-sm">{it.symptom}</div>
                  {it.notes && <div className="text-blue-200/60 text-sm mt-1">{it.notes}</div>}
                </div>
                <div className="text-blue-200/60 text-xs whitespace-nowrap self-center">{new Date(it.created_at).toLocaleString?.() || ''}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}

export default History
