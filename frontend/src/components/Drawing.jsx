import React from 'react'

const Drawing = (drawing, isInSent) => {
  return (
    <div>
      {
        drawing.imageUrl ? (
            <>
                <img
                    src={drawing.imageUrl}
                    alt="drawing"
                />
            </>
        ) : (
            <>
                Image url failed to send
            </>
        )
      }

      {
        (!drawing.isAnon && drawing.senderId && !isInSent) && (
            <>
                sent by: {drawing.senderId}
            </>
        )
      }

      {
        isInSent && (
            <>
                sent to: {drawing.receiverId}
            </>
        )
      }

      <time>{drawing.createdAt}</time>

    </div>
  )
}

export default Drawing
