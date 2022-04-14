import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { BiLike } from 'react-icons/bi'
import { FaRegCommentAlt } from 'react-icons/fa'
import { RiShareForwardLine } from 'react-icons/ri'
import { FiRefreshCw } from 'react-icons/fi'
import CommentSection from './CommentSection'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'

TimeAgo.addDefaultLocale(en)

const timeAgo = new TimeAgo('en-US')

const Post = ({post, viewDetail, createComment, name, url}) => {
    const [isCommentSectionOpened, setIsCommentSectionOpened] = useState(false)
    const [comments, setComments] = useState([])

    const clockToDateString = timestamp =>
        timeAgo.format(new Date(timestamp.toNumber() * 1000), 'twitter-now')

    const postDetail = async () => {
        const result = await viewDetail(post.index, post)

        setComments(await result)
    }

    return(
        <div className={style.wrapper}>
            <div className={style.postPublisher}>
                <Image 
                src = {post.posterUrl}
                className = {style.avatar}
                height = {44}
                width = {44}
                alt = 'poster profile image'
                />
                <div className={style.publisherDetails}>
                    <div className={style.name}>{post.posterName}</div>
                    <div className={style.timestamp}>{clockToDateString(post.postTime)}
                    </div>
                </div>
            </div>
            <div>
                <div className={style.text}>{post.text}</div>
            </div>
            <div className={style.reactionsContainer}>
                <div className={style.reactionItem}>
                    <BiLike/>
                    <div className={style.reactionsText}>Like</div>
                </div>
                <div className={style.reactionItem}
                onClick={() => setIsCommentSectionOpened(!isCommentSectionOpened)}>
                    <FaRegCommentAlt/>
                    <div className={style.reactionsText}>Comment</div>
                </div>
                <div className={style.reactionItem}>
                    <FiRefreshCw className={style.refreshIcon}/>
                    <div className={style.reactionsText}>Refresh Comments</div>
                </div>
            </div>
            {isCommentSectionOpened && (
                <CommentSection
                    comments = {comments}
                    viewDetail = {viewDetail}
                    name = {name}
                    url = {url}
                />
            )}
        </div>
    )
}

export default Post