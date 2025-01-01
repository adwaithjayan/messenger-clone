import React from 'react'
import Modal from "@/components/model";
import Image from "next/image";

interface Props {
      src?:string|null;
      isOpen?: boolean;
      onClose: () => void;
}

const ImageModel:React.FC<Props> = ({src,isOpen,onClose}) => {
      if(!src) return null;
      return (
          <Modal isOpen={isOpen} onClose={onClose}>
                <div className='w-80 h-80'>
                      <Image src={src} alt='image' className='object-contain' fill />
                </div>
          </Modal>
      )
}
export default ImageModel
