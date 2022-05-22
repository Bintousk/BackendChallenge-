import React, {useEffect, useState} from 'react'
import "./Home.css"

// For fetching data
import axios from 'axios'

import Card from './Card';
import Trash from './Trash';

const Home = () => {

    const [items, setItems] = useState()

    useEffect(()=>{
        axios.get('http://localhost:5002/items/read')
        .then(res => {
            setItems(res.data)
        })
    },[])


    console.log(items)

    return (
        <div>
            <h1 className='title'>Items List</h1>
            <div className="container">
                {items && items.map(item => ! item.deletionComment ? (
                    <Card type="row" key={item._id} 
                    item={item} allItems={items} 
                    setItems={setItems}/>
                ):
                <React.Fragment key={item._id}></React.Fragment>
                // <div key={item._id}></div>
                )}
                
                <Card type="add" setItems={setItems}/>
            </div>
            <h1 className='title'>Garbage List</h1>
            <div className="container">
                {items && items.map(item =>  item.deletionComment ? (
                    <Trash type="row" key={item._id} 
                    item={item} allItems={items} 
                    setItems={setItems}/>
                ):
                <React.Fragment key={item._id}></React.Fragment>
                // <div key={item._id}></div>
                )}
                
            </div>
        </div>
    )
}

export default Home
