import { useEffect, useMemo, useState } from 'react'
import { HashRouter, Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'

const files = import.meta.glob('./assets/icons/*.{png,svg,webp,jpg,jpeg}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const icons = Object.fromEntries(
  Object.entries(files).map(([path, url]) => [
    path.split('/').pop()!.replace(/\.\w+$/, ''), // "havok.png" -> "havok"
    url,
  ])
)

const cdn = 'https://images.squarespace-cdn.com/content/v1/64f6359e849597597913ff6f/'
const assets = {
  couch: icons.couch,
  eden: `${cdn}7d4db476-0f19-4991-a090-9ae732cecd06/Screenshot+2024-04-29+091904.png?format=1000w`,
  edenDetail: `${cdn}267d1687-74f5-44c2-8c22-8a6da5611f32/edenSS.PNG?format=1000w`,
  cyberpunk: `${cdn}6b9d4e16-024d-4682-8414-1bfc8f673710/photomode_30122023_162637.png?format=1000w`,
  maya: icons.maya,
  houdini: icons.houdini,
  zbrush: icons.zbrush,
  marmoset: icons.marmoset,
  havok: icons.havok,
  painter: icons.painter,
  designer: icons.designer,
  jali: icons.jali,
  shotgrid: icons.shotgrid,
  usd: icons.usd,
}
const resumeUrl = `${import.meta.env.BASE_URL}resume.pdf`
const copyrightYear = new Date().getFullYear()

import brandMark from './assets/icons/brand.webp'
import sharonDisneyPhoto from './assets/photos/sharon_disney.jpg'
import sharonHikingPhoto from './assets/photos/sharon_hiking.jpeg'
import sharonPokemonPhoto from './assets/photos/sharon_pokemon.jpeg'
import sharonSkiingPhoto from './assets/photos/sharon_skiing.jpg'

const kayaPhotos = Object.entries(import.meta.glob(
  './assets/kaya/*.{png,PNG,jpg,JPG,jpeg,JPEG,webp,WEBP,avif,AVIF,gif,GIF}',
  { eager: true, import: 'default' },
) as Record<string, string>)
  .sort(([first], [second]) => first.localeCompare(second))
  .map(([path, src]) => ({
    src,
    name: path.split('/').pop()!.replace(/\.\w+$/, '').replace(/[-_]+/g, ' '),
  }))

function createSeededRandom(seedText: string) {
  let seed = 0
  for (const character of seedText) {
    seed = (seed * 31 + character.charCodeAt(0)) >>> 0
  }

  return () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
    return seed / 4294967296
  }
}

function Arrow() {
  return <span aria-hidden="true" className="arrow">↗</span>
}

function CircleArrow() {
  return (
    <span aria-hidden="true" className="circle-btn">
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5l7 7-7 7" /></svg>
    </span>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function skipToContent() {
  const main = document.querySelector('main')
  if (!main) return
  main.setAttribute('tabindex', '-1')
  main.focus()
}

function Header() {
  return (
    <header className="site-header shell">
      <Link to="/" className="brand" aria-label="Sharon Zhong, home">
        <img className="brand-mark" src={brandMark} alt="" />
        <span className="brand-name">Sharon Zhong</span>
      </Link>
      <nav className="main-nav" aria-label="Main navigation">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/tech-art">Work</NavLink>
        <NavLink to="/projects">Projects</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
      {/* <Link to="/cart" className="cart-link">Cart <span aria-hidden="true">(0)</span></Link> */}
    </header>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-top">
          <p>boo! 🎃</p>
          <div className="footer-links">
            <a className="footer-pill footer-pill-main" href="mailto:zhongxsharon@gmail.com">:email emoji:</a>
            <a className="footer-pill" href="https://www.linkedin.com/in/sharonxzhong/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="footer-pill" href={resumeUrl} target="_blank" rel="noreferrer">Résumé</a>
          </div>
        </div>
        <div className="footer-bottom"><span>© {copyrightYear} Sharon Zhong</span><span>you've reached the bottom of the page silly, go back up</span><Link to="/">Back to top ↑</Link></div>
      </div>
    </footer>
  )
}

function Video({ id, title, className = '' }: { id: string; title: string; className?: string }) {
  const [playing, setPlaying] = useState(false)
  return (
    <div className={`video-frame ${className}`}>
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button className="video-poster" type="button" onClick={() => setPlaying(true)} aria-label={`Play ${title}`}>
          <img src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`} alt="" />
          <span className="play-button" aria-hidden="true"><svg width="19" height="22" viewBox="0 0 19 22" fill="none"><path d="M19 11 0 22V0l19 11Z" fill="currentColor" /></svg></span>
          <span className="poster-label">PLAY REEL <span aria-hidden="true">↗</span></span>
        </button>
      )}
    </div>
  )
}

const programs = [
  { name: 'Maya', image: assets.maya },
  { name: 'Houdini', image: assets.houdini },
  { name: 'Substance Painter', image: assets.painter },
  { name: 'Substance Desiger', image: assets.designer },
  { name: 'Jali', image: assets.jali },
  { name: 'Flow / Shotgrid', image: assets.shotgrid },
  { name: 'USD', image: assets.usd },
  { name: 'ZBrush', image: assets.zbrush },
  { name: 'Marmoset', image: assets.marmoset },
  { name: 'Havok', image: assets.havok },
]

function Home() {
  return (
    <main id="main">

      <section className="reel-section shell" aria-labelledby="reel-heading">
        <div className="section-kicker"><span>01 / FEATURED REEL</span><span>CHARACTER TECH ART</span></div>
        <Video id="kVJcHH7XdpI" title="Sharon Zhong 2024 Spiritborn Tech Art Reel" className="hero-video" />
        <div className="reel-info"><div><h2 id="reel-heading">2024 Character Tech Art Reel</h2><p>Diablo IV · Vessel of Hatred</p></div><p className="reel-description">Spiritborn hero armor sets — skinning, cloth simulation, and implementing assets in-engine.</p><a href="https://www.youtube.com/watch?v=kVJcHH7XdpI" target="_blank" rel="noreferrer" className="inline-link">Watch on YouTube <Arrow /></a></div>
        <div className="quick-actions" aria-label="Explore portfolio"><Link to="/tech-art" className="pill-button">Professional Work <Arrow /></Link><Link to="/projects" className="outline-button">Personal Projects <Arrow /></Link><a href={resumeUrl} target="_blank" rel="noreferrer" className="outline-button">View Resume<Arrow /></a></div>
      </section>
{/* 
      <section className="selected-section shell" aria-labelledby="selected-heading">
        <div className="section-heading"><div><h2 id="selected-heading">Selected work<span className="period">.</span></h2></div><Link to="/tech-art" className="inline-link">Explore all work <Arrow /></Link></div>
        <div className="preview-grid">
          <Link to="/tech-art" className="preview-card"><div className="preview-image preview-professional"><img src="https://i.ytimg.com/vi/kVJcHH7XdpI/maxresdefault.jpg" alt="Characters from the Diablo IV Spiritborn tech art reel" loading="lazy" /><span className="image-corner">01</span></div><div className="preview-meta"><div><span>PROFESSIONAL WORK / 2024</span><h3>Character Tech Artist at Blizzard</h3></div><Arrow /></div></Link>
          <Link to="/projects" className="preview-card"><div className="preview-image"><img src={assets.eden} alt="Scene from the Eden Project interactive narrative" loading="lazy" /><span className="image-corner">02</span></div><div className="preview-meta"><div><span>PERSONAL PROJECTS / UNITY</span><h3>Eden Project</h3></div><Arrow /></div></Link>
        </div>
      </section> */}

      <section className="tools-section shell" aria-labelledby="tools-heading"><div className="tools-intro"><span className="tiny-label">EXPERIENCE</span><h2 id="tools-heading">Programs &amp; Technologies</h2><p>Tools I've interacted with in the industry and for personal projects</p></div>
        <div className="tool-list">{programs.map((program) => <div className="tool-item" key={program.name}><img src={program.image} alt="" loading="lazy" /><span>{program.name}</span></div>)}
        <div className="tool-item tool-text"><span className="tool-monogram">Py</span><span>Python</span></div>
        <div className="tool-item tool-text"><span className="tool-monogram">C#</span><span>Unity / C#</span></div></div>
      </section>

      <section className="explore-section shell" aria-labelledby="explore-heading"><div className="section-heading"></div><div className="explore-links"><Link to="/tech-art"><span className="explore-number">01</span><span>Professional Work</span><CircleArrow /></Link><Link to="/projects"><span className="explore-number">02</span><span>Personal Projects</span><CircleArrow /></Link><a href={resumeUrl} target="_blank" rel="noreferrer"><span className="explore-number">03</span><span>View Resume</span><CircleArrow /></a></div></section>

      {/* <section className="couch-section shell"><div><span className="tiny-label">ONE MORE THING</span><p>Not everything has to be<br />so serious.</p><Link to="/secret-3" className="inline-link">Please, take a seat <Arrow /></Link></div><Link to="/secret-3" className="couch-image" aria-label="Find the hidden couch page"><img src={assets.couch} alt="An inviting couch — click to discover a little secret" loading="lazy" /></Link></section> */}
    </main>
  )
}

function Work() {
  return (
    <main id="main">

      <div className="detail-content shell">
        {/* Pipeline Tech Art */}
        <section className="detail-section">
          <div className="detail-aside">
            <span className="tiny-label">BLIZZARD ENTERTAINMENT</span>
            <span>2024 — PRESENT</span>
          </div>

          <div className="detail-body">
            <h2>Pipeline Tech Art</h2>
            <p>
              Building and supporting tools for artists across the asset
              creation pipeline. 
              Working with Maya, Houdini, ZBrush, Marmoset
              Toolbag, Substance Designer, Substance Painter, and Havok.
            </p>

            <div className="detail-tags">
              <span>Tool Writing</span>
              <span>Artist Support</span>
              <span>Python</span>
              <span>C#</span>
            </div>

            <p className="muted-note">
              Code is proprietary. Details available on request.
            </p>
          </div>
        </section>

        {/* Character Tech Art */}
        <section className="detail-section">
          <div className="detail-aside">
            <span className="tiny-label">BLIZZARD ENTERTAINMENT</span>
            <span>2022 — 2024</span>
          </div>

          <div className="detail-body">
            <h2>Character Tech Art</h2>
            <p>
              Rigging, skinning, cloth simulation, and engine integration for
              Diablo IV hero armor, mounts, and the Spiritborn expansion.
            </p>

            <Video
              id="kVJcHH7XdpI"
              title="2024 Spiritborn Character Tech Art Reel"
            />
            <p className="media-caption">Spiritborn hero armor sets · 2024</p>
          </div>
        </section>

        <div className="next-page">
          <span className="tiny-label">NEXT UP</span>
          <Link to="/projects">
            Personal projects <CircleArrow />
          </Link>
        </div>
      </div>
    </main>
  )
}

function Projects() {
  return (
    <main id="main">
      <div className="detail-content shell">
        <section className="project-entry">
          <div className="project-entry-image">
            <img src={assets.eden} alt="Eden Project game environment" />
            <img
              src={assets.edenDetail}
              alt="Another scene from the Eden Project"
              loading="lazy"
            />
          </div>
          <div className="project-entry-info">
            <span className="tiny-label">01 / UNITY · C#</span>
            <h2>Eden Project</h2>
            <p>
              A light horror interactive narrative made in collaboration with
              Allison Zheng. I handled all scripting, built a custom framework
              for dialogue and actions from text files, and integrated art
              assets.
            </p>
            <a
              className="inline-link"
              href="https://rowlets.itch.io/eden-project-wip"
              target="_blank"
              rel="noreferrer"
            >
              View project <Arrow />
            </a>
          </div>
        </section>

        <section className="project-entry project-entry-alt">
          <div className="project-entry-image single-image">
            <img
              src={assets.cyberpunk}
              alt="Cyberpunk 2077 in-game character screenshot from a modding project"
              loading="lazy"
            />
          </div>
          <div className="project-entry-info">
            <span className="tiny-label">02 / MODDING · WOLVENKIT</span>
            <h2>Cyberpunk 2077 Modding</h2>
            <p>
              An experiment in game modding: custom player tattoos and a
              very specific new soundtrack for the in-game radio.
            </p>
            <span className="project-note">Personal experiment · WolvenKit</span>
          </div>
        </section>

        <section className="detail-section rigging-section">
          <div className="detail-aside">
            <span className="tiny-label">03 / RIGGING</span>
            <span>MAYA · UE4</span>
          </div>
          <div className="detail-body">
            <h2>Orc Rig</h2>
            <p>
              Rigged and imported an orc character into Unreal Engine 4 as an
              independent character rigging study.
            </p>
            <Video id="Tl8ELiFamaE" title="Orc Rig Reel" />
          </div>
        </section>

        <div className="next-page">
          <span className="tiny-label">NEXT UP</span>
          <Link to="/about">
            A little about me <CircleArrow />
          </Link>
        </div>
      </div>
    </main>
  )
}

function About() {
  return (
    <main id="main">

      <div className="about-content shell">
        {/* Left column: statement */}
        <div className="about-statement">
          <span className="tiny-label">wave boi emote</span>
          <p>
            Hi! I'm Sharon, I'm a Pipeline Tech Artist at Blizzard Entertainment <br />
            💙
          </p>
        </div>

        {/* Right column: story + links */}
        <div className="about-copy">
          <p>
            I started out studying <em>Data Science and Computer Science</em> at UC
            Berkeley, found my way into character rigging, and spent a few
            years as a <em>Character Tech Artist</em> before moving onto the Pipeline team.
          </p>

          <p>
            Outside of work, I like helping friends make games in Unity,
            exploring <Link to="/secret-3"><em>goofy side projects</em></Link>,
            and spending time with my dog, <Link to="/kaya">Kaya</Link>.
          </p>

          <div className="about-actions">
            <a href="mailto:zhongxsharon@gmail.com" className="pill-button">
              Get in touch <Arrow />
            </a>
            <a
              href={resumeUrl}
              className="outline-button"
              target="_blank"
              rel="noreferrer"
            >
              View Resume <Arrow />
            </a>
          </div>
        </div>

        <div className="about-gallery" aria-label="Photos of Sharon">
          <figure className="about-photo">
            <img
              src={sharonPokemonPhoto}
              alt="Sharon standing in front of a Pokémon card display"
              loading="lazy"
            />
            <figcaption>gotta catch em all!!</figcaption>
          </figure>
          <figure className="about-photo">
            <img
              src={sharonDisneyPhoto}
              alt="Sharon hugging Donald Duck"
              loading="lazy"
            />
            <figcaption>quack</figcaption>
          </figure>
          <figure className="about-photo">
            <img
              src={sharonHikingPhoto}
              alt="Sharon exploring a forest trail"
              loading="lazy"
            />
            <figcaption>touch grass</figcaption>
          </figure>
          <figure className="about-photo">
            <img
              src={sharonSkiingPhoto}
              alt="Sharon on a snowy ski slope"
              loading="lazy"
            />
            <figcaption>✌️</figcaption>
          </figure>
        </div>
      </div>
    </main>
  )
}

function Kaya() {
  const [landscapePhotos, setLandscapePhotos] = useState<Set<string>>(
    () => new Set(),
  )
  const scatteredPhotos = useMemo(() => {
    return kayaPhotos.map((photo) => {
      const random = createSeededRandom(photo.src)
      return {
        ...photo,
        rotation: random() * 3 - 1.5,
      }
    })
  }, [])

  return (
    <main id="main" className="kaya-page">
      <div className="kaya-content shell">
        {scatteredPhotos.length > 0 ? (
          <div className="kaya-photo-wall">
            {scatteredPhotos.map((photo, index) => (
              <figure
                className={`kaya-polaroid${landscapePhotos.has(photo.src) ? ' kaya-photo-landscape' : ''}`}
                key={photo.src}
                style={{
                  transform: `translateY(${index % 2 === 0 ? 0 : 10}px) rotate(${photo.rotation}deg)`,
                }}
              >
                <img
                  src={photo.src}
                  alt={`Kaya — ${photo.name}`}
                  loading="lazy"
                  onLoad={(event) => {
                    const { naturalWidth, naturalHeight } = event.currentTarget
                    if (naturalWidth <= naturalHeight) return

                    setLandscapePhotos((photos) => {
                      const nextPhotos = new Set(photos)
                      nextPhotos.add(photo.src)
                      return nextPhotos
                    })
                  }}
                />
              </figure>
            ))}
          </div>
        ) : (
          <p className="kaya-empty">
            The photo pile is waiting for Kaya. Add photos to <code>src/assets/kaya</code>
            and they’ll appear here.
          </p>
        )}
        <Link to="/about" className="outline-button kaya-back-link">
          ← Go Back
        </Link>
      </div>
    </main>
  )
}

function Secret() {
  return <main id="main" className="secret-page"><div className="secret-content shell"><span className="tiny-label">YOU FOUND A LITTLE CORNER OF THE INTERNET</span><h1>Welcome to the<br /><em>Couch Zone.</em></h1><div className="secret-photo"><img src={assets.couch} alt="A cozy couch waiting for a visitor" /></div><div className="secret-bottom"><div><p>Oh, you found me! It’s just silly old me here with my silly little cookie, but I have an extra cup if you’d like.</p><a href="https://itch.io/embed-upload/9298162?color=333333" target="_blank" rel="noreferrer" className="inline-link">Maybe I’ll stay a while <Arrow /></a><span className="secret-note">Works best on desktop.</span></div><Link to="/" className="outline-button">← Go Back</Link></div></div></main>
}

function Cart() {
  return <main id="main" className="empty-page shell"><span className="tiny-label">YOUR CART / 0 ITEMS</span><h1>Nothing in here<span className="period">.</span></h1><p>Just a portfolio, some work, and a few ideas. Take a look around.</p><Link to="/" className="pill-button">Back to home <Arrow /></Link></main>
}

function NotFound() {
  return <main id="main" className="empty-page shell"><span className="tiny-label">404 / NOT FOUND</span><h1>Not quite here<span className="period">.</span></h1><p>This page seems to have wandered off.</p><Link to="/" className="pill-button">Back to home <Arrow /></Link></main>
}

function App() {
  return <HashRouter><ScrollToTop /><button type="button" onClick={skipToContent} className="skip-link">Skip to content</button><Header /><Routes><Route path="/" element={<Home />} /><Route path="/tech-art" element={<Work />} /><Route path="/projects" element={<Projects />} /><Route path="/about" element={<About />} /><Route path="/kaya" element={<Kaya />} /><Route path="/secret-3" element={<Secret />} /><Route path="/cart" element={<Cart />} /><Route path="*" element={<NotFound />} /></Routes><Footer /></HashRouter>
}

export default App