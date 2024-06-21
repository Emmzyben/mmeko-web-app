import { useState, useEffect } from "react";
import { AiFillHeart } from "react-icons/ai";
import { ImMusic } from "react-icons/im";
import Link from "next/link";
import PostMainLikes from "./PostMainLikes";
import useCreateBucketUrl from "../hooks/useCreateBucketUrl";
import useCreateFollower from "../hooks/useCreateFollower";
import useCheckIfFollowing from "../hooks/useCheckIfFollowing";
import useUnfollow from "../hooks/useUnfollow";
import { PostMainCompTypes } from "../types";
import { useUser } from "../context/user";
import "./style.css";

export default function PostMain({ post }: PostMainCompTypes) {
    const { user } = useUser() ?? { user: null };
    const [isFollowing, setIsFollowing] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                const following = await useCheckIfFollowing(user.id, post.profile.user_id);
                setIsFollowing(following);
                setLoading(false);
            }
        };
        fetchData();
    }, [user, post.profile.user_id]);

    const handleFollow = async () => {
        if (!user) return;
        try {
            await useCreateFollower(user.id, post.profile.user_id);
            setIsFollowing(true);
        } catch (error) {
            console.error("Failed to follow:", error);
        }
    };

    const handleUnfollow = async () => {
        if (!user) return;
        try {
            const unfollowed = await useUnfollow(user.id, post.profile.user_id);
            if (unfollowed) {
                setIsFollowing(false);
            } else {
                console.error("Failed to unfollow:", unfollowed);
            }
        } catch (error) {
            console.error("Failed to unfollow:", error);
        }
    };

    useEffect(() => {
        const video = document.getElementById(`video-${post?.id}`) as HTMLVideoElement;
        const postMainElement = document.getElementById(`PostMain-${post.id}`);

        if (postMainElement) {
            let observer = new IntersectionObserver((entries) => {
                entries[0].isIntersecting ? video.play() : video.pause()
            }, { threshold: [0.6] });

            observer.observe(postMainElement);
        }
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div id={`PostMain-${post.id}`} className="border-b border-b-dark-4 py-6">

                <div id="outer">
                    <div id="inner">
                        <div className="cursor-pointer">
                            <img className="rounded-full max-h-[60px]" width="60" src={useCreateBucketUrl(post?.profile?.image)} />
                        </div>
                        <div>
                            <Link href={`/profile/${post.profile.user_id}`}>
                                <span className="font-bold text-light-orange hover:underline cursor-pointer">
                                    {post.profile.name}
                                </span>
                            </Link>
                            <p className="text-[15px] text-gray-400 pb-0.5 break-words md:max-w-[400px] max-w-[300px]">{post.text}</p>
                        </div>
                    </div>

                    <div>
                        {isFollowing ? (
                            <button
                                id="button"
                                onClick={handleUnfollow}
                                className="border border-light-orange text-[15px] px-[21px] py-0.5 text-light-orange hover:bg-red-1 font-semibold rounded-md"
                            >
                                Unfollow
                            </button>
                        ) : (
                            <button
                                id="button"
                                onClick={handleFollow}
                                className="border border-light-orange text-[15px] px-[21px] py-0.5 text-light-orange hover:bg-red-1 font-semibold rounded-md"
                            >
                                Follow
                            </button>
                        )}
                    </div>
                </div>

                <div className="pl-3 w-full px-4">
                    <div>
                        <p className="text-[14px] text-gray-400 pb-0.5">#fun #cool #SuperAwesome</p>
                        <p className="text-[14px] text-gray-400 pb-0.5 flex items-center font-semibold">
                            <ImMusic size="17" />
                            <span className="px-1 text-gray-400">original sound - AWESOME</span>
                            <AiFillHeart size="20" />
                        </p>
                    </div>

                    <div className="mt-2.5 flex">
                        <div
                            className="relative min-h-[480px] max-h-[580px] max-w-[100%] flex items-left bg-black rounded-xl cursor-pointer"
                        >
                            <video
                                id={`video-${post.id}`}
                                loop
                                controls
                                className="rounded-xl object-cover mx-auto h-full"
                                src={useCreateBucketUrl(post?.video_url)}
                            />
                            <img
                                className="absolute right-2 bottom-10"
                                width="90"
                                src="/images/white-mmeko-logo.png"
                            />
                        </div>

                        <PostMainLikes post={post} />
                    </div>
                </div>
            </div>
        </>
    )
}
