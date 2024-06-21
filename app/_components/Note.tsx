'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import useWindow from "@/hooks/useWindow";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import Loading from "./Loading";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface NoteProps {
    title:string;
    description:string;
    onDelete:(id:string)=>void;
    handleUpdate:()=>void;
    idx:number;
}

const Note = ({title,description,onDelete,id,handleUpdate}:NoteProps) => {
    const [c_Titile,setC_Titile] = useState(true)
    const [c_Description, setC_Description] = useState(true)
    const [u_Title, setU_Title] = useState(title)
    const [u_Description, setU_Description] = useState(description)
    const {width,height} = useWindow()
    const [isDeleting, setIsDeleting] = useState(false)
    const [updateDialog, setUpdateDialog] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)

  return (
    <div style={{width:width < 600 ? 250 : 350,marginBlock:10}} className="h-[200px]">
        <Card>
            <CardHeader>
                <CardTitle className="flex capitalize">
                    {title}
                </CardTitle>
                <p className="text-xs text-zinc-400">20/6/2024</p>
            </CardHeader>
            <CardContent>
                <CardDescription> {description}</CardDescription>
            </CardContent>
            <CardFooter>
               <Button
                className="mx-2" 
                disabled={isDeleting}
                onClick={() => onDelete(id,setIsDeleting)}
                >
                {
                    isDeleting ? <Loading /> : 'DELETE'
                }
               </Button>
               <Dialog open={updateDialog} onOpenChange={setUpdateDialog}>
                <DialogTrigger>
                    <Button
                    variant='outline'
                    >
                    EDIT
                </Button>
                </DialogTrigger>
                <DialogContent>
                    <h1 className="text-2xl">Update Note <p className="text-[13px]">Check The Field If You Want To Update</p> </h1>
                   <div className="edit-input w-full gap-2 flex items-center">
                    <Checkbox onClick={e => setC_Titile(!c_Titile)} checked={c_Titile}/>
                    <div className="w-full">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" disabled={!c_Titile} value={u_Title} onChange={e => setU_Title(e.target.value)}  className="border border-zinc-400" placeholder="Title" />
                    </div>
                   </div>
                   <div className="edit-input w-full gap-2 flex items-center">
                    <Checkbox onClick={e => setC_Description(!c_Description)} checked={c_Description}/>
                    <div className="w-full">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" disabled={!c_Description} value={u_Description} onChange={e => setU_Description(e.target.value)}  className="border border-zinc-400" placeholder="Description" />
                    </div>
                   </div>
                   <Button 
                    onClick={e => {
                        handleUpdate({
                                checkedDescription: c_Description,
                                checkedTitle: c_Titile,
                                title: u_Title,
                                description: u_Description,
                                id,
                                setUpdateDialog,
                                setIsUpdating
                            })
                        }}
                        disabled={(!c_Description && !c_Titile) || isUpdating}
                    >
                       {
                        isUpdating ? <Loading /> : 'UPDATE'
                       }
                   </Button>
                </DialogContent>
               </Dialog>
            </CardFooter>
        </Card>
    </div>
  );
};

export default Note;
