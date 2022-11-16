import React, { useState, useReducer } from "react";
import ImageGallery from 'react-image-gallery';


// const formReducer = (commentData, event) => {
//     return {
//       ...commentData,
//       [event.name]: event.value
//     }
//    }

function RestaurantPost({ restaurant, saveFaveRestaurant }) {
    // add button click events (must look at Sinatra notes to update DB reviews_table from frontend event)
    const [commentData, setCommentData] = useState("");
    // const [userData, setUserData] = useReducer(formReducer, {});
    const [isPending, setIsPending] = useState(false);

    function saveFaveRestaurantClick() {
        saveFaveRestaurant(restaurant)
        console.log(restaurant)
    }

    // post new review to reviews in backend
    function handleSubmit(e) {
        e.preventDefault();

        setIsPending(true)
        fetch(`http://localhost:9292/restaurant/${restaurant.id}/reviews`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"},
            body: JSON.stringify({
                restaurant_id: restaurant.id,
                user_id: 1,
                review_detail_comment: e.target.value
            })
        })
        .then(() => {
            console.log('new comment');
            setIsPending(false)
        })
        // .then((newComment) => onAddComment(newComment));
    }

    function handleCommentChange(e) {
        setCommentData({
            comment: e.target.value
        })
    }

    const imageGallery = restaurant.images.map(image => {
        const imageObj = {
            original: image,
            thumbnail: image.replace("500x500", "100x100")
        }
        return imageObj
    })

    return (
        <div className="restaurant-post">

            <h3>{restaurant.name}</h3>

            <ImageGallery items={imageGallery} />

            <h4>{restaurant.neighborhood}</h4>

            <button className="interactive-buttons" id="dislike">👎</button>

            <button className="interactive-buttons" id="fave" onClick={saveFaveRestaurantClick}>⭐️</button>

            <button className="interactive-buttons" id="like">❤️</button>

            <ul id="comments-section">
                {Object.entries(commentData).map(([comment, value]) => (
                    <li key={comment}>
                        {value}
                    </li>
                ))}
            </ul>

            <form id="comments-section" onSubmit={handleSubmit}>
                <input type="name" name="comment" placeholder="leave a comment" onChange={handleCommentChange}></input>
            </form>
            { !isPending && <button type="submit" form="comments-section">post</button> }
            { isPending && <button type="submit" form="comments-section">posting comment...</button> }
        
        </div>
    )
}

export default RestaurantPost