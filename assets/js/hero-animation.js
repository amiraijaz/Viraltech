// Hero Animation - Clean Globe Network with Particles
// Uses Three.js for 3D particle network effect

(function () {
    'use strict';

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function () {
        initHeroAnimation();
    });

    function initHeroAnimation() {
        const container = document.getElementById('hero-animation-container');
        if (!container) return;

        // Scene setup
        const scene = new THREE.Scene();

        // Camera setup
        const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
        camera.position.z = 30;
        camera.position.y = -5;

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        renderer.setSize(container.offsetWidth, container.offsetHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        // Colors
        const primaryColor = new THREE.Color(0x13e488);
        const secondaryColor = new THREE.Color(0x10c070);

        // Network grid nodes (the globe/curved surface)
        const gridWidth = 100;
        const gridDepth = 50;
        const nodeSpacing = 4;
        const nodesArray = [];

        // Create curved grid of nodes
        const nodesGeometry = new THREE.BufferGeometry();
        const nodePositions = [];

        for (let x = -gridWidth / 2; x <= gridWidth / 2; x += nodeSpacing) {
            for (let z = -gridDepth / 2; z <= gridDepth / 2; z += nodeSpacing) {
                // Create curved surface (like top of a sphere)
                const distFromCenter = Math.sqrt(x * x + z * z);
                const curve = Math.cos(distFromCenter * 0.03) * 5;
                const y = -18 + curve + Math.random() * 0.5;

                nodePositions.push(x, y, z);
                nodesArray.push({ x, y, z, baseY: y, distFromCenter });
            }
        }

        nodesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(nodePositions, 3));

        const nodesMaterial = new THREE.PointsMaterial({
            color: primaryColor,
            size: 0.4,
            transparent: true,
            opacity: 0.9,
            blending: THREE.AdditiveBlending
        });

        const nodesPoints = new THREE.Points(nodesGeometry, nodesMaterial);
        scene.add(nodesPoints);

        // Create connecting lines between nearby nodes
        const linesGeometry = new THREE.BufferGeometry();
        const linesPositions = [];
        const connectionDistance = nodeSpacing * 1.6;

        for (let i = 0; i < nodesArray.length; i++) {
            for (let j = i + 1; j < nodesArray.length; j++) {
                const dx = nodesArray[i].x - nodesArray[j].x;
                const dy = nodesArray[i].y - nodesArray[j].y;
                const dz = nodesArray[i].z - nodesArray[j].z;
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                if (dist < connectionDistance) {
                    linesPositions.push(
                        nodesArray[i].x, nodesArray[i].y, nodesArray[i].z,
                        nodesArray[j].x, nodesArray[j].y, nodesArray[j].z
                    );
                }
            }
        }

        linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linesPositions, 3));

        const linesMaterial = new THREE.LineBasicMaterial({
            color: secondaryColor,
            transparent: true,
            opacity: 0.25,
            blending: THREE.AdditiveBlending
        });

        const lines = new THREE.LineSegments(linesGeometry, linesMaterial);
        scene.add(lines);

        // Animation loop
        let time = 0;

        function animate() {
            requestAnimationFrame(animate);
            time += 0.01;

            // Animate network nodes (wave effect)
            const nodePos = nodesPoints.geometry.attributes.position.array;
            for (let i = 0; i < nodesArray.length; i++) {
                const node = nodesArray[i];
                const wave = Math.sin(time * 0.5 + node.x * 0.05 + node.z * 0.05) * 0.8;
                nodePos[i * 3 + 1] = node.baseY + wave;
            }
            nodesPoints.geometry.attributes.position.needsUpdate = true;

            // Update lines to match node movement
            const linePos = lines.geometry.attributes.position.array;
            let lineIndex = 0;
            for (let i = 0; i < nodesArray.length; i++) {
                for (let j = i + 1; j < nodesArray.length; j++) {
                    const dx = nodesArray[i].x - nodesArray[j].x;
                    const dy = nodesArray[i].baseY - nodesArray[j].baseY;
                    const dz = nodesArray[i].z - nodesArray[j].z;
                    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                    if (dist < connectionDistance) {
                        linePos[lineIndex * 6] = nodesArray[i].x;
                        linePos[lineIndex * 6 + 1] = nodePos[i * 3 + 1];
                        linePos[lineIndex * 6 + 2] = nodesArray[i].z;
                        linePos[lineIndex * 6 + 3] = nodesArray[j].x;
                        linePos[lineIndex * 6 + 4] = nodePos[j * 3 + 1];
                        linePos[lineIndex * 6 + 5] = nodesArray[j].z;
                        lineIndex++;
                    }
                }
            }
            lines.geometry.attributes.position.needsUpdate = true;

            // Very subtle camera sway
            camera.position.x = Math.sin(time * 0.15) * 1;
            camera.lookAt(0, -10, 0);

            renderer.render(scene, camera);
        }

        animate();

        // Handle resize
        window.addEventListener('resize', function () {
            const width = container.offsetWidth;
            const height = container.offsetHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        });
    }
})();
