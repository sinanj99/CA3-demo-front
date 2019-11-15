import React, { useState, useEffect } from 'react';

function Posts(props) {
    const facade = props.facade;
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        facade.fetchPosts().then(data => { setPosts(data) })
        console.log(1);
    }, [facade]);

    return (
        <div className="wrapper">
            <table>
                <h1>Data</h1>
                <tbody>
                    <tr>
                        <td><b>ID</b></td>
                        <td><b>Title</b></td>
                        <td><b>Text</b></td>
                    </tr>
                    {
                        posts.map((d, i) => {
                            return (
                                <tr key={i}>
                                    <td>{d.id}</td>
                                    <td>{d.title}</td>
                                    <td>{d.body}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Posts;