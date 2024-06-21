'use client'
import axios from "axios"
import MyForm from "../_components/form"
import { useRouter } from "next/navigation"
import toast , {Toaster} from "react-hot-toast"

interface toastItems {
  data:string;
  ok:boolean;
}

const Login = () => {
  const toastIt = ({data,ok}:toastItems) => {
    if (ok) {
      toast.success(data)
    } else {
      toast.error(data)
    }
  }
  const router = useRouter()
  const handleSubmition = async ({ data, setIsLoading , setIsDiabled }:any) => {
    if (data.email && data.password) {
      try {
        setIsDiabled(true)
        setIsLoading(true)
        const response = await axios.post('/api/sign-in', data)
        setIsDiabled(false)
        setIsLoading(false)
        const resData = response.data
        toastIt({data:resData.message,ok:resData.ok}) 
        if (resData.ok) {
          router.push("/")
        }
      } catch (error) {
        
      }
    }
  }
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Toaster />
      <div className="form h-[300px] w-[300px]">
        <MyForm handleSubmition={handleSubmition} type="login" />
      </div>
    </div>
  )
}

export default Login