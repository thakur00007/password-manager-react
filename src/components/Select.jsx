import React, {useId} from 'react'

function Select({
    options,
    label,
    className = "",
    labelClassName = "",
    ...props
}, ref) {
    const id = useId()
  return (
    <div className='flex flex-col text-sm items-center justify-center my-2 px-5'>
        <div className="w-full">
        {label && <label htmlFor={id} className={`${labelClassName}`}>{label}</label>}
        </div>
        <select
        {...props}
        id={id}
        ref={ref}
        className={`px-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        >
            {options?.map((option) => (
                <option key={option.key} value={option.key}>
                    {option.name}
                </option>
            ))}
        </select>
    </div>
  )
}

export default React.forwardRef(Select)