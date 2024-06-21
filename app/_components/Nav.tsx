"use client";
import { Search, Settings } from "lucide-react";
import "./nav.css";
import { Input } from "@/components/ui/input";
import useWindow from "@/hooks/useWindow";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Loading from "./Loading";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";

interface toastItems {
  data:string;
  ok:boolean;
}

const Nav = ({ search, setSearch , userDetails  }:any) => {
  const { height, width } = useWindow();
  const [isFocus, setIsFocus] = useState(false)
  const inputRef = useRef<HTMLInputElement | null >(null)
  const ctrl = useRef<true | false>(false)
  const keyQ = useRef<true | false>(false)
  

  const toastIt = ({data,ok}:toastItems) => {
    if (ok) {
      toast.success(data)
    } else {
      toast.error(data)
    }
  }

  const handleKeyDown = (e:any) => {
    if (e.key == 'Control' && !ctrl.current) {
      ctrl.current = true
    }
    if (e.key == 'q' && !keyQ.current && ctrl.current) {
      keyQ.current = true
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }
  }

  const router = useRouter()

  const [isLogginOut, setIsLogginOut] = useState(false)

  const handleLogout = async () => {
    try {
      setIsLogginOut(true)
      let res = await axios.post('/api/logout')
      setIsLogginOut(false)
      const resData = res.data
      toastIt({data:resData.message,ok:resData.ok})
      if (resData.ok) {
        router.push('/login')
      }
    } catch (error) {
      
    }
  }


  useEffect(() => {
    window.addEventListener('keydown',handleKeyDown)
    return () => {
      window.removeEventListener('keydown',handleKeyDown)
    }
  }, [])
  
  return (
    <nav className="w-[100vw] absolute z-50 p-5 flex justify-center items-center  bg-zinc-100 px-16  top-0 left-0 text-black">
      <Toaster />
      {width > 900 && (
        <div className="text-xl px-5 font-['Arial'] flex  items-center font-semibold text-zinc-600">
          <Image
            src='/note-icon.png'
            height={40}
            width={40}
            alt="note"
            />
        </div>
      )}
      <div className="input flex justify-center">
        <div className="inp-wrapper px-3 flex justify-center items-center gap-2 ">
          <Input
            onFocus={() => setIsFocus(true)}
            onBlur={() => {
              setIsFocus(false)
              ctrl.current = false 
              keyQ.current = false
            }}
            ref={inputRef}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="outline-none w-[100%]  border-none"
            placeholder={isFocus ? 'Search':'Search                       ctrl + Q'}
          />
          {
            width <= 360 && <Dialog>
            <DialogTrigger >
              <Settings />
            </DialogTrigger>
            <DialogContent>
              <h1>Profile Info</h1>
              <Input type="text" value={userDetails?.username || ''} disabled={true}  className="border border-zinc-400" placeholder="username" />
              <Input type="text" value={userDetails?.email || ''} disabled={true}  className="border border-zinc-400" placeholder="email" />
              <Button
                disabled={isLogginOut}
                onClick={handleLogout}
                variant='destructive'>
                {
                  isLogginOut ? <Loading /> : 'LOGOUT'
                }
              </Button>
            </DialogContent>
        </Dialog>
          }
        </div>
        <div style={{gap:width > 360 ? '20px':0}} className="avatar flex items-center justify-between">
            {
              width > 360 && <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            }
            {
              width > 360 && <Dialog>
              <DialogTrigger>
                <Settings />
              </DialogTrigger>
              <DialogContent>
                <h1>Profile Info</h1>
                <Input type="text" value={userDetails?.username || ''} disabled={true}  className="border border-zinc-400" placeholder="username" />
                <Input type="text" value={userDetails?.email || ''} disabled={true}  className="border border-zinc-400" placeholder="email" />
                <Button
                  disabled={isLogginOut}
                  onClick={handleLogout}
                  variant='destructive'>
                  {
                    isLogginOut ? <Loading /> : 'LOGOUT'
                  }
                </Button>
              </DialogContent>
          </Dialog>
            }
        </div>
      </div>
    </nav>
  );
};

export default Nav;
