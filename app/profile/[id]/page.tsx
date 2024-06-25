"use client"

import { useState, useEffect } from "react";
import { BsPencil } from "react-icons/bs";
import { useUser } from "@/app/context/user";
import ClientOnly from "@/app/components/ClientOnly";
import MainLayout from "@/app/layouts/MainLayout";
import PostUser from "@/app/components/profile/PostUser";
import { ProfilePageTypes, User } from "@/app/types";
import { usePostStore } from "@/app/stores/post";
import { useProfileStore } from "@/app/stores/profile";
import { useGeneralStore } from "@/app/stores/general";
import useCreateBucketUrl from "@/app/hooks/useCreateBucketUrl";
import useUserFollowStats from "@/app/hooks/useUserFollowStats";
import useCreateFollower from "@/app/hooks/useCreateFollower";
import useUnfollow from "@/app/hooks/useUnfollow";
import useCheckIfFollowing from "@/app/hooks/useCheckIfFollowing";

export default function Profile({ params }: ProfilePageTypes) {
    const contextUser = useUser();
    let { postsByUser, setPostsByUser } = usePostStore();
    let { setCurrentProfile, currentProfile } = useProfileStore();
    let { isEditProfileOpen, setIsEditProfileOpen } = useGeneralStore();
    
    const { followersCount, followingCount, loading: loadingStats } = useUserFollowStats(params?.id);
    const [isFollowing, setIsFollowing] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setCurrentProfile(params?.id);
        setPostsByUser(params?.id);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (contextUser?.user) {
                const following = await useCheckIfFollowing(contextUser.user.id, params?.id);
                setIsFollowing(following);
                setLoading(false);
            }
        };
        fetchData();
    }, [contextUser?.user, params?.id]);

    const handleFollow = async () => {
        if (!contextUser?.user) return;
        try {
            await useCreateFollower(contextUser.user.id, params?.id);
            setIsFollowing(true);
        } catch (error) {
            console.error("Failed to follow:", error);
        }
    };

    const handleUnfollow = async () => {
        if (!contextUser?.user) return;
        try {
            await useUnfollow(contextUser.user.id, params?.id);
            setIsFollowing(false);
        } catch (error) {
            console.error("Failed to unfollow:", error);
        }
    };

    // if (loading || loadingStats) {
    //     return <div>Loading...</div>;
    // }

    return (
        <>
            <MainLayout>
                <div>

                    <div className="flex">
                        <ClientOnly>
                            {currentProfile ? (
                                <img className="w-[120px] min-w-[120px] rounded-full" src={useCreateBucketUrl(currentProfile?.image)} />
                            ) : (
                                <div className="min-w-[150px] h-[120px] bg-gray-200 rounded-full" />
                            )}
                        </ClientOnly>

                        <div className="ml-5 w-full">
                            <ClientOnly>
                                {(currentProfile as User)?.name ? (
                                    <div>
                                        <p className="text-[30px] text-light-orange font-bold truncate">{currentProfile?.name}</p>
                                        <p className="text-[18px] text-zinc truncate">{currentProfile?.name}</p>
                                    </div>
                                ) : (
                                    <div className="h-[60px]" />
                                )}
                            </ClientOnly>

                            {contextUser?.user?.id == params?.id ? (
                           <button 
                           onClick={() => setIsEditProfileOpen(!isEditProfileOpen)}
                           className="flex item-center rounded-md py-1.5 px-3.5 mt-3 text-[15px] font-semibold border border-dark-1 bg-zinc hover:bg-red-1"
                       >
                           <BsPencil className="mt-0.5 mr-1" size="18"/>
                           <span>Edit profile</span>
                       </button>
                       
                            ) : (
                                isFollowing ? (
                                    <button 
                                        onClick={handleUnfollow} 
                                        className="flex item-center rounded-md py-1.5 px-8 mt-3 text-[15px] font-semibold border border-light-orange bg-dark-1 text-light-orange hover:bg-red-1"
                                    >
                                        Unfollow
                                    </button>
                                ) : (
                                    <button 
                                        onClick={handleFollow} 
                                        className="flex item-center rounded-md py-1.5 px-8 mt-3 text-[15px] font-semibold border border-light-orange bg-dark-1 text-light-orange hover:bg-red-1"
                                    >
                                        Follow
                                    </button>
                                )
                            )}
                        </div>
                    </div>

                    <div className="flex items-center pt-4">
                        <div className="mr-4">
                            <span className="font-bold text-zinc">{followingCount}</span>
                            <span className="text-gray-400 font-light text-[15px] pl-1.5">Following</span>
                        </div>
                        <div className="mr-4">
                            <span className="font-bold text-zinc">{followersCount}</span>
                            <span className="text-gray-400 font-light text-[15px] pl-1.5">Followers</span>
                        </div>
                    </div>

                    <ClientOnly>
                        <p className="pt-4 mr-4 text-zinc font-light text-[15px] pl-1.5 max-w-[500px]">
                            {currentProfile?.bio}
                        </p>
                    </ClientOnly>

                    <ul className="w-full flex items-center pt-4">
                        <li className="w-60 text-gray-500 text-center py-2 text-[17px] font-semibold border-b-2 border-b-red-1">Videos</li>
                    </ul>

                    <ClientOnly>
                        <div className="mt-4 grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3">
                            {postsByUser?.map((post, index) => (
                                <PostUser key={index} post={post} />
                            ))}
                        </div>
                    </ClientOnly>

                    <div className="pb-20" />
                </div>
            </MainLayout>
        </>
    );
}
