import { useState } from "react"

export default function Input({ type, name, labelText, placeholder }: InputProps<string>) {
  const [value, setValue] = useState<number>(0);

  return (
    <article className='flex flex-col gap-2 w-full'>
      <label htmlFor={name}
        className='label'
      >{labelText}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className='input input-bordered input-accent'
        value={value}
        onChange={(e) => setValue(Number(e?.currentTarget?.value))}
        required 
      />
    </article>
  )
}
