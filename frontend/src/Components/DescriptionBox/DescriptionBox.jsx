import React from "react"
import "./DescriptionBox.css"
const DescriptionBox = () => {
    return (
        <div className="descriptionbox">
            <div className="descriptionbox-navigator">
                <div className="descriptionbox-nav-box">Description</div>
                <div className="descriptionbox-nav-box fade">Reviews (122)</div>
            </div>
            <div className="descriptionbox-description">
                <p>
                    E-commerce, or electronic commerce, is the buying and selling of goods and services online. It involves
                    a transaction between two parties, usually a business and a consumer, where the payment and delivery of
                    products or services are conducted online. E-commerce can be conducted over computers, tablets.
                </p>
                <p>
                    After the order is validated, the order manager notifies the store's web server. It displays a message
                    notifying the customer that their order has been processed. The order manager then sends order data to
                    the warehouse or fulfillment department, letting it know the product or service can be dispatched to the
                    customer. At this point, tangible and digital products are sent to the customer, or access to a service
                    is granted.
                </p>
            </div>
        </div>
    )
}

export default DescriptionBox
