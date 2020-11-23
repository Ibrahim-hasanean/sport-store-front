import React from 'react'
import "./OrderCard.css"
const OrderCard = ({order}) => {    
    return (
        <div id="orderCard">            
                <h3>Total Price: {order.totalAmount}</h3>      
                <p>items number : {order.items.length}</p>     
                {/* <Link to="/orderItems" className="showItems">show items </Link>*/}
        </div>
    )
}

export default OrderCard
