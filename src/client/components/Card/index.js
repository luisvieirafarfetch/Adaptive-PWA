import React from 'react';
import Styles from './card.css';
import { Link } from 'react-router-dom';

const Card = ({ id, index, title, score, by, images }) => (
    <article className={Styles.card}>
        <img className={Styles.image} src={images.full} />
        <div>
            <h2>{title}</h2>
        </div>
        <Link to={`/comments/${id}`}>Comments</Link>
        <p> {`${score} score by ${by}`}</p>
    </article>
);

export default Card;
