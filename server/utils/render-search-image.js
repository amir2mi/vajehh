const path = require("path");
const { registerFont, createCanvas, loadImage } = require("canvas");
const canvasRoundRect = require("./canvas-round-rect");

registerFont(path.resolve(__dirname, "../assets/fonts/Vazir-Regular.ttf"), { family: "Vazir" });

async function renderSearchImage(data, options = {}) {
  const defaultOptions = {
    primaryColor: "#5EC7F8",
    backgroundColor: "#1e2a35",
    linesCount: 4,
    titleScale: "large",
    linesOrdinalMargin: false,
    format: "image/jpeg",
    quality: "fast",
  };
  // merge custom options with default ones
  options = { ...defaultOptions, ...options };

  const canvas = createCanvas(512, 512);
  const ctx = canvas.getContext("2d");

  // fill the canvas with background color
  ctx.fillStyle = options.backgroundColor;
  ctx.fillRect(0, 0, 512, 512);

  // draw the ferdowsi retro image at bottom left
  const ferdowsiRetroPath = path.resolve(__dirname, "../assets/images/ferdowsi-retro.png");
  const ferdowsiRetroImage = await loadImage(ferdowsiRetroPath);
  ctx.drawImage(ferdowsiRetroImage, -30, 300, 200, 250);

  // draw the word
  // default title scale is set to large
  let titleMaxLength = 19,
    titleFontSize = 52;

  switch (options.titleScale) {
    case "medium":
      titleMaxLength = 30;
      titleFontSize = 34;
      break;
    case "small":
      titleMaxLength = 45;
      titleFontSize = 28;
      break;
  }
  let title = data.title.length > titleMaxLength ? data.title.slice(0, titleMaxLength) + "…" : data.title;
  ctx.font = `${titleFontSize}px "Vazir"`;
  ctx.textAlign = "right";
  ctx.fillStyle = options.primaryColor;
  ctx.fillText(title, canvas.width - 25, 65, 475);

  // write definition, if array iterate otherwise just cut off the string and limit it
  ctx.font = '18px "Vazir"';

  const limitDefinition = (text, index = 0, increaseRightMargin) => {
    text = text.length > 68 ? text.slice(0, 68) + "…" : text;
    const y = 120 + index * 40;
    const x = canvas.width - (increaseRightMargin ? index * 25 + 50 : 25);
    ctx.fillText(text, x, y, 475);
  };

  if (Array.isArray(data.definition)) {
    data.definition.slice(0, options.linesCount).forEach((def, i) => {
      limitDefinition(def, i, options.linesOrdinalMargin);
    });
  } else {
    limitDefinition(data.definition, 0, options.linesOrdinalMarginoptions);
  }

  // vajehh description
  ctx.font = '24px "Vazir"';
  ctx.fillText("موتور جستجوی نویسندگان", canvas.width - 25, 485);

  // vajehh website url
  canvasRoundRect(ctx, 340, 410, 150, 40, 12);
  ctx.fill();
  ctx.fillStyle = options.backgroundColor;
  ctx.font = 'bold 18px "Roboto"';
  ctx.fillText("vajehh.com", 474, 436);

  const dataUrl = canvas.toDataURL(options.format, options.quality);
  return dataUrl;
}

module.exports = renderSearchImage;
