export const ParticlesOne = {
  fpsLimit: 60,
  background:{
    color: '#111111'
  },
  interactivity: {
    detectsOn: 'canvas',
    events: {
      onClick: { enable: false, mode: 'push' },
      onHover: { enable: true, mode: 'repulse' },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      push: { particles_nb: 4 },
      repulse: { distance: 100, duration: 0.4 },
    },
  },
  particles: {
    color: { value: '#3ab7bf' },
    links: { color: '#3ab7bf', distance: 150, enable: true, opacity: 0.5, width: 1 },
    move: {
      bounce: false,
      direction: 'none',
      enable: true,
      outMode: 'bounce',
      random: false,
      speed: 2,
      straight: false,
    },
    number: { density: { enable: true, value_area: 800 }, value: 80 },
    opacity: { value: 0.1 },
    shape: { type: 'circle' },
    size: { random: true, value: 5 },
  },
  detectRetina: true,
};

export const ParticlesTwo = {
  fpsLimit: 60,
  background:{
    color: '#111111'
  },
  interactivity: {
    detectsOn: 'canvas',
    events: {
      resize: { enable: true, mode: 'bubble' },
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
    },
  },
  particles: {
    color: { value: '#3ab7bf' },
    move: {
      bounce: false,
      direction: 'none',
      enable: true,
      outMode: 'bounce',
      random: false,
      speed: 1,
      straight: false,
    },
    number: { density: { enable: true, value_area: 1000 }, value: 50 },
    opacity: { value: 0.1 },
    shape: { type: 'circle' },
    size: { random: true, value: 70 },
  },
  detectRetina: true,
};
