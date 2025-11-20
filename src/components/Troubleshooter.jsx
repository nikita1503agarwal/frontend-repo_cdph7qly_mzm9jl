import { useState } from 'react'

function Troubleshooter() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [form, setForm] = useState({ equipment_type: 'outlet', symptom: 'no power' })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    setResult(null)
    try {
      const res = await fetch(`${baseUrl}/api/troubleshoot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed to troubleshoot')
      const data = await res.json()
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="troubleshoot" className="relative">
      <div className="bg-slate-800/50 border border-blue-500/20 rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Troubleshoot a problem</h2>
        <form onSubmit={submit} className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-blue-200 mb-1">Equipment</label>
            <select
              className="w-full bg-slate-900/60 border border-slate-700 rounded-lg p-2 text-white"
              value={form.equipment_type}
              onChange={(e)=>setForm({ ...form, equipment_type: e.target.value })}
            >
              <option>outlet</option>
              <option>light</option>
              <option>breaker</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-blue-200 mb-1">Symptom</label>
            <select
              className="w-full bg-slate-900/60 border border-slate-700 rounded-lg p-2 text-white"
              value={form.symptom}
              onChange={(e)=>setForm({ ...form, symptom: e.target.value })}
            >
              <option>no power</option>
              <option>flickering</option>
              <option>trips immediately</option>
            </select>
          </div>
          <div className="flex items-end">
            <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-semibold py-2 rounded-lg transition-colors">
              {loading ? 'Analyzing...' : 'Run'}
            </button>
          </div>
        </form>
        {error && <p className="mt-3 text-red-400 text-sm">{error}</p>}

        {result && (
          <div className="mt-6 grid md:grid-cols-2 gap-4 text-blue-100">
            <div>
              <h3 className="text-white font-semibold mb-2">Probable causes</h3>
              <ul className="list-disc pl-5 space-y-1">
                {result.probable_causes.map((c,i)=>(<li key={i}>{c}</li>))}
              </ul>
              <h3 className="text-white font-semibold mt-4 mb-2">Safety notes</h3>
              <ul className="list-disc pl-5 space-y-1">
                {result.safety_notes.map((c,i)=>(<li key={i}>{c}</li>))}
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Steps</h3>
              <ol className="list-decimal pl-5 space-y-2">
                {result.steps.map((s,i)=>(
                  <li key={i}>
                    <div className="font-medium text-white">{s.title}</div>
                    <div className="text-blue-200/80 text-sm">{s.detail}</div>
                  </li>
                ))}
              </ol>
              {result.next_actions?.length>0 && (
                <div className="mt-4">
                  <h3 className="text-white font-semibold mb-2">Next actions</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {result.next_actions.map((c,i)=>(<li key={i}>{c}</li>))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Troubleshooter
