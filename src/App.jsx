import Header from './components/Header'
import Troubleshooter from './components/Troubleshooter'
import IssueReporter from './components/IssueReporter'
import History from './components/History'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-blue-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.06),transparent_45%)]"></div>
      <Header />
      <main className="relative z-10 max-w-6xl mx-auto px-4 py-8 space-y-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Sparky Troubleshooter</h1>
          <p className="text-blue-200/80 mt-2">Quick decision support, step-by-step diagnostics, and a simple job log for electricians.</p>
        </div>
        <Troubleshooter />
        <IssueReporter />
        <History />
      </main>
    </div>
  )
}

export default App
