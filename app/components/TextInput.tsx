import { TextInputCompTypes } from "../types"

export default function TextInput({ string, inputType, placeholder, error, onUpdate }: TextInputCompTypes) {

  return (
    <>
        <input 
            placeholder={placeholder}
            className="
                block
                w-full
                bg-dark-5
                text-zinc
                border
                border-dark-5
                rounded-md
                py-2.5
                px-3
                focus:outline-none
            " 
            value={string || ''}
            onChange={(event) => onUpdate(event.target.value)}
            type={inputType}
            autoComplete="off"
        />

        <div className="text-red-1 text-[14px] font-semibold">
            {error ? (error) : null}
        </div>
    </>
  )
}