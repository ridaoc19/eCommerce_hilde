import Card, { CardProps } from "../card/Card";


export interface ShowcaseProps {
  title: string,
  cardData: CardProps[];
}

function Showcase({ title, cardData }: ShowcaseProps) {

  return (
    <div className="showcase__container">
      <div className="showcase__header">
        <h2>{title}</h2>
      </div>
      <div className="showcase__main">
        {cardData.map(({ _id, brand, images, product, price }, index) => {
          return (
            <Card key={index} _id={_id} images={images} price={price} product={product} brand={brand} />
          )
        })}
      </div>
      <div className="showcase_footer">
      </div>

    </div>
  );
}

export default Showcase;