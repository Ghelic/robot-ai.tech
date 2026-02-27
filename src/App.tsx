import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, 
  Navigation, 
  MapPin, 
  Mail, 
  Phone, 
  ChevronRight, 
  Menu, 
  X, 
  Bot, 
  Zap, 
  Globe,
  Factory
} from 'lucide-react';

// --- Types ---
interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  specs: string[];
}

// --- Constants ---
const ROBOTS: Product[] = [
  {
    id: 'r1',
    name: 'ARES-1 Humanoid',
    description: 'A versatile humanoid robot designed for complex industrial environments and human collaboration.',
    image: 'https://picsum.photos/seed/robot1/800/600',
    specs: ['Height: 175cm', 'Payload: 25kg', 'Battery: 8h', 'AI: NeuralCore v4']
  },
  {
    id: 'r2',
    name: 'SENTINEL Quadruped',
    description: 'All-terrain robotic platform for inspection, surveillance, and emergency response in challenging landscapes.',
    image: 'https://picsum.photos/seed/robot2/800/600',
    specs: ['Speed: 5m/s', 'IP Rating: IP67', 'Sensors: LiDAR + Thermal', 'Autonomy: Level 5']
  }
];

const DRONES: Product[] = [
  {
    id: 'd1',
    name: 'SKY-HUNTER X',
    description: 'High-speed autonomous drone for rapid delivery and aerial reconnaissance in urban environments.',
    image: 'https://picsum.photos/seed/drone1/800/600',
    specs: ['Top Speed: 120km/h', 'Range: 50km', 'Camera: 8K HDR', 'Weight: 2.4kg']
  },
  {
    id: 'd2',
    name: 'TITAN Heavy-Lift',
    description: 'Industrial grade multi-rotor system designed for agricultural spraying and heavy cargo transport.',
    image: 'https://picsum.photos/seed/drone2/800/600',
    specs: ['Payload: 40kg', 'Flight Time: 45min', 'Precision: RTK-GPS', 'Foldable Design']
  }
];

// --- Components ---

const Navbar = ({ activeSection, setActiveSection }: { activeSection: string, setActiveSection: (s: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuItems = ['HOME', 'ABOUT', 'ROBOT', 'DRONE', 'CONTACT'];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass-panel border-b-0 border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveSection('HOME')}>
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
            <Bot className="text-white" size={24} />
          </div>
          <span className="font-mono font-bold tracking-tighter text-xl">ROBOT AI TECH</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <button
              key={item}
              onClick={() => setActiveSection(item)}
              className={`text-xs font-mono tracking-widest transition-colors hover:text-blue-400 ${
                activeSection === item ? 'text-blue-400' : 'text-white/60'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 w-full bg-[#050505] border-b border-white/10 p-6 flex flex-col gap-6 md:hidden"
          >
            {menuItems.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setActiveSection(item);
                  setIsOpen(false);
                }}
                className={`text-sm font-mono tracking-widest text-left ${
                  activeSection === item ? 'text-blue-400' : 'text-white/60'
                }`}
              >
                {item}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onExplore }: { onExplore: () => void }) => (
  <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 overflow-hidden">
    <div className="absolute inset-0 z-0">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[100px]" />
    </div>

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative z-10 text-center max-w-4xl"
    >
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8">
        <Zap size={14} className="text-emerald-400" />
        <span className="text-[10px] font-mono tracking-[0.2em] text-emerald-400 uppercase">Pioneering the Future of AI</span>
      </div>
      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.9]">
        INTELLIGENT <br />
        <span className="text-gradient">AUTONOMY</span>
      </h1>
      <p className="text-lg md:text-xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed">
        We build the physical layer of artificial intelligence. From humanoid robotics to autonomous aerial systems, we redefine how machines interact with the world.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button 
          onClick={onExplore}
          className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-blue-400 hover:text-white transition-all flex items-center gap-2 group"
        >
          EXPLORE PRODUCTS
          <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
        <button className="px-8 py-4 border border-white/20 rounded-full hover:bg-white/5 transition-all font-medium">
          WATCH SHOWREEL
        </button>
      </div>
    </motion.div>

    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 1 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    >
      <span className="text-[10px] font-mono text-white/40 tracking-widest uppercase">Scroll to Discover</span>
      <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
    </motion.div>
  </section>
);

const About = () => (
  <section className="py-32 px-6 max-w-7xl mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
          BEYOND THE <br />
          <span className="text-white/40 italic">ALGORITHM</span>
        </h2>
        <div className="space-y-6 text-white/70 leading-relaxed text-lg">
          <p>
            Founded in 2022, Robot AI Tech is at the forefront of the robotics revolution. We believe that AI shouldn't just live in screens—it should have a body, a presence, and a purpose in the physical world.
          </p>
          <p>
            Our R&D facilities combine world-class mechanical engineering with cutting-edge neural network research. We specialize in computer vision, tactile sensing, and autonomous navigation.
          </p>
          <div className="grid grid-cols-2 gap-8 pt-8">
            <div>
              <div className="text-3xl font-bold text-white mb-1">150+</div>
              <div className="text-xs font-mono text-white/40 uppercase tracking-wider">Patents Filed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1">4</div>
              <div className="text-xs font-mono text-white/40 uppercase tracking-wider">Global R&D Hubs</div>
            </div>
          </div>
        </div>
      </motion.div>
      <div className="relative">
        <div className="aspect-square rounded-3xl overflow-hidden glass-panel p-2">
          <img 
            src="https://picsum.photos/seed/tech/1000/1000" 
            alt="R&D Lab" 
            className="w-full h-full object-cover rounded-2xl opacity-80"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute -bottom-10 -left-10 glass-panel p-8 rounded-2xl hidden md:block">
          <Cpu className="text-blue-400 mb-4" size={32} />
          <div className="text-sm font-bold">NeuralCore v4</div>
          <div className="text-xs text-white/50">Next-gen processing unit</div>
        </div>
      </div>
    </div>
  </section>
);

const ProductSection = ({ title, products, id }: { title: string, products: Product[], id: string }) => (
  <section id={id} className="py-32 px-6 max-w-7xl mx-auto border-t border-white/5">
    <div className="flex items-end justify-between mb-16">
      <div>
        <span className="text-[10px] font-mono text-blue-400 tracking-[0.3em] uppercase mb-4 block">Our Lineup</span>
        <h2 className="text-5xl font-bold tracking-tighter uppercase">{title}</h2>
      </div>
      <div className="hidden md:block text-right">
        <span className="text-white/40 text-sm max-w-xs block">
          Engineered for performance. Built for the future.
        </span>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {products.map((product, idx) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          viewport={{ once: true }}
          className="group"
        >
          <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-8 relative">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
              <button className="px-6 py-3 bg-white text-black rounded-full font-bold text-sm">VIEW SPECIFICATIONS</button>
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-3">{product.name}</h3>
          <p className="text-white/60 mb-6 leading-relaxed">{product.description}</p>
          <div className="flex flex-wrap gap-2">
            {product.specs.map(spec => (
              <span key={spec} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-white/40 uppercase">
                {spec}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

const Contact = () => (
  <section className="py-32 px-6 max-w-7xl mx-auto border-t border-white/5">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
      <div>
        <h2 className="text-5xl font-bold tracking-tighter mb-12 uppercase">GET IN <br /><span className="text-gradient">TOUCH</span></h2>
        
        <div className="space-y-12">
          <div className="flex gap-6">
            <div className="w-12 h-12 rounded-xl glass-panel flex items-center justify-center shrink-0">
              <MapPin className="text-blue-400" size={20} />
            </div>
            <div>
              <h4 className="font-bold mb-2">HEADQUARTERS</h4>
              <p className="text-white/60 text-sm leading-relaxed">
                Innovation Drive 101, Silicon Valley<br />
                California, CA 94025, USA
              </p>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="w-12 h-12 rounded-xl glass-panel flex items-center justify-center shrink-0">
              <Factory className="text-emerald-400" size={20} />
            </div>
            <div>
              <h4 className="font-bold mb-2">MANUFACTURING HUB</h4>
              <p className="text-white/60 text-sm leading-relaxed">
                Tech-Park East, Building 4B<br />
                Shenzhen, Guangdong, China
              </p>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="w-12 h-12 rounded-xl glass-panel flex items-center justify-center shrink-0">
              <Mail className="text-white/40" size={20} />
            </div>
            <div>
              <h4 className="font-bold mb-2">EMAIL & PHONE</h4>
              <p className="text-white/60 text-sm leading-relaxed">
                contact@robot-ai.tech<br />
                +1 (555) 012-3456
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div className="aspect-video rounded-3xl overflow-hidden glass-panel relative">
          {/* Map Placeholder */}
          <div className="absolute inset-0 bg-[#111] flex flex-col items-center justify-center p-8 text-center">
            <Globe className="text-white/10 mb-4" size={64} />
            <p className="text-white/40 font-mono text-xs uppercase tracking-widest">Interactive Map Loading...</p>
            <div className="mt-4 w-48 h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                animate={{ x: [-192, 192] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-full h-full bg-blue-500"
              />
            </div>
          </div>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.639290622367!2d-122.08374688469247!3d37.42199987982519!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fbba130c2694d%3A0x2397d9f6558c4482!2sGoogleplex!5e0!3m2!1sen!2sus!4v1645564556455!5m2!1sen!2sus" 
            className="w-full h-full border-0 grayscale invert opacity-50"
            allowFullScreen={true} 
            loading="lazy"
          ></iframe>
        </div>

        <div className="glass-panel rounded-3xl p-8">
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="NAME" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-mono focus:outline-none focus:border-blue-400 transition-colors" />
              <input type="email" placeholder="EMAIL" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-mono focus:outline-none focus:border-blue-400 transition-colors" />
            </div>
            <textarea placeholder="MESSAGE" rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-mono focus:outline-none focus:border-blue-400 transition-colors"></textarea>
            <button className="w-full py-4 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-400 transition-colors">SEND TRANSMISSION</button>
          </form>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-20 px-6 border-t border-white/5">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">
          <Bot size={16} />
        </div>
        <span className="font-mono font-bold tracking-tighter">ROBOT AI TECH</span>
      </div>
      <div className="flex gap-8 text-[10px] font-mono text-white/40 tracking-widest uppercase">
        <a href="#" className="hover:text-white transition-colors">Twitter</a>
        <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
        <a href="#" className="hover:text-white transition-colors">Instagram</a>
      </div>
      <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
        © 2026 ROBOT AI TECH. ALL RIGHTS RESERVED.
      </div>
    </div>
  </footer>
);

export default function App() {
  const [activeSection, setActiveSection] = useState('HOME');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['HOME', 'ABOUT', 'ROBOT', 'DRONE', 'CONTACT'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section.toLowerCase());
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(id);
  };

  return (
    <div className="min-h-screen selection:bg-blue-500 selection:text-white">
      <Navbar activeSection={activeSection} setActiveSection={scrollTo} />
      
      <main>
        <div id="home">
          <Hero onExplore={() => scrollTo('ROBOT')} />
        </div>
        
        <div id="about">
          <About />
        </div>

        <div id="robot">
          <ProductSection title="Robotics" products={ROBOTS} id="robot" />
        </div>

        <div id="drone">
          <ProductSection title="Drones" products={DRONES} id="drone" />
        </div>

        <div id="contact">
          <Contact />
        </div>
      </main>

      <Footer />
    </div>
  );
}
