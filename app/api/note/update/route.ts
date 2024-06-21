import { NextRequest, NextResponse } from "next/server";
import { NoteModel } from "../../_models/note.model";

interface requestProps {
  checkedDescription:boolean;
  checkedTitle:boolean;
  title?:string;
  description?:string;
  id:string;
}

export async function POST(req: NextRequest) {
  try {
    const {checkedDescription,checkedTitle,id,description,title}:requestProps = await req.json();

    const note = await NoteModel.findById(id)

    if (checkedDescription && checkedTitle  ) {
        if (description?.length! > 0 && title?.length! > 0) {
          note.description = description
          note.title = title
        } else {
          return NextResponse.json({
            message:'Fields Must Be at Least One Character',
            status:400,
            ok:false
          })
        }
    }
    else if (checkedDescription){
      note.description = description
     }
    else if (checkedTitle) {
      note.title = title
     }

     await note.save()

     return NextResponse.json({
      message:'Note Updated',
      status:200,
      ok:true
     })
    
  } catch (error) {
    return NextResponse.json({
      message:'Something went wrong',
      status:400,
      ok:false
    })
  }
}
