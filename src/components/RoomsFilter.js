import React from 'react'
import {useContext} from 'react'    // core react hook function
import { RoomContext } from '../context'
import Title from '../components/Title'

// get all unique values of types
const getUnique = (items, value) => {
    return [...new Set( items.map(item => item[value]))]
}

export default function RoomsFilter({rooms}) {
    const context = useContext(RoomContext)
    // console.log(context)
    const {
        handleChange, type, capacity, price, minPrice, maxPrice,minSize, maxSize, breakfast,pets
    } = context;
    //get unique types
    let types = getUnique(rooms, 'type')
    // add all
    types=['all', ...types]
    // console.log(`types are: ${types}`)

    const typeJsx = types.map((item, index) => {
        return <option value={item} key={index}> {item} </option>
    })

    // now capacity
    let capacities = getUnique(rooms, 'capacity')
    const capacityJsx = capacities.map((item, index) => {
        return <option value={item} key={index}> {item} </option>
    })
    

    return (
        <section className="filter-container" >
            {/* Hello from room filter */}
            <Title title="Search rooms" />
            <form className="filter-form">
                {/* select type */}
                <div className="form-group">
                    <label htmlFor="type"> room type</label>
                    <select name="type" id="type" value = { type } 
                    className="form-control" onChange={handleChange}>
                    
                    {typeJsx}
                    </select>
                </div>
                {/* end of select type */}
                {/* // now capacity of room is filtered */}
                <div className="form-group">
                    <label htmlFor="capacity"> No of guests </label>
                    <select name="capacity" id="capacity" value = { capacity } 
                    className="form-control" onChange={handleChange}>
                    
                    {capacityJsx}
                    </select>
                </div>
                {/* now price range */}
                <div className="form-group">
                    <label htmlFor="price" > Room Price: ${price}</label>
                    <input type="range" name="price" min={minPrice} max={maxPrice} id="price" value={price}
                    onChange = {handleChange} className="form-control"/>
                </div>

                {/* now size of room */}
                <div className="form-group">
                    <label htmlFor="size"> Room Size:</label>
                    <div className="size-inputs">
                        <input type="number" name="minSize" id="size" value={minSize} onChange={handleChange}
                        className="size-input"/>
                        <input type="number" name="maxSize" id="size" value={maxSize} onChange={handleChange}
                        className="size-input"/>
                    </div>
                </div>

                {/* now breakfast whether allowed or not */}
                <div className="form-group">
                    <div className="single-extra">
                        <input type="checkbox" name="breakfast" id="breakfast" checked={breakfast} onChange={handleChange}/>
                        <label htmlFor="breakfast"> Breakfast </label>
                    </div>
                    <div className="single-extra">
                        <input type="checkbox" name="pets" id="pets" checked={pets} onChange={handleChange}/>
                        <label htmlFor="pets"> Pets allowed? </label>
                    </div>
                </div>

            </form>
        </section>

        
    )
}
