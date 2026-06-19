import bundleImage from '../assets/bundle.png'
import honeyImage from '../assets/honey.png'
import milkBundleImage from '../assets/milkbundle.png'
import milkImage from '../assets/milk.png'
import cheeseImage from '../assets/ser.png'

export const MILK_PRODUCT_ID = 'mleko'
export const MILK_BUNDLE_PRODUCT_ID = 'mleko-3pak'
export const MILK_BUNDLE_SIZE = 3

export type ProductCategory = 'mleko' | 'ser' | 'miod' | 'pakiet'

export type Product = {
  id: string
  label: string
  name: string
  subtitle: string
  /** Fallback until Shopify catalog loads */
  price: number
  compareAtPrice?: number
  category: ProductCategory
  headerColor: string
  imageSrc: string
  isBundle?: boolean
}

export const products: Product[] = [
  {
    id: MILK_PRODUCT_ID,
    label: 'Baza',
    name: 'Surowe Mleko',
    subtitle: 'Białko, wapń i pełny smak prosto od krowy — butelka 1 l',
    price: 24,
    category: 'mleko',
    headerColor: 'bg-[#00B2FF]',
    imageSrc: milkImage,
  },
  {
    id: 'ser',
    label: 'Siła',
    name: 'Ser Naturalny',
    subtitle: 'Skoncentrowane białko i minerały z gospodarstwa — 200 g',
    price: 45,
    category: 'ser',
    headerColor: 'bg-[#FF339B]',
    imageSrc: cheeseImage,
  },
  {
    id: 'miod',
    label: 'Energia',
    name: 'Miód Akacjowy',
    subtitle: 'Naturalna energia i antyoksydanty z lokalnej pasieki — 250 g',
    price: 40,
    category: 'miod',
    headerColor: 'bg-[#834FFE]',
    imageSrc: honeyImage,
  },
  {
    id: MILK_BUNDLE_PRODUCT_ID,
    label: 'Pakiet',
    name: 'Po prostu 3 mleka',
    subtitle: 'Trzy butelki surowego mleka po 1 l ',
    price: 60,
    compareAtPrice: 72,
    category: 'mleko',
    headerColor: 'bg-[#00B2FF]',
    imageSrc: milkBundleImage,
    isBundle: true,
  },
  {
    id: 'pakiet-startowy',
    label: 'Pakiet',
    name: 'Zestaw startowy',
    subtitle: 'Mleko, ser i miód w jednym',
    price: 64,
    compareAtPrice: 109,
    category: 'pakiet',
    headerColor: 'bg-brand-yellow',
    imageSrc: bundleImage,
    isBundle: true,
  },
]

export function getProductById(id: string) {
  return products.find((product) => product.id === id)
}
