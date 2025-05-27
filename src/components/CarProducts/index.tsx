"use client"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import { BsCart4 } from "react-icons/bs";
import useCartStore from "@/stores/useCartStore"

export function CarProducts() {


    const { cart, removeItemById, addProduct, getTotalCart } = useCartStore();

    const totalItems = cart.reduce((acc, item) => acc + item.amount, 0);


    return (
        <Sheet>
            <div className="flex flex-col items-center justify-center">
                <SheetTrigger asChild>
                    <button className="w-10 h-10 flex items-center justify-center">
                        <span className="text-white cursor-pointer text-2xl" >🛒</span>
                    </button>
                </SheetTrigger>

                <div className="flex flex-col items-center justify-center">
                    <span className="text-[#1b998b] font-bold">Cesta</span>
                    <span className="text-[#1b998b] font-bold">R$0,00</span>
                </div>
            </div>

            <SheetContent>
                <SheetHeader>
                    <SheetTitle className="text-lg">Products Car</SheetTitle>

                    <SheetDescription asChild>
                        {cart.length === 0 ? (
                            <p className="text-sm text-muted-foreground">
                                No products in the cart!
                            </p>
                        ) : (
                            <div className="flex flex-col gap-4 mt-6 max-h-[calc(100vh-180px)] overflow-y-auto p-2">
                                {cart.map((product: any) => (
                                    <div key={product.id} className="flex flex-row items-center justify-between">

                                        <div className="flex flex-col items-center gap-2">
                                            <p className="text-xs"><strong>{product.title}</strong></p>
                                            <img className="w-15 h-15" src={product.image} alt={product.title} />
                                        </div>

                                        <div className="flex flex-row items-center gap-3">
                                            <div className="flex flex-col items-center gap-2">
                                                <span>Price:</span>
                                                <p><strong>R${product.price.toFixed(2)}</strong></p>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <span>Quantity:</span>
                                                <div className="flex flex-row items-center gap-2">
                                                    <button onClick={() => removeItemById(product)} className="cursor-pointer select-none text-xl">-</button>
                                                    <p><strong>{product.amount}</strong></p>
                                                    <button onClick={() => addProduct(product)} className="cursor-pointer select-none text-xl">+</button>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-center gap-2">
                                                <span>Total:</span>
                                                <p><strong>R${product.total.toFixed(2)}</strong></p>
                                            </div>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        )}
                    </SheetDescription>
                </SheetHeader>
                <SheetFooter className="flex flex-row items-center justify-start ">
                    {cart.length !== 0 && (
                        <div className="flex flex-row items-center gap-2">
                            <SheetTitle className="text-lg text-gray-600">Total Cart: </SheetTitle>
                            <SheetDescription className="text-lg font-bold text-gray-500">R$ {getTotalCart().toFixed(2)}</SheetDescription>
                        </div>
                    )}
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
