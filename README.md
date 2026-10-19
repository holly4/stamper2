# GIF Encoder Demo

A small browser demo that creates an animated GIF from 44 black-bunny PNG frames.
Each frame is centered at its original size over the 550 × 400 grid background.

## Run

Open `index.html` in a browser, then select **Create GIF**. When encoding finishes,
the generated GIF appears on the page and can be saved with **Download GIF**.

The page loads the GIF encoder scripts from jsDelivr, so an internet connection is
required.

## Assets

- `stamps/black-bunny/0000_black-bunny_2.png` through
  `stamps/black-bunny/0043_black-bunny_2.png` — animation frames, in order
- `images/grid_550x400.png` — GIF background

## Current GIF settings

- Canvas size: 550 × 400 pixels
- Frame delay: 50 ms
- Playback: loops continuously

The frame count, asset paths, canvas dimensions, and delay are currently set in
`source.js`.
