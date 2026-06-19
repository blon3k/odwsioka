import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CartSidebar from './components/CartSidebar'
import ScrollToTop from './components/ScrollToTop'
import { ProductsProvider } from './context/ProductsContext'
import { CartProvider } from './context/CartContext'
import HistoryPage from './pages/HistoryPage'
import HomePage from './pages/HomePage'
import OfferPage from './pages/OfferPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import ReturnsPolicyPage from './pages/ReturnsPolicyPage'
import TermsPage from './pages/TermsPage'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ProductsProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/oferta" element={<OfferPage />} />
            <Route path="/historia" element={<HistoryPage />} />
            <Route path="/polityka-prywatnosci" element={<PrivacyPolicyPage />} />
            <Route path="/regulamin" element={<TermsPage />} />
            <Route path="/polityka-zwrotow" element={<ReturnsPolicyPage />} />
          </Routes>
          <CartSidebar />
        </CartProvider>
      </ProductsProvider>
    </BrowserRouter>
  )
}

export default App
