import React, { Component } from 'react'
import defaultBcg from '../images/room-1.jpeg'
import Hero from '../components/Hero'
import Banner from '../components/Banner'
import { Link } from 'react-router-dom'

import {RoomContext} from '../context'
import StyledHero from '../components/StyledHero'

class SingleRoom extends Component {
  constructor(props){
    super(props)
    // console.log(this.props)
    this.state = {
      slug: this.props.match.params.slug,
      defaultBcg
    }
  }

  static contextType = RoomContext


  // componentDidMount(){}
  
  render() {
    const {getRoom} = this.context;
    const room = getRoom(this.state.slug);
    if(!room){
      return <div className="error">
        <h3>No such room exists...</h3>
        <Link to ='/rooms' className="btn-primary"> Back to Rooms </Link>
      </div>
    }
    console.log(room)

    // get all details of the room
    const {name, description, capacity, size, price,extras, breakfast, pets, images } = room;
    
    const [mainImg, ...defaultImg] = images

    return (
      <div>
            {/* Hello from single room page */}
            {/* {room.name} */}
            <>
            <StyledHero img = {mainImg || this.state.defaultBcg}>
              <Banner title={`${name} room`}>
                <Link to="/rooms" className="btn-primary"> Back to rooms </Link>
              </Banner>
            </StyledHero>
            <section className="single-room">
              <div className="single-room-images">
                {defaultImg.map((image, index) =>{
                  return <img key={index} src={image} alt={name} />
                })}
              </div>
            <div className="single-room-info">
              <article className="desc">
                <h3> details</h3>
                <p> {description}</p>
              </article>

              <article className="info">
                <h3> Info </h3>
                <h6> Price: ${price}</h6>
                <h6> Size: {size} SqFT </h6>
                <h6> Max Capacity: {capacity > 1? `${capacity} people`:`${capacity} person`}</h6>
                <h6> Pets: {!pets ? "Pets friendly" : "Pets not allowed" }</h6>
                <h6> {breakfast && 'Free breakfast included' }</h6>
              </article>
            </div>
            </section>

            <section className="room-extras">
              <h6>extras</h6>
                <ul className="extras">
                  {extras.map((item, index)=>{
                    return <li key={index} > {item} </li>
                  })}
                </ul>
            </section>
            </>
      </div>
    )
  }
}

export default SingleRoom
