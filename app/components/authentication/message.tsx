'use client'
import { useSearchParams } from 'next/navigation'
import { P } from '../ui/utypography'

const Message = () => {
    const searchParams = useSearchParams()
    const message = searchParams.get('message')
    if (message){
        return (
            <P className='text-red-600'>{message}</P>
        )
    }

}

export default Message