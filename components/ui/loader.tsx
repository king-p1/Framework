import {TbLoader3} from 'react-icons/tb'
const Loader = () => {
  return (
    <div className='h-[95vh] w-full flex justify-center items-center'>
        <TbLoader3 size={55} className='animate-spin'/>
    </div>
  )
}

export default Loader