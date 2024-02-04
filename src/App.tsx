import Input from "./component/Input.tsx";
import Form, { type FormHandle } from "./component/Form.tsx";
import Button from "./component/Button.tsx";
import { useRef } from "react";

function App() {
  const customFormRef = useRef<FormHandle>(null);

  const handleFormSave = (value: unknown) => {
    const extractData = value as {
      "first-name": string,
      "last-name": string, age: string
    }
    console.log(extractData);
    customFormRef.current?.clear();
  }


  return (

    <main>
      <Form onSave={handleFormSave} ref={customFormRef}>
        <Input
          label="First Name"
          id="first-name"
          type="text"
          required
        />
        <Input label="Last Name" id="last-name" type="text"
               title='Entering Last Name is required'
               required/>
        <Input label="Age" id="age" type="number"
               required/>
        <p>
          <Button className="button" el="button">Save</Button>
        </p>
      </Form>
    </main>
  )
}

export default App;
