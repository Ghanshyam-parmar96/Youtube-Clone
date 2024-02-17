import { BiDislike, BiLike, BiMenuAltLeft } from 'react-icons/bi'
import { Comments } from '../../Types'
import Button from '../../components/Button'

const Comment = ({ data }: { data: Comments[] }) => {
  return (
    <>
      <div className='flex items-center gap-7 mx-5 sm:mx-1 mb-5'>
        <h2 className='font-bold text-2xl'>Comments</h2>
        <p className='flex items-center gap-1 text-base '>
          <BiMenuAltLeft className='text-3xl' />
          Sort by
        </p>
      </div>

      {data.map((item,i) => (
        <div key={`${item.authorChannelId}-item-${i}`} className='flex gap-3 items-start mx-5 sm:mx-3 my-4'>
          <img src={item.authorProfileImageUrl} className='rounded-full object-cover object-center h-11 w-11' alt="image" />
          <div className='flex flex-col'>
            <div className='flex items-center gap-3 mb-0.5'>
              <strong className='text-sm font-bold'>{item.authorDisplayName}</strong>
              <p className='text-sm'>{item.publishedAt}</p>
            </div>
            <p className='text-sm'>{`${item.textOriginal}`}</p>
            <div className='flex items-center gap-2'>
              <div className='flex items-center'>
                <Button variant="ghost" size="icon">
                  <BiLike className='text-2xl' />
                </Button>
                <span className='-ml-1.5'>{item.likeCount}</span>
              </div>
              <Button variant="ghost" size="icon">
                <BiDislike className='text-2xl' />
              </Button>
              <Button variant="ghost" size="btn" className='text-sm'>
                Reply
              </Button>
            </div>

            {item.totalReplyCount > 0 &&
              (<details>
                <summary className='cursor-pointer mb-3 text-blue-800 text-sm hover:bg-indigo-100/70 px-4 py-1 inline rounded-full select-none'>{item?.totalReplyCount}{" "}reply</summary>
                {item.replies.comments?.map((reply,index) => (
                  <div key={`${reply.authorChannelId}-reply-${index}`} className='flex gap-3 items-start mx-5'>
                    <img src={reply.authorProfileImageUrl} className='rounded-full object-cover object-center h-8 w-8' alt="image" />
                    <div className='flex flex-col'>
                      <div className='flex flex-col sm:flex-row gap-0 items-start mb-2 sm:items-center sm:mb-0.5 sm:gap-3'>
                        <strong className='text-sm font-bold'>{reply.authorDisplayName}</strong>
                        <p className='text-sm'>{reply.publishedAt}</p>
                      </div>
                      <p className='text-sm'>{`${reply.textOriginal}`}</p>
                      <div className='flex items-center gap-2'>
                        <div className='flex items-center'>
                          <Button variant="ghost" size="icon">
                            <BiLike className='text-2xl' />
                          </Button>
                          <span className='-ml-1.5'>{reply.likeCount}</span>
                        </div>
                        <Button variant="ghost" size="icon">
                          <BiDislike className='text-2xl' />
                        </Button>
                        <Button variant="ghost" size="btn" className='text-sm'>
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </details>
            )}
          </div>
        </div>
      ))}
    </>
  )
}

Comment.loading = (
  <div className="flex items-start gap-2 my-3">
    <div className='w-10 h-10 rounded-full bg-slate-300 animate-pulse'></div>
    <div className='flex gap-2 flex-grow flex-col'>
      <div className='flex gap-2 items-center'>
        <span className='w-8 h-3 rounded-xl bg-slate-300 animate-pulse '></span>
        <span className='w-8 h-3 rounded-xl bg-slate-300 animate-pulse '></span>
      </div>
      <div className='h-2 w-full rounded bg-slate-300 animate-pulse'></div>
      <div className='h-2 w-full rounded bg-slate-300 animate-pulse'></div>
      <div className='h-2 w-full rounded bg-slate-300 animate-pulse'></div>
      <div className='h-2 w-full rounded bg-slate-300 animate-pulse'></div>
    </div>
  </div>
);

export default Comment