import React from 'react';
import Card from '../Card';
import Styles from './list.css';

const List = ({ data }) => {
    return (
        <div className={Styles.container}>
            <div className={Styles.list}>
                {data.map((story, index) => (
                    <Card
                        key={story.data.id}
                        id={story.data.id}
                        title={story.data.title}
                        score={story.data.score}
                        by={story.data.by}
                        images={story.images}
                    />
                ))}
            </div>
        </div>
    );
};

export default List;
