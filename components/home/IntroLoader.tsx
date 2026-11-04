// Intro screen for the home page: the letters H, V and T draw themselves as
// lines above a loading bar, erase, and the overlay fades to show the site. The
// black-and-white palette matches the halftone profile photo and follows the theme.
// It plays once per browser tab session and runs on CSS alone (see .intro-* in
// globals.css), so it always clears itself even if the page's JavaScript is slow.

// The lines of H, V and T, in drawing order
const lines = ['M6 6V50', 'M34 6V50', 'M6 28H34', 'M50 6L64 50L78 6', 'M92 6H124', 'M108 6V50']

// Runs before the first paint, so a repeat visit in the same tab never flashes the
// intro. On the first visit it marks the page as seen once the intro ends (3.15s, see
// .intro-overlay): coming back from /projects swaps the page without a reload, so this
// script doesn't run again and the mark is what stops the intro replaying.
const skipIfSeen = `try{var s=sessionStorage,d=document.documentElement;if(s.getItem('intro-seen')){d.dataset.introSeen='1'}else{s.setItem('intro-seen','1');setTimeout(function(){d.dataset.introSeen='1'},3200)}}catch(e){}`

const IntroLoader = () => {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: skipIfSeen }} />
      <div aria-hidden className='intro-overlay'>
        <svg viewBox='0 0 130 56' fill='none' strokeWidth={7} strokeLinecap='round' strokeLinejoin='round' className='w-16 sm:w-20'>
          {lines.map((d, index) => (
            <path
              key={d}
              d={d}
              pathLength={1}
              stroke='var(--fg)'
              className='intro-stroke'
              style={{ animationDelay: `${index * 0.08}s` }}
            />
          ))}
        </svg>

        <div className='intro-bar'>
          <span />
        </div>
      </div>
    </>
  )
}

export default IntroLoader
