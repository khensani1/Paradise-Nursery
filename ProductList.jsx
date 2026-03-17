import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import './ProductList.css';

function ProductList() {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.items);
    
    // 1. Array with at least 3 categories and 6 unique plants
    const plantsArray = [
        {
            category: "Air Purifying",
            plants: [
                { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night.", cost: "$15" },
                { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters formaldehyde and xylene.", cost: "$12" }
            ]
        },
        {
            category: "Aromatic",
            plants: [
                { name: "Lavender", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb", description: "Calming scent, great for stress relief.", cost: "$20" },
                { name: "Rosemary", image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg", description: "Invigorating aroma, used in cooking.", cost: "$18" }
            ]
        },
        {
            category: "Low Maintenance",
            plants: [
                { name: "Pothos", image: "https://cdn.pixabay.com/photo/2014/12/10/15/27/pothos-563228_1280.jpg", description: "Thrives in low light and is very hardy.", cost: "$10" },
                { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/aloe-3283100_1280.jpg", description: "Easy to care for and has medicinal uses.", cost: "$14" }
            ]
        }
    ];

    const handleAddToCart = (plant) => {
        dispatch(addItem(plant));
    };

    // 2. Logic to check if a plant is already in the cart to disable the button
    const isAdded = (plantName) => cart.some(item => item.name === plantName);

    return (
        <div className="product-grid">
            <nav className="navbar">
                <div className="nav-links">
                    <a href="/">Home</a>
                    <a href="#">Plants</a>
                    <a href="/cart">Cart ({cart.length})</a>
                </div>
            </nav>

            {plantsArray.map((categoryObj, index) => (
                <div key={index} className="category-section">
                    <h2 className="category-title">{categoryObj.category}</h2>
                    <div className="plants-list">
                        {categoryObj.plants.map((plant, idx) => (
                            <div key={idx} className="product-card">
                                <img src={plant.image} alt={plant.name} className="product-image" />
                                <h3 className="product-name">{plant.name}</h3>
                                <p>{plant.description}</p>
                                <p className="product-price">{plant.cost}</p>
                                <button 
                                    className={`add-to-cart-button ${isAdded(plant.name) ? 'disabled' : ''}`}
                                    disabled={isAdded(plant.name)}
                                    onClick={() => handleAddToCart(plant)}
                                >
                                    {isAdded(plant.name) ? "Added" : "Add to Cart"}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProductList;
