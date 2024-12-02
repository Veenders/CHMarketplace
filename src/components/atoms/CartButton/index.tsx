import styles from "./cartbutton.module.css";
const SvgCart = () => (
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4.97412 5.52087L4.41829 3.02087H2.81079" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  <path fillRule="evenodd" clipRule="evenodd" d="M6.44245 12.3625L4.97412 5.52087H15.5225C16.0533 5.52087 16.4483 6.01004 16.3375 6.52921L15.0858 12.3625C15.0033 12.7467 14.6641 13.0209 14.2708 13.0209H7.25662C6.86412 13.0209 6.52495 12.7467 6.44245 12.3625Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M14.5542 16.0417C14.3817 16.0417 14.2417 16.1817 14.2433 16.3542C14.2433 16.5267 14.3833 16.6667 14.5558 16.6667C14.7283 16.6667 14.8683 16.5267 14.8683 16.3542C14.8675 16.1817 14.7275 16.0417 14.5542 16.0417" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M7.38002 16.0417C7.20752 16.0417 7.06752 16.1817 7.06919 16.3542C7.06836 16.5267 7.20836 16.6667 7.38086 16.6667C7.55336 16.6667 7.69336 16.5267 7.69336 16.3542C7.69336 16.1817 7.55336 16.0417 7.38002 16.0417" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>)

const CartButton = (props:React.ComponentProps<'button'>) => {
  return (
    <button {...props} className={styles.cartButton}>
      + <SvgCart />
    </button>
  )
}

export default CartButton;