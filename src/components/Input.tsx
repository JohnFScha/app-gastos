import { useState } from "react"

export default function Input({ type, name, labelText, placeholder }: InputProps<string>) {
  const [value, setValue] = useState("");

  return (
    <article className='flex flex-col gap-2 w-full'>
      <label htmlFor={name}
        className='label'
      >{labelText}</label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        className='input input-bordered input-accent text-base'
        value={value}
        onChange={(e) => setValue(e?.currentTarget?.value)}
        required 
      />
    </article>
  )
}
