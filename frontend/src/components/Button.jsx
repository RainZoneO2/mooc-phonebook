const Button = ({id,type, handleClick, btnText}) => (
    <>
      <button id={id} type={type} onClick={handleClick}>
        {btnText}
      </button>
    </>
)

export default Button