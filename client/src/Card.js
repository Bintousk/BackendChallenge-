import React, { useState, useEffect } from 'react';

import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Popup from './Popup';
import PopupComment from './PopupComment';
import axios from 'axios';
import io from 'socket.io-client'
const socket = io('http://localhost:5002/');

const Card = ({ type, item, setItems, allItems }) => {

    const [popup, setPopup] = useState(false);
    const [popupComment, setPopupComment] = useState(false)

    const [carItem, setCardItem] = useState(item);
    const [data, setData] = useState({
        name: '',
        description: '',
        location: '',
        quantity: '',
        price: '' ,
        deletionComment: ''
    });
    useEffect(() => {
        if(item) setData(item);
    }, [])

    const handleDelete = () => {
        const uData = {
            name: data.name,
            description: data.description,
            location: data.location,
            quantity: data.quantity,
            price: data.price,
            deletionComment: data.deletionComment,
            _id: data._id
        }
        axios.put("http://localhost:5002/items/update",uData)

        socket.once('item-updated', (updatedData) => {
            console.log("aaaa");
            setCardItem(updatedData);
        })
   
    }

    

    return (
        <div>
            {
                popup && <Popup setPopup={setPopup} 
                item={carItem} setItems={setItems} 
                setCardItem={setCardItem}/>
            }
            {
                popupComment && <PopupComment setPopupComment= {setPopupComment}
                item={carItem} setItems={setItems} 
                setCardItem={setCardItem}/>
            }
            {(type === 'row') ? (
                <div className="cards">
                 
                        <div className="content">
                            <strong>{carItem.name}</strong>
                            <p className="about">Description: {carItem.description}</p>
                            <p className="location">Location: {carItem.location}</p>
                            <p className="quantity">Quantity: {carItem.quantity}</p>
                            <p className="price">Price: {carItem.price} $</p>
                            
                        </div>

                  
                    <div className="btn-container">
                        <div onClick={() => setPopup(true)}>
                            <CreateIcon />
                        </div>
                        <div onClick={() => setPopupComment(true)}>
                            <DeleteIcon />
                        </div>
                    </div>
                </div>
            ) : (
                    <div className="addcards"
                        onClick={() => setPopup(true)}>
                        <AddCircleOutlineIcon />
                    </div>
                )}


        </div>

    )
}

export default Card
