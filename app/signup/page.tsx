'use client'
import axios from "axios"
import MyForm from "../_components/form"
import { useRouter } from "next/navigation"
import toast , { Toaster } from "react-hot-toast";

interface toastItems {
  data:string;
  ok:boolean;
}

const SignUP = () => {
  const router = useRouter()
  const toastIt = ({data,ok}:toastItems) => {
    if (ok) {
      toast.success(data)
    } else {
      toast.error(data)
    }
  }
  const handleSubmition = async ({data,setIsLoading ,setIsDiabled}:any) => {
   try {
      setIsLoading(true)
      setIsDiabled(true)
      const response = await axios.post('/api/sign-up',data)
      setIsLoading(false)
      setIsDiabled(false)
      const resData = response.data
      toastIt({data:resData.message,ok:resData.ok})
      if (resData.ok) {
        router.push('/')
      }
   } catch (error) {
    setIsLoading(false)
    setIsDiabled(false)
    console.log(error)
   }
  }
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Toaster />
      <div className="form h-[300px] w-[300px]">
        <MyForm handleSubmition={handleSubmition}  type="signup" />
      </div>
    </div>
  )
}

export default SignUP