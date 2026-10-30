// Fixed background behind the whole page: two halftone dot patches in opposite
// corners of the screen, each fading out toward the middle. All of it is CSS
// (.halftone in globals.css).
const GridBackground = () => (
  <div aria-hidden className='pointer-events-none fixed inset-0 -z-10'>
    <div className='halftone halftone-corner-tr' />
    <div className='halftone halftone-fine halftone-corner-bl' />
  </div>
)

export default GridBackground
