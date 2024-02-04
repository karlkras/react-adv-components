import { type ComponentPropsWithoutRef, type FormEvent, forwardRef, useImperativeHandle, useRef } from "react";

type FormProps = {
  onSave: (value: unknown) => void;
} & ComponentPropsWithoutRef<'form'>

export type FormHandle = {
  clear: () => void;
}

const Form = forwardRef<FormHandle, FormProps>(({ onSave, children, ...props}, ref) => {
  const formRef = useRef<HTMLFormElement>(null);

  useImperativeHandle(ref, () => {
    return {
      clear() {
        formRef.current?.reset()
      }
    }
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave(Object.fromEntries(new FormData(event.currentTarget)));
  }

  return (
    <form {...props} onSubmit={handleSubmit} ref={formRef}>
      {children}
    </form>
  )
});

export default Form;