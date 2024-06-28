import React , {useState , useEffect} from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify';

const List = ( {url}) => {
  const[list, setList] = useState([])
  const fetchList=async()=>{
    const response = await axios.get(`${url}/api/food/list`)
    console.log(response.data)
    if(response.data.success){
      setList(response.data.data)
    }
    else{
      toast.error("Error while fetching list")
    }
  }
  

  const removeFood = async (foodid) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodid})

    if (response.data.success) {
      toast.success(response.data.message)
      await fetchList()
    }
    else {
      toast.error(response.data.message)
    }
  }
  useEffect(()=>{
    fetchList()
  },[])
  return (
    <div className='list add flec-col'>
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format  title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=>{
          return(
            <div className="list-table-format" key={index}>
              <img src={item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <button onClick={()=>removeFood(item._id)} className='cursor'>X</button>
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default List