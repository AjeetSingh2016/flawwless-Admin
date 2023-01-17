import React from 'react'
import { htmlToText } from "html-to-text";
import parse from 'html-react-parser';
import moment from "moment";

const HomePostCard = ({data}) => {
    console.log(data.body);
  return (
    <div className='
    w-11/12 sm:w-10/12 lg:w-9/12 xl:w-7/12 shadow-md bg-white p-0 flex h-16 flex items-center mt-5 h-56 cursor-pointer'>
        <div className='w-3/5 h-full '>

            <div className='w-full h-1/5 pl-3 text-sm pt-1'>
                <h1 className='font-semibold'>{data.userName}</h1>
                <span>{moment(data.updatedAt).fromNow()} </span>
            </div>

            <div className='w-full h-4/5 p-3'>
                <h1 className='font-bold mb-2 '>{data.title}</h1>

                {htmlToText(data.body.slice(0, 280))}
            </div>
        </div>
        <div className='w-2/5 h-full p-3'>
            <img className='aspect-square h-full w-full' src="https://picsum.photos/900/450" alt="image" />
        </div>
    </div>
  )
}

export default HomePostCard