import { ComponentPropsWithoutRef} from "react";

type ButtonProps = {
  el: 'button';
} & ComponentPropsWithoutRef<'button'>;

type AnchorProps = {
  el: "anchor";
} & ComponentPropsWithoutRef<"a">;

type TotalProps = ButtonProps | AnchorProps;

const Button = (props: TotalProps) => {


  return props.el === "button" ? (<><button {...props}></button></>) :
    (<><a {...props}></a></>)
}

export default Button;