import { ChangeEvent } from "react";
import style from "./quantityinput.module.css"

type QuantityInputProps = {
  max: number;
  value: number;
  onChangeValue: (number: number) => void;
}

const QuantityInput = ({max, value, onChangeValue}:QuantityInputProps) => {
  const onChange = (e:ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value
    if(!isNaN(value)) {
      onChangeValue(value);
    }else {
      onChangeValue(0)
    }
  }
  const removeValue = ()=>{
    onChangeValue(value-1);
  }
  const addValue = () => {
    onChangeValue(value+1)
  }
  return(
    <div className={style.quantityInput}>
      <button onClick={removeValue} disabled={value===1}>-</button>
      <input type="number" min="1" max={max} value={value} onChange={onChange} />
      <button onClick={addValue} disabled={value>=max}>+</button>
    </div>
  )
}
export default QuantityInput