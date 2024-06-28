document.addEventListener("DOMContentLoaded", function() {
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;

    // Esconder a barra de navegação quando a página carrega
    header.classList.add('hidden');

    window.addEventListener('scroll', () => {
        if (window.scrollY === 0) {
            // Se estiver no topo da página, esconder a navbar
            header.classList.add('hidden');
        } else {
            // Caso contrário, mostrar a navbar
            header.classList.remove('hidden');
            header.classList.add('visible');
        }
        lastScrollY = window.scrollY;
    });

    // Inicializa o EmailJS 
    emailjs.init("lneZ_lS8tpQA0whr2"); 

    // Função para enviar o formulário
    function sendEmail(e) {
        e.preventDefault();

        emailjs.sendForm('service_jnefqps', 'template_umvzepm', '#contactForm')
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                alert('Mensagem enviada com sucesso!');
            }, function(error) {
                console.log('FAILED...', error);
                alert('Ocorreu um erro ao enviar a mensagem.');
            });
    }
    document.getElementById('contactForm').addEventListener('submit', sendEmail);

    // Scroll suave ao clicar na seta
    document.querySelector('.scroll-down a').addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        targetElement.scrollIntoView({ behavior: 'smooth' });
    });

    // Recolher a navbar após clicar em um item
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navCollapse = document.querySelector('.navbar-collapse');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992) { // Verifica se a tela é pequena
                navCollapse.classList.remove('show');
            }
        });
    });

    // Injetar a chave da API do Google Maps
    fetch('/env.js')
        .then(response => response.text())
        .then(envScript => {
            const scriptElement = document.createElement('script');
            scriptElement.innerHTML = envScript;
            document.head.appendChild(scriptElement);
        })
        .then(() => {
            const apiKey = window.env.REACT_APP_GOOGLE_MAPS_API_KEY;
            if (!apiKey) {
                console.error('Google Maps API key is missing.');
                return;
            }
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&libraries=maps,marker&v=beta`;
            script.async = true;
            script.onerror = () => {
                console.error('Error loading Google Maps script.');
            };
            document.head.appendChild(script);
        })
        .catch(error => {
            console.error('Error fetching env.js:', error);
        });

    window.initMap = function() {
        const map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8,
        });
    };
});
