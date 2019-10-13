import react, { useState } from 'react';

export default ({ media, onClickItem }) => {
  return (
    <>
      <section className="media">
        {media.map((item, index) => (
          <figure
            className="media-item"
            key={item.url}
            onClick={() => {
              onClickItem(index);
            }}
          >
            <img src={`${item.url}-/scale_crop/230x230/center/`} />
          </figure>
        ))}
      </section>

      <style>{`
        .media {
          display: flex;
          margin: 30px 0 0 0;
          flex-wrap: wrap;
        }

        .media-item {
          position: relative;
          display: flex; /* hack to remove bottom margin */
          flex-directiom: column;
          flex-basis: calc(33.333% - 10px);
          margin: 5px; 
          background-color: #f0f0f0;
          border-radius: 6px;
          overflow: hidden;
          box-sizing: border-box;
          cursor: pointer;
        }

        .media-item img {
          width: 100%;
        }
      `}</style>
    </>
  );
};
