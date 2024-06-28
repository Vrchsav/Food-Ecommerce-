import { createContext, useEffect, useState } from "react"
import axios from "axios"

export const StoreContext = createContext(null)

export const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState([]);
    
     const  url="https://food-ecommerce-backend-rv1x.onrender.com"
    const [token,setToken]=useState("")

    const[food_list,setFoodList]=useState([])
    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({
                ...prev,
                [itemId]: 1
            }))
        }
        else {
            setCartItems((prev) => ({
                ...prev,
                [itemId]: prev[itemId] + 1
            }))
        }
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
    }}
    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: prev[itemId] - 1
        }))
        if(token){
            axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
    }
    }
    const getTotalCartAmount = () => {
        let total = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const itemInfo = food_list.find((food) => food._id === item)
                total += itemInfo.price * cartItems[item]
            }
        }
        return total
    }
    const fetchFoodList = async () => {
        const response = await axios.get(url+"/api/food/list")
        setFoodList(response.data.data)
    }
    const loadCartData = async ( token) => {
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
        setCartItems(response.data.cartData)
        
    }
    useEffect(() => {
        
        async function loadData() {
            await fetchFoodList()
            if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"))
            await loadCartData(localStorage.getItem("token"))
        }
        }

        loadData()
    }, [])
        const contextValue = {
            food_list,
            cartItems,
            setCartItems,
            addToCart,
            removeFromCart,
            getTotalCartAmount,
            url,
            setToken,
            token
        }

        return (<StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>)
    }