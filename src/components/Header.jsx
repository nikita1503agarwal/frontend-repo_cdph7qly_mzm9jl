import { useState } from 'react'

function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 bg-slate-900/90 border-b border-blue-500/20">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/flame-icon.svg" alt="logo" className="w-8 h-8" />
          <div className="text-white font-semibold">Sparky Troubleshooter</div>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-blue-200/80">
          <a href="#troubleshoot" className="hover:text-white transition-colors">Troubleshoot</a>
          <a href="#report" className="hover:text-white transition-colors">Report</a>
          <a href="#history" className="hover:text-white transition-colors">History</a>
        </nav>
        <button className="md:hidden text-blue-200" onClick={() => setOpen(v=>!v)} aria-label="Toggle menu">☰</button>
      </div>
      {open && (
        <div className="md:hidden border-t border-blue-500/20 px-4 pb-3 text-blue-200/90 space-y-2">
          <a href="#troubleshoot" className="block py-1">Troubleshoot</a>
          <a href="#report" className="block py-1">Report</a>
          <a href="#history" className="block py-1">History</a>
        </div>
      )}
    </header>
  )
}

export default Header
