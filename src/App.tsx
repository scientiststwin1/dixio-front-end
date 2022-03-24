import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react"
import Chat from "./components/chat";
import Register from "./components/register";
import { Message } from "./model/message.model";
import { User } from "./model/user.model";
import { socket } from './service/socket';

const App = () => {

    const [currentUser, setCurrentUser] = useState<User>({ id: undefined, name: undefined });
    const [ChatMessages, setChatMessages] = useState<Message[]>([]);

    const [nameInput, setNameInput] = useState<string>('')
    const [messageInput, setMessageInput] = useState<string>('')

    const [errorMessage, setErrorMessage] = useState<string>('')



    useEffect(() => {

        socket.on('connect-to-server', () => console.log('connect to server'))

        socket.on('register', handleRegisterUser)

        socket.on('send-message', handleNewMessage)


    }, [])

    const handleRegisterUser = (response: any) => {

        const data = response?.data;
        const success = response?.success;
        const responseMessage = response?.message;

        if (success) {
            const user = data?.user;
            const messages = data?.messages;

            setCurrentUser({ id: user?.id, name: user?.name })
            setChatMessages(messages)
        }
        else {
            setErrorMessage(responseMessage)
        }


    }

    const handleNewMessage = (response: any) => {

        const data = response?.data;
        const success = response?.data;

        const newMessage: Message = {
            id: data?.id,
            message_content: data?.message_content,
            user: data?.user,
        }

        if(success) setChatMessages(pre => [newMessage, ...pre])

    }

    const handleNameInput = (event: ChangeEvent<HTMLInputElement>) => setNameInput(event.target.value)

    const handleMessageInput = (event: ChangeEvent<HTMLInputElement>) => setMessageInput(event.target.value)

    const onSubmitSendMessage = (event: SyntheticEvent): void => {
        event.preventDefault()
        const data = { message: messageInput }
        socket.emit('send-message', data)
    }

    const onSubmitRegisterHandler = (event: SyntheticEvent): void => {
        event.preventDefault();
        const data = { name: nameInput }
        socket.emit('register', data)
    }


    return (
        <div>
            {currentUser.id
                ? <Chat messages={ChatMessages} onChangeInput={handleMessageInput} onSubmit={onSubmitSendMessage} />
                : <Register errorMessage={errorMessage} onChangeInput={handleNameInput} onSubmit={onSubmitRegisterHandler} />
            }
        </div>
    )
}

export default App