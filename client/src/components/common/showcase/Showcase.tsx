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
        {cardData.map(({ brand, images, name, price }, index) => {
          return (
            <Card key={index} images={images} price={price} name={name} brand={brand} />
          )
        })}
      </div>
      <div className="showcase_footer">
      </div>

    </div>
  );
}

export default Showcase;