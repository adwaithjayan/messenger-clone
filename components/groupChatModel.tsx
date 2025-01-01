"use client"

import React, {useState} from 'react'
import {User} from "@prisma/client";
import {useRouter} from "next/navigation";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import Modal from "@/components/model";
import Input from "@/components/input";
import Button from "@/components/button";
import Select from "@/components/select";

interface Props {
      isOpen?: boolean;
      onClose: () => void;
      users: User[];

}

const GroupChatModel:React.FC<Props> = ({isOpen,onClose,users}) => {
      const router = useRouter();
      const [isLoading,setIsLoading] = useState(false)
      const {register,handleSubmit,setValue,formState:{errors},watch,control} = useForm<FieldValues>({
            defaultValues:{
                  name:'',
                  members:[],
            }
      });

      const members =watch('members');
      const onSubmit:SubmitHandler<FieldValues> =(data)=>{
            setIsLoading(true);
            axios.post('/api/conversations',{
                  ...data,
                  isGroup:true
            }).then(()=>{
                  router.refresh();
                  onClose();
            }).catch(()=>{
                  toast.error('Somthing went wrong')
            }).finally(()=>setIsLoading(false));
      }
      return (
          <Modal onClose={onClose} isOpen={isOpen}>
                <form onSubmit={handleSubmit(onSubmit)}>
                      <div className='space-y-12'>
                            <div className='border-b border-gray-900/10 pb-12'>
                                  <h2 className='text-base font-semibold leading-7 text-gray-900'>Create a group chat</h2>
                                  <p className='mt-2 text-sm leading-6 text-gray-600'>Please fill in the details below to create a new group chat with more than 2 people</p>
                                  <div className='mt-10 flex flex-col gap-y-8'>
                                        <Input label='Group name' id='name' type='text' register={register} errors={errors} disabled={isLoading} required={true}/>
                                        <Select options={users?.map(user=>({
                                              value:user.id,
                                              label:user.name
                                        }))} disabled={isLoading} label='Members' onChange={(value:any)=>setValue('members',value,{
                                              shouldValidate:true
                                        })} value={members}/>

                                  </div>
                            </div>
                      </div>
                      <div className='mt-6 flex items-center justify-end gap-x-6'>
                            <Button secondary disabled={isLoading} onClick={onClose}>Cancel</Button>
                            <Button disabled={isLoading} type='submit'>Create</Button>
                      </div>
                </form>
          </Modal>
      )
}
export default GroupChatModel
