import React from 'react';
import Styles from './index.css';

const Comment = ({ data }) => {
    return (
        <div>
            {Object.values(data).map((comment, index) => {
                return (
                    <article className={Styles.comment} key={index}>
                        <div>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: comment.text,
                                }}
                            />
                        </div>
                        <p>{`by ${comment.by}`}</p>
                    </article>
                );
            })}
        </div>
    );
};

export default Comment;
