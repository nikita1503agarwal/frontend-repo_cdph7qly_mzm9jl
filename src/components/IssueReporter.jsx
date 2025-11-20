import { useState } from 'react'

function IssueReporter() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [form, setForm] = useState({
    technician: '',
    location: '',
    equipment_type: 'outlet',
    symptom: '',
    notes: ''
  })
  const [status, setStatus] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setStatus('')
    try {
      const res = await fetch(`${baseUrl}/api/issues`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Failed to save')
      setStatus('Saved!')
      setForm({ technician: '', location: '', equipment_type: 'outlet', symptom: '', notes: '' })
    } catch (err) {
      setStatus(`Error: ${err.message}`)
    }
  }

  return (
    <section id="report" className="relative">
      <div className="bg-slate-800/50 border border-blue-500/20 rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Log an issue</h2>
        <form onSubmit={submit} className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-blue-200 mb-1">Technician</label>
            <input className="w-full bg-slate-900/60 border border-slate-700 rounded-lg p-2 text-white" value={form.technician} onChange={(e)=>setForm({...form, technician:e.target.value})} required />
          </div>
          <div>
            <label className="block text-sm text-blue-200 mb-1">Location</label>
            <input className="w-full bg-slate-900/60 border border-slate-700 rounded-lg p-2 text-white" value={form.location} onChange={(e)=>setForm({...form, location:e.target.value})} required />
          </div>
          <div>
            <label className="block text-sm text-blue-200 mb-1">Equipment</label>
            <select className="w-full bg-slate-900/60 border border-slate-700 rounded-lg p-2 text-white" value={form.equipment_type} onChange={(e)=>setForm({...form, equipment_type:e.target.value})}>
              <option>outlet</option>
              <option>light</option>
              <option>breaker</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-blue-200 mb-1">Symptom</label>
            <input className="w-full bg-slate-900/60 border border-slate-700 rounded-lg p-2 text-white" value={form.symptom} onChange={(e)=>setForm({...form, symptom:e.target.value})} required />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-blue-200 mb-1">Notes</label>
            <textarea rows="3" className="w-full bg-slate-900/60 border border-slate-700 rounded-lg p-2 text-white" value={form.notes} onChange={(e)=>setForm({...form, notes:e.target.value})}></textarea>
          </div>
          <div className="md:col-span-2 flex gap-3">
            <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors">Save</button>
            <div className="text-blue-200/80 text-sm self-center">{status}</div>
          </div>
        </form>
      </div>
    </section>
  )
}

export default IssueReporter
