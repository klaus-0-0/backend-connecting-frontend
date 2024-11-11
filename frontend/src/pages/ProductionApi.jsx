/* eslint-disable no-unused-vars */
import axios from "axios"
import { useEffect, useState } from "react"

//                          Default - proffesional way of managing API in production level

const ProductionApi = () => {
    const [product, setProduct] = useState([])
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            try{
                setLoading(true);
                setError(false)
                const response = await axios.get('/api/items')
                console.log(response.data.items)
                setProduct(response.data.items)
                setLoading(false)
            }
            catch(error){
                setError(true)
                setLoading(false)
            }
        })()
    }, [])

    if(error) {
        return <h1>something went wrong</h1>
    }
    if(loading){
        return <h1>loading...</h1>
    }

    return (
        <>
            <h1>hellow</h1>
            <h2>number of products: {product.length} </h2>
        </>
    )
}
export default ProductionApi
