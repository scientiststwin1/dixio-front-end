import { ChangeEvent, SyntheticEvent } from "react";

interface PropType {
  onSubmit: (event: SyntheticEvent) => void,
  onChangeInput: (event: ChangeEvent<HTMLInputElement>) => void,
  errorMessage: string
}

const Register = ({ onSubmit, onChangeInput, errorMessage }: PropType) => {

  return (
    <form className="mt-8 flex justify-center items-center" onSubmit={onSubmit} >
      <label htmlFor="name" className="text-xl mr-5">Hello! Please indicate your name: </label>
      <div className="flex flex-col"  >
        <input id='name' name="name" type="text" required onChange={onChangeInput} className="w-full px-5 py-3 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs border-2 border-gray-500 rounded-md" placeholder="Enter your name" />
        <span>{errorMessage}</span>
      </div>
      <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
        <button type="submit" className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Let's chat</button>
      </div>
    </form>
  )
}

export default Register;