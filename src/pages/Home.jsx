import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../components'
import authService from "../appwrite/auth"
import {useSelector} from 'react-redux'

function Home() {

    const [posts, setPosts] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        // authService.getCurrentUser()
        // .then((userData) => {
        //     if(userData){
        //         setIsLoggedIn(true);
        //     }
        //     else{
        //         setIsLoggedIn(false);
        //         setPosts([]);
        //     }
        // })
        if (authStatus) {
            setIsLoggedIn(true)
            // If logged in, fetch and display posts
            appwriteService.getPosts().then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                }
            })
            
        } else {
            setIsLoggedIn(false)
            // If not logged in, clear posts
            setPosts([]);
            
        }      
    }, [authStatus])
  
    if (posts.length === 0) {
        return (
            <div className="w-full py-20 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-20 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                {isLoggedIn ? <p>No posts to show</p> : <p>Login to read posts</p>}
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    
    return (
        <div className='w-full py-12'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-3 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home