import React, { Component } from 'react';
// import roomsData from './data'

import Client from './Contentful'

const RoomContext = React.createContext();

//provider
export default class RoomProvider extends Component {
    state = {
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        loading: true,
        type: 'all', 
        capacity: 1,
        price:0,
        minPrice:0,
        maxPrice:0,
        minSize:0,
        maxSize:0,
        breakfast:false,
        pets:false
    }

    // get data - from contentful API
    getData = async () => {
        try{
            let response = await Client.getEntries({content_type:"beachResort", order:"fields.price"})

            let rooms = this.formatData(response.items)
            // console.log(rooms)
            let featuredRooms = rooms.filter(room => room.featured === true)
            // set maxsize from the data
            let maxPrice = Math.max(...rooms.map(item=>item.price))
            let maxSize = Math.max(...rooms.map(item=>item.size))

            this.setState({
                    rooms: rooms,
                    featuredRooms: featuredRooms,
                    sortedRooms: rooms,
                    loading: false,
                    price: maxPrice,
                    maxPrice,
                    maxSize
                })
                    } catch(error){
                    console.log(error)
                          }
    }

    // get data- when component mounts
    componentDidMount(){
        this.getData();
    }

    formatData(items){
        let tempItems = items.map(item => {
            let id = item.sys.id;
            let images = item.fields.images.map(image => image.fields.file.url);
            let room = {...item.fields, images, id}

            return room
        })

        return tempItems;
    }

    getRoom = (slug) => {
        let tempRooms = [...this.state.rooms]
        const room = tempRooms.find((room)=> {
            return room.slug === slug
        })
        return room
    }

    handleChange = (event) => {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked: target.value 
        const name = event.target.name;
        // const value = event.target.value;
        // console.log(type, name, value)
        // nos change the state

        this.setState({
            [name]:value
        }, this.filterRooms)
    }

    filterRooms = () => {
        // console.log("hello")
        let {rooms, type, capacity, price, minSize, maxSize, breakfast, pets} = this.state
        let tempRooms = [...rooms]

        // capacity transformed to integer
        capacity = parseInt(capacity)
        price = parseInt(price)

        //filter by type
        if(type !== 'all'){
            tempRooms=tempRooms.filter(room => room.type === type)
        }

        // filter by capacity
        if(capacity !== 1){
            tempRooms=tempRooms.filter(room => room.capacity >= capacity)
        }
        // filter by price
        tempRooms= tempRooms.filter(room=> room.price <= price)

        //filter by size of room
        tempRooms=tempRooms.filter(room => room.size >= minSize && room.size <= maxSize)

        // filter by pet friendliness
        if(pets){
            tempRooms=tempRooms.filter(room=> room.pets=== true)
        }

        // filter by providing breakfast hotels
        if(breakfast){
            tempRooms=tempRooms.filter(room=> room.breakfast === true)
        }

        //change state to re-render as per input 
        this.setState({sortedRooms: tempRooms})
    }




    render() {
        return (
            <RoomContext.Provider value={{...this.state, getRoom: this.getRoom, handleChange: this.handleChange}}>
                {this.props.children}
            </RoomContext.Provider>
        )
    }
}
const RoomConsumer = RoomContext.Consumer

export function withRoomConsumer(Component){
    return function ConsumerWrapper(props){
        return <RoomConsumer>
            {value => <Component {...props} context={value} /> }
        </RoomConsumer>
    }
}

export {RoomProvider, RoomConsumer, RoomContext}


