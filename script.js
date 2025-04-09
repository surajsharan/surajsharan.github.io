particlesJS('particles-js', {
  particles: {
    number: {
      value: 150,
      density: {
        enable: true,
        value_area: 1000
      }
    },
    color: {
      value: "#00ff00"
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000000"
      },
      polygon: {
        nb_sides: 6
      }
    },
    opacity: {
      value: 0.7,
      random: true,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0.3,
        sync: false
      }
    },
    size: {
      value: 4,
      random: true,
      anim: {
        enable: true,
        speed: 10,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 120,
      color: "#00ff00",
      opacity: 0.5,
      width: 1
    },
    move: {
      enable: true,
      speed: 3,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: true,
        rotateX: 3000,
        rotateY: 3000
      }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "bubble"
      },
      onclick: {
        enable: true,
        mode: "repulse"
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1
        }
      },
      bubble: {
        distance: 250,
        size: 8,
        duration: 2,
        opacity: 0.8,
        speed: 3
      },
      repulse: {
        distance: 200,
        duration: 0.4
      },
      push: {
        particles_nb: 4
      },
      remove: {
        particles_nb: 2
      }
    }
  },
  retina_detect: true
});