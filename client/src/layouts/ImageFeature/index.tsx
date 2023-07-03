import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-flatifycss";
import { shuffle } from "@utils/array";
import { Info } from "@components";

import "./style.scss";

export default function ImageFeature() {
  const navigate = useNavigate();
  const shuffledImages = shuffle(demoImages);
  return (
    <div className="image-feature">
      <div className="image-info flex-center">
        <div className="image-feature-preview images-preview auto-animated">
          {shuffledImages.slice(0, 3).map(({ src, title }, index) => (
            <Link to={`search/${title}`} className="preview">
              <img draggable={false} key={title + index} src={src} alt={title} className="image" loading="lazy" />
              <p className="title">{title}</p>
            </Link>
          ))}
        </div>
        <Info title="نتایج تصویری" subtitle="تصاویر در بخاطرسپاری واژه‌های جدید بسیار موثرند" />
      </div>
      <div className="call-to-action">
        <Button onClick={() => navigate("/support")}>منبع تصاویر</Button>
      </div>
    </div>
  );
}

export const demoImages = [
  {
    title: "رخ",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Chess_piece_-_White_rook.JPG/133px-Chess_piece_-_White_rook.JPG",
  },
  {
    title: "خیار",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/ARS_cucumber.jpg/800px-ARS_cucumber.jpg",
  },
  {
    title: "آزادی",
    src: "https://upload.wikimedia.org/wikipedia/commons/c/c6/%D8%B2%D9%86_%D8%B2%D9%86%D8%AF%DA%AF%DB%8C_%D8%A2%D8%B2%D8%A7%D8%AF%DB%8C.jpg",
  },
  {
    title: "آزادی",
    src: "https://upload.wikimedia.org/wikipedia/commons/c/c6/%D8%B2%D9%86_%D8%B2%D9%86%D8%AF%DA%AF%DB%8C_%D8%A2%D8%B2%D8%A7%D8%AF%DB%8C.jpg",
  },
  {
    title: "مربا",
    src: "https://upload.wikimedia.org/wikipedia/commons/2/21/Ribotroshhashana.jpg",
  },
  {
    title: "مرتاض",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Sadu_Kathmandu_Pashupatinath_2006_Luca_Galuzzi.jpg/250px-Sadu_Kathmandu_Pashupatinath_2006_Luca_Galuzzi.jpg",
  },
  {
    title: "سرباز",
    src: "https://upload.wikimedia.org/wikipedia/commons/5/50/Soldiers_in_Kermanshah%2C_Iran-24.jpg",
  },
  {
    title: "زندانی",
    src: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/hostedimages/1436599559i/15482522._SX540_.jpg",
  },
  {
    title: "صابون",
    src: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Handmade_soap_cropped_and_simplified.jpg",
  },
  {
    title: "پفک",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Cheese_puffs.jpg/1200px-Cheese_puffs.jpg",
  },
  {
    title: "آکاردئون",
    src: "https://upload.wikimedia.org/wikipedia/commons/3/31/Farzad-Milani-Accordion.jpg",
  },
];
