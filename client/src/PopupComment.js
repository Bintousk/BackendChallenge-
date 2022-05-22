import React, {useEffect, useState} from 'react';
import CancelIcon from '@material-ui/icons/Cancel';

// For real time
import io from 'socket.io-client'


// For uploading data
import axios from 'axios'

const socket = io('http://localhost:5002/');

const PopupComment = ({ setPopupComment, item, setItems, setCardItem }) => {

    
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
            deletionComment: data.deletionComment || "no comment",
            _id: data._id
        }
        axios.put("http://localhost:5002/items/update",uData)

        socket.once('item-updated', (updatedData) => {
            console.log("aaaa");
            setCardItem(updatedData)
             window.location.reload()
        })
       
    }


    return (
        <div className="pop-up">
            <div className="input-box">
                <CancelIcon onClick={() => setPopupComment(false)} className="cross-btn" />
                <h3>Enter item details:</h3>
                <input type="text"
                    value={data.deletionComment ?? ''}
                    onChange={(e) => setData( prevstate => ({
                        ...prevstate,
                        deletionComment: e.target.value
                    }))}
                />
                
               
                    <button onClick={handleDelete}>
                      Delete
                    </button>
               
                
            </div>
        </div>
    )
}

export default PopupComment
