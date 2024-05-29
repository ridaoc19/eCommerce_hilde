import Button from "../../../components/common/button/Button"

function Home() {
  return (
    <div>
      <Button buttonConfig={{
        variant: 'dark',
        handleClick: () => { },
        text: 'hola'
      }} />
      <Button buttonConfig={{
        variant: 'highlighter',
        handleClick: () => { },
        text: 'hola'
      }} />
      <Button buttonConfig={{
        variant: 'light',
        handleClick: () => { },
        text: 'hola'
      }} />
      <Button buttonConfig={{
        variant: 'link',
        handleClick: () => { },
        text: 'hola'
      }} />
    </div>
  )
}

export default Home