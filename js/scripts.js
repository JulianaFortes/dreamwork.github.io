document.addEventListener("DOMContentLoaded", function() {
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;

    // Esconder a barra de navegação quando a página carrega
    header.classList.add('hidden');

    window.addEventListener('scroll', () => {
        if (window.scrollY > lastScrollY) {
            // Rolagem para baixo
            header.classList.add('visible');
            header.classList.remove('hidden');
        } else {
            // Rolagem para cima
            header.classList.remove('visible');
            header.classList.add('hidden');
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
});






