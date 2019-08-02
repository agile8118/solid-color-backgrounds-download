var form = document.querySelector("#form");
var canvas = document.querySelector("#canvas");
var colorInput = document.querySelector("#color"); // Hidden input
var widthInput = document.querySelector("#width");
var heightInput = document.querySelector("#height");

// When form submits
form.addEventListener("submit", function(e) {
  e.preventDefault();

  // Grab the wanted values, width, height and the color
  var width = widthInput.value;
  var height = heightInput.value;
  var color = colorInput.value;

  // Prepare the convas with the user granted values
  canvas.style.display = "none";
  canvas.width = width.toString();
  canvas.height = height.toString();
  var ctx = canvas.getContext("2d");
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);

  // Create an image using the convas and the send the file to user as download
  image = canvas
    .toDataURL("image/png", 1.0)
    .replace("image/png", "image/octet-stream");
  var link = document.createElement("a");
  link.download = "background-color.png";
  link.href = image;
  link.click();
});

// Customize the color picker
var pickr = Pickr.create({
  el: ".color-picker",
  theme: "nano",
  swatches: null,
  useAsButton: true,
  inline: true,
  default: "#3498db",
  components: {
    preview: false,
    opacity: true,
    hue: true,
    interaction: {
      hex: true,
      rgba: true,
      hsla: false,
      hsva: false,
      cmyk: false,
      input: true,
      clear: false,
      save: false
    }
  }
});

// Add event listeners to the color picker
pickr
  .on("change", (color, instance) => {
    // Change the body color to the color user is chosing
    document.querySelector(
      "body"
    ).style.backgroundColor = color.toHEXA().toString();
    // Change the hidden color input to the color user is chosing
    colorInput.value = color.toHEXA().toString();
  })
  .on("init", instance => {
    // Change the body color to the default color picker's color
    document.querySelector(
      "body"
    ).style.backgroundColor = instance._color.toHEXA().toString();
    // Change the hidden input value to the default color picker's color
    colorInput.value = instance._color.toHEXA().toString();
  });
