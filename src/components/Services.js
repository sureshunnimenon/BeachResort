import React, { Component } from 'react'
import Title from './Title'
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from 'react-icons/fa'

export default class Services extends Component {
    state = {
        services: [
            {icon: <FaCocktail/>,
             title: "Free cocktails",
             info: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum in voluptatum unde molestias illum eveniet nesciunt consequatur itaque id pariatur."
               },
            {icon: <FaHiking/>,
             title: "Endless Hiking",
             info: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum in voluptatum unde molestias illum eveniet nesciunt consequatur itaque id pariatur."
               },
            {icon: <FaShuttleVan/>,
             title: "Luxorious shuttle",
             info: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum in voluptatum unde molestias illum eveniet nesciunt consequatur itaque id pariatur."
               },
            {icon: <FaBeer/>,
             title: "Strongest Beer",
             info: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum in voluptatum unde molestias illum eveniet nesciunt consequatur itaque id pariatur."
               }
        ]
    }


    render() {
        return (
            <div>
                {/* hello from services */}
                <section className="services">
                    <Title title="Services"></Title>
                    <div className="services-center"> 
                        {this.state.services.map((item, index) => {
                            return (
                            
                                <article key={index} className="service">
                                    <span> {item.icon}</span>
                                    <h6> {item.title}</h6>
                                    <p> { item.info }</p>

                                </article>
                            )
                            
                        })}
                    </div>
                </section>
                
            </div>
        )
    }
}
