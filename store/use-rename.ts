import { create } from "zustand";

const defaulValues = {id:"",title:"",description:""}

 interface IRenameModel {
    initialValues: typeof defaulValues;
    isOpen: boolean;
    onOpen: (id: string, title:string, description:string) => void;
    onClose:()=>void;
  }
  

export const useRename = create<IRenameModel>((set)=>({
isOpen:false,
onOpen: (id: string, title: string, description: string)=>set({
    isOpen:true,
    initialValues:{id,title,description}
}),
onClose:()=>set({isOpen:false,initialValues:defaulValues}),
initialValues:defaulValues
}))