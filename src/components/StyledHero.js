import styled from 'styled-components'

// const orange = '#f15025'
// const Button = styled.button`
// color:${orange};
// background: green;
// font-size: 3rem
// `

// export default Button

import defaultImg from '../images/room-1.jpeg'

const styledHero = styled.header`
  min-height: 60vh;
  background: url(${props => props.img ? props.img: defaultImg}) center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
`
export default styledHero