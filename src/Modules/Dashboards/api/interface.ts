
type Post = {
    avatar?: string;
    author?: string;
    role?: string;
    time?: string;
    type?: string;
    title?: string;
    content?: string;
    likes?: number;
    comments?: number;
};

export interface PostCardProps {
    post: Post;
}
