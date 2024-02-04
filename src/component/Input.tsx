import { type ComponentPropsWithoutRef, FormEvent, forwardRef } from "react";

type InputProps = {
  label: string;
  id: string;
} & ComponentPropsWithoutRef<'input'>

const Input = forwardRef<HTMLInputElement, InputProps>(({ id, label, ...props }, ref) => {
  const requiredMsg = "Entering label_name is required";
  const handleOnInvalidInput = (evt: FormEvent<HTMLInputElement>) => {
    if(evt.currentTarget.value === "" && evt.currentTarget.required) {
      evt.currentTarget.setCustomValidity(`${requiredMsg.replace("label_name", label)}`);
    }
  }

  const handleOnInput = (evt: FormEvent<HTMLInputElement>) => {
    evt.currentTarget.setCustomValidity('');
  }

  return (
    <>
      <label>{label}
        <input onInput={handleOnInput} onInvalid={handleOnInvalidInput} id={id} name={id} {...props} ref={ref}/>
      </label>
    </>
  )
});

export default Input;