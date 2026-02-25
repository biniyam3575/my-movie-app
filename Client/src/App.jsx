import './App.css'
import Home from './pages/Home/Home'
import Header from './component/Header/Header'
import Footer from './component/Footer/Footer'

function App() {
  return (
    <div className="app">
      <Header />

      <main className="main_content">
        <Home />
      </main>

      <Footer />
    </div>
  )
}

export default App