
import Header from '../components/header'
import Footer from '../components/footer'

const Carrito = () => {
  return (
    <>
      <Header />

        <main className="container py-5">
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
            <div>
              <h1 className="mb-1">🛒 Mi carrito</h1>
              <p className="text-muted mb-0">Revisa los productos antes de finalizar tu compra.</p>
            </div>
          </div>
        </main>

      <Footer />
    </>
  )
}

export default Carrito
