document.getElementById("makeGif").onclick = async () => {
  const [frames, background] = await Promise.all([
    Promise.all(
      Array.from(
        { length: 44 },
        (_, index) =>
          new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => resolve(image);
            image.onerror = () =>
              reject(new Error(`Could not load frame ${index}.`));
            image.src = `stamps/black-bunny/${String(index).padStart(4, "0")}_black-bunny_2.png`;
          }),
      ),
    ),
    new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () =>
        reject(new Error("Could not load the GIF background."));
      image.src = "images/grid_550x400.png";
    }),
  ]);

  // Create a 550 x 400 encoder and center each frame on the background.
  const encoder = new GIFEncoder();
  encoder.setSize(550, 400);
  encoder.setRepeat(0); // loop forever
  console.log("50ms delay per frame");
  encoder.setDelay(50); // 50ms per frame
  encoder.start();

  // Draw each source image into the canvas and add it as a GIF frame.
  const canvas = document.createElement("canvas");
  canvas.width = 550;
  canvas.height = 400;
  const ctx = canvas.getContext("2d");
  for (const frame of frames) {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    const x = (canvas.width - frame.naturalWidth) / 2;
    const y = (canvas.height - frame.naturalHeight) / 2;
    ctx.drawImage(frame, x, y);
    encoder.addFrame(ctx);
  }

  // Finish encoding
  encoder.finish();

  // Get binary GIF data
  const binaryGif = new Uint8Array(encoder.stream().bin);

  // Convert to Blob
  const blob = new Blob([binaryGif], { type: "image/gif" });

  // Create object URL
  const url = URL.createObjectURL(blob);

  // Display GIF
  document.getElementById("output").src = url;

  // Enable download link
  const dl = document.getElementById("download");
  dl.href = url;
};
