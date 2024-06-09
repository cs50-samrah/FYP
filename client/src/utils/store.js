import { create } from 'zustand'

const useStore = create((set) => ({
  products : [],
  addProduct: (product) => set((state) => {
    const isProductExist = state.products.find((p) => p._id === product._id)
    if (isProductExist) {
      return { products: state.products }
    }else{

      return { products: [ ...state.products , {...product, _qty : 1}] }
    }
  }),
  updateQty: (product , qty) => set((state) => {
    const isProductExist = state.products.find((p) => p._id === product._id)
    if (isProductExist) {
      return { products: state.products.map((p) => p._id === product._id ? {...p , _qty : qty} : p) }
    }else{
      return { products: [ ...state.products , {...product, _qty : 1}] }
    }
  }),
  remove : (product) => set((state) => {
    const isProductExist = state.products.find((p) => p._id === product._id)
    if (isProductExist) {
      return { products: state.products.filter((p) => p._id !== product._id) }
    }else{
      return { products: state.products }
    } 
  }),
  removeAllBears: () => set({ products: [] }),
}))
const useAdmin = create((set) => ({
  isLogin : false,
  toggle: () => set(() => {
    return true
  }),
}))

export default useStore
export {
  useStore,
  useAdmin
}