
interface InputProps extends React.HTMLAttributes<HTMLInputElement> {

}

export default function Input(props: InputProps) {
  return <input
    {...props}
    className="placeholder:text-gray-500 text-sm rounded border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 focus:shadow-primary-outline w-full"
  />
}
