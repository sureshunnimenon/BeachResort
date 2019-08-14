import React from 'react'
import Hero from '../components/Hero'
import Banner from '../components/Banner';
import { Link } from 'react-router-dom'

import RoomsContainer from '../components/RoomsContainer'

const Rooms = () => {
    return (
        <>
        <div>
            {/* Hello from rooms page */}
            <Hero hero="roomsHero" > 
            <Banner title="Our Rooms">
                <Link to="/" className = "btn-primary">
                        Return Home  </Link> 
           </Banner>
           </Hero>
        </div>
        <RoomsContainer />
        </>
    )
}

export default Rooms
