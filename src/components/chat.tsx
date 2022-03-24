import { ChangeEvent, SyntheticEvent } from "react"
import { Message } from "../model/message.model"
import { User } from "../model/user.model"

interface PropType {
    onSubmit: (event: SyntheticEvent) => void,
    onChangeInput: (event: ChangeEvent<HTMLInputElement>) => void,
    messages: Message[];
}

const Chat = ({ onSubmit, onChangeInput, messages }: PropType) => {

    const messageElement: JSX.Element[] = messages.map((item: any, index) => {
        return (
            <div key={item.id} className='flex w-fit flex-col h-10 box-content py-5 rounded-md  bg-indigo-300 my-5'>
                <span>{(item.user as User).name}: </span>
                <div className='px-5'>{item.message_content}</div>
            </div>
        )
    })

    return (
        <div className='w-8/12 m-auto' >
            <div className='w-full h-96 border-2 border-red-300 overflow-y-auto ' >
                {messageElement}
            </div>
            <form className="mt-8 flex justify-center items-center" onSubmit={onSubmit} >
                <label htmlFor="name" className="text-xl mr-5">Type your message: </label>
                <input id='name' name="name" type="text" required onChange={onChangeInput} className="w-full px-5 py-2 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs border-2 border-gray-500 rounded-md" placeholder="Enter your message" />
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                    <button type="submit" className="w-full flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">send!</button>
                </div>
            </form>
        </div>
    )
}

export default Chat