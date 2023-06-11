'use client'

import { styled } from "styled-components"

const MonthBalance = styled.p`
`

export default function MonthResumeCard() {
  return (
    <div className=''>
      <div className="bg-white w-full max-w-full py-4 px-4 mb-6 rounded-xl shadow-xl">
        <h5 className="mb-0 font-sans text-sm font-semibold leading-normal uppercase opacity-60">Junho</h5>
        <MonthBalance className="mb-2 text-lg font-bold opacity-60">R$ 6.000,00</MonthBalance>
        <p className="mb-0 opacity-60">
          <span className="text-sm font-bold leading-normal text-emerald-500">+ R$ 12.500,00</span>
        </p>
        <p className="mb-0 opacity-60">
          <span className="text-sm font-bold leading-normal text-red-600">- R$ 6.500,00</span>
        </p>
      </div>
    </div>
  )


//   <div class="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20">
//   <div class="flex justify-center md:justify-end -mt-16">
//     <img class="w-20 h-20 object-cover rounded-full border-2 border-indigo-500" src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80">
//   </div>
//   <div>
//     <h2 class="text-gray-800 text-3xl font-semibold">Design Tools</h2>
//     <p class="mt-2 text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores deserunt ea doloremque natus error, rerum quas odio quaerat nam ex commodi hic, suscipit in a veritatis pariatur minus consequuntur!</p>
//   </div>
//   <div class="flex justify-end mt-4">
//     <a href="#" class="text-xl font-medium text-indigo-500">John Doe</a>
//   </div>
// </div>
}
