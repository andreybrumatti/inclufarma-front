import { create } from "zustand";

type Product = {
    id: number,
    title: string,
    price: number,
    category: string,
    image: string,
    amount: number,
    total: number,
}

type ProductsCart = {
    cart: Product[],
    addProduct: (product: Product) => void,
    removeItemById: (product: Product) => void,
    getTotalItem: (product: Product) => number,
    getTotalCart: () => number
}

const useCartStore = create<ProductsCart>((set, get) => ({
    cart: [],

    addProduct(product: Product) {
        const cartList = get().cart;

        const itemIndex = cartList.findIndex((item) => item.id === product.id);

        if (itemIndex !== -1) {

            const newItem = cartList.map((item) => item.id === product.id ? { ...item, amount: item.amount + 1, total: item.price * (item.amount + 1) } : item);

            set({ cart: newItem });
            return;
        }

        const newItem = { ...product, amount: 1, total: product.price };

        set({ cart: [...cartList, newItem] });
    },

    removeItemById(product: Product) {
        const cartList = get().cart;

        if (product.amount > 1) {

            const removeItem = cartList.map(

                (item) => item.id === product.id ? { ...item, amount: item.amount - 1, total: item.price * (item.amount - 1) } : item);

            set({ cart: removeItem }

            );

            return;
        }

        const newCartList = cartList.filter((item) => item.id !== product.id);

        set({ cart: newCartList });

        return;
    },

    getTotalItem(product: Product) {
        const cartList = get().cart;

        const totalItem = cartList.find((item) => item.id === product.id);

        return totalItem ? totalItem.total : 0;
    },

    getTotalCart() {
        const cartList = get().cart;

        const totalCart = cartList.reduce((total, product) => total + product.total, 0);

        return totalCart;
    },
}))

export default useCartStore;