"use client"

import {User} from '@prisma/client'
import React from 'react'
import Image from "next/image";

interface Props{
      users?:User[];
}

const AvatarGroup:React.FC<Props> = ({users}) => {
      const selectedUser = users?.slice(0,3);
      const positionMap = {
            0:'top-0 left-[12px]',
            1:'bottom-0',
            2:'bottom-0 right-0',
      };
      return (
          <div className='relative h-11 w-11 '>
                {
                      selectedUser?.map((user,i)=>(
                          <div key={user.id} className={`absolute inline-block rounded-full overflow-hidden size-[21px] ${
                                positionMap[i as keyof typeof positionMap]
                          }`}>
                                <Image src={user.image || '/images/user.png'} fill alt='user'/>
                          </div>
                      ))
                }
          </div>
      )
}
export default AvatarGroup
