        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#000000' // Particle color
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.5,
                    random: false
                },
                size: {
                    value: 3,
                    random: true
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#000000',
                              opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                }
            },
            retina_detect: true
        });
  <!DOCTYPE html>
<html>
<head>
 
</head>
<body>
  <style>  
    body, html {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100`12z%;
            overflow: hidden;
        }
        
        #particles-js {
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: #87B0F8; /* White background - change this to match your site */
            z-index: -1; /* This puts particles behind other content */
        }
        
        /* Add this to make content appear above particles */
        .content {
            position: relative;
            z-index: 1;
            padding: 20px;
        }

</style>
    <!-- Particles container -->
    <div id="particles-js"></div>
    
    <!-- Your website content goes here -->
    <div class="content">   
    </div>

    <!-- Particles.js library -->
    <script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script>
    
    <!-- Particles configuration -->
      <script src="/script.js" defer></script>
  
</body>
</html>
<style>