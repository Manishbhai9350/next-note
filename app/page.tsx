"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Nav from "./_components/Nav";
import Note from "./_components/Note";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DialogClose, DialogTitle } from "@radix-ui/react-dialog";
import { Textarea } from "@/components/ui/textarea";
import useWindow from "@/hooks/useWindow";
import { Plus } from "lucide-react";
import Loading from "./_components/Loading";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

interface toastItems {
  data: string;
  ok: boolean;
}

export default function Home() {
  const [addNote, setAddNote] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timeOutId, setTimeOutId] = useState(null);
  const [filter, setFilter] = useState("");
  const [notes, setNotes] = useState([]);
  const [data, setData] = useState([...notes]);
  const [isTyping, setIsTyping] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [search, setSearch] = useState("");
  const [userDetails, setUserDetails] = useState(null);

  const toastIt = ({ data, ok }: toastItems) => {
    if (ok) {
      setIsOpenDialog(false);
      toast.success(data);
    } else {
      toast.error(data);
    }
  };

  const fetchNotes = async () => {
    try {
      const response = await axios.post("/api/note/all");
      const resData = response.data;
      let resNotes = resData?.notes || [];
      setData(resNotes);
      setNotes(resNotes);
      if (resNotes.length <= 0) {
        toast("Create Notes", {
          icon: "📒",
        });
      }
      if (resData.ok) {
        setUserDetails(resData.userDetails);
        toastIt({ data: resData.message, ok: resData.ok });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    clearTimeout(timeOutId);
    if (!isTyping) {
      setIsTyping(true);
    }
    const id = setTimeout(() => {
      setIsTyping(false);
      setFilter(search);
    }, 400);
    setTimeOutId(id);
  }, [search]);

  useEffect(() => {
    if (filter.length > 0) {
      const filtered = notes.filter((note) => {
        return (
          note.title.toLowerCase().includes(filter.toLowerCase()) ||
          note.description.toLowerCase().includes(filter.toLowerCase())
        );
      });
      setNotes(filtered);
    } else {
      setNotes([...data]);
    }
  }, [filter]);

  const handleCreation = async () => {
    setIsLoading(true);
    const response = await axios.post("/api/note/create", {
      title,
      description: desc,
    });
    setIsLoading(false);
    toastIt({ data: response.data.message, ok: response.data.ok });
    if (response.data.ok) {
      fetchNotes();
      setTitle("");
      setDesc("");
    }
  };

  const handleDelete = async (id, setIsDeleting) => {
    try {
      setIsDeleting(true);
      const response = await axios.post("/api/note/delete", { id });
      setIsDeleting(false);
      const resData = response.data;
      toastIt({ data: resData.message, ok: resData.ok });
      if (resData.ok) {
        fetchNotes();
      }
    } catch (error) {}
  };

  const handleUpdate = async ({
    checkedDescription,
    checkedTitle,
    title,
    description,
    id,
    setUpdateDialog,
    setIsUpdating,
    setU_Description,
    setU_Title,
  }) => {
    setIsUpdating(true);
    const data = { checkedDescription, checkedTitle, title, description, id };
    const response = await axios.post("/api/note/update", data);
    const resData = response.data;
    setIsUpdating(false);
    setUpdateDialog(false);
    toastIt({ data: resData.message, ok: resData.ok });
    if (resData.ok) {
      setU_Title('')
      setU_Description('')
      fetchNotes();
    }
  };

  return (
    <main className="h-screen w-screen">
      <Toaster />
      <div className="absolute right-3 bottom-3 ">
        <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus />
            </Button>
          </DialogTrigger>
          <DialogContent className="pt-4">
            <DialogHeader>
              <DialogTitle>
                <p className="w-full text-center uppercase">Enter Info</p>
              </DialogTitle>
              <Input
                className="border border-zinc-400"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
              />
            </DialogHeader>
            <DialogDescription>
              <Textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Description"
              />
            </DialogDescription>
            <Button
              disabled={isLoading}
              className="w-full"
              onClick={handleCreation}
            >
              {isLoading ? <Loading /> : "Create"}
            </Button>
          </DialogContent>
        </Dialog>
      </div>
      <Nav userDetails={userDetails} search={search} setSearch={setSearch} />
      <div className="w-screen min-h-[100vh] bg-zinc-200 flex ">
        <section className="content w-[100vw]  flex flex-col justify-start pt-20 items-end mt-20]">
          {notes.length > 0 ? (
            <div
              style={{ width: "100vw" }}
              className="notes mt-4 min-h-44 lg:grid-cols-3 place-items-center md:grid-cols-2  grid-cols-1 py-5 grid "
            >
              {notes.map((note, i) => {
                return (
                  <Note
                    key={i}
                    handleUpdate={handleUpdate}
                    onDelete={handleDelete}
                    creationData={note.createdAt}
                    id={note._id}
                    title={note.title}
                    description={note.description}
                  />
                );
              })}
            </div>
          ) : (
            <div className="w-full h-32 flex-col  flex items-center justify-center ">
              <Image src="/note.png" height={80} width={80} alt="note" />
              <h1>No Notes Here</h1>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
