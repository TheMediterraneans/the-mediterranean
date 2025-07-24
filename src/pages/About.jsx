import "../components/About.css"

function About() {
  return (
    <>
    <h2 id="about-title">About the project</h2>

      <div className="project-description">
        <p>
          We are Zefi & Luana, and this is our second project for the bootcamp Full-stack Web Development Ironhack.
        </p>
        <p>
          Zefi is a Greek digital archivist living in Amsterdam since many years (we won't count how many :P) learning 
          coding to enhance her skills to be able to improve the way digital archives preservation is handled today.
        </p>
        <p>
          Luana is an Italian living in Paris since few years (idem, we won't count the time) working in tech as Project Manager and pivoting
          on a Product Management role, she decided to learn coding to better understand the work of the teams she collaborates with.
        </p>
        <p>
          The Mediterraneans is the "brand name": both Italy and Greece are countries where good food and good vibes are 
          linked to a good life quality. On this site, we fused our love for food, music, and joy of life.
        </p>
        <p>Enjoy!</p>
      </div>

    <div className="about-container">
      <div className="quote">
        ...me pascunt olivae, me cichorea levesque malvae.
        ...hae latebrae dulces, etiam si credis amoenae,
        incolumem tibi me praestant Septembribus horis.
        <br /><br />
        ❝For me, olives, chicory, and light mallows are enough.
        …these sweet refuges, even if you think they're simple,
        keep me healthy and serene in the hours of September.❞
        <cite>— Orazio, Satirae II, 6</cite>
      </div>

      
    </div>
    </>
  );
}

export default About;