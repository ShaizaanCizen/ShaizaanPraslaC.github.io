// Tutorial Sources:
// 1. W3Schools Button Events: https://www.w3schools.com/js/js_htmldom_events.asp
// 2. P5.js Basic Shapes: https://p5js.org/examples/hello-p5-simple-shapes.html

// === My custom additions: Variables for complex animation ===
let particles = [];
let animationMode = 1;
let numParticles = 50;

// === From P5.js tutorial: Setup function with larger canvas ===
function setup() {
    createCanvas(800, 600);
    
    // My addition: Initialize particles
    for (let i = 0; i < numParticles; i++) {
        particles.push({
            x: random(width),
            y: random(height),
            size: random(10, 30),
            speedX: random(-2, 2),
            speedY: random(-2, 2),
            color: color(random(255), random(255), random(255))
        });
    }
}

// === Custom animation logic ===
function draw() {
    background(20, 20, 30); // Dark blue-ish background
    
    if (animationMode === 1) {
        // Particle system with connecting lines
        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];
            
            // Draw connections between nearby particles
            for (let j = i + 1; j < particles.length; j++) {
                let other = particles[j];
                let d = dist(p.x, p.y, other.x, other.y);
                if (d < 100) {
                    stroke(255, 255, 255, map(d, 0, 100, 255, 0));
                    line(p.x, p.y, other.x, other.y);
                }
            }
            
            // Draw and update particles
            noStroke();
            fill(p.color);
            ellipse(p.x, p.y, p.size);
            
            // Move particles
            p.x += p.speedX;
            p.y += p.speedY;
            
            // Bounce off edges
            if (p.x < 0 || p.x > width) p.speedX *= -1;
            if (p.y < 0 || p.y > height) p.speedY *= -1;
        }
    } else {
        // Spiral pattern
        translate(width/2, height/2);
        for (let i = 0; i < 200; i++) {
            let angle = i * 0.1;
            let radius = i * 2;
            let x = cos(angle + frameCount * 0.02) * radius;
            let y = sin(angle + frameCount * 0.02) * radius;
            
            fill(i % 255, 150, 255);
            noStroke();
            let size = map(sin(frameCount * 0.05 + i * 0.1), -1, 1, 5, 15);
            ellipse(x, y, size);
        }
    }
}

// === From W3Schools tutorial: Button click handler ===
function changeAnimation() {
    animationMode = animationMode === 1 ? 2 : 1;
    // Reset particles with new colors when switching to mode 1
    if (animationMode === 1) {
        for (let p of particles) {
            p.color = color(random(255), random(255), random(255));
        }
    }
}