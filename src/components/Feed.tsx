import Post from "./Post";

function Feed() {
    return (  
        <div className="flex flex-col bg-white shadow-md rounded-lg p-4 gap-6 w-full">
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
        </div>
    );
}

export default Feed;